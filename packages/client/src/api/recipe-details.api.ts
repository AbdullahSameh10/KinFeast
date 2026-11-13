import apiClient from "./client";
import type { Recipe } from "./recipes.api";

export interface RecipeIngredient {
  recipe_id: number | string;
  ingredient_id: number | string;
  name: string;
  quantity: string | null;
}

export interface RecipeMedia {
  id: number | string;
  recipe_id: number | string;
  media_type: "image" | "video";
  media_url: string;
  created_at: string;
}

export interface RecipeReview {
  id: number | string;
  user_id: number | string;
  user_name: string;
  recipe_id: number | string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
}

interface RecipeResponse {
  success: boolean;
  recipe: Recipe;
  message?: string;
}

interface IngredientsResponse {
  success: boolean;
  ingredients: RecipeIngredient[];
  message?: string;
}

interface MediaResponse {
  success: boolean;
  media: RecipeMedia[];
  message?: string;
}

interface LikeCountResponse {
  success: boolean;
  like_count: number;
  message?: string;
}

interface LikeStatusResponse {
  success: boolean;
  liked: boolean;
  message?: string;
}

interface LikeMutationResponse {
  success: boolean;
  message?: string;
}

interface ReviewsResponse {
  success: boolean;
  reviews: RecipeReview[];
  message?: string;
}

interface ReviewMutationResponse {
  success: boolean;
  review?: RecipeReview;
  message?: string;
}

interface ViewCountResponse {
  success: boolean;
  view_count: number;
  message?: string;
}

interface ViewMutationResponse {
  success: boolean;
  new_view?: boolean;
  message?: string;
}

const RECIPE_REQUEST_CACHE_TTL = 15_000;

const recipeRequestCache = new Map<
  string,
  {
    promise: Promise<Recipe>;
    expiresAt: number;
  }
>();

function requestRecipeBySlug(slug: string): Promise<Recipe> {
  const responsePromise = apiClient
    .get<RecipeResponse>(
      `/recipes/${encodeURIComponent(slug)}`,
    )
    .then((response) => {
      if (!response.data.success) {
        throw new Error(
          response.data.message ?? "Unable to fetch recipe.",
        );
      }

      return response.data.recipe;
    });

  return responsePromise;
}

function getCachedRecipeBySlug(slug: string): Promise<Recipe> {
  const cached = recipeRequestCache.get(slug);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.promise;
  }

  recipeRequestCache.delete(slug);

  const promise = requestRecipeBySlug(slug);

  recipeRequestCache.set(slug, {
    promise,
    expiresAt: Date.now() + RECIPE_REQUEST_CACHE_TTL,
  });

  promise.catch(() => {
    if (recipeRequestCache.get(slug)?.promise === promise) {
      recipeRequestCache.delete(slug);
    }
  });

  return promise;
}

export function prefetchRecipeBySlug(slug: string): void {
  if (!slug.trim()) return;

  void getCachedRecipeBySlug(slug).catch(() => {
    // The normal page hook handles loading errors.
  });
}

export async function getRecipeBySlug(
  slug: string,
): Promise<Recipe> {
  return getCachedRecipeBySlug(slug);
}


export async function getRecipeIngredients(
  recipeId: number | string,
): Promise<RecipeIngredient[]> {
  const response = await apiClient.get<IngredientsResponse>(
    `/recipes/${recipeId}/ingredients`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to fetch ingredients.",
    );
  }

  return response.data.ingredients;
}

export async function getRecipeMedia(
  recipeId: number | string,
): Promise<RecipeMedia[]> {
  const response = await apiClient.get<MediaResponse>(
    `/recipes/${recipeId}/media`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to fetch recipe media.",
    );
  }

  return response.data.media;
}

export async function getRecipeLikeCount(
  recipeId: number | string,
): Promise<number> {
  const response = await apiClient.get<LikeCountResponse>(
    `/recipes/${recipeId}/likes/count`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to fetch like count.",
    );
  }

  return response.data.like_count;
}

export async function getRecipeLikeStatus(
  recipeId: number | string,
): Promise<boolean> {
  const response = await apiClient.get<LikeStatusResponse>(
    `/recipes/${recipeId}/like`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to fetch like status.",
    );
  }

  return response.data.liked;
}

export async function addRecipeLike(
  recipeId: number | string,
): Promise<void> {
  const response = await apiClient.post<LikeMutationResponse>(
    `/recipes/${recipeId}/like`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to like recipe.",
    );
  }
}

export async function removeRecipeLike(
  recipeId: number | string,
): Promise<void> {
  const response = await apiClient.delete<LikeMutationResponse>(
    `/recipes/${recipeId}/like`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to unlike recipe.",
    );
  }
}

export async function getRecipeReviews(
  recipeId: number | string,
): Promise<RecipeReview[]> {
  const response = await apiClient.get<ReviewsResponse>(
    `/recipes/${recipeId}/reviews`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to fetch reviews.",
    );
  }

  return response.data.reviews;
}

export async function createRecipeReview(
  recipeId: number | string,
  rating: number,
  comment: string,
): Promise<RecipeReview> {
  const response = await apiClient.post<ReviewMutationResponse>(
    `/recipes/${recipeId}/reviews`,
    {
      rating,
      comment: comment.trim() || undefined,
    },
  );

  if (!response.data.success || !response.data.review) {
    throw new Error(
      response.data.message ?? "Unable to create review.",
    );
  }

  return response.data.review;
}

export async function getRecipeViewCount(
  recipeId: number | string,
): Promise<number> {
  const response = await apiClient.get<ViewCountResponse>(
    `/recipes/${recipeId}/views/count`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to fetch view count.",
    );
  }

  return response.data.view_count;
}

export async function recordRecipeView(
  recipeId: number | string,
): Promise<void> {
  const response = await apiClient.post<ViewMutationResponse>(
    `/recipes/${recipeId}/views`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to record recipe view.",
    );
  }
}