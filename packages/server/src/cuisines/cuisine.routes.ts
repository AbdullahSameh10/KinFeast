import { Router } from "express";
import { authenticateToken, requireRole } from "../auth/auth.middleware.js";
import {
  createCuisineController,
  deleteCuisineController,
  getCuisineController,
  getCuisinesController,
  updateCuisineController,
} from "./cuisine.controller.js";
const router = Router();
router.get("/", getCuisinesController);
router.get("/:id", getCuisineController);
router.post(
  "/",
  authenticateToken,
  requireRole("admin"),
  createCuisineController,
);
router.patch(
  "/:id",
  authenticateToken,
  requireRole("admin"),
  updateCuisineController,
);
router.delete(
  "/:id",
  authenticateToken,
  requireRole("admin"),
  deleteCuisineController,
);
export default router;
