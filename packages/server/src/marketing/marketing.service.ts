import pool from "../config/database.js";
import type { MarketingAttributionInput } from "./marketing.types.js";
export const getActiveMarketingSources = async () => {
  const result = await pool.query(`
    SELECT
      id,
      source_key,
      is_active,
      sort_order
    FROM marketing_sources
    WHERE is_active = TRUE
    ORDER BY sort_order ASC, id ASC
  `);
  return result.rows;
};
export const createMarketingAttribution = async (
  input: MarketingAttributionInput,
  client = pool,
) => {
  const result = await client.query(
    `
      INSERT INTO marketing_attributions (
        user_id,
        source_id,
        other_details
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        user_id,
        source_id,
        other_details,
        created_at
    `,
    [
      input.userId,
      input.sourceId,
      input.otherDetails?.trim() || null,
    ],
  );
  return result.rows[0];
};
export const getMarketingSourceById = async (
  sourceId: string,
  client = pool,
) => {
  const result = await client.query(
    `
      SELECT
        id,
        source_key,
        is_active,
        sort_order
      FROM marketing_sources
      WHERE id = $1
    `,
    [sourceId],
  );
  return result.rows[0] ?? null;
};
