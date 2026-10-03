export type Difficulty = "Easy" | "Medium" | "Hard";

export type RecipeFiltersState = {
  search: string;
  categoryId: string;
  cuisineId: string;
  difficulty: Difficulty | undefined;
  currentPage: number;
};