import apiClient from "./client";

export interface Recipe {
  id: number | string;
  author_id: number | string;
  author_name: string;
  cuisine_id: number | string | null;
  category_id: number | string;
  cuisine_name: string | null;
  category_name: string;
  title: string;
  description: string | null;
  instructions: string;
  cooking_time: number | null;
  difficulty: "Easy" | "Medium" | "Hard";
  recipe_image: string | null;
  created_at: string;
  status: string;
}

export interface RecipeCategory {
  id: number | string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Cuisine {
  id: number | string;
  name: string;
  created_at: string;
}

interface RecipesResponse {
  success: boolean;
  recipes: Recipe[];
  message?: string;
}

interface RecipeCategoriesResponse {
  success: boolean;
  categories: RecipeCategory[];
  message?: string;
}

interface CuisinesResponse {
  success: boolean;
  cuisines: Cuisine[];
  message?: string;
}

export async function getRecipes(): Promise<Recipe[]> {
  const response = await apiClient.get<RecipesResponse>("/recipes");

  if (!response.data.success) {
    throw new Error(response.data.message ?? "Unable to fetch recipes.");
  }

  return response.data.recipes;
}

export async function getRecipeCategories(): Promise<RecipeCategory[]> {
  const response = await apiClient.get<RecipeCategoriesResponse>(
    "/recipe-categories",
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to fetch recipe categories.",
    );
  }

  return response.data.categories;
}

export async function getCuisines(): Promise<Cuisine[]> {
  const response = await apiClient.get<CuisinesResponse>("/cuisines");

  if (!response.data.success) {
    throw new Error(response.data.message ?? "Unable to fetch cuisines.");
  }

  return response.data.cuisines;
}