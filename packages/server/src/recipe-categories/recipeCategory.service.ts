import pool from "../config/database.js";

export const getAllRecipeCategories = async () => {
  const result = await pool.query(`
    SELECT
      id,
      name,
      slug,
      created_at
    FROM recipe_categories
    ORDER BY name ASC
  `);

  return result.rows;
};

export const getRecipeCategoryById = async (categoryId: number) => {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        slug,
        created_at
      FROM recipe_categories
      WHERE id = $1
    `,
    [categoryId],
  );

  return result.rows[0] ?? null;
};