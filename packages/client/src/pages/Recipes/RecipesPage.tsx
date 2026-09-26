import {
  AlertCircle,
  Check,
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

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
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

type Difficulty = "Easy" | "Medium" | "Hard";

function RecipesPage() {
  const { language } = useLanguage();
  const t = translations[language].recipes;

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [cuisineId, setCuisineId] = useState("");
  const [difficulty, setDifficulty] = useState<"" | Difficulty>("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const [recipesData, categoriesData, cuisinesData] = await Promise.all([
        getRecipes(),
        getRecipeCategories(),
        getCuisines(),
      ]);

      setRecipes(recipesData);
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
  }, [t.error.description]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadData]);

  const filteredRecipes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return recipes.filter((recipe) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          recipe.title,
          recipe.description,
          recipe.author_name,
          recipe.cuisine_name,
          recipe.category_name,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalizedSearch));

      const matchesCategory =
        !categoryId || String(recipe.category_id) === categoryId;

      const matchesCuisine =
        !cuisineId || String(recipe.cuisine_id) === cuisineId;

      const matchesDifficulty =
        !difficulty || recipe.difficulty === difficulty;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCuisine &&
        matchesDifficulty
      );
    });
  }, [recipes, search, categoryId, cuisineId, difficulty]);

  const hasActiveFilters =
    search.trim() !== "" ||
    categoryId !== "" ||
    cuisineId !== "" ||
    difficulty !== "";

  const resetFilters = () => {
    setSearch("");
    setCategoryId("");
    setCuisineId("");
    setDifficulty("");
  };

  const resultCount = filteredRecipes.length;

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

            <h1 className="mt-5 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl lg:text-6xl dark:text-white">
              {t.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg dark:text-stone-400">
              {t.description}
            </p>
          </div>

          {/* Search */}
          <div className="mt-10 max-w-4xl">
            <label htmlFor="recipe-search" className="sr-only">
              {t.search.label}
            </label>

            <div className="relative">
              <Search
                size={20}
                aria-hidden="true"
                className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 rtl:left-auto rtl:right-5"
              />

              <input
                id="recipe-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.search.placeholder}
                className="h-16 w-full rounded-2xl border border-stone-200 bg-white/90 px-14 text-base text-stone-900 shadow-xl shadow-stone-900/5 outline-none backdrop-blur-xl transition-all placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-stone-800 dark:bg-stone-900/90 dark:text-white dark:placeholder:text-stone-500"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label={t.accessibility.clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200 rtl:right-auto rtl:left-4"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="page-container py-10 sm:py-12 lg:py-16">
        {/* Mobile filters button */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
            {isLoading
              ? t.loading.title
              : `${resultCount} ${
                  resultCount === 1 ? t.results.recipe : t.results.recipes
                }`}
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
          {/* Filters */}
          <aside
            className={`${
              mobileFiltersOpen ? "block" : "hidden"
            } lg:block`}
          >
            <div className="sticky top-24 rounded-3xl border border-stone-200/80 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-orange-500" />
                  <h2 className="font-bold text-stone-900 dark:text-white">
                    {t.filters.title}
                  </h2>
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400"
                  >
                    {t.filters.reset}
                  </button>
                )}
              </div>

              <div className="mt-6 space-y-6">
                {/* Category */}
                <FilterSelect
                  label={t.filters.category}
                  value={categoryId}
                  onChange={setCategoryId}
                  options={categories.map((category) => ({
                    value: String(category.id),
                    label: category.name,
                  }))}
                  placeholder={t.filters.allCategories}
                />

                {/* Cuisine */}
                <FilterSelect
                  label={t.filters.cuisine}
                  value={cuisineId}
                  onChange={setCuisineId}
                  options={cuisines.map((cuisine) => ({
                    value: String(cuisine.id),
                    label: cuisine.name,
                  }))}
                  placeholder={t.filters.allCuisines}
                />

                {/* Difficulty */}
                <FilterSelect
                  label={t.filters.difficulty}
                  value={difficulty}
                  onChange={(value) =>
                    setDifficulty(value as "" | Difficulty)
                  }
                  options={[
                    {
                      value: "Easy",
                      label: t.difficulty.Easy,
                    },
                    {
                      value: "Medium",
                      label: t.difficulty.Medium,
                    },
                    {
                      value: "Hard",
                      label: t.difficulty.Hard,
                    },
                  ]}
                  placeholder={t.filters.allDifficulties}
                />
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-7 hidden w-full items-center justify-center gap-2 rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:border-orange-300 hover:text-orange-600 dark:border-stone-800 dark:text-stone-300 dark:hover:border-orange-800 dark:hover:text-orange-400 lg:flex"
                >
                  <X size={15} />
                  {t.filters.reset}
                </button>
              )}
            </div>
          </aside>

          {/* Results */}
          <section className="min-w-0">
            <div className="mb-6 hidden items-center justify-between lg:flex">
              <div>
                <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
                  {isLoading
                    ? t.loading.title
                    : `${resultCount} ${
                        resultCount === 1
                          ? t.results.recipe
                          : t.results.recipes
                      } ${t.results.found}`}
                </p>
              </div>

              {hasActiveFilters && !isLoading && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-950/30"
                >
                  <X size={15} />
                  {t.filters.reset}
                </button>
              )}
            </div>

            {/* Error */}
            {error && !isLoading && (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 p-7 dark:border-rose-900/60 dark:bg-rose-950/20">
                <div className="flex flex-col items-start gap-5 sm:flex-row">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300">
                    <AlertCircle size={21} />
                  </div>

                  <div className="flex-1">
                    <h2 className="font-bold text-rose-900 dark:text-rose-200">
                      {t.error.title}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-rose-700 dark:text-rose-300">
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={() => void loadData()}
                      className="mt-4 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
                    >
                      {t.error.retry}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <RecipeCardSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Results */}
            {!isLoading && !error && filteredRecipes.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}

            {/* Empty */}
            {!isLoading && !error && filteredRecipes.length === 0 && (
              <div className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white/70 px-6 text-center dark:border-stone-700 dark:bg-stone-900/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400">
                  <Search size={27} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-stone-900 dark:text-white">
                  {t.results.noResultsTitle}
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-stone-500 dark:text-stone-400">
                  {t.results.noResultsDescription}
                </p>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    <Check size={16} />
                    {t.results.clearFilters}
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  placeholder: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

function FilterSelect({
  label,
  value,
  placeholder,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-200">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-3 pe-10 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200"
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 rtl:right-auto rtl:left-3"
        />
      </div>
    </div>
  );
}

export default RecipesPage;