import pool from "../config/database.js";

export const followChef = async (followerId: string, followingId: string) => {
  if (followerId === followingId) {
    throw new Error("CANNOT_FOLLOW_SELF");
  }

  const chefResult = await pool.query(
    `
      SELECT
        id,
        role
      FROM users
      WHERE id = $1
    `,
    [followingId],
  );

  if (chefResult.rows.length === 0) {
    throw new Error("USER_NOT_FOUND");
  }

  if (chefResult.rows[0].role !== "chef") {
    throw new Error("TARGET_NOT_CHEF");
  }

  const result = await pool.query(
    `
      INSERT INTO follows (
        follower_id,
        following_id
      )
      VALUES ($1, $2)
      ON CONFLICT (follower_id, following_id)
      DO NOTHING
      RETURNING
        follower_id,
        following_id,
        created_at
    `,
    [followerId, followingId],
  );

  return result.rows[0] ?? null;
};

export const unfollowChef = async (followerId: string, followingId: string) => {
  const result = await pool.query(
    `
      DELETE FROM follows
      WHERE follower_id = $1
        AND following_id = $2
      RETURNING
        follower_id,
        following_id,
        created_at
    `,
    [followerId, followingId],
  );

  return result.rows[0] ?? null;
};

export const isFollowing = async (followerId: string, followingId: string) => {
  const result = await pool.query(
    `
      SELECT
        follower_id,
        following_id,
        created_at
      FROM follows
      WHERE follower_id = $1
        AND following_id = $2
    `,
    [followerId, followingId],
  );

  return result.rows[0] ?? null;
};
