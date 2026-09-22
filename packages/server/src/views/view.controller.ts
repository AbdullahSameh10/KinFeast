import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";
import {
  getRecipeForView,
  getRecipeViewCount,
  recordRecipeView,
} from "./view.service.js";
export const recordRecipeViewController = async (
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
    const recipe = await getRecipeForView(recipeId);
    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });
      return;
    }
    const view = await recordRecipeView(req.user.userId, recipeId);
    if (!view) {
      res.status(200).json({
        success: true,
        message: "Recipe view already recorded.",
        new_view: false,
      });
      return;
    }
    res.status(201).json({
      success: true,
      message: "Recipe view recorded successfully.",
      new_view: true,
      view,
    });
  } catch (error) {
    console.error("Record recipe view error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to record recipe view.",
    });
  }
};
export const getRecipeViewCountController = async (
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
    const recipe = await getRecipeForView(recipeId);
    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });
      return;
    }
    const viewCount = await getRecipeViewCount(recipeId);
    res.status(200).json({
      success: true,
      view_count: viewCount,
    });
  } catch (error) {
    console.error("Get recipe view count error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch recipe view count.",
    });
  }
};
