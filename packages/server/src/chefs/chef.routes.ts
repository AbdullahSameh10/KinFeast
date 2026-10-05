import { Router } from "express";

import {
  getPublicChefsController,
} from "./chef.controller.js";

const router = Router();

router.get(
  "/",
  getPublicChefsController,
);

export default router;