import pool from "../config/database.js";
import type { CreateReviewInput, UpdateReviewInput } from "./review.types.js";

export const getPublishedRecipeForReview = async (recipeId: string) => {
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

export const createReview = async (
  userId: string,
  recipeId: string,
  input: CreateReviewInput,
) => {
  const result = await pool.query(
    `
      INSERT INTO recipe_reviews (
        user_id,
        recipe_id,
        rating,
        comment
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        user_id,
        recipe_id,
        rating,
        comment,
        created_at,
        updated_at
    `,
    [userId, recipeId, input.rating, input.comment ?? null],
  );

  return result.rows[0];
};

export const getReviewsForRecipe = async (recipeId: string) => {
  const result = await pool.query(
    `
      SELECT
        rr.id,
        rr.user_id,
        u.name AS user_name,
        rr.recipe_id,
        rr.rating,
        rr.comment,
        rr.created_at,
        rr.updated_at
      FROM recipe_reviews rr
      JOIN users u
        ON rr.user_id = u.id
      WHERE rr.recipe_id = $1
      ORDER BY rr.created_at DESC
    `,
    [recipeId],
  );

  return result.rows;
};

export const getReviewById = async (reviewId: string) => {
  const result = await pool.query(
    `
      SELECT
        id,
        user_id,
        recipe_id,
        rating,
        comment,
        created_at,
        updated_at
      FROM recipe_reviews
      WHERE id = $1
    `,
    [reviewId],
  );

  return result.rows[0] ?? null;
};

export const updateReview = async (
  reviewId: string,
  input: UpdateReviewInput,
) => {
  const result = await pool.query(
    `
      UPDATE recipe_reviews
      SET
        rating = COALESCE($1, rating),
        comment = COALESCE($2, comment),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING
        id,
        user_id,
        recipe_id,
        rating,
        comment,
        created_at,
        updated_at
    `,
    [input.rating, input.comment, reviewId],
  );

  return result.rows[0] ?? null;
};

export const deleteReview = async (reviewId: string) => {
  const result = await pool.query(
    `
      DELETE FROM recipe_reviews
      WHERE id = $1
      RETURNING
        id,
        user_id,
        recipe_id,
        rating,
        comment,
        created_at,
        updated_at
    `,
    [reviewId],
  );

  return result.rows[0] ?? null;
};

export const getReviewByUserAndRecipe = async (
  userId: string,
  recipeId: string,
) => {
  const result = await pool.query(
    `
      SELECT
        id,
        user_id,
        recipe_id,
        rating,
        comment,
        created_at,
        updated_at
      FROM recipe_reviews
      WHERE user_id = $1
        AND recipe_id = $2
    `,
    [userId, recipeId],
  );

  return result.rows[0] ?? null;
};