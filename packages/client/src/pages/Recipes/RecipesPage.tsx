import { Flame, SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCuisines,
  getRecipeCategories,
  getRecipes,
  type Cuisine,
  type Recipe,
  type RecipeCategory,
} from "../../api/recipes.api";
import RecipeCard from "../../components/recipes/RecipeCard";
import RecipeCardSkeleton from "../../components/recipes/RecipeCardSkeleton";
import RecipeEmptyState from "../../components/recipes/RecipeEmptyState";
import RecipeErrorState from "../../components/recipes/RecipeErrorState";
import RecipeFiltersSidebar from "../../components/recipes/RecipeFiltersSidebar";
import Pagination from "../../components/ui/Pagination.tsx";
import RecipeResultsHeader from "../../components/recipes/RecipeResultsHeader";
import RecipeSearchBar from "../../components/recipes/RecipeSearchBar";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";
import {
  clearRecipeFilters,
  getInitialRecipeFilters,
  persistRecipeFilters,
} from "./../../utils/recipesFiltersStorage";
import type {
  Difficulty,
  RecipeFiltersState,
} from "./../../types/recipes.types.ts";

const RECIPES_PER_PAGE = 12;

function RecipesPage() {
  useDocumentTitle("Recipes");

  const { language } = useLanguage();
  const t = translations[language].recipes;

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(
    () => getInitialRecipeFilters().currentPage,
  );
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);

  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);

  const [search, setSearch] = useState(() => getInitialRecipeFilters().search);
  const [categoryId, setCategoryId] = useState(
    () => getInitialRecipeFilters().categoryId,
  );
  const [cuisineId, setCuisineId] = useState(
    () => getInitialRecipeFilters().cuisineId,
  );
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>(
    () => getInitialRecipeFilters().difficulty,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const recipesSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    const filters: RecipeFiltersState = {
      search,
      categoryId,
      cuisineId,
      difficulty,
      currentPage,
    };

    persistRecipeFilters(filters);
  }, [search, categoryId, cuisineId, difficulty, currentPage]);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const [recipesData, categoriesData, cuisinesData] = await Promise.all([
        getRecipes({
          page: currentPage,
          limit: RECIPES_PER_PAGE,
          search,
          categoryId,
          cuisineId,
          difficulty,
        }),
        getRecipeCategories(),
        getCuisines(),
      ]);

      setRecipes(recipesData.recipes);
      setTotalPages(recipesData.pagination.totalPages);
      setTotalRecipes(recipesData.pagination.total);
      setCategories(categoriesData);
      setCuisines(cuisinesData);
    } catch (requestError) {
      console.error("Recipes page loading error:", requestError);

      setError(
        requestError instanceof Error
          ? requestError.message
          : t.error.description,
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    currentPage,
    search,
    categoryId,
    cuisineId,
    difficulty,
    t.error.description,
  ]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadData]);

  const hasActiveFilters =
    search.trim() !== "" ||
    categoryId !== "" ||
    cuisineId !== "" ||
    difficulty !== undefined;

  const resetFilters = () => {
    setSearch("");
    setCategoryId("");
    setCuisineId("");
    setDifficulty(undefined);
    setCurrentPage(1);
    clearRecipeFilters();
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setCurrentPage(1);
  };

  const handleCuisineChange = (value: string) => {
    setCuisineId(value);
    setCurrentPage(1);
  };

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value as Difficulty | undefined);
    setCurrentPage(1);
  };

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: String(category.id),
        label: category.name,
      })),
    [categories],
  );

  const cuisineOptions = useMemo(
    () =>
      cuisines.map((cuisine) => ({
        value: String(cuisine.id),
        label: cuisine.name,
      })),
    [cuisines],
  );

  const difficultyOptions = useMemo(
    () => [
      { value: "Easy", label: t.difficulty.Easy },
      { value: "Medium", label: t.difficulty.Medium },
      { value: "Hard", label: t.difficulty.Hard },
    ],
    [t.difficulty],
  );

  const resultCountLabel = isLoading
    ? t.loading.title
    : `${totalRecipes} ${
        totalRecipes === 1 ? t.results.recipe : t.results.recipes
      }`;

  const resultCountLabelWithFound = isLoading
    ? t.loading.title
    : `${totalRecipes} ${
        totalRecipes === 1 ? t.results.recipe : t.results.recipes
      } ${t.results.found}`;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    window.requestAnimationFrame(() => {
      recipesSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-orange-50/30 to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200/70 dark:border-stone-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(245,158,11,0.10),transparent_25%)]" />

        <div className="page-container relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-orange-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
              {t.badge}
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-400 sm:text-lg">
              {t.description}
            </p>
          </div>

          <RecipeSearchBar
            value={search}
            onChange={handleSearchChange}
            label={t.search.label}
            placeholder={t.search.placeholder}
            clearLabel={t.accessibility.clearSearch}
          />
        </div>
      </section>

      {/* Main */}
<main className="page-container py-10 sm:py-12 lg:py-16">
  {/* Trending discovery */}
  <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-orange-200/80 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 p-5 shadow-sm dark:border-orange-900/50 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-orange-950/30 sm:p-6">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-sm">
          <Flame size={21} />
        </div>

        <div>
          <p className="text-sm font-bold text-orange-700 dark:text-orange-300">
            {t.discovery.badge}
          </p>

          <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-400">
            {t.discovery.description}
          </p>
        </div>
      </div>

      <Link
        to="/trending"
        className="inline-flex shrink-0 items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-stone-950"
      >
        <Flame size={16} className="me-2" />
        {t.discovery.action}
      </Link>
    </div>
  </div>
        {/* Mobile filters button */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
            {resultCountLabel}
          </p>

          <button
            type="button"
            onClick={() => setMobileFiltersOpen((current) => !current)}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-orange-300 hover:text-orange-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
          >
            <SlidersHorizontal size={17} />
            {t.filters.title}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[270px_minmax(0,1fr)]">
          <RecipeFiltersSidebar
            mobileOpen={mobileFiltersOpen}
            hasActiveFilters={hasActiveFilters}
            title={t.filters.title}
            resetLabel={t.filters.reset}
            categoryLabel={t.filters.category}
            categoryValue={categoryId}
            categoryPlaceholder={t.filters.allCategories}
            categoryOptions={categoryOptions}
            onCategoryChange={handleCategoryChange}
            cuisineLabel={t.filters.cuisine}
            cuisineValue={cuisineId}
            cuisinePlaceholder={t.filters.allCuisines}
            cuisineOptions={cuisineOptions}
            onCuisineChange={handleCuisineChange}
            difficultyLabel={t.filters.difficulty}
            difficultyValue={difficulty ?? ""}
            difficultyPlaceholder={t.filters.allDifficulties}
            difficultyOptions={difficultyOptions}
            onDifficultyChange={handleDifficultyChange}
            onReset={resetFilters}
          />

          {/* Results */}
          <section ref={recipesSectionRef} className="min-w-0">
            <RecipeResultsHeader
              label={resultCountLabelWithFound}
              hasActiveFilters={hasActiveFilters}
              isLoading={isLoading}
              resetLabel={t.filters.reset}
              onReset={resetFilters}
            />

            {error && !isLoading && (
              <RecipeErrorState
                title={t.error.title}
                message={error}
                retryLabel={t.error.retry}
                onRetry={() => void loadData()}
              />
            )}

            {isLoading && (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <RecipeCardSkeleton key={index} />
                ))}
              </div>
            )}

            {!isLoading && !error && recipes.length > 0 && (
              <>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  previousLabel={t.pagination.previous}
                  nextLabel={t.pagination.next}
                />
              </>
            )}

            {!isLoading && !error && recipes.length === 0 && (
              <RecipeEmptyState
                title={t.results.noResultsTitle}
                description={t.results.noResultsDescription}
                clearLabel={t.results.clearFilters}
                showClearButton={hasActiveFilters}
                onClear={resetFilters}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default RecipesPage;
