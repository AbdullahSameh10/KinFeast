import { useCallback, useEffect, useState } from "react";
import {
  getRecipeById,
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
  id: string | undefined;
  isAuthenticated: boolean;
  errorMessage: string;
}

export function useRecipeDetails({
  id,
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
    error: "",
  });

  const load = useCallback(async () => {
    if (!id) {
      setState((s) => ({ ...s, error: errorMessage, isLoading: false }));
      return;
    }

    setState((s) => ({ ...s, isLoading: true, error: "" }));

    try {
      const [
        recipeData,
        ingredientsData,
        mediaData,
        reviewsData,
        likesData,
        viewsData,
      ] = await Promise.all([
        getRecipeById(id),
        getRecipeIngredients(id),
        getRecipeMedia(id),
        getRecipeReviews(id),
        getRecipeLikeCount(id),
        getRecipeViewCount(id),
      ]);

      const base = {
        recipe: recipeData,
        ingredients: ingredientsData,
        media: mediaData,
        reviews: reviewsData,
        likeCount: likesData,
        viewCount: viewsData,
      };

      if (isAuthenticated) {
        const [favoriteStatus, likeStatus] = await Promise.all([
          getFavoriteStatus(id),
          getRecipeLikeStatus(id),
        ]);

        setState((s) => ({
          ...s,
          ...base,
          isFavorited: favoriteStatus,
          isLiked: likeStatus,
          isLoading: false,
        }));

        // Non-critical view recording
        recordRecipeView(id)
          .then(() => getRecipeViewCount(id))
          .then((count) =>
            setState((s) => ({ ...s, viewCount: count })),
          )
          .catch(() => {});
      } else {
        setState((s) => ({
          ...s,
          ...base,
          isFavorited: false,
          isLiked: false,
          isLoading: false,
        }));
      }
    } catch (err) {
      console.error("Recipe details loading error:", err);
      setState((s) => ({
        ...s,
        isLoading: false,
        error:
          err instanceof Error ? err.message : errorMessage,
      }));
    }
  }, [id, isAuthenticated, errorMessage]);

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