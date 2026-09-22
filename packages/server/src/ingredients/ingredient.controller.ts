import type { Request, Response } from "express";
import {
  createIngredient,
  getIngredientById,
  getIngredientByName,
} from "./ingredient.service.js";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";
import type { CreateIngredientInput } from "./ingredient.types.js";
export const getIngredientController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const ingredientId =
      typeof req.params.id === "string" ? req.params.id : undefined;
    if (!ingredientId) {
      res.status(400).json({
        success: false,
        message: "Ingredient ID is required.",
      });
      return;
    }
    const ingredient = await getIngredientById(ingredientId);
    if (!ingredient) {
      res.status(404).json({
        success: false,
        message: "Ingredient not found.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      ingredient,
    });
  } catch (error) {
    console.error("Get ingredient error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch ingredient.",
    });
  }
};
export const createIngredientController = async (
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
    const input = req.body as CreateIngredientInput;
    if (typeof input.name !== "string") {
      res.status(400).json({
        success: false,
        message: "Ingredient name is required.",
      });
      return;
    }
    const name = input.name.trim();
    if (!name) {
      res.status(400).json({
        success: false,
        message: "Ingredient name cannot be empty.",
      });
      return;
    }
    if (name.length > 100) {
      res.status(400).json({
        success: false,
        message: "Ingredient name cannot exceed 100 characters.",
      });
      return;
    }
    const existingIngredient = await getIngredientByName(name);
    if (existingIngredient) {
      res.status(200).json({
        success: true,
        message: "Ingredient already exists.",
        ingredient: existingIngredient,
      });
      return;
    }
    const ingredient = await createIngredient({ name });
    res.status(201).json({
      success: true,
      message: "Ingredient created successfully.",
      ingredient,
    });
  } catch (error) {
    console.error("Create ingredient error:", error);
    if (
      error instanceof Error &&
      error.message.includes("ingredients_name_key")
    ) {
      res.status(409).json({
        success: false,
        message: "Ingredient already exists.",
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: "Unable to create ingredient.",
    });
  }
};
