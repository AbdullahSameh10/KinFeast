import { Router } from "express";
import { authenticateToken } from "../auth/auth.middleware.js";
import {
  addFavoriteController,
  removeFavoriteController,
  getFavoriteStatusController,
} from "./favorite.controller.js";

const router = Router();

router.post("/recipes/:id/favorite", authenticateToken, addFavoriteController);

router.delete(
  "/recipes/:id/favorite",
  authenticateToken,
  removeFavoriteController,
);

router.get(
  "/recipes/:id/favorite",
  authenticateToken,
  getFavoriteStatusController,
);

export default router;
