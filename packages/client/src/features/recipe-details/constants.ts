import type { Recipe } from "../../api/recipes.api";

export const DIFFICULTY_LEVEL: Record<Recipe["difficulty"], number> = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

export const DIFFICULTY_COLORS: Record<number, string> = {
  1: "bg-emerald-500",
  2: "bg-orange-400",
  3: "bg-red-500",
};

export const MAX_RATING = 5;
export const SHARE_FEEDBACK_MS = 2000;