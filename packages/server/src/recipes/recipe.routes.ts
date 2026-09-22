import { Router } from "express";
import {
  createRecipeController,
  getRecipeById,
  getRecipes,
  updateRecipeController,
} from "./recipe.controller.js";
import { authenticateToken, requireRole } from "../auth/auth.middleware.js";
import { requireRecipeOwner } from "../auth/ownership.middleware.js";

const router = Router();

router.get("/", getRecipes);

router.get("/:id", getRecipeById);

router.post(
  "/",
  authenticateToken,
  requireRole("chef"),
  createRecipeController,
);

router.patch(
  "/:id",
  authenticateToken,
  requireRole("chef"),
  requireRecipeOwner,
  updateRecipeController,
);

export default router;
