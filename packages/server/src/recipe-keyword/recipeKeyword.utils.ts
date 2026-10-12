
export const MAX_RECIPE_KEYWORDS = 10;
export const MAX_RECIPE_KEYWORD_LENGTH = 80;

export type RecipeKeywordLanguage = "en" | "ar";

export interface RecipeKeywordInput {
  keyword: string;
  language: RecipeKeywordLanguage;
}

export function normalizeRecipeSearchText(value: string): string {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[أإآٱ]/g, "ا")
    .replace(/[ىي]/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[٠-٩]/g, (digit) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)),
    )
    .replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)),
    )
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function validateRecipeKeywords(
  value: unknown,
): RecipeKeywordInput[] {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new Error("KEYWORDS_MUST_BE_ARRAY");
  }

  if (value.length > MAX_RECIPE_KEYWORDS) {
    throw new Error("TOO_MANY_KEYWORDS");
  }

  const seen = new Set<string>();
  const keywords: RecipeKeywordInput[] = [];

  for (const item of value) {
    if (
      !item ||
      typeof item !== "object" ||
      typeof item.keyword !== "string" ||
      !["en", "ar"].includes(item.language)
    ) {
      throw new Error("INVALID_KEYWORD");
    }

    const keyword = item.keyword.trim();

    if (
      !keyword ||
      keyword.length > MAX_RECIPE_KEYWORD_LENGTH
    ) {
      throw new Error("INVALID_KEYWORD_LENGTH");
    }

    const normalized = normalizeRecipeSearchText(keyword);

    if (!normalized) {
      throw new Error("INVALID_KEYWORD");
    }

    const duplicateKey = `${item.language}:${normalized}`;

    if (seen.has(duplicateKey)) {
      continue;
    }

    seen.add(duplicateKey);

    keywords.push({
      keyword,
      language: item.language,
    });
  }

  return keywords;
}
