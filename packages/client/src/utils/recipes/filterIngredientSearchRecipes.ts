import type { IngredientSearchRecipe } from "../../api/recipes.api";
import type { IngredientSearchFilterState } from "../../types/ingredientSearchFilters.types";

export function filterIngredientSearchRecipes(
  recipes: IngredientSearchRecipe[],
  filters: IngredientSearchFilterState,
): IngredientSearchRecipe[] {
  return recipes.filter((recipe) => {
    if (
      filters.categoryId &&
      String(recipe.category_id) !== filters.categoryId
    ) {
      return false;
    }

    if (
      filters.cuisineId &&
      String(recipe.cuisine_id ?? "") !== filters.cuisineId
    ) {
      return false;
    }

    // 0 means strictly under 10 minutes.
    if (
      filters.cookingTime === 0 &&
      !(recipe.cooking_time != null && recipe.cooking_time < 10)
    ) {
      return false;
    }

    // 20–60 mean maximum cooking times.
    if (
      filters.cookingTime >= 20 &&
      filters.cookingTime <= 60 &&
      !(recipe.cooking_time != null &&
        recipe.cooking_time <= filters.cookingTime)
    ) {
      return false;
    }

    // 61 means 60 minutes or more.
    if (
      filters.cookingTime === 61 &&
      !(recipe.cooking_time != null && recipe.cooking_time >= 60)
    ) {
      return false;
    }

    // 0–8 are maximum missing-ingredient counts.
    // 9 means unlimited.
    if (
      filters.maxMissingIngredients < 9 &&
      recipe.missing_ingredient_count > filters.maxMissingIngredients
    ) {
      return false;
    }

    // Difficulty must match exactly when selected.
    if (
      filters.difficulty !== null &&
      recipe.difficulty !== filters.difficulty
    ) {
      return false;
    }

    return true;
  });
}