import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  getRecipeBySlug,
  getRecipeIngredients,
  getRecipeMedia,
  getRecipeReviews,
  getRecipeLikeCount,
  getRecipeViewCount,
  getRecipeLikeStatus,
  recordRecipeView,
  type RecipeIngredient,
  type RecipeMedia,
  type RecipeReview,
} from "../../../api/recipe-details.api";
import {
  getFavoriteStatus,
} from "../../../api/favorites.api";
import type { Recipe } from "../../../api/recipes.api";

interface UseRecipeDetailsArgs {
  slug: string | undefined;
  isAuthenticated: boolean;
  errorMessage: string;
}

export function useRecipeDetails({
  slug,
  isAuthenticated,
  errorMessage,
}: UseRecipeDetailsArgs) {
  const [state, setState] = useState({
    recipe: null as Recipe | null,
    ingredients: [] as RecipeIngredient[],
    media: [] as RecipeMedia[],
    reviews: [] as RecipeReview[],
    likeCount: 0,
    viewCount: 0,
    isLiked: false,
    isFavorited: false,
    isLoading: true,
    isNotFound: false,
    error: "",
  });

  const load = useCallback(async () => {
    if (!slug) {
      setState((s) => ({
        ...s,
        error: errorMessage,
        isLoading: false,
      }));

      return;
    }

    setState((s) => ({
      ...s,
      isLoading: true,
      isNotFound: false,
      error: "",
    }));

    let loadingRecipe = true;

    try {
      // 1. Fetch the essential recipe data first.
      const recipeData = await getRecipeBySlug(slug);
      loadingRecipe = false;

      // 2. Render the recipe immediately.
      // The hero image can now start loading without waiting for secondary data.
      setState((s) => ({
        ...s,
        recipe: recipeData,
        ingredients: [],
        media: [],
        reviews: [],
        likeCount: 0,
        viewCount: 0,
        isLiked: false,
        isFavorited: false,
        isLoading: false,
        isNotFound: false,
        error: "",
      }));

      // 3. Fetch secondary data in parallel without blocking the page.
      const results = await Promise.allSettled([
        getRecipeIngredients(recipeData.id),
        getRecipeMedia(recipeData.id),
        getRecipeReviews(recipeData.id),
        getRecipeLikeCount(recipeData.id),
        getRecipeViewCount(recipeData.id),
      ]);

      const [
        ingredientsResult,
        mediaResult,
        reviewsResult,
        likesResult,
        viewsResult,
      ] = results;

      // 4. Update whichever secondary requests succeeded.
      setState((s) => ({
        ...s,
        ingredients:
          ingredientsResult.status === "fulfilled"
            ? ingredientsResult.value
            : s.ingredients,
        media:
          mediaResult.status === "fulfilled"
            ? mediaResult.value
            : s.media,
        reviews:
          reviewsResult.status === "fulfilled"
            ? reviewsResult.value
            : s.reviews,
        likeCount:
          likesResult.status === "fulfilled"
            ? likesResult.value
            : s.likeCount,
        viewCount:
          viewsResult.status === "fulfilled"
            ? viewsResult.value
            : s.viewCount,
      }));

      // 5. Authentication-specific requests must not block the recipe either.
      if (isAuthenticated) {
        const [favoriteResult, likeStatusResult] =
          await Promise.allSettled([
            getFavoriteStatus(recipeData.id),
            getRecipeLikeStatus(recipeData.id),
          ]);

        setState((s) => ({
          ...s,
          isFavorited:
            favoriteResult.status === "fulfilled"
              ? favoriteResult.value
              : false,
          isLiked:
            likeStatusResult.status === "fulfilled"
              ? likeStatusResult.value
              : false,
        }));

        // Record the view separately.
        recordRecipeView(recipeData.id)
          .then(() => getRecipeViewCount(recipeData.id))
          .then((count) => {
            setState((s) => ({
              ...s,
              viewCount: count,
            }));
          })
          .catch(() => {});
      }
    } catch (err) {
      console.error("Recipe details loading error:", err);

      const isNotFound =
        loadingRecipe &&
        axios.isAxiosError(err) &&
        err.response?.status === 404;

      setState((s) => ({
        ...s,
        isLoading: false,
        isNotFound,
        error: isNotFound ? "" : errorMessage,
      }));
    }
  }, [slug, isAuthenticated, errorMessage]);

  useEffect(() => {
    const t = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(t);
  }, [load]);

  const patch = useCallback(
    <K extends keyof typeof state>(
      key: K,
      value: (typeof state)[K],
    ) => setState((s) => ({ ...s, [key]: value })),
    [],
  );

  return { ...state, reload: load, patch };
}