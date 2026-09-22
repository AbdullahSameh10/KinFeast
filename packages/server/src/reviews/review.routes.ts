import { Router } from "express";
import { authenticateToken } from "../auth/auth.middleware.js";
import {
  createReviewController,
  deleteReviewController,
  getReviewsController,
  updateReviewController,
} from "./review.controller.js";

const router = Router();

router.post("/recipes/:id/reviews", authenticateToken, createReviewController);

router.get("/recipes/:id/reviews", getReviewsController);

router.patch(
  "/recipes/:recipeId/reviews/:reviewId",
  authenticateToken,
  updateReviewController,
);

router.delete(
  "/recipes/:recipeId/reviews/:reviewId",
  authenticateToken,
  deleteReviewController,
);

export default router;
