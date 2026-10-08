import pool from "../config/database.js";
import {
  slugifyRecipeTitle,
} from "./recipe.utils.js";
import type {
  CreateRecipeInput,
  PublishedRecipesQuery,
  TrendingRecipesQuery,
  UpdateRecipeInput,
} from "./recipe.types.js";

export const createRecipe = async (
  authorId: string,
  input: CreateRecipeInput,
) => {
  const baseSlug = slugifyRecipeTitle(input.title);

  const existingSlugs = await pool.query<{ slug: string }>(
    `
      SELECT slug
      FROM recipes
      WHERE slug = $1
         OR slug LIKE $2
    `,
    [baseSlug, `${baseSlug}-%`],
  );

  const usedSlugs = new Set(
    existingSlugs.rows.map((row) => row.slug),
  );

  let slug = baseSlug;
  let suffix = 2;

  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const result = await pool.query(
    `
      INSERT INTO recipes (
        author_id,
        cuisine_id,
        category_id,
        title,
        slug,
        description,
        instructions,
        cooking_time,
        difficulty,
        recipe_image
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING
        id,
        author_id,
        cuisine_id,
        category_id,
        title,
        slug,
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
      slug,
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
        recipe_image,
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

export const getPublishedRecipes = async ({
  page,
  limit,
  search,
  categoryId,
  cuisineId,
  difficulty,
}: PublishedRecipesQuery) => {
  const offset = (page - 1) * limit;

  const values: Array<string | number> = [];
  const conditions = [`r.status = 'published'`];

  const addValue = (value: string | number) => {
    values.push(value);
    return `$${values.length}`;
  };

  if (search) {
    const searchParam = addValue(`%${search}%`);

    conditions.push(`
      (
        r.title ILIKE ${searchParam}
        OR r.description ILIKE ${searchParam}
        OR u.name ILIKE ${searchParam}
        OR c.name ILIKE ${searchParam}
        OR rc.name ILIKE ${searchParam}
      )
    `);
  }

  if (categoryId !== undefined) {
    const categoryParam = addValue(categoryId);
    conditions.push(`r.category_id = ${categoryParam}`);
  }

  if (cuisineId !== undefined) {
    const cuisineParam = addValue(cuisineId);
    conditions.push(`r.cuisine_id = ${cuisineParam}`);
  }

  if (difficulty !== undefined) {
    const difficultyParam = addValue(difficulty);
    conditions.push(`r.difficulty = ${difficultyParam}`);
  }

  const whereClause = conditions.join("\nAND ");

  const countResult = await pool.query(
    `
      SELECT COUNT(*)::integer AS total
      FROM recipes r
      JOIN users u
        ON r.author_id = u.id
      LEFT JOIN cuisines c
        ON r.cuisine_id = c.id
      JOIN recipe_categories rc
        ON r.category_id = rc.id
      WHERE ${whereClause}
    `,
    values,
  );

  const total = countResult.rows[0]?.total ?? 0;

  const dataValues = [...values];

  const limitParam = `$${dataValues.length + 1}`;
  const offsetParam = `$${dataValues.length + 2}`;

  dataValues.push(limit, offset);

  const result = await pool.query(
    `
      SELECT
        r.id,
        r.author_id,
        u.name AS author_name,
        r.slug,
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
      WHERE ${whereClause}
      ORDER BY r.created_at DESC, r.id DESC
      LIMIT ${limitParam}
      OFFSET ${offsetParam}
    `,
    dataValues,
  );

  return {
    recipes: result.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getTrendingRecipes = async ({
  limit,
}: TrendingRecipesQuery) => {
  const safeLimit = Math.min(Math.max(limit, 1), 24);

  const result = await pool.query(
    `
      WITH view_stats AS (
        SELECT
          recipe_id,
          COUNT(*)::integer AS view_count
        FROM recipe_views
        WHERE viewed_at >= NOW() - INTERVAL '30 days'
        GROUP BY recipe_id
      ),

      like_stats AS (
        SELECT
          recipe_id,
          COUNT(*)::integer AS like_count
        FROM recipe_likes
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY recipe_id
      ),

      favorite_stats AS (
        SELECT
          recipe_id,
          COUNT(*)::integer AS favorite_count
        FROM favorites
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY recipe_id
      ),

      review_stats AS (
        SELECT
          recipe_id,
          COUNT(*)::integer AS review_count,
          ROUND(AVG(rating)::numeric, 1) AS average_rating
        FROM recipe_reviews
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY recipe_id
      )

      SELECT
        r.id,
        r.author_id,
        u.name AS author_name,
        r.slug,
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
        r.status,

        COALESCE(v.view_count, 0) AS view_count,
        COALESCE(l.like_count, 0) AS like_count,
        COALESCE(f.favorite_count, 0) AS favorite_count,
        COALESCE(rv.review_count, 0) AS review_count,
        COALESCE(rv.average_rating, 0) AS average_rating,

        (
          COALESCE(v.view_count, 0) * 1
          + COALESCE(l.like_count, 0) * 3
          + COALESCE(f.favorite_count, 0) * 2
          + COALESCE(rv.review_count, 0) * 4
          + COALESCE(rv.average_rating, 0) * 5
          + GREATEST(
              0,
              30 - EXTRACT(
                DAY FROM (NOW() - r.created_at)
              )
            ) * 0.5
        ) AS trending_score

      FROM recipes r

      JOIN users u
        ON r.author_id = u.id

      LEFT JOIN cuisines c
        ON r.cuisine_id = c.id

      JOIN recipe_categories rc
        ON r.category_id = rc.id

      LEFT JOIN view_stats v
        ON v.recipe_id = r.id

      LEFT JOIN like_stats l
        ON l.recipe_id = r.id

      LEFT JOIN favorite_stats f
        ON f.recipe_id = r.id

      LEFT JOIN review_stats rv
        ON rv.recipe_id = r.id

      WHERE r.status = 'published'

      ORDER BY
        trending_score DESC,
        r.created_at DESC,
        r.id DESC

      LIMIT $1
    `,
    [safeLimit],
  );

  return result.rows;
};

export const getPublishedRecipeBySlug = async ( slug: string ) => {
  const result = await pool.query(
    `
      SELECT
        r.id,
        r.author_id,
        u.name AS author_name,
        r.slug,
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
      WHERE r.slug = $1
        AND r.status = 'published'
    `,
    [slug],
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
