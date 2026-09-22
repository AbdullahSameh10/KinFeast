import type { Response } from "express";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";
import {
  addFavorite,
  removeFavorite,
  isRecipeFavorited,
} from "./favorite.service.js";

export const addFavoriteController = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required.",
      });

      return;
    }

    const recipeId =
      typeof req.params.id === "string" ? req.params.id : undefined;

    if (!recipeId) {
      res.status(400).json({
        success: false,
        message: "Recipe ID is required.",
      });

      return;
    }

    const favorite = await addFavorite(req.user.userId, recipeId);

    if (!favorite) {
      res.status(200).json({
        success: true,
        message: "Recipe is already in your favorites.",
      });

      return;
    }

    res.status(201).json({
      success: true,
      message: "Recipe added to favorites.",
      favorite,
    });
  } catch (error) {
    console.error("Add favorite error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to add recipe to favorites.",
    });
  }
};

export const removeFavoriteController = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required.",
      });

      return;
    }

    const recipeId =
      typeof req.params.id === "string" ? req.params.id : undefined;

    if (!recipeId) {
      res.status(400).json({
        success: false,
        message: "Recipe ID is required.",
      });

      return;
    }

    const favorite = await removeFavorite(req.user.userId, recipeId);

    if (!favorite) {
      res.status(404).json({
        success: false,
        message: "Recipe is not in your favorites.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Recipe removed from favorites.",
    });
  } catch (error) {
    console.error("Remove favorite error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to remove recipe from favorites.",
    });
  }
};

export const getFavoriteStatusController = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required.",
      });

      return;
    }

    const recipeId =
      typeof req.params.id === "string" ? req.params.id : undefined;

    if (!recipeId) {
      res.status(400).json({
        success: false,
        message: "Recipe ID is required.",
      });

      return;
    }

    const favorite = await isRecipeFavorited(req.user.userId, recipeId);

    res.status(200).json({
      success: true,
      favorited: Boolean(favorite),
    });
  } catch (error) {
    console.error("Get favorite status error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to check favorite status.",
    });
  }
};
