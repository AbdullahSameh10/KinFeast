import { Router } from "express";
import { authenticateToken } from "../auth/auth.middleware.js";
import {
  getRecipeViewCountController,
  recordRecipeViewController,
} from "./view.controller.js";
const router = Router();
router.post(
  "/recipes/:id/views",
  authenticateToken,
  recordRecipeViewController,
);
router.get(
  "/recipes/:id/views/count",
  getRecipeViewCountController,
);
export default router;
