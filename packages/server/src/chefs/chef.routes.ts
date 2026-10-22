import { Router } from "express";

import { getChefByUsernameController, getPublicChefsController } from "./chef.controller.js";

const router = Router();

router.get("/", getPublicChefsController);
router.get("/:username", getChefByUsernameController);

export default router;
