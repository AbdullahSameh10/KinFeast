import type { Response, NextFunction } from "express";
import pool from "../config/database.js";
import type { AuthenticatedRequest } from "./auth.middleware.js";

export const requireRecipeOwner = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required.",
      });

      return;
    }

    const recipeId = req.params.id;

    if (!recipeId) {
      res.status(400).json({
        success: false,
        message: "Recipe ID is required.",
      });

      return;
    }

    const result = await pool.query(
      `
        SELECT author_id
        FROM recipes
        WHERE id = $1
      `,
      [recipeId],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }

    const authorId = String(result.rows[0].author_id);

    if (authorId !== req.user.userId) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to modify this recipe.",
      });

      return;
    }

    next();
  } catch (error) {
    console.error("Recipe ownership check failed:", error);

    res.status(500).json({
      success: false,
      message: "Unable to verify recipe ownership.",
    });
  }
};
