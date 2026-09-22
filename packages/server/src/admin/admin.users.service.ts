import pool from "../config/database.js";

export interface AdminUsersQuery {
  search?: string;
  role?: "user" | "chef" | "admin";
  page?: number;
  limit?: number;
}

export const getAdminUsers = async ({
  search = "",
  role,
  page = 1,
  limit = 12,
}: AdminUsersQuery) => {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 50);
  const offset = (safePage - 1) * safeLimit;

  const values: unknown[] = [];
  const conditions: string[] = [];

  if (search.trim()) {
    values.push(`%${search.trim()}%`);
    conditions.push(`
      (
        name ILIKE $${values.length}
        OR email ILIKE $${values.length}
      )
    `);
  }

  if (role) {
    values.push(role);
    conditions.push(`role = $${values.length}`);
  }

  const whereClause =
    conditions.length > 0
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

  const countResult = await pool.query(
    `
      SELECT COUNT(*)::int AS count
      FROM users
      ${whereClause}
    `,
    values,
  );

  const total = countResult.rows[0].count;

  const usersValues = [...values, safeLimit, offset];

  const usersResult = await pool.query(
    `
      SELECT
        id,
        name,
        email,
        role,
        bio,
        profile_image,
        created_at
      FROM users
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${usersValues.length - 1}
      OFFSET $${usersValues.length}
    `,
    usersValues,
  );

  return {
    users: usersResult.rows,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};