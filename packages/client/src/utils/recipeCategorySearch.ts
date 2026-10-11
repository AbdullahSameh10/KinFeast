import { recipeCategoryKeywords as enKeywords } from "../i18n/en/recipeCategoryKeywords";
import { recipeCategoryKeywords as arKeywords } from "../i18n/ar/recipeCategoryKeywords";
import { normalizeSearchText } from "./normalizeSearchText";

export type RecipeCategorySearchLanguage = "en" | "ar";

export type SearchableRecipeCategory = {
  name: string;
  slug: string;
};

type SearchRecipeCategoryOptions = {
  category: SearchableRecipeCategory;
  displayName: string;
  query: string;
  language: RecipeCategorySearchLanguage;
};

/**
 * Searches a category's original name, translated display name,
 * slug, and hidden English/Arabic keywords.
 */
export function matchesRecipeCategorySearch({
  category,
  displayName,
  query,
  language,
}: SearchRecipeCategoryOptions): boolean {
  const normalizedQuery = normalizeSearchText(query);

  // An empty search should never hide a category.
  if (!normalizedQuery) {
    return true;
  }

  const slug = category.slug.trim().toLowerCase();

  const languageKeywords =
    language === "ar" ? arKeywords : enKeywords;

  const englishKeywords = enKeywords[slug] ?? [];
  const arabicKeywords = arKeywords[slug] ?? [];
  const selectedLanguageKeywords = languageKeywords[slug] ?? [];

  const searchableValues = [
    category.name,
    displayName,
    category.slug.replace(/-/g, " "),
    ...englishKeywords,
    ...arabicKeywords,
    ...selectedLanguageKeywords,
  ];

  return searchableValues.some((value) =>
    normalizeSearchText(value).includes(normalizedQuery),
  );
}
