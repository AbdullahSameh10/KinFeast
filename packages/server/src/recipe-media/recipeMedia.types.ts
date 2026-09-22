export type MediaType = "image" | "video";

export interface CreateRecipeMediaInput {
  media_type: MediaType;
  media_url: string;
}

export interface UpdateRecipeMediaInput {
  media_type?: MediaType;
  media_url?: string;
}

export interface RecipeMedia {
  id: string;
  recipe_id: string;
  media_type: MediaType;
  media_url: string;
  created_at: string;
}
