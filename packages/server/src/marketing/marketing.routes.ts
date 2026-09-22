import { Router } from "express";
import { getSources } from "./marketing.controller.js";
const router = Router();
router.get("/sources", getSources);
export default router;
