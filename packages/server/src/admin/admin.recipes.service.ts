import pool from "../config/database.js";

export interface AdminRecipesQuery {
  search?: string;
  status?: string;
  category?: string;
  cuisine?: string;
  page?: number;
  limit?: number;
}

export const getAdminRecipes = async ({
  search = "",
  status = "",
  category = "",
  cuisine = "",
  page = 1,
  limit = 12,
}: AdminRecipesQuery) => {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 50);
  const offset = (safePage - 1) * safeLimit;

  const values: unknown[] = [];
  const conditions: string[] = [];

  if (search.trim()) {
    values.push(`%${search.trim()}%`);

    conditions.push(`
      (
        r.title ILIKE $${values.length}
        OR u.name ILIKE $${values.length}
        OR u.email ILIKE $${values.length}
      )
    `);
  }

  if (
    status &&
    ["pending", "published", "rejected"].includes(status)
  ) {
    values.push(status);
    conditions.push(`r.status = $${values.length}`);
  }

  if (category) {
    values.push(category);
    conditions.push(`rc.slug = $${values.length}`);
  }

  if (cuisine) {
    values.push(Number(cuisine));
    conditions.push(`c.id = $${values.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const countResult = await pool.query(
    `
      SELECT COUNT(*)::int AS count
      FROM recipes r
      INNER JOIN users u
        ON u.id = r.author_id
      INNER JOIN recipe_categories rc
        ON rc.id = r.category_id
      LEFT JOIN cuisines c
        ON c.id = r.cuisine_id
      ${whereClause}
    `,
    values,
  );

  const total = countResult.rows[0].count;

  const recipeValues = [...values, safeLimit, offset];

  const recipesResult = await pool.query(
    `
      SELECT
        r.id,
        r.title,
        r.description,
        r.status,
        r.difficulty,
        r.cooking_time,
        r.recipe_image,
        r.created_at,

        u.id AS author_id,
        u.name AS author_name,
        u.email AS author_email,
        u.profile_image AS author_profile_image,

        rc.id AS category_id,
        rc.name AS category_name,
        rc.slug AS category_slug,

        c.id AS cuisine_id,
        c.name AS cuisine_name

      FROM recipes r

      INNER JOIN users u
        ON u.id = r.author_id

      INNER JOIN recipe_categories rc
        ON rc.id = r.category_id

      LEFT JOIN cuisines c
        ON c.id = r.cuisine_id

      ${whereClause}

      ORDER BY r.created_at DESC

      LIMIT $${recipeValues.length - 1}
      OFFSET $${recipeValues.length}
    `,
    recipeValues,
  );

  return {
    recipes: recipesResult.rows,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};

export const getAdminRecipeFilters = async () => {
  const [categoriesResult, cuisinesResult] =
    await Promise.all([
      pool.query(`
        SELECT
          id,
          name,
          slug
        FROM recipe_categories
        ORDER BY name ASC
      `),

      pool.query(`
        SELECT
          id,
          name
        FROM cuisines
        ORDER BY name ASC
      `),
    ]);

  return {
    categories: categoriesResult.rows,
    cuisines: cuisinesResult.rows,
  };
};
export interface AdminModerationQuery {
  search?: string;
  page?: number;
  limit?: number;
}

export const getAdminModerationQueue = async ({
  search = "",
  page = 1,
  limit = 12,
}: AdminModerationQuery) => {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 50);
  const offset = (safePage - 1) * safeLimit;

  const values: unknown[] = [];
  const conditions: string[] = ["r.status = 'pending'"];

  if (search.trim()) {
    values.push(`%${search.trim()}%`);

    conditions.push(`(
      r.title ILIKE $${values.length}
      OR u.name ILIKE $${values.length}
      OR u.email ILIKE $${values.length}
    )`);
  }

  const whereClause = `WHERE ${conditions.join(" AND ")}`;

  const countResult = await pool.query(
    `
      SELECT COUNT(*)::int AS count
      FROM recipes r
      INNER JOIN users u ON u.id = r.author_id
      INNER JOIN recipe_categories rc ON rc.id = r.category_id
      LEFT JOIN cuisines c ON c.id = r.cuisine_id
      ${whereClause}
    `,
    values,
  );

  const total = countResult.rows[0].count;
  const recipeValues = [...values, safeLimit, offset];

  const recipesResult = await pool.query(
    `
      SELECT
        r.id,
        r.title,
        r.description,
        r.status,
        r.difficulty,
        r.cooking_time,
        r.recipe_image,
        r.created_at,

        u.id AS author_id,
        u.name AS author_name,
        u.email AS author_email,
        u.profile_image AS author_profile_image,

        rc.id AS category_id,
        rc.name AS category_name,

        c.id AS cuisine_id,
        c.name AS cuisine_name

      FROM recipes r

      INNER JOIN users u
        ON u.id = r.author_id

      INNER JOIN recipe_categories rc
        ON rc.id = r.category_id

      LEFT JOIN cuisines c
        ON c.id = r.cuisine_id

      ${whereClause}

      ORDER BY r.created_at ASC

      LIMIT $${recipeValues.length - 1}
      OFFSET $${recipeValues.length}
    `,
    recipeValues,
  );

  return {
    recipes: recipesResult.rows,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};
