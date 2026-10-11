import pool from "../config/database.js";

export const getAllRecipeCategories = async () => {
  const result = await pool.query(`     
    SELECT
      rc.id,
      rc.name,
      rc.slug,
      rc.image_url,
      rc.created_at,
      COUNT(r.id)::INTEGER AS recipe_count
    FROM recipe_categories rc
    LEFT JOIN recipes r
      ON r.category_id = rc.id
      AND r.status = 'published'
    GROUP BY
      rc.id,
      rc.name,
      rc.slug,
      rc.image_url,
      rc.created_at
      
    ORDER BY rc.name ASC
  `);

  return result.rows;
};

export const getAdminRecipeCategories = async () => {
  const result = await pool.query(`     
    SELECT
      rc.id,
      rc.name,
      rc.slug,
      rc.image_url,
      rc.created_at,
      COUNT(r.id)::INTEGER AS recipe_count
    FROM recipe_categories rc
    LEFT JOIN recipes r
      ON r.category_id = rc.id
      AND r.status = 'published'
    GROUP BY
      rc.id,
      rc.name,
      rc.slug,
      rc.image_url,
      rc.created_at
    ORDER BY rc.name ASC
  `);

  return result.rows;
};

export const getRecipeCategoryById = async (categoryId: number) => {
  const result = await pool.query(`       
    SELECT
        id,
        name,
        slug,
        image_url,
        created_at
      FROM recipe_categories
      WHERE id = $1
    `,
    [categoryId],
  );

  return result.rows[0] ?? null;
};

export const updateRecipeCategoryImage = async (
  categoryId: number,
  imageUrl: string,
) => {
  const result = await pool.query(`       
    UPDATE recipe_categories
      SET image_url = $1
      WHERE id = $2
      RETURNING
        id,
        name,
        slug,
        image_url,
        created_at
    `,
    [imageUrl, categoryId],
  );

  return result.rows[0] ?? null;
};
