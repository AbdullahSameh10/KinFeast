import {
  ArrowRight,
  ChefHat,
  RefreshCw,
  Search,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRecipeCategories, type RecipeCategory } from "./../api/recipes.api";
import { useDocumentTitle } from "./../hooks/useDocumentTitle";
import { useLanguage } from "./../hooks/useLanguage";
import { translations } from "./../i18n";
import {
  DEFAULT_RECIPE_FILTERS,
  persistRecipeFilters,
} from "./../utils/recipesFiltersStorage";
import Pagination from "../components/ui/Pagination";
import { getRecipeCategoryName } from "../utils/recipeCategoryTranslations";
import { matchesRecipeCategorySearch } from "../utils/recipeCategorySearch";

const FALLBACK_CATEGORY_IMAGE =
  "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&h=700&fit=crop";

function CategoryCardSkeleton() {
  return (
    <div className="flex min-h-36 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="aspect-square w-32 shrink-0 animate-pulse bg-stone-200 dark:bg-stone-800 sm:w-36" />

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 p-4">
        <div className="h-5 w-3/4 animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800" />
        <div className="h-4 w-1/2 animate-pulse rounded-lg bg-stone-100 dark:bg-stone-800/70" />
        <div className="h-6 w-24 animate-pulse rounded-full bg-stone-100 dark:bg-stone-800/70" />
      </div>
    </div>
  );
}

const CATEGORIES_PER_PAGE = 12;

function CategoriesPage() {
  useDocumentTitle("Categories");

  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language].categoriesPage;

  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const categoriesSectionRef = useRef<HTMLElement>(null);

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(language === "ar" ? "ar" : "en"),
    [language],
  );

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setError(false);

    try {
      const data = await getRecipeCategories();
      setCategories(data);
    } catch (requestError) {
      console.error("Categories page loading error:", requestError);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      void loadCategories();
    }, 0);

    return () => window.clearTimeout(timeoutID);
  }, [loadCategories]);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      matchesRecipeCategorySearch({
        category,
        displayName: getRecipeCategoryName(category, language),
        query: search,
        language,
      }),
    );
  }, [categories, search, language]);

  const totalPages = Math.ceil(filteredCategories.length / CATEGORIES_PER_PAGE);

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * CATEGORIES_PER_PAGE;

    return filteredCategories.slice(
      startIndex,
      startIndex + CATEGORIES_PER_PAGE,
    );
  }, [filteredCategories, currentPage]);

  useEffect(() => {
    let timeoutID: number | undefined;
    let timeoutID2: number | undefined;

    if (totalPages === 0) {
      if (currentPage !== 1) {
        timeoutID = window.setTimeout(() => {
          setCurrentPage(1);
        }, 0);
      }
    } else if (currentPage > totalPages) {
      timeoutID2 = window.setTimeout(() => {
        setCurrentPage(totalPages);
      }, 0);
    }

    return () => {
      if (timeoutID !== undefined) window.clearTimeout(timeoutID);
      if (timeoutID2 !== undefined) window.clearTimeout(timeoutID2);
    };
  }, [currentPage, totalPages]);

  const openCategory = (category: RecipeCategory) => {
    persistRecipeFilters({
      ...DEFAULT_RECIPE_FILTERS,
      categoryId: String(category.id),
      currentPage: 1,
    });

    navigate("/recipes");
  };

  const openAllRecipes = () => {
    persistRecipeFilters(DEFAULT_RECIPE_FILTERS);
    navigate("/recipes");
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);

    categoriesSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const formatRecipeCount = (count: number | undefined) => {
    const safeCount =
      typeof count === "number" && Number.isFinite(count) ? count : 0;

    const label = safeCount === 1 ? t.results.recipe : t.results.recipes;

    return `${numberFormatter.format(safeCount)} ${label}`;
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-stone-200/70 bg-gradient-to-br from-orange-50 via-amber-50 to-stone-50 dark:border-stone-800 dark:from-orange-950/30 dark:via-stone-950 dark:to-stone-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-orange-300/25 blur-3xl dark:bg-orange-500/10" />
          <div className="absolute -bottom-32 -left-12 h-80 w-80 rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-500/10" />
        </div>

        <div className="page-container py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/75 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm backdrop-blur dark:border-orange-900/60 dark:bg-stone-900/70 dark:text-orange-300">
              <Sparkles size={16} aria-hidden="true" />
              <span>{t.badge}</span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg">
              {t.description}
            </p>

            <div className="mx-auto mt-8 max-w-xl">
              <label htmlFor="category-search" className="sr-only">
                {t.search.label}
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-2.5 shadow-lg shadow-stone-900/5 transition focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-900 dark:shadow-black/10 dark:focus-within:border-orange-600">
                <Search
                  size={21}
                  className="ms-2 shrink-0 text-stone-400"
                  aria-hidden="true"
                />

                <input
                  id="category-search"
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={t.search.placeholder}
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-stone-900 outline-none placeholder:text-stone-400 dark:text-white"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label={t.results.clearSearch}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-white"
                  >
                    <X size={17} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <main
        ref={categoriesSectionRef}
        className="page-container py-12 sm:py-16 lg:py-20"
      >
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              {t.results.all}
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {isLoading
                ? t.loading.title
                : numberFormatter.format(filteredCategories.length) +
                  " " +
                  t.results.count}
            </h2>
          </div>

          {!isLoading && !error && categories.length > 0 && (
            <button
              type="button"
              onClick={openAllRecipes}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
            >
              <Utensils size={16} aria-hidden="true" />
              {t.bottomCta.action}
            </button>
          )}
        </div>

        {isLoading && (
          <>
            <p className="mb-6 text-sm text-stone-500 dark:text-stone-400">
              {t.loading.description}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <CategoryCardSkeleton key={index} />
              ))}
            </div>
          </>
        )}

        {!isLoading && error && (
          <div className="rounded-3xl border border-red-200 bg-white px-6 py-12 text-center dark:border-red-900/50 dark:bg-stone-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <RefreshCw size={25} aria-hidden="true" />
            </div>

            <h3 className="mt-5 text-xl font-bold">{t.error.title}</h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-stone-500 dark:text-stone-400">
              {t.error.description}
            </p>

            <button
              type="button"
              onClick={() => void loadCategories()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-stone-950"
            >
              <RefreshCw size={16} aria-hidden="true" />
              {t.error.retry}
            </button>
          </div>
        )}

        {!isLoading && !error && filteredCategories.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {paginatedCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => openCategory(category)}
                  className="group flex min-h-36 w-full items-stretch overflow-hidden rounded-2xl border border-stone-200/80 bg-white text-start shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-950/5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-800 dark:focus:ring-offset-stone-950"
                >
                  <div className="relative aspect-square w-32 shrink-0 overflow-hidden bg-stone-200 dark:bg-stone-800 sm:w-36">
                    <img
                      src={category.image_url || FALLBACK_CATEGORY_IMAGE}
                      alt={`${getRecipeCategoryName(category, language)} — ${t.card.imageAlt}`}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = FALLBACK_CATEGORY_IMAGE;
                      }}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
                    <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-950/40 dark:text-orange-300">
                      <ChefHat size={13} aria-hidden="true" />
                      {formatRecipeCount(category.recipe_count)}
                    </span>

                    <h3 className="line-clamp-2 text-base font-bold text-stone-900 transition group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 sm:text-lg">
                      {getRecipeCategoryName(category, language)}
                    </h3>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="text-sm text-stone-500 dark:text-stone-400">
                        {t.card.explore}
                      </span>

                      <ArrowRight
                        size={18}
                        className="shrink-0 text-stone-400 transition group-hover:translate-x-1 group-hover:text-orange-500 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              previousLabel="Previous page"
              nextLabel="Next page"
            />
          </>
        )}

        {!isLoading && !error && filteredCategories.length === 0 && (
          <div className="rounded-3xl border border-stone-200 bg-white px-6 py-14 text-center dark:border-stone-800 dark:bg-stone-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              <Search size={25} aria-hidden="true" />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              {categories.length === 0
                ? t.empty.title
                : t.results.noResultsTitle}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-stone-500 dark:text-stone-400">
              {categories.length === 0
                ? t.empty.description
                : t.results.noResultsDescription}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold transition hover:border-orange-300 hover:text-orange-600 dark:border-stone-700 dark:hover:border-orange-800 dark:hover:text-orange-400"
              >
                {t.results.clearSearch}
              </button>
            )}

            {categories.length === 0 && (
              <button
                type="button"
                onClick={openAllRecipes}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                {t.empty.browseRecipes}
                <ArrowRight size={16} className="rtl:rotate-180" />
              </button>
            )}
          </div>
        )}

        {/* Bottom call to action */}
        <section className="mt-14 overflow-hidden rounded-3xl border border-orange-200/70 bg-gradient-to-r from-orange-50 to-amber-50 p-6 dark:border-orange-900/40 dark:from-orange-950/30 dark:to-amber-950/20 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-sm">
                <Utensils size={22} aria-hidden="true" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                  {t.bottomCta.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-400">
                  {t.bottomCta.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openAllRecipes}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-stone-950"
            >
              {t.bottomCta.action}
              <ArrowRight
                size={16}
                className="rtl:rotate-180"
                aria-hidden="true"
              />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CategoriesPage;
