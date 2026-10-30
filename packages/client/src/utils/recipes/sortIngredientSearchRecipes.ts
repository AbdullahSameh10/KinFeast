import type { IngredientSearchRecipe } from "../../api/recipes.api";
import type { IngredientSearchSortOption } from "../../types/ingredientSearchFilters.types";

export function sortIngredientSearchRecipes(
  recipes: IngredientSearchRecipe[],
  sortBy: IngredientSearchSortOption,
): IngredientSearchRecipe[] {
  const sortedRecipes = [...recipes];

  sortedRecipes.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );

      case "oldest":
        return (
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
        );

      case "mostPopular":
        return (
          (b.popularity_score ?? 0) - (a.popularity_score ?? 0) ||
          b.matched_ingredient_count - a.matched_ingredient_count ||
          a.missing_ingredient_count - b.missing_ingredient_count
        );

      case "fastest":
        return (
          (a.cooking_time ?? Number.POSITIVE_INFINITY) -
          (b.cooking_time ?? Number.POSITIVE_INFINITY)
        );

      case "fewestMissing":
        return (
          a.missing_ingredient_count - b.missing_ingredient_count ||
          b.matched_ingredient_count - a.matched_ingredient_count
        );

      case "mostMatched":
        return (
          b.matched_ingredient_count - a.matched_ingredient_count ||
          a.missing_ingredient_count - b.missing_ingredient_count
        );

      case "bestMatch":
      default:
        return (
          a.missing_ingredient_count - b.missing_ingredient_count ||
          b.matched_ingredient_count - a.matched_ingredient_count ||
          new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
    }
  });

  return sortedRecipes;
}