import { Router } from "express";
import { authenticateToken } from "../auth/auth.middleware.js";
import {
  createIngredientController,
  getIngredientController,
} from "./ingredient.controller.js";
const router = Router();
router.get("/ingredients/:id", getIngredientController);
router.post(
  "/ingredients",
  authenticateToken,
  createIngredientController,
);
export default router;
