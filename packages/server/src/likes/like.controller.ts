import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";
import {
  addLike,
  getLikeCount,
  getPublishedRecipeForLike,
  isRecipeLiked,
  removeLike,
} from "./like.service.js";

export const addLikeController = async (
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

    const recipe = await getPublishedRecipeForLike(recipeId);

    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }

    const like = await addLike(req.user.userId, recipeId);

    if (!like) {
      res.status(200).json({
        success: true,
        message: "Recipe is already liked.",
      });

      return;
    }

    res.status(201).json({
      success: true,
      message: "Recipe liked successfully.",
      like,
    });
  } catch (error) {
    console.error("Add like error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to like recipe.",
    });
  }
};

export const removeLikeController = async (
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

    const recipe = await getPublishedRecipeForLike(recipeId);

    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }

    const like = await removeLike(req.user.userId, recipeId);

    if (!like) {
      res.status(404).json({
        success: false,
        message: "Recipe is not liked by you.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Recipe unliked successfully.",
    });
  } catch (error) {
    console.error("Remove like error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to unlike recipe.",
    });
  }
};

export const getLikeStatusController = async (
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

    const recipe = await getPublishedRecipeForLike(recipeId);

    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }

    const like = await isRecipeLiked(req.user.userId, recipeId);

    res.status(200).json({
      success: true,
      liked: Boolean(like),
    });
  } catch (error) {
    console.error("Get like status error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to check like status.",
    });
  }
};

export const getLikeCountController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const recipeId =
      typeof req.params.id === "string" ? req.params.id : undefined;

    if (!recipeId) {
      res.status(400).json({
        success: false,
        message: "Recipe ID is required.",
      });

      return;
    }

    const recipe = await getPublishedRecipeForLike(recipeId);

    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }

    const likeCount = await getLikeCount(recipeId);

    res.status(200).json({
      success: true,
      like_count: likeCount,
    });
  } catch (error) {
    console.error("Get like count error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch like count.",
    });
  }
};
