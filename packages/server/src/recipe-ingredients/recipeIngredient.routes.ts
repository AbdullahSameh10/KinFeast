import { Router } from "express";
import { authenticateToken } from "../auth/auth.middleware.js";
import {
  addRecipeIngredientController,
  deleteRecipeIngredientController,
  getRecipeIngredientsController,
  updateRecipeIngredientController,
} from "./recipeIngredient.controller.js";
const router = Router();
router.get(
  "/recipes/:id/ingredients",
  getRecipeIngredientsController,
);
router.post(
  "/recipes/:id/ingredients",
  authenticateToken,
  addRecipeIngredientController,
);
router.patch(
  "/recipes/:recipeId/ingredients/:ingredientId",
  authenticateToken,
  updateRecipeIngredientController,
);
router.delete(
  "/recipes/:recipeId/ingredients/:ingredientId",
  authenticateToken,
  deleteRecipeIngredientController,
);
export default router;
