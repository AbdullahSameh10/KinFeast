import { Router } from "express";

import {
  createContactMessageController,
} from "./contact.controller.js";

const router = Router();

router.post(
  "/",
  createContactMessageController,
);

export default router;