import pool from "../config/database.js";

export interface PublicChefsQuery {
  search?: string;
  page?: number;
  limit?: number;
}

export const getPublicChefs = async ({
  search = "",
  page = 1,
  limit = 12,
}: PublicChefsQuery) => {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 50);
  const offset = (safePage - 1) * safeLimit;

  const values: unknown[] = [];

  const conditions: string[] = ["u.role = 'chef'"];

  if (search.trim()) {
    values.push(`%${search.trim()}%`);

    conditions.push(
      `u.name ILIKE $${values.length}`,
    );
  }

  const whereClause = `WHERE ${conditions.join(" AND ")}`;

  const countResult = await pool.query(
    `
      SELECT COUNT(*)::int AS count
      FROM users u
      ${whereClause}
    `,
    values,
  );

  const total = countResult.rows[0]?.count ?? 0;

  const chefsValues = [
    ...values,
    safeLimit,
    offset,
  ];

  const chefsResult = await pool.query(
    `
      SELECT
        u.id,
        u.username,
        u.name,
        u.bio,
        u.profile_image,
        u.created_at,

        COALESCE(
          recipe_stats.recipe_count,
          0
        )::int AS recipe_count,

        COALESCE(
          recipe_stats.published_count,
          0
        )::int AS published_count,

        COALESCE(
          follower_stats.follower_count,
          0
        )::int AS follower_count

      FROM users u

      LEFT JOIN (
        SELECT
          author_id,
          COUNT(*) AS recipe_count,

          COUNT(*) FILTER (
            WHERE status = 'published'
          ) AS published_count

        FROM recipes

        GROUP BY author_id
      ) recipe_stats
        ON recipe_stats.author_id = u.id

      LEFT JOIN (
        SELECT
          following_id,
          COUNT(*) AS follower_count

        FROM follows

        GROUP BY following_id
      ) follower_stats
        ON follower_stats.following_id = u.id

      ${whereClause}

      ORDER BY
        COALESCE(
          recipe_stats.published_count,
          0
        ) DESC,

        COALESCE(
          follower_stats.follower_count,
          0
        ) DESC,

        u.created_at DESC

      LIMIT $${chefsValues.length - 1}
      OFFSET $${chefsValues.length}
    `,
    chefsValues,
  );

  return {
    chefs: chefsResult.rows,

    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(
        total / safeLimit,
      ),
    },
  };
};

export const getChefByUsername = async (username: string) => {
  const chefResult = await pool.query(
    `
      SELECT
        u.id,
        u.username,
        u.name,
        u.bio,
        u.profile_image,
        u.created_at,
        u.title,
        u.location,
        u.specialties,
        u.experience_years,
        u.certifications,
        u.achievements,
        u.philosophy,
        u.website,
        u.instagram,
        u.contact_email,
        u.available_for_work,

        COALESCE(recipe_stats.recipe_count, 0)::int
          AS recipe_count,

        COALESCE(follower_stats.follower_count, 0)::int
          AS follower_count

      FROM users u

      LEFT JOIN (
        SELECT
          author_id,
          COUNT(*) FILTER (
            WHERE status = 'published'
          ) AS recipe_count
        FROM recipes
        GROUP BY author_id
      ) recipe_stats
        ON recipe_stats.author_id = u.id

      LEFT JOIN (
        SELECT
          following_id,
          COUNT(*) AS follower_count
        FROM follows
        GROUP BY following_id
      ) follower_stats
        ON follower_stats.following_id = u.id

      WHERE LOWER(u.username) = LOWER($1)
        AND u.role = 'chef'
      LIMIT 1
    `,
    [username],
  );

  if (chefResult.rows.length === 0) {
    return null;
  }

  const chef = chefResult.rows[0];

  const recipesResult = await pool.query(
    `
      SELECT
        r.id,
        r.author_id,
        u.name AS author_name,
        r.title,
        r.slug,
        r.description,
        r.cooking_time,
        r.difficulty,
        r.recipe_image,
        r.created_at,
        r.status,
        r.category_id,
        rc.name AS category_name,
        r.cuisine_id,
        c.name AS cuisine_name

      FROM recipes r

      INNER JOIN users u
        ON u.id = r.author_id

      LEFT JOIN recipe_categories rc
        ON rc.id = r.category_id

      LEFT JOIN cuisines c
        ON c.id = r.cuisine_id

      WHERE r.author_id = $1
        AND r.status = 'published'

      ORDER BY r.created_at DESC
    `,
    [chef.id],
  );

  return {
    ...chef,
    recipes: recipesResult.rows,
  };
};
