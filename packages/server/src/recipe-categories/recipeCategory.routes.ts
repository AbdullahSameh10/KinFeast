import { Router } from "express";
import { authenticateToken, requireRole } from "../auth/auth.middleware.js";
import {
  getRecipeCategoriesController,
  getAdminRecipeCategoriesController,
  updateRecipeCategoryImageController,
} from "./recipeCategory.controller.js";

const router = Router();

// Public: only categories with published recipes.
router.get("/", getRecipeCategoriesController);

// Admin: all categories, including categories with no recipes.
router.get(
  "/admin",
  authenticateToken,
  requireRole("admin"),
  getAdminRecipeCategoriesController,
);

// Admin: assign a previously uploaded Cloudinary image.
router.patch(
  "//image",
  authenticateToken,
  requireRole("admin"),
  updateRecipeCategoryImageController,
);

export default router;
