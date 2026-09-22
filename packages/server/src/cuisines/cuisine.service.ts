import pool from "../config/database.js";
import type {
  CreateCuisineInput,
  UpdateCuisineInput,
} from "./cuisine.types.js";
export const getAllCuisines = async () => {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        created_at
      FROM cuisines
      ORDER BY name ASC
    `,
  );
  return result.rows;
};
export const getCuisineById = async (cuisineId: string) => {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        created_at
      FROM cuisines
      WHERE id = $1
    `,
    [cuisineId],
  );
  return result.rows[0] ?? null;
};
export const getCuisineByName = async (name: string) => {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        created_at
      FROM cuisines
      WHERE LOWER(name) = LOWER($1)
    `,
    [name],
  );
  return result.rows[0] ?? null;
};
export const createCuisine = async (input: CreateCuisineInput) => {
  const result = await pool.query(
    `
      INSERT INTO cuisines (
        name
      )
      VALUES ($1)
      RETURNING
        id,
        name,
        created_at
    `,
    [input.name],
  );
  return result.rows[0];
};
export const updateCuisine = async (
  cuisineId: string,
  input: UpdateCuisineInput,
) => {
  const result = await pool.query(
    `
      UPDATE cuisines
      SET name = $1
      WHERE id = $2
      RETURNING
        id,
        name,
        created_at
    `,
    [input.name, cuisineId],
  );
  return result.rows[0] ?? null;
};
export const deleteCuisine = async (cuisineId: string) => {
  const result = await pool.query(
    `
      DELETE FROM cuisines
      WHERE id = $1
      RETURNING
        id,
        name,
        created_at
    `,
    [cuisineId],
  );
  return result.rows[0] ?? null;
};
