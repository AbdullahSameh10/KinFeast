import pool from "../config/database.js";
import type {
  CreateRecipeMediaInput,
  UpdateRecipeMediaInput,
} from "./recipeMedia.types.js";

export const getRecipeById = async (recipeId: string) => {
  const result = await pool.query(
    `
      SELECT
        id,
        author_id,
        title,
        status
      FROM recipes
      WHERE id = $1
    `,
    [recipeId],
  );

  return result.rows[0] ?? null;
};

export const createRecipeMedia = async (
  recipeId: string,
  input: CreateRecipeMediaInput,
) => {
  const result = await pool.query(
    `
      INSERT INTO recipe_media (
        recipe_id,
        media_type,
        media_url
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        recipe_id,
        media_type,
        media_url,
        created_at
    `,
    [recipeId, input.media_type, input.media_url],
  );

  return result.rows[0] ?? null;
};

export const getRecipeMedia = async (recipeId: string) => {
  const result = await pool.query(
    `
      SELECT
        id,
        recipe_id,
        media_type,
        media_url,
        created_at
      FROM recipe_media
      WHERE recipe_id = $1
      ORDER BY created_at ASC, id ASC
    `,
    [recipeId],
  );

  return result.rows;
};

export const getRecipeMediaById = async (mediaId: string) => {
  const result = await pool.query(
    `
      SELECT
        id,
        recipe_id,
        media_type,
        media_url,
        created_at
      FROM recipe_media
      WHERE id = $1
    `,
    [mediaId],
  );

  return result.rows[0] ?? null;
};

export const updateRecipeMedia = async (
  mediaId: string,
  input: UpdateRecipeMediaInput,
) => {
  const result = await pool.query(
    `
      UPDATE recipe_media
      SET
        media_type = COALESCE($1, media_type),
        media_url = COALESCE($2, media_url)
      WHERE id = $3
      RETURNING
        id,
        recipe_id,
        media_type,
        media_url,
        created_at
    `,
    [input.media_type ?? null, input.media_url ?? null, mediaId],
  );

  return result.rows[0] ?? null;
};

export const deleteRecipeMedia = async (mediaId: string) => {
  const result = await pool.query(
    `
      DELETE FROM recipe_media
      WHERE id = $1
      RETURNING
        id,
        recipe_id,
        media_type,
        media_url,
        created_at
    `,
    [mediaId],
  );

  return result.rows[0] ?? null;
};
