import type { PoolClient } from "pg";
import {
  normalizeRecipeSearchText,
  type RecipeKeywordInput,
} from "./recipeKeyword.utils.js";

export async function replaceRecipeKeywords(
  client: PoolClient,
  recipeId: number | string,
  keywords: RecipeKeywordInput[],
): Promise<void> {
  await client.query("DELETE FROM recipe_keywords WHERE recipe_id = $1", [
    recipeId,
  ]);

  for (const item of keywords) {
    await client.query(
      `
        INSERT INTO recipe_keywords (
          recipe_id,
          keyword,
          language,
          normalized_keyword
        )
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (
          recipe_id,
          language,
          LOWER(TRIM(keyword))
        )
        DO UPDATE SET
          normalized_keyword = EXCLUDED.normalized_keyword
      `,
      [
        recipeId,
        item.keyword,
        item.language,
        normalizeRecipeSearchText(item.keyword),
      ],
    );
  }
}

export async function getRecipeKeywords(recipeId: number | string) {
  const { default: pool } = await import("../config/database.js");

  const result = await pool.query(
    `
      SELECT id, keyword, language
      FROM recipe_keywords
      WHERE recipe_id = $1
      ORDER BY language, keyword
    `,
    [recipeId],
  );

  return result.rows;
}
