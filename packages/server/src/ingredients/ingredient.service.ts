import pool from "../config/database.js";
import type {
  CreateIngredientInput,
  Ingredient,
} from "./ingredient.types.js";
export const getIngredientByName = async (
  name: string,
): Promise<Ingredient | null> => {
  const result = await pool.query<Ingredient>(`
    SELECT
      id,
      name,
      created_at
    FROM ingredients
    WHERE LOWER(name) = LOWER($1)
  `, [name]);
  return result.rows[0] ?? null;
};
export const getIngredientById = async (
  ingredientId: string,
): Promise<Ingredient | null> => {
  const result = await pool.query<Ingredient>(`
    SELECT
      id,
      name,
      created_at
    FROM ingredients
    WHERE id = $1
  `, [ingredientId]);
  return result.rows[0] ?? null;
};
export const createIngredient = async (
  input: CreateIngredientInput,
): Promise<Ingredient> => {
  const result = await pool.query<Ingredient>(`
    INSERT INTO ingredients (
      name
    )
    VALUES ($1)
    RETURNING
      id,
      name,
      created_at
  `, [input.name]);
  return result.rows[0];
};
export const findOrCreateIngredient = async (
  name: string,
): Promise<Ingredient> => {
  const existingIngredient = await getIngredientByName(name);
  if (existingIngredient) {
    return existingIngredient;
  }
  try {
    return await createIngredient({ name });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("ingredients_name_key")
    ) {
      const ingredient = await getIngredientByName(name);
      if (ingredient) {
        return ingredient;
      }
    }
    throw error;
  }
};
