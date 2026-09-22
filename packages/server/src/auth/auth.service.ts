import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/database.js";
import type { RegisterInput, LoginInput } from "./auth.types.js";
export const registerUser = async (input: RegisterInput) => {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password;
  const role = input.role ?? "user";
  const marketingSourceId = input.marketingSourceId.trim();
  const marketingOtherDetails =
    input.marketingOtherDetails?.trim() || null;
  if (!marketingSourceId) {
    throw new Error("MARKETING_SOURCE_INVALID");
  }
  if (marketingOtherDetails && marketingOtherDetails.length > 255) {
    throw new Error("MARKETING_OTHER_DETAILS_TOO_LONG");
  }
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const marketingSourceResult = await client.query(
      `
        SELECT
          id,
          source_key,
          is_active
        FROM marketing_sources
        WHERE id = $1
        FOR SHARE
      `,
      [marketingSourceId],
    );
    if (marketingSourceResult.rows.length === 0) {
      throw new Error("MARKETING_SOURCE_INVALID");
    }
    const marketingSource = marketingSourceResult.rows[0];
    if (!marketingSource.is_active) {
      throw new Error("MARKETING_SOURCE_INVALID");
    }
    if (
      marketingSource.source_key === "other" &&
      !marketingOtherDetails
    ) {
      throw new Error("MARKETING_OTHER_DETAILS_REQUIRED");
    }
    const existingUser = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );
    if (existingUser.rows.length > 0) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const userResult = await client.query(
      `
        INSERT INTO users (
          name,
          email,
          password_hash,
          role
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
          id,
          name,
          email,
          role,
          bio,
          profile_image,
          created_at
      `,
      [name, email, passwordHash, role],
    );
    const user = userResult.rows[0];
    await client.query(
      `
        INSERT INTO marketing_attributions (
          user_id,
          source_id,
          other_details
        )
        VALUES ($1, $2, $3)
      `,
      [user.id, marketingSource.id, marketingOtherDetails],
    );
    await client.query("COMMIT");
    return user;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
export const loginUser = async (input: LoginInput) => {
  const email = input.email.trim().toLowerCase();
  const password = input.password;
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        email,
        password_hash,
        role,
        bio,
        profile_image,
        created_at
      FROM users
      WHERE email = $1
    `,
    [email],
  );
  if (result.rows.length === 0) {
    throw new Error("INVALID_CREDENTIALS");
  }
  const user = result.rows[0];
  const passwordMatches = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatches) {
    throw new Error("INVALID_CREDENTIALS");
  }
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET_MISSING");
  }
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    jwtSecret,
    {
      expiresIn: "7d",
    },
  );
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      profile_image: user.profile_image,
      created_at: user.created_at,
    },
  };
};
export const getUserById = async (userId: string) => {
  const result = await pool.query(
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
      WHERE id = $1
    `,
    [userId],
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};
