import pool from "../config/database.js";

export const addFavorite = async (userId: string, recipeId: string) => {
  const result = await pool.query(
    `
      INSERT INTO favorites (
        user_id,
        recipe_id
      )
      VALUES ($1, $2)
      ON CONFLICT (user_id, recipe_id)
      DO NOTHING
      RETURNING
        user_id,
        recipe_id,
        created_at
    `,
    [userId, recipeId],
  );

  return result.rows[0] ?? null;
};

export const removeFavorite = async (userId: string, recipeId: string) => {
  const result = await pool.query(
    `
      DELETE FROM favorites
      WHERE user_id = $1
        AND recipe_id = $2
      RETURNING
        user_id,
        recipe_id,
        created_at
    `,
    [userId, recipeId],
  );

  return result.rows[0] ?? null;
};

export const isRecipeFavorited = async (userId: string, recipeId: string) => {
  const result = await pool.query(
    `
      SELECT
        user_id,
        recipe_id,
        created_at
      FROM favorites
      WHERE user_id = $1
        AND recipe_id = $2
    `,
    [userId, recipeId],
  );

  return result.rows[0] ?? null;
};
