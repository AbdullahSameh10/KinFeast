import { Router } from "express";

import { authenticateToken } from "../auth/auth.middleware.js";

import {
  followChefController,
  unfollowChefController,
  getFollowStatusController,
} from "./follow.controller.js";

const router = Router();

router.post("/users/:id/follow", authenticateToken, followChefController);

router.delete("/users/:id/follow", authenticateToken, unfollowChefController);

router.get("/users/:id/follow", authenticateToken, getFollowStatusController);

export default router;
