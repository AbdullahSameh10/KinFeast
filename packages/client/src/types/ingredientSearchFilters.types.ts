export type IngredientSearchSortOption =
  | "bestMatch"
  | "newest"
  | "oldest"
  | "mostPopular"
  | "fastest"
  | "fewestMissing"
  | "mostMatched";

export type CookingTimeFilter = 0 | 20 | 30 | 40 | 50 | 60 | 61;

export type DifficultyFilter = "Easy" | "Medium" | "Hard" | null;

export interface IngredientSearchFilterState {
  categoryId: string;
  cuisineId: string;
  cookingTime: CookingTimeFilter;
  maxMissingIngredients: number;
  difficulty: DifficultyFilter;
  sortBy: IngredientSearchSortOption;
}

export interface IngredientSearchFilterLabels {
  title: string;
  category: string;
  anyCategory: string;
  cuisine: string;
  anyCuisine: string;

  cookingTime: string;
  under10Minutes: string;
  upToMinutes: string;
  plus60Minutes: string;

  maxMissingIngredients: string;
  perfectFit: string;
  upToMissing: string;
  noMissingLimit: string;

  difficulty: string;
  anyDifficulty: string;
  easy: string;
  medium: string;
  hard: string;

  sortBy: string;
  bestMatch: string;
  newest: string;
  oldest: string;
  mostPopular: string;
  fewestMissing: string;
  mostMatched: string;
  fastest: string;

  clearFilters: string;
  activeFilters: string;
  noResultsTitle: string;
  noResultsDescription: string;
  showAll: string;
}