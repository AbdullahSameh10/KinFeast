import type { Response } from "express";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";
import {
  createRecipeIngredient,
  deleteRecipeIngredient,
  getPublishedRecipe,
  getRecipeForManagement,
  getRecipeIngredientById,
  getRecipeIngredients,
  updateRecipeIngredient,
} from "./recipeIngredient.service.js";
import type {
  AddRecipeIngredientInput,
  UpdateRecipeIngredientInput,
} from "./recipeIngredient.types.js";
const validateIngredientName = (name: unknown): string | null => {
  if (typeof name !== "string") {
    return null;
  }
  const trimmedName = name.trim();
  if (!trimmedName || trimmedName.length > 100) {
    return null;
  }
  return trimmedName;
};
export const getRecipeIngredientsController = async (
  req: AuthenticatedRequest,
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
    const recipe = await getPublishedRecipe(recipeId);
    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });
      return;
    }
    const ingredients = await getRecipeIngredients(recipeId);
    res.status(200).json({
      success: true,
      ingredients,
    });
  } catch (error) {
    console.error("Get recipe ingredients error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch recipe ingredients.",
    });
  }
};
export const addRecipeIngredientController = async (
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
    const recipe = await getRecipeForManagement(recipeId);
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
    const input = req.body as AddRecipeIngredientInput;
    const name = validateIngredientName(input.name);
    if (!name) {
      res.status(400).json({
        success: false,
        message:
          "Ingredient name is required and must be between 1 and 100 characters.",
      });
      return;
    }
    if (
      input.quantity !== undefined &&
      input.quantity !== null &&
      typeof input.quantity !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Quantity must be a string.",
      });
      return;
    }
    const quantity =
      typeof input.quantity === "string"
        ? input.quantity.trim() || undefined
        : undefined;
    const existingIngredients = await getRecipeIngredients(recipeId);
    const alreadyAdded = existingIngredients.some(
      (ingredient) =>
        ingredient.name.toLowerCase() === name.toLowerCase(),
    );
    if (alreadyAdded) {
      res.status(409).json({
        success: false,
        message: "This ingredient is already part of the recipe.",
      });
      return;
    }
    const recipeIngredient = await createRecipeIngredient(recipeId, {
      name,
      quantity,
    });
    res.status(201).json({
      success: true,
      message: "Ingredient added to recipe successfully.",
      ingredient: recipeIngredient,
    });
  } catch (error) {
    console.error("Add recipe ingredient error:", error);
    if (
      error instanceof Error &&
      error.message.includes("recipe_ingredients_pkey")
    ) {
      res.status(409).json({
        success: false,
        message: "This ingredient is already part of the recipe.",
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: "Unable to add ingredient to recipe.",
    });
  }
};
export const updateRecipeIngredientController = async (
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
      typeof req.params.recipeId === "string"
        ? req.params.recipeId
        : undefined;
    const ingredientId =
      typeof req.params.ingredientId === "string"
        ? req.params.ingredientId
        : undefined;
    if (!recipeId || !ingredientId) {
      res.status(400).json({
        success: false,
        message: "Recipe ID and ingredient ID are required.",
      });
      return;
    }
    const recipe = await getRecipeForManagement(recipeId);
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
    const existingRecipeIngredient =
      await getRecipeIngredientById(recipeId, ingredientId);
    if (!existingRecipeIngredient) {
      res.status(404).json({
        success: false,
        message: "Recipe ingredient not found.",
      });
      return;
    }
    const input = req.body as UpdateRecipeIngredientInput;
    if (
      input.quantity !== undefined &&
      input.quantity !== null &&
      typeof input.quantity !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Quantity must be a string.",
      });
      return;
    }
    if (input.quantity === undefined) {
      res.status(400).json({
        success: false,
        message: "Quantity must be provided.",
      });
      return;
    }
    const updatedRecipeIngredient = await updateRecipeIngredient(
      recipeId,
      ingredientId,
      {
        quantity:
          typeof input.quantity === "string"
            ? input.quantity.trim()
            : input.quantity,
      },
    );
    res.status(200).json({
      success: true,
      message: "Recipe ingredient updated successfully.",
      ingredient: updatedRecipeIngredient,
    });
  } catch (error) {
    console.error("Update recipe ingredient error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to update recipe ingredient.",
    });
  }
};
export const deleteRecipeIngredientController = async (
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
      typeof req.params.recipeId === "string"
        ? req.params.recipeId
        : undefined;
    const ingredientId =
      typeof req.params.ingredientId === "string"
        ? req.params.ingredientId
        : undefined;
    if (!recipeId || !ingredientId) {
      res.status(400).json({
        success: false,
        message: "Recipe ID and ingredient ID are required.",
      });
      return;
    }
    const recipe = await getRecipeForManagement(recipeId);
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
    const existingRecipeIngredient =
      await getRecipeIngredientById(recipeId, ingredientId);
    if (!existingRecipeIngredient) {
      res.status(404).json({
        success: false,
        message: "Recipe ingredient not found.",
      });
      return;
    }
    await deleteRecipeIngredient(recipeId, ingredientId);
    res.status(200).json({
      success: true,
      message: "Ingredient removed from recipe successfully.",
    });
  } catch (error) {
    console.error("Delete recipe ingredient error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to remove ingredient from recipe.",
    });
  }
};
