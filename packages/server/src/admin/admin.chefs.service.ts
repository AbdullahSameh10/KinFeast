import pool from "../config/database.js";

export interface AdminChefsQuery {
  search?: string;
  page?: number;
  limit?: number;
}

export const getAdminChefs = async ({
  search = "",
  page = 1,
  limit = 12,
}: AdminChefsQuery) => {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 50);
  const offset = (safePage - 1) * safeLimit;

  const values: unknown[] = [];
  const conditions: string[] = ["u.role = 'chef'"];

  if (search.trim()) {
    values.push(`%${search.trim()}%`);

    conditions.push(`
      (
        u.name ILIKE $${values.length}
        OR u.email ILIKE $${values.length}
      )
    `);
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

  const total = countResult.rows[0].count;

  const chefsValues = [...values, safeLimit, offset];

  const chefsResult = await pool.query(
    `
      SELECT
        u.id,
        u.name,
        u.email,
        u.bio,
        u.profile_image,
        u.created_at,

        COALESCE(recipe_stats.recipe_count, 0)::int AS recipe_count,
        COALESCE(recipe_stats.published_count, 0)::int AS published_count,
        COALESCE(recipe_stats.pending_count, 0)::int AS pending_count,
        COALESCE(recipe_stats.rejected_count, 0)::int AS rejected_count,

        COALESCE(follower_stats.follower_count, 0)::int AS follower_count

      FROM users u

      LEFT JOIN (
        SELECT
          author_id,
          COUNT(*) AS recipe_count,

          COUNT(*) FILTER (
            WHERE status = 'published'
          ) AS published_count,

          COUNT(*) FILTER (
            WHERE status = 'pending'
          ) AS pending_count,

          COUNT(*) FILTER (
            WHERE status = 'rejected'
          ) AS rejected_count

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

      ORDER BY u.created_at DESC

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
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};