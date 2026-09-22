import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";
import {
  createReview,
  deleteReview,
  getPublishedRecipeForReview,
  getReviewById,
  getReviewByUserAndRecipe,
  getReviewsForRecipe,
  updateReview,
} from "./review.service.js";
import type { CreateReviewInput, UpdateReviewInput } from "./review.types.js";

export const createReviewController = async (
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

    const recipe = await getPublishedRecipeForReview(recipeId);

    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }

    if (String(recipe.author_id) === String(req.user.userId)) {
      res.status(403).json({
        success: false,
        message: "You cannot review your own recipe.",
      });

      return;
    }

    const input = req.body as CreateReviewInput;

    if (
      typeof input.rating !== "number" ||
      !Number.isInteger(input.rating) ||
      input.rating < 1 ||
      input.rating > 5
    ) {
      res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5.",
      });

      return;
    }

    if (
      input.comment !== undefined &&
      input.comment !== null &&
      typeof input.comment !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Comment must be a string.",
      });

      return;
    }

    const existingReview = await getReviewByUserAndRecipe(
      req.user.userId,
      recipeId,
    );

    if (existingReview) {
      res.status(409).json({
        success: false,
        message: "You have already reviewed this recipe.",
      });

      return;
    }

    const review = await createReview(req.user.userId, recipeId, {
      rating: input.rating,
      comment:
        typeof input.comment === "string"
          ? input.comment.trim() || undefined
          : undefined,
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully.",
      review,
    });
  } catch (error) {
    console.error("Create review error:", error);

    if (
      error instanceof Error &&
      error.message.includes("recipe_reviews_unique_user_recipe")
    ) {
      res.status(409).json({
        success: false,
        message: "You have already reviewed this recipe.",
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Unable to create review.",
    });
  }
};

export const getReviewsController = async (
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

    const recipe = await getPublishedRecipeForReview(recipeId);

    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }

    const reviews = await getReviewsForRecipe(recipeId);

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error("Get reviews error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch reviews.",
    });
  }
};

export const updateReviewController = async (
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

    const reviewId =
      typeof req.params.reviewId === "string" ? req.params.reviewId : undefined;

    if (!reviewId) {
      res.status(400).json({
        success: false,
        message: "Review ID is required.",
      });

      return;
    }

    const review = await getReviewById(reviewId);

    if (!review) {
      res.status(404).json({
        success: false,
        message: "Review not found.",
      });

      return;
    }

    if (String(review.user_id) !== String(req.user.userId)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to modify this review.",
      });

      return;
    }

    const input = req.body as UpdateReviewInput;

    if (input.rating !== undefined) {
      if (
        typeof input.rating !== "number" ||
        !Number.isInteger(input.rating) ||
        input.rating < 1 ||
        input.rating > 5
      ) {
        res.status(400).json({
          success: false,
          message: "Rating must be an integer between 1 and 5.",
        });

        return;
      }
    }

    if (
      input.comment !== undefined &&
      input.comment !== null &&
      typeof input.comment !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Comment must be a string.",
      });

      return;
    }

    if (input.rating === undefined && input.comment === undefined) {
      res.status(400).json({
        success: false,
        message: "At least one field must be provided.",
      });

      return;
    }

    const updatedReview = await updateReview(reviewId, {
      rating: input.rating,
      comment:
        typeof input.comment === "string"
          ? input.comment.trim()
          : input.comment,
    });

    res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      review: updatedReview,
    });
  } catch (error) {
    console.error("Update review error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update review.",
    });
  }
};

export const deleteReviewController = async (
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

    const reviewId =
      typeof req.params.reviewId === "string" ? req.params.reviewId : undefined;

    if (!reviewId) {
      res.status(400).json({
        success: false,
        message: "Review ID is required.",
      });

      return;
    }

    const review = await getReviewById(reviewId);

    if (!review) {
      res.status(404).json({
        success: false,
        message: "Review not found.",
      });

      return;
    }

    if (String(review.user_id) !== String(req.user.userId)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to delete this review.",
      });

      return;
    }

    await deleteReview(reviewId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    console.error("Delete review error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete review.",
    });
  }
};
