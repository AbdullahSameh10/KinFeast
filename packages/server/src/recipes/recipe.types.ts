export type RecipeDifficulty = "Easy" | "Medium" | "Hard";

export interface CreateRecipeInput {
  cuisine_id?: number;
  category_id: number;
  title: string;
  description?: string;
  instructions: string;
  cooking_time: number;
  difficulty?: RecipeDifficulty;
  recipe_image?: string | null;
}

export interface UpdateRecipeInput {
  category_id?: number;
  title?: string;
  description?: string | null;
  instructions?: string;
  cooking_time?: number;
  difficulty?: RecipeDifficulty;
  cuisine_id?: number | null;
  recipe_image?: string | null;
}

export interface PublishedRecipesQuery {
  page: number;
  limit: number;
  search?: string;
  categoryId?: number;
  cuisineId?: number;
  difficulty?: "Easy" | "Medium" | "Hard";
}