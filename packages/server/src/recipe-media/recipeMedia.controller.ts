import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";
import {
  createRecipeMedia,
  deleteRecipeMedia,
  getRecipeById,
  getRecipeMedia,
  getRecipeMediaById,
  updateRecipeMedia,
} from "./recipeMedia.service.js";
import type {
  CreateRecipeMediaInput,
  UpdateRecipeMediaInput,
} from "./recipeMedia.types.js";

const isValidMediaType = (value: unknown): value is "image" | "video" => {
  return value === "image" || value === "video";
};

export const createRecipeMediaController = async (
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

    const recipe = await getRecipeById(recipeId);

    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }

    if (String(recipe.author_id) !== String(req.user.userId)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to modify this recipe.",
      });

      return;
    }

    const input = req.body as CreateRecipeMediaInput;

    if (!isValidMediaType(input.media_type)) {
      res.status(400).json({
        success: false,
        message: 'Media type must be either "image" or "video".',
      });

      return;
    }

    if (
      typeof input.media_url !== "string" ||
      input.media_url.trim().length === 0
    ) {
      res.status(400).json({
        success: false,
        message: "Media URL is required.",
      });

      return;
    }

    const media = await createRecipeMedia(recipeId, {
      media_type: input.media_type,
      media_url: input.media_url.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Recipe media added successfully.",
      media,
    });
  } catch (error) {
    console.error("Create recipe media error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to add recipe media.",
    });
  }
};

export const getRecipeMediaController = async (
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

    const recipe = await getRecipeById(recipeId);

    if (!recipe || recipe.status !== "published") {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }

    const media = await getRecipeMedia(recipeId);

    res.status(200).json({
      success: true,
      media,
    });
  } catch (error) {
    console.error("Get recipe media error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch recipe media.",
    });
  }
};

export const updateRecipeMediaController = async (
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
      typeof req.params.recipeId === "string" ? req.params.recipeId : undefined;

    const mediaId =
      typeof req.params.mediaId === "string" ? req.params.mediaId : undefined;

    if (!recipeId) {
      res.status(400).json({
        success: false,
        message: "Recipe ID is required.",
      });

      return;
    }

    if (!mediaId) {
      res.status(400).json({
        success: false,
        message: "Media ID is required.",
      });

      return;
    }

    const recipe = await getRecipeById(recipeId);

    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }

    const media = await getRecipeMediaById(mediaId);

    if (!media || String(media.recipe_id) !== String(recipeId)) {
      res.status(404).json({
        success: false,
        message: "Recipe media not found.",
      });

      return;
    }

    if (String(recipe.author_id) !== String(req.user.userId)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to modify this recipe.",
      });

      return;
    }

    const input = req.body as UpdateRecipeMediaInput;

    if (input.media_type !== undefined && !isValidMediaType(input.media_type)) {
      res.status(400).json({
        success: false,
        message: 'Media type must be either "image" or "video".',
      });

      return;
    }

    if (
      input.media_url !== undefined &&
      (typeof input.media_url !== "string" ||
        input.media_url.trim().length === 0)
    ) {
      res.status(400).json({
        success: false,
        message: "Media URL must be a non-empty string.",
      });

      return;
    }

    if (input.media_type === undefined && input.media_url === undefined) {
      res.status(400).json({
        success: false,
        message: "At least one field must be provided.",
      });

      return;
    }

    const updatedMedia = await updateRecipeMedia(mediaId, {
      media_type: input.media_type,
      media_url:
        typeof input.media_url === "string"
          ? input.media_url.trim()
          : undefined,
    });

    res.status(200).json({
      success: true,
      message: "Recipe media updated successfully.",
      media: updatedMedia,
    });
  } catch (error) {
    console.error("Update recipe media error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update recipe media.",
    });
  }
};

export const deleteRecipeMediaController = async (
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
      typeof req.params.recipeId === "string" ? req.params.recipeId : undefined;

    const mediaId =
      typeof req.params.mediaId === "string" ? req.params.mediaId : undefined;

    if (!recipeId) {
      res.status(400).json({
        success: false,
        message: "Recipe ID is required.",
      });

      return;
    }

    if (!mediaId) {
      res.status(400).json({
        success: false,
        message: "Media ID is required.",
      });

      return;
    }

    const recipe = await getRecipeById(recipeId);

    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }

    const media = await getRecipeMediaById(mediaId);

    if (!media || String(media.recipe_id) !== String(recipeId)) {
      res.status(404).json({
        success: false,
        message: "Recipe media not found.",
      });

      return;
    }

    if (String(recipe.author_id) !== String(req.user.userId)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to modify this recipe.",
      });

      return;
    }

    await deleteRecipeMedia(mediaId);

    res.status(200).json({
      success: true,
      message: "Recipe media deleted successfully.",
    });
  } catch (error) {
    console.error("Delete recipe media error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete recipe media.",
    });
  }
};
