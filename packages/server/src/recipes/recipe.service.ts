import pool from "../config/database.js";
import type { CreateRecipeInput, UpdateRecipeInput } from "./recipe.types.js";

export const createRecipe = async (
  authorId: string,
  input: CreateRecipeInput,
) => {
  const result = await pool.query(
    `
      INSERT INTO recipes (
        author_id,
        cuisine_id,
        category_id,
        title,
        description,
        instructions,
        cooking_time,
        difficulty,
        recipe_image
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING
        id,
        author_id,
        cuisine_id,
        category_id,
        title,
        description,
        instructions,
        cooking_time,
        difficulty,
        recipe_image,
        created_at,
        status
    `,
    [
      authorId,
      input.cuisine_id ?? null,
      input.category_id,
      input.title.trim(),
      input.description?.trim() ?? null,
      input.instructions.trim(),
      input.cooking_time,
      input.difficulty ?? "Easy",
      input.recipe_image?.trim() || null,
    ],
  );

  return result.rows[0];
};

export const updateRecipe = async (
  recipeId: string,
  input: UpdateRecipeInput,
) => {
  const result = await pool.query(
    `
      UPDATE recipes
      SET
        title = CASE
          WHEN $1::text IS NULL THEN title
          ELSE $1
        END,

        description = CASE
          WHEN $2::boolean = false THEN description
          ELSE $3
        END,

        instructions = CASE
          WHEN $4::text IS NULL THEN instructions
          ELSE $4
        END,

        cooking_time = CASE
          WHEN $5::integer IS NULL THEN cooking_time
          ELSE $5
        END,

        difficulty = CASE
          WHEN $6::text IS NULL THEN difficulty
          ELSE $6
        END,

        cuisine_id = CASE
          WHEN $7::boolean = false THEN cuisine_id
          ELSE $8
        END,

        category_id = CASE
          WHEN $9::boolean = false THEN category_id
          ELSE $10
        END,

        recipe_image = CASE
          WHEN $11::boolean = false THEN recipe_image
          ELSE $12
        END

      WHERE id = $13

      RETURNING
        id,
        author_id,
        cuisine_id,
        category_id,
        title,
        description,
        instructions,
        cooking_time,
        difficulty,
        created_at,
        status
    `,
    [
      input.title ?? null,

      input.description !== undefined,
      input.description ?? null,

      input.instructions ?? null,

      input.cooking_time ?? null,

      input.difficulty ?? null,

      input.cuisine_id !== undefined,
      input.cuisine_id ?? null,

      input.category_id !== undefined,
      input.category_id ?? null,

      input.recipe_image !== undefined,
      input.recipe_image?.trim() || null,

      recipeId,
    ],
  );

  if (result.rows.length === 0) {
    throw new Error("RECIPE_NOT_FOUND");
  }

  return result.rows[0];
};

export const getPublishedRecipes = async () => {
  const result = await pool.query(`
    SELECT
      r.id,
      r.author_id,
      u.name AS author_name,
      r.cuisine_id,
      r.category_id,
      c.name AS cuisine_name,
      rc.name AS category_name,
      r.title,
      r.description,
      r.instructions,
      r.cooking_time,
      r.difficulty,
      r.recipe_image,
      r.created_at,
      r.status
    FROM recipes r
    JOIN users u
      ON r.author_id = u.id
    LEFT JOIN cuisines c
      ON r.cuisine_id = c.id
    JOIN recipe_categories rc
      ON r.category_id = rc.id
    WHERE r.status = 'published'
    ORDER BY r.created_at DESC
  `);

  return result.rows;
};

export const getPublishedRecipeById = async (recipeId: string) => {
  const result = await pool.query(
    `
      SELECT
        r.id,
        r.author_id,
        u.name AS author_name,
        r.cuisine_id,
        r.category_id,
        c.name AS cuisine_name,
        rc.name AS category_name,
        r.title,
        r.description,
        r.instructions,
        r.cooking_time,
        r.difficulty,
        r.recipe_image,
        r.created_at,
        r.status
      FROM recipes r
      JOIN users u
        ON r.author_id = u.id
      LEFT JOIN cuisines c
        ON r.cuisine_id = c.id
      JOIN recipe_categories rc
        ON r.category_id = rc.id
      WHERE r.id = $1
        AND r.status = 'published'
    `,
    [recipeId],
  );

  if (result.rows.length === 0) {
    throw new Error("RECIPE_NOT_FOUND");
  }

  return result.rows[0];
};

export const approveRecipe = async (recipeId: string) => {
  const result = await pool.query(
    `
      UPDATE recipes
      SET status = 'published'
      WHERE id = $1
        AND status = 'pending'
      RETURNING
        id,
        author_id,
        cuisine_id,
        category_id,
        title,
        description,
        instructions,
        cooking_time,
        difficulty,
        created_at,
        status
    `,
    [recipeId],
  );

  if (result.rows.length === 0) {
    throw new Error("RECIPE_NOT_PENDING");
  }

  return result.rows[0];
};

export const rejectRecipe = async (recipeId: string) => {
  const result = await pool.query(
    `
      UPDATE recipes
      SET status = 'rejected'
      WHERE id = $1
        AND status = 'pending'
      RETURNING
        id,
        author_id,
        cuisine_id,
        category_id,
        title,
        description,
        instructions,
        cooking_time,
        difficulty,
        created_at,
        status
    `,
    [recipeId],
  );

  if (result.rows.length === 0) {
    throw new Error("RECIPE_NOT_PENDING");
  }

  return result.rows[0];
};

export const getPendingRecipes = async () => {
  const result = await pool.query(`
    SELECT
      r.id,
      r.author_id,
      u.name AS author_name,
      r.cuisine_id,
      r.category_id,
      c.name AS cuisine_name,
      rc.name AS category_name,
      r.title,
      r.description,
      r.instructions,
      r.cooking_time,
      r.difficulty,
      r.created_at,
      r.status
    FROM recipes r
    JOIN users u
      ON r.author_id = u.id
    LEFT JOIN cuisines c
      ON r.cuisine_id = c.id
    JOIN recipe_categories rc
      ON r.category_id = rc.id
    WHERE r.status = 'pending'
    ORDER BY r.created_at ASC
  `);

  return result.rows;
};
