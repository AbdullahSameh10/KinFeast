import { Router } from "express";

import {
  approveRecipeController,
  rejectRecipeController,
  getPendingRecipesController,
} from "../recipes/recipe.controller.js";

import { authenticateToken, requireRole } from "../auth/auth.middleware.js";

import {
  getAdminChefsController,
  getAdminDashboardController,
  getAdminRecipeFiltersController,
  getAdminRecipesController,
  getAdminUsersController,
  getAdminAnalyticsController,
  getAdminModerationController,
} from "../admin/admin.controller.js";

const router = Router();

router.patch(
  "/recipes/:id/approve",
  authenticateToken,
  requireRole("admin"),
  approveRecipeController,
);

router.patch(
  "/recipes/:id/reject",
  authenticateToken,
  requireRole("admin"),
  rejectRecipeController,
);

router.get(
  "/recipes/pending",
  authenticateToken,
  requireRole("admin"),
  getPendingRecipesController,
);

router.get(
  "/dashboard",
  authenticateToken,
  requireRole("admin"),
  getAdminDashboardController,
);

router.get(
  "/users",
  authenticateToken,
  requireRole("admin"),
  getAdminUsersController,
);

router.get(
  "/chefs",
  authenticateToken,
  requireRole("admin"),
  getAdminChefsController,
);

router.get(
  "/recipes",
  authenticateToken,
  requireRole("admin"),
  getAdminRecipesController,
);

router.get(
  "/recipes/filters",
  authenticateToken,
  requireRole("admin"),
  getAdminRecipeFiltersController,
);
router.get(
  "/moderation",
  authenticateToken,
  requireRole("admin"),
  getAdminModerationController,
);
router.get(
  "/analytics",
  authenticateToken,
  requireRole("admin"),
  getAdminAnalyticsController,
);
export default router;
