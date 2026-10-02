import type { RecipeReview } from "../../api/recipe-details.api";

export const computeAverageRating = (reviews: RecipeReview[]): number => {
  if (!reviews.length) return 0;
  return (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  );
};

export const parseInstructions = (
  instructions: string | undefined,
): string[] => {
  if (!instructions) return [];
  return instructions
    .split(/\r?\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
};

export const formatRecipeDate = (
  iso: string,
  language: string,
): string =>
  new Intl.DateTimeFormat(
    language === "ar" ? "ar-EG" : "en-US",
    { dateStyle: "medium" },
  ).format(new Date(iso));