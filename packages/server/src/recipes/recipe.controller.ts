import type { Request, Response } from "express";
import {
  updateRecipe,
  getPublishedRecipes,
  getPublishedRecipeBySlug,
  approveRecipe,
  rejectRecipe,
  getPendingRecipes,
  createRecipe,
  getTrendingRecipes,
} from "./recipe.service.js";
import { getRecipeCategoryById } from "../recipe-categories/recipeCategory.service.js";
import type { CreateRecipeInput, UpdateRecipeInput } from "./recipe.types.js";
import { AuthenticatedRequest } from "../auth/auth.middleware.js";

export const createRecipeController = async (
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

    const input = req.body as CreateRecipeInput;

    if (!input.title || !input.title.trim()) {
      res.status(400).json({
        success: false,
        message: "Recipe title is required.",
      });

      return;
    }

    if (!input.instructions || !input.instructions.trim()) {
      res.status(400).json({
        success: false,
        message: "Recipe instructions are required.",
      });

      return;
    }

    if (!Number.isInteger(input.category_id) || input.category_id <= 0) {
      res.status(400).json({
        success: false,
        message: "Recipe category is required.",
      });

      return;
    }

    const category = await getRecipeCategoryById(input.category_id);

    if (!category) {
      res.status(400).json({
        success: false,
        message: "Recipe category not found.",
      });

      return;
    }

    if (!Number.isInteger(input.cooking_time) || input.cooking_time <= 0) {
      res.status(400).json({
        success: false,
        message: "Cooking time must be a positive integer.",
      });

      return;
    }

    if (
      input.difficulty !== undefined &&
      !["Easy", "Medium", "Hard"].includes(input.difficulty)
    ) {
      res.status(400).json({
        success: false,
        message: "Difficulty must be Easy, Medium, or Hard.",
      });

      return;
    }

    const recipe = await createRecipe(req.user.userId, input);

    res.status(201).json({
      success: true,
      message: "Recipe created successfully.",
      recipe,
    });
  } catch (error) {
    console.error("Create recipe error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create recipe.",
    });
  }
};

export const updateRecipeController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const recipeId =
      typeof req.params.id === "string" ? req.params.id : undefined;
    const input = req.body as UpdateRecipeInput;

    if (!recipeId) {
      res.status(400).json({
        success: false,
        message: "Recipe ID is required.",
      });

      return;
    }

    if (input.title !== undefined && !input.title.trim()) {
      res.status(400).json({
        success: false,
        message: "Recipe title cannot be empty.",
      });

      return;
    }

    if (input.instructions !== undefined && !input.instructions.trim()) {
      res.status(400).json({
        success: false,
        message: "Recipe instructions cannot be empty.",
      });

      return;
    }

    if (
      input.category_id !== undefined &&
      (!Number.isInteger(input.category_id) || input.category_id <= 0)
    ) {
      res.status(400).json({
        success: false,
        message: "Recipe category must be a positive integer.",
      });

      return;
    }

    if (input.category_id !== undefined) {
      const category = await getRecipeCategoryById(input.category_id);

      if (!category) {
        res.status(400).json({
          success: false,
          message: "Recipe category not found.",
        });

        return;
      }
    }

    if (
      input.difficulty !== undefined &&
      !["Easy", "Medium", "Hard"].includes(input.difficulty)
    ) {
      res.status(400).json({
        success: false,
        message: "Difficulty must be Easy, Medium, or Hard.",
      });

      return;
    }

    if (
      input.cooking_time !== undefined &&
      (!Number.isInteger(input.cooking_time) || input.cooking_time <= 0)
    ) {
      res.status(400).json({
        success: false,
        message: "Cooking time must be a positive integer.",
      });

      return;
    }

    const recipe = await updateRecipe(recipeId, {
      ...input,
      title: input.title?.trim(),
      description:
        input.description === undefined
          ? undefined
          : input.description?.trim() || null,
      instructions:
        input.instructions === undefined
          ? undefined
          : input.instructions.trim(),
    });

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully.",
      recipe,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "RECIPE_NOT_FOUND") {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }

    console.error("Recipe update error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update recipe.",
    });
  }
};

export const getRecipes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const rawPage = Number(req.query.page ?? 1);
    const rawLimit = Number(req.query.limit ?? 12);

    const page =
      Number.isInteger(rawPage) && rawPage > 0
        ? rawPage
        : 1;

    const limit =
      Number.isInteger(rawLimit) && rawLimit > 0
        ? Math.min(rawLimit, 48)
        : 12;

    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : undefined;

    const categoryId =
      typeof req.query.category_id === "string" &&
      req.query.category_id.trim() !== ""
        ? Number(req.query.category_id)
        : undefined;

    const cuisineId =
      typeof req.query.cuisine_id === "string" &&
      req.query.cuisine_id.trim() !== ""
        ? Number(req.query.cuisine_id)
        : undefined;

    const difficulty =
      typeof req.query.difficulty === "string" &&
      ["Easy", "Medium", "Hard"].includes(req.query.difficulty)
        ? (req.query.difficulty as "Easy" | "Medium" | "Hard")
        : undefined;

    if (
      categoryId !== undefined &&
      (!Number.isInteger(categoryId) || categoryId <= 0)
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid category filter.",
      });

      return;
    }

    if (
      cuisineId !== undefined &&
      (!Number.isInteger(cuisineId) || cuisineId <= 0)
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid cuisine filter.",
      });

      return;
    }

    const result = await getPublishedRecipes({
      page,
      limit,
      search,
      categoryId,
      cuisineId,
      difficulty,
    });

    res.status(200).json({
      success: true,
      recipes: result.recipes,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Get recipes error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch recipes.",
    });
  }
};

export const getTrendingRecipesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const rawLimit = Number(req.query.limit ?? 12);

    const limit = Number.isFinite(rawLimit)
      ? Math.min(Math.max(Math.floor(rawLimit), 1), 24)
      : 12;

    const recipes = await getTrendingRecipes({
      limit,
    });

    res.status(200).json({
      success: true,
      recipes,
    });
  } catch (error) {
    console.error("Get trending recipes error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch trending recipes.",
    });
  }
};

export const getRecipeBySlug = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const slug =
      typeof req.params.slug === "string"
        ? req.params.slug
        : undefined;

    if (!slug) {
      res.status(400).json({
        success: false,
        message: "Recipe slug is required.",
      });

      return;
    }

    const recipe = await getPublishedRecipeBySlug(slug);

    res.status(200).json({
      success: true,
      recipe,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "RECIPE_NOT_FOUND"
    ) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }

    console.error("Get recipe error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch recipe.",
    });
  }
};

export const approveRecipeController = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const recipe = await approveRecipe(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Recipe approved successfully.",
      recipe,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "RECIPE_NOT_PENDING") {
      res.status(409).json({
        success: false,
        message: "Recipe does not exist or is not pending.",
      });

      return;
    }

    console.error("Approve recipe error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to approve recipe.",
    });
  }
};

export const rejectRecipeController = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const recipe = await rejectRecipe(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Recipe rejected successfully.",
      recipe,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "RECIPE_NOT_PENDING") {
      res.status(409).json({
        success: false,
        message: "Recipe does not exist or is not pending.",
      });

      return;
    }

    console.error("Reject recipe error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to reject recipe.",
    });
  }
};

export const getPendingRecipesController = async (
  _req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const recipes = await getPendingRecipes();

    res.status(200).json({
      success: true,
      recipes,
    });
  } catch (error) {
    console.error("Get pending recipes error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch pending recipes.",
    });
  }
};
