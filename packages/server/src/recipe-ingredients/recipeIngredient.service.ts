import pool from "../config/database.js";
import { findOrCreateIngredient } from "../ingredients/ingredient.service.js";
import type {
  AddRecipeIngredientInput,
  Recipe,
  RecipeIngredient,
  UpdateRecipeIngredientInput,
} from "./recipeIngredient.types.js";
export const getPublishedRecipe = async (
  recipeId: string,
): Promise<Recipe | null> => {
  const result = await pool.query<Recipe>(`
    SELECT
      id,
      author_id,
      title,
      status
    FROM recipes
    WHERE id = $1
      AND status = 'published'
  `, [recipeId]);
  return result.rows[0] ?? null;
};
export const getRecipeForManagement = async (
  recipeId: string,
): Promise<Recipe | null> => {
  const result = await pool.query<Recipe>(`
    SELECT
      id,
      author_id,
      title,
      status
    FROM recipes
    WHERE id = $1
  `, [recipeId]);
  return result.rows[0] ?? null;
};
export const getRecipeIngredientById = async (
  recipeId: string,
  ingredientId: string,
): Promise<RecipeIngredient | null> => {
  const result = await pool.query<RecipeIngredient>(`
    SELECT
      ri.recipe_id,
      ri.ingredient_id,
      i.name,
      ri.quantity
    FROM recipe_ingredients ri
    JOIN ingredients i
      ON ri.ingredient_id = i.id
    WHERE ri.recipe_id = $1
      AND ri.ingredient_id = $2
  `, [recipeId, ingredientId]);
  return result.rows[0] ?? null;
};
export const getRecipeIngredients = async (
  recipeId: string,
): Promise<RecipeIngredient[]> => {
  const result = await pool.query<RecipeIngredient>(`
    SELECT
      ri.recipe_id,
      ri.ingredient_id,
      i.name,
      ri.quantity
    FROM recipe_ingredients ri
    JOIN ingredients i
      ON ri.ingredient_id = i.id
    WHERE ri.recipe_id = $1
    ORDER BY i.name ASC
  `, [recipeId]);
  return result.rows;
};
export const createRecipeIngredient = async (
  recipeId: string,
  input: AddRecipeIngredientInput,
): Promise<RecipeIngredient> => {
  const ingredient = await findOrCreateIngredient(input.name);
  const result = await pool.query<{
    recipe_id: string;
    ingredient_id: string;
    quantity: string | null;
  }>(`
    INSERT INTO recipe_ingredients (
      recipe_id,
      ingredient_id,
      quantity
    )
    VALUES ($1, $2, $3)
    RETURNING
      recipe_id,
      ingredient_id,
      quantity
  `, [recipeId, ingredient.id, input.quantity ?? null]);
  return {
    recipe_id: result.rows[0].recipe_id,
    ingredient_id: result.rows[0].ingredient_id,
    name: ingredient.name,
    quantity: result.rows[0].quantity,
  };
};
export const updateRecipeIngredient = async (
  recipeId: string,
  ingredientId: string,
  input: UpdateRecipeIngredientInput,
): Promise<RecipeIngredient | null> => {
  const result = await pool.query<{
    recipe_id: string;
    ingredient_id: string;
    quantity: string | null;
  }>(`
    UPDATE recipe_ingredients ri
    SET quantity = $1
    WHERE ri.recipe_id = $2
      AND ri.ingredient_id = $3
    RETURNING
      ri.recipe_id,
      ri.ingredient_id,
      ri.quantity
  `, [input.quantity ?? null, recipeId, ingredientId]);
  if (result.rows.length === 0) {
    return null;
  }
  const ingredientResult = await pool.query<{ name: string }>(`
    SELECT name
    FROM ingredients
    WHERE id = $1
  `, [ingredientId]);
  return {
    recipe_id: result.rows[0].recipe_id,
    ingredient_id: result.rows[0].ingredient_id,
    name: ingredientResult.rows[0]?.name,
    quantity: result.rows[0].quantity,
  };
};
export const deleteRecipeIngredient = async (
  recipeId: string,
  ingredientId: string,
): Promise<RecipeIngredient | null> => {
  const result = await pool.query<RecipeIngredient>(`
    DELETE FROM recipe_ingredients
    WHERE recipe_id = $1
      AND ingredient_id = $2
    RETURNING
      recipe_id,
      ingredient_id,
      quantity
  `, [recipeId, ingredientId]);
  return result.rows[0] ?? null;
};
