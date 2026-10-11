import { recipeCategories as enRecipeCategories } from "../i18n/en/recipeCategories";
import { recipeCategories as arRecipeCategories } from "../i18n/ar/recipeCategories";

export type RecipeCategoryLanguage = "en" | "ar";

type CategoryNameInput = {
  name: string;
  slug?: string;
};

/**
 * Finds a category slug using its English database name.
 * This allows recipe cards to translate categories even when
 * the recipe API doesn't include category_slug.
 */
function findCategorySlugByName(name: string): string | undefined {
  const normalizedName = name.trim().toLocaleLowerCase();

  return Object.entries(enRecipeCategories).find(
    ([, englishName]) =>
      englishName.trim().toLocaleLowerCase() === normalizedName,
  )?.[0];
}

/**
 * Returns the category name in the selected language.
 * Uses the slug when available and falls back to matching
 * the English category name.
 */
export function getRecipeCategoryName(
  category: CategoryNameInput,
  language: RecipeCategoryLanguage,
): string {
  const slug =
    category.slug?.trim().toLowerCase() ||
    findCategorySlugByName(category.name);

  if (!slug) {
    return category.name;
  }

  if (language === "ar") {
    return (
      arRecipeCategories[slug as keyof typeof arRecipeCategories] ??
      category.name
    );
  }

  return (
    enRecipeCategories[slug as keyof typeof enRecipeCategories] ??
    category.name
  );
}
