import {
  ArrowRight,
  ArrowUpRight,
  ChefHat,
  Flame,
  RefreshCw,
  Search,
  Sparkles,
  Utensils,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getRecipeCategories,
  type RecipeCategory,
} from "../../api/recipes.api";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";
import {
  DEFAULT_RECIPE_FILTERS,
  persistRecipeFilters,
} from "../../utils/recipesFiltersStorage";
import { getRecipeCategoryName } from "../../utils/recipeCategoryTranslations";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&h=700&fit=crop";



function CategoriesSection() {
  const { language } = useLanguage();
  const t = translations[language].categories;
  const navigate = useNavigate();

  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const result = await getRecipeCategories();

      setCategories(
        result.filter(
          (category) =>
            typeof category.recipe_count === "number" &&
            category.recipe_count > 0,
        ),
      );
    } catch (error) {
      console.error("Unable to load Home page categories:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      void loadCategories();
    }, 0);

    return () => window.clearTimeout(timeoutID);
  }, [loadCategories]);

  const openCategory = (category: RecipeCategory) => {
    persistRecipeFilters({
      ...DEFAULT_RECIPE_FILTERS,
      categoryId: String(category.id),
      currentPage: 1,
    });

    navigate("/recipes");
  };

  const openCategoriesPage = () => {
    navigate("/categories");
  };

  const formatCount = (count: number) => {
    const formatted = new Intl.NumberFormat(
      language === "ar" ? "ar" : "en",
    ).format(count);

    const label =
      count === 1
        ? language === "ar"
          ? "وصفة"
          : "recipe"
        : language === "ar"
          ? "وصفات"
          : "recipes";

    return `${formatted} ${label}`;
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-orange-300/10 blur-3xl dark:bg-orange-500/5" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl dark:bg-amber-500/5" />
      </div>

      <div className="page-container relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:bg-orange-400/10 dark:text-orange-400">
              <Sparkles size={15} aria-hidden="true" />
              {t.badge.title}
              <span className="h-1 w-1 rounded-full bg-orange-400" />
              {t.badge.subtitle}
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl dark:text-white">
              {t.title.firstLine}
              <span className="mt-1 block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                {t.title.highlight}
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-lg leading-relaxed text-stone-600 dark:text-stone-300">
              {t.description}
            </p>
          </div>

          <button
            type="button"
            onClick={openCategoriesPage}
            className="inline-flex h-12 w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-stone-950"
          >
            {t.actions.exploreAll}
            <ArrowRight
              size={16}
              className="rtl:rotate-180"
              aria-hidden="true"
            />
          </button>
        </div>

        {isLoading && (
          <div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            aria-label={t.badge.title}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-3xl bg-stone-200 dark:bg-stone-800"
              />
            ))}
          </div>
        )}

        {!isLoading && hasError && (
          <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 text-center dark:border-stone-800 dark:bg-stone-900">
            <p className="text-stone-600 dark:text-stone-300">
              {t.description}
            </p>

            <button
              type="button"
              onClick={() => void loadCategories()}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              <RefreshCw size={16} aria-hidden="true" />
              {language === "ar" ? "حاول مرة أخرى" : "Try again"}
            </button>
          </div>
        )}

        {!isLoading && !hasError && categories.length > 0 && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => openCategory(category)}
                className="group relative min-h-64 overflow-hidden rounded-3xl text-start shadow-lg transition duration-500 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-stone-950"
              >
                <img
                  src={category.image_url || FALLBACK_IMAGE}
                  alt={getRecipeCategoryName(category, language)}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent transition group-hover:from-black/95" />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    <ChefHat size={14} aria-hidden="true" />
                    {formatCount(category.recipe_count ?? 0)}
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur transition group-hover:bg-white group-hover:text-orange-600">
                    <ArrowUpRight
                      size={20}
                      className="rtl:-scale-x-100"
                      aria-hidden="true"
                    />
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {getRecipeCategoryName(category, language)}
                  </h3>

                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition group-hover:text-white">
                    {t.actions.exploreAll}
                    <ArrowRight
                      size={15}
                      className="rtl:rotate-180"
                      aria-hidden="true"
                    />
                  </p>

                  <div className="mt-4 h-0.5 w-0 rounded-full bg-orange-400 transition-all duration-500 group-hover:w-full" />
                </div>
              </button>
            ))}
          </div>
        )}

        {!isLoading && !hasError && categories.length === 0 && (
          <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 text-center dark:border-stone-800 dark:bg-stone-900">
            <Utensils
              size={28}
              className="mx-auto text-orange-500"
              aria-hidden="true"
            />
            <p className="mt-3 text-stone-600 dark:text-stone-300">
              {language === "ar"
                ? "ستظهر التصنيفات هنا عند توفر وصفات منشورة."
                : "Categories will appear here when published recipes are available."}
            </p>
            <button
              type="button"
              onClick={openCategoriesPage}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400"
            >
              <Search size={16} aria-hidden="true" />
              {t.actions.exploreAll}
            </button>
          </div>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-stone-100/70 p-6 dark:bg-stone-900/50 sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
              <Flame size={21} aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-stone-900 dark:text-white">
                {language === "ar"
                  ? "اكتشف المزيد من الوصفات"
                  : "There's always something delicious to discover"}
              </p>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                {language === "ar"
                  ? "استكشف جميع التصنيفات المتاحة."
                  : "Explore every available recipe category."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openCategoriesPage}
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-700 dark:hover:text-orange-400"
          >
            {t.actions.exploreAll}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;