import { Router } from "express";
import { getRecipeCategoriesController } from "./recipeCategory.controller.js";

const router = Router();

router.get("/", getRecipeCategoriesController);

export default router;