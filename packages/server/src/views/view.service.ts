import pool from "../config/database.js";
export const getRecipeForView = async (recipeId: string) => {
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
export const recordRecipeView = async (
  userId: string,
  recipeId: string,
) => {
  const result = await pool.query(
    `
      INSERT INTO recipe_views (
        recipe_id,
        user_id
      )
      VALUES ($1, $2)
      ON CONFLICT (user_id, recipe_id)
      DO NOTHING
      RETURNING
        id,
        recipe_id,
        user_id,
        viewed_at
    `,
    [recipeId, userId],
  );
  return result.rows[0] ?? null;
};
export const getRecipeViewCount = async (recipeId: string) => {
  const result = await pool.query(
    `
      SELECT COUNT(*)::int AS view_count
      FROM recipe_views
      WHERE recipe_id = $1
    `,
    [recipeId],
  );
  return result.rows[0]?.view_count ?? 0;
};
