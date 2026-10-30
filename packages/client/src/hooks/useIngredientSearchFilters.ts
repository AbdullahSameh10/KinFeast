import { useMemo, useState } from "react";

import type { IngredientSearchRecipe } from "../api/recipes.api";
import { filterIngredientSearchRecipes } from "../utils/recipes/filterIngredientSearchRecipes";
import { sortIngredientSearchRecipes } from "../utils/recipes/sortIngredientSearchRecipes";
import type {
  CookingTimeFilter,
  DifficultyFilter,
  IngredientSearchFilterState,
  IngredientSearchSortOption,
} from "../types/ingredientSearchFilters.types";

const initialFilters: IngredientSearchFilterState = {
  categoryId: "",
  cuisineId: "",
  cookingTime: 30,
  maxMissingIngredients: 9,
  difficulty: null,
  sortBy: "bestMatch",
};

export function useIngredientSearchFilters(
  recipes: IngredientSearchRecipe[],
) {
  const [filters, setFilters] =
    useState<IngredientSearchFilterState>(initialFilters);

  const filteredRecipes = useMemo(() => {
    const filtered = filterIngredientSearchRecipes(recipes, filters);

    return sortIngredientSearchRecipes(filtered, filters.sortBy);
  }, [recipes, filters]);

  const activeFilterCount = useMemo(
    () =>
      Number(Boolean(filters.categoryId)) +
      Number(Boolean(filters.cuisineId)) +
      Number(filters.cookingTime !== 30) +
      Number(filters.maxMissingIngredients !== 9) +
      Number(filters.difficulty !== null) +
      Number(filters.sortBy !== "bestMatch"),
    [filters],
  );

  const setCategoryId = (categoryId: string) =>
    setFilters((current) => ({ ...current, categoryId }));

  const setCuisineId = (cuisineId: string) =>
    setFilters((current) => ({ ...current, cuisineId }));

  const setCookingTime = (cookingTime: CookingTimeFilter) =>
    setFilters((current) => ({ ...current, cookingTime }));

  const setMaxMissingIngredients = (maxMissingIngredients: number) =>
    setFilters((current) => ({
      ...current,
      maxMissingIngredients,
    }));

  const setDifficulty = (difficulty: DifficultyFilter) =>
    setFilters((current) => ({ ...current, difficulty }));

  const setSortBy = (sortBy: IngredientSearchSortOption) =>
    setFilters((current) => ({ ...current, sortBy }));

  const clearFilters = () => setFilters({ ...initialFilters });

  return {
    filters,
    filteredRecipes,
    activeFilterCount,
    setCategoryId,
    setCuisineId,
    setCookingTime,
    setMaxMissingIngredients,
    setDifficulty,
    setSortBy,
    clearFilters,
  };
}