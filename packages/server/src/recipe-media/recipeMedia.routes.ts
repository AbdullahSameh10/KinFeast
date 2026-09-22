import { Router } from "express";
import { authenticateToken } from "../auth/auth.middleware.js";
import {
  createRecipeMediaController,
  deleteRecipeMediaController,
  getRecipeMediaController,
  updateRecipeMediaController,
} from "./recipeMedia.controller.js";

const router = Router();

router.get("/recipes/:id/media", getRecipeMediaController);

router.post(
  "/recipes/:id/media",
  authenticateToken,
  createRecipeMediaController,
);

router.patch(
  "/recipes/:recipeId/media/:mediaId",
  authenticateToken,
  updateRecipeMediaController,
);

router.delete(
  "/recipes/:recipeId/media/:mediaId",
  authenticateToken,
  deleteRecipeMediaController,
);

export default router;
