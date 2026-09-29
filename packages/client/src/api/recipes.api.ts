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

export interface RecipesPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface RecipesResponse {
  success: boolean;
  recipes: Recipe[];
  pagination: RecipesPagination;
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

export interface GetRecipesParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  cuisineId?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
}

export interface PaginatedRecipes {
  recipes: Recipe[];
  pagination: RecipesPagination;
}

export async function getRecipes(
  params: GetRecipesParams = {},
): Promise<PaginatedRecipes> {
  const response = await apiClient.get<RecipesResponse>("/recipes", {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 12,
      search: params.search || undefined,
      category_id: params.categoryId || undefined,
      cuisine_id: params.cuisineId || undefined,
      difficulty: params.difficulty || undefined,
    },
  });

  if (!response.data.success) {
    throw new Error(response.data.message ?? "Unable to fetch recipes.");
  }

  return {
    recipes: response.data.recipes,
    pagination: response.data.pagination,
  };
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