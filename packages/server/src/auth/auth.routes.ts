import { Router } from "express";
import {
  login,
  register,
  getMe,
  getChefArea,
  getAdminArea,
} from "./auth.controller.js";

import { authenticateToken, requireRole } from "./auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateToken, getMe);
router.get("/chef-area", authenticateToken, requireRole("chef"), getChefArea);
router.get("/admin-area", authenticateToken, requireRole("admin"), getAdminArea);

export default router;
