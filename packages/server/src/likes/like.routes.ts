import { Router } from "express";
import { authenticateToken } from "../auth/auth.middleware.js";
import {
  addLikeController,
  getLikeCountController,
  getLikeStatusController,
  removeLikeController,
} from "./like.controller.js";

const router = Router();

router.post("/recipes/:id/like", authenticateToken, addLikeController);

router.delete("/recipes/:id/like", authenticateToken, removeLikeController);

router.get("/recipes/:id/like", authenticateToken, getLikeStatusController);

router.get("/recipes/:id/likes/count", getLikeCountController);

export default router;
