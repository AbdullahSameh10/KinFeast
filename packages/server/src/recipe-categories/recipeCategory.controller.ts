import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";
import {
  getAllRecipeCategories,
  getAdminRecipeCategories,
  updateRecipeCategoryImage,
} from "./recipeCategory.service.js";

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

export const getAdminRecipeCategoriesController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const categories = await getAdminRecipeCategories();

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Get admin recipe categories error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch admin recipe categories.",
    });
  }
};

export const updateRecipeCategoryImageController = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const rawId = req.params.id;
    const categoryId = typeof rawId === "string" ? Number(rawId) : Number.NaN;

    if (!Number.isInteger(categoryId) || categoryId < 1) {
      res.status(400).json({
        success: false,
        message: "A valid category ID is required.",
      });
      return;
    }

    const imageUrl = req.body?.image_url;

    if (
      typeof imageUrl !== "string" ||
      !imageUrl.trim() ||
      imageUrl.length > 2048
    ) {
      res.status(400).json({
        success: false,
        message: "A valid image_url is required.",
      });
      return;
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(imageUrl);
    } catch {
      res.status(400).json({
        success: false,
        message: "The image URL must be a valid HTTPS URL.",
      });
      return;
    }

    if (
      parsedUrl.protocol !== "https:" ||
      parsedUrl.hostname !== "res.cloudinary.com"
    ) {
      res.status(400).json({
        success: false,
        message: "Category images must use a secure Cloudinary URL.",
      });
      return;
    }

    const category = await updateRecipeCategoryImage(categoryId, imageUrl);

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Recipe category not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Category image updated successfully.",
      category,
    });
  } catch (error) {
    console.error("Update recipe category image error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update category image.",
    });
  }
};
