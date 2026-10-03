import type { RecipeFiltersState } from "./../types/recipes.types";

export const RECIPE_FILTERS_STORAGE_KEY = "kinfeast:recipes:filters";

export const DEFAULT_RECIPE_FILTERS: RecipeFiltersState = {
  search: "",
  categoryId: "",
  cuisineId: "",
  difficulty: undefined,
  currentPage: 1,
};

export function getInitialRecipeFilters(): RecipeFiltersState {
  try {
    const stored = window.sessionStorage.getItem(RECIPE_FILTERS_STORAGE_KEY);

    if (!stored) {
      return DEFAULT_RECIPE_FILTERS;
    }

    const parsed: unknown = JSON.parse(stored);

    if (!parsed || typeof parsed !== "object") {
      return DEFAULT_RECIPE_FILTERS;
    }

    const value = parsed as Partial<RecipeFiltersState>;

    const validDifficulty =
      value.difficulty === undefined ||
      value.difficulty === "Easy" ||
      value.difficulty === "Medium" ||
      value.difficulty === "Hard";

    return {
      search: typeof value.search === "string" ? value.search : "",
      categoryId: typeof value.categoryId === "string" ? value.categoryId : "",
      cuisineId: typeof value.cuisineId === "string" ? value.cuisineId : "",
      difficulty: validDifficulty ? value.difficulty : undefined,
      currentPage:
        typeof value.currentPage === "number" &&
        Number.isInteger(value.currentPage) &&
        value.currentPage > 0
          ? value.currentPage
          : 1,
    };
  } catch {
    return DEFAULT_RECIPE_FILTERS;
  }
}

export function persistRecipeFilters(filters: RecipeFiltersState): void {
  try {
    window.sessionStorage.setItem(
      RECIPE_FILTERS_STORAGE_KEY,
      JSON.stringify(filters),
    );
  } catch {
    // Storage can be unavailable in private/restricted browser contexts.
  }
}

export function clearRecipeFilters(): void {
  try {
    window.sessionStorage.removeItem(RECIPE_FILTERS_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in private/restricted browser contexts.
  }
}