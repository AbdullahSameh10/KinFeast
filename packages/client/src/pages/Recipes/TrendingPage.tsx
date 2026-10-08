import {
  ArrowRight,
  Eye,
  Heart,
  RefreshCw,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import {
  getTrendingRecipes,
  type TrendingRecipe,
} from "../../api/recipes.api";
import RecipeCard from "../../components/recipes/RecipeCard";
import RecipeCardSkeleton from "../../components/recipes/RecipeCardSkeleton";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

const TRENDING_LIMIT = 12;

function TrendingPage() {
  const { language } = useLanguage();
  const t = translations[language].trendingRecipes;

  useDocumentTitle("Trending Recipes");

  const [recipes, setRecipes] = useState<TrendingRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTrendingRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getTrendingRecipes(TRENDING_LIMIT);

      setRecipes(data);
    } catch (requestError) {
      console.error("Trending page loading error:", requestError);

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
        void loadTrendingRecipes();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadTrendingRecipes]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-orange-50/20 to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200/70 dark:border-stone-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(249,115,22,0.14),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(245,158,11,0.12),transparent_25%)]" />

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

            <Link
              to="/recipes"
              className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-100 dark:focus:ring-white dark:focus:ring-offset-stone-950"
            >
              {t.actions.exploreRecipes}

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <main className="page-container py-10 sm:py-12 lg:py-16">
        {/* Loading */}
        {isLoading && (
          <section aria-label={t.loading.title}>
            <div className="mb-8">
              <div className="h-4 w-48 animate-pulse rounded-full bg-stone-200 dark:bg-stone-800" />

              <div className="mt-3 h-3 w-72 max-w-full animate-pulse rounded-full bg-stone-200 dark:bg-stone-800" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <RecipeCardSkeleton key={index} />
              ))}
            </div>
          </section>
        )}

        {/* Error */}
        {!isLoading && error && (
          <section className="flex min-h-[420px] items-center justify-center">
            <div className="w-full max-w-xl rounded-[2rem] border border-red-200 bg-white p-8 text-center shadow-sm dark:border-red-900/50 dark:bg-stone-900 sm:p-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400">
                <RefreshCw size={24} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-stone-900 dark:text-white">
                {t.error.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-400">
                {t.error.description}
              </p>

              <button
                type="button"
                onClick={() => void loadTrendingRecipes()}
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                <RefreshCw size={16} />
                {t.actions.retry}
              </button>
            </div>
          </section>
        )}

        {/* Empty */}
        {!isLoading && !error && recipes.length === 0 && (
          <section className="flex min-h-[420px] items-center justify-center">
            <div className="w-full max-w-xl rounded-[2rem] border border-stone-200 bg-white p-8 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 dark:bg-orange-950/30 dark:text-orange-400">
                <Star size={25} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-stone-900 dark:text-white">
                {t.empty.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-400">
                {t.empty.description}
              </p>

              <Link
                to="/recipes"
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                {t.empty.exploreRecipes}

                <ArrowRight
                  size={16}
                  className="rtl:rotate-180"
                />
              </Link>
            </div>
          </section>
        )}

        {/* Results */}
        {!isLoading && !error && recipes.length > 0 && (
          <section>
            {/* Intro */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-orange-500">
                  {recipes.length} {t.title}
                </p>

                <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                  {t.loading.description}
                </p>
              </div>

              <Link
                to="/recipes"
                className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-orange-500 transition-colors hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
              >
                {t.actions.exploreRecipes}

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                />
              </Link>
            </div>

            {/* Cards */}
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recipes.map((recipe, index) => (
                <div key={recipe.id} className="relative">
                  {/* Ranking */}
                  {index < 3 && (
                    <div className="absolute -top-3 start-4 z-20 flex items-center gap-1.5 rounded-full bg-stone-950 px-3 py-1.5 text-xs font-bold text-white shadow-lg dark:bg-white dark:text-stone-950">
                      <Star
                        size={12}
                        className="fill-orange-400 text-orange-400"
                      />

                      #{index + 1}
                    </div>
                  )}

                  <RecipeCard recipe={recipe} />

                  {/* Engagement */}
                  <div className="pointer-events-none absolute bottom-5 start-5 end-5 z-10 flex items-center gap-3 rounded-xl bg-white/90 px-3 py-2 text-[11px] font-medium text-stone-600 shadow-sm backdrop-blur-md dark:bg-stone-950/90 dark:text-stone-300">
                    <span className="flex items-center gap-1">
                      <Eye size={13} />
                      {formatNumber(recipe.view_count)}
                    </span>

                    <span className="flex items-center gap-1">
                      <Heart size={13} />
                      {formatNumber(recipe.like_count)}
                    </span>

                    <span className="ms-auto flex items-center gap-1 text-orange-600 dark:text-orange-400">
                      <Star
                        size={13}
                        className="fill-current"
                      />
                      {recipe.average_rating > 0
                        ? Number(recipe.average_rating).toFixed(1)
                        : "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default TrendingPage;