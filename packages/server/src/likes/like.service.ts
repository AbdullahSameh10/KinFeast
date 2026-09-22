import pool from "../config/database.js";

export const getPublishedRecipeForLike = async (recipeId: string) => {
  const result = await pool.query(
    `
      SELECT
        id,
        author_id,
        title,
        status
      FROM recipes
      WHERE id = $1
        AND status = 'published'
    `,
    [recipeId],
  );

  return result.rows[0] ?? null;
};

export const addLike = async (userId: string, recipeId: string) => {
  const result = await pool.query(
    `
      INSERT INTO recipe_likes (
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

export const removeLike = async (userId: string, recipeId: string) => {
  const result = await pool.query(
    `
      DELETE FROM recipe_likes
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

export const isRecipeLiked = async (userId: string, recipeId: string) => {
  const result = await pool.query(
    `
      SELECT
        user_id,
        recipe_id,
        created_at
      FROM recipe_likes
      WHERE user_id = $1
        AND recipe_id = $2
    `,
    [userId, recipeId],
  );

  return result.rows[0] ?? null;
};

export const getLikeCount = async (recipeId: string) => {
  const result = await pool.query(
    `
      SELECT COUNT(*)::int AS like_count
      FROM recipe_likes
      WHERE recipe_id = $1
    `,
    [recipeId],
  );

  return result.rows[0]?.like_count ?? 0;
};
