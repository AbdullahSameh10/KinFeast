import apiClient from "./client";

interface FavoriteStatusResponse {
  success: boolean;
  favorited: boolean;
  message?: string;
}

interface FavoriteMutationResponse {
  success: boolean;
  message?: string;
}

export async function getFavoriteStatus(
  recipeId: number | string,
): Promise<boolean> {
  const response = await apiClient.get<FavoriteStatusResponse>(
    `/recipes/${recipeId}/favorite`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to check favorite status.",
    );
  }

  return response.data.favorited;
}

export async function addFavorite(
  recipeId: number | string,
): Promise<void> {
  const response = await apiClient.post<FavoriteMutationResponse>(
    `/recipes/${recipeId}/favorite`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to add recipe to favorites.",
    );
  }
}

export async function removeFavorite(
  recipeId: number | string,
): Promise<void> {
  const response = await apiClient.delete<FavoriteMutationResponse>(
    `/recipes/${recipeId}/favorite`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to remove recipe from favorites.",
    );
  }
}