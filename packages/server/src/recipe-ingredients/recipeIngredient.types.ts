export interface Recipe {
  id: string;
  author_id: string;
  title: string;
  status: string;
}
export interface RecipeIngredient {
  recipe_id: string;
  ingredient_id: string;
  name: string;
  quantity: string | null;
}
export interface AddRecipeIngredientInput {
  name: string;
  quantity?: string | null;
}
export interface UpdateRecipeIngredientInput {
  quantity: string | null;
}
