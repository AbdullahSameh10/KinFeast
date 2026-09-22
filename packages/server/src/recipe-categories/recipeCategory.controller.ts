import type { Request, Response } from "express";
import { getAllRecipeCategories } from "./recipeCategory.service.js";

export const getRecipeCategoriesController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const categories = await getAllRecipeCategories();

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Get recipe categories error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch recipe categories.",
    });
  }
};