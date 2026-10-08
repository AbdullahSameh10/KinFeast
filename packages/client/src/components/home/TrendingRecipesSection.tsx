import { ArrowRight, Eye, Heart, RefreshCw, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import {
  getTrendingRecipes,
  type TrendingRecipe,
} from "../../api/recipes.api";
import RecipeCard from "../recipes/RecipeCard";
import RecipeCardSkeleton from "../recipes/RecipeCardSkeleton";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

const TRENDING_HOME_LIMIT = 3;

function TrendingRecipesSection() {
  const { language } = useLanguage();
  const t = translations[language].trendingRecipes;

  const [recipes, setRecipes] = useState<TrendingRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTrendingRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getTrendingRecipes(TRENDING_HOME_LIMIT);

      setRecipes(data);
    } catch (requestError) {
      console.error("Home trending recipes loading error:", requestError);

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

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <section className="page-container py-20 sm:py-24">
      {/* Section Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            {t.badge}
          </span>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-white">
            {t.title}
          </h2>

          <p className="mt-3 text-base leading-7 text-stone-500 dark:text-stone-400">
            {t.description}
          </p>
        </div>

        <Link
          to="/trending"
          className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-orange-500 transition-colors hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
        >
          {t.actions.exploreTrending}

          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: TRENDING_HOME_LIMIT }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="mt-10 flex flex-col items-center justify-center rounded-[2rem] border border-red-200 bg-white px-6 py-12 text-center shadow-sm dark:border-red-900/50 dark:bg-stone-900">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400">
            <RefreshCw size={24} />
          </div>

          <h3 className="mt-5 text-xl font-bold text-stone-900 dark:text-white">
            {t.error.title}
          </h3>

          <p className="mt-2 max-w-lg text-sm leading-7 text-stone-600 dark:text-stone-400">
            {t.error.description}
          </p>

          <button
            type="button"
            onClick={() => void loadTrendingRecipes()}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            <RefreshCw size={16} />
            {t.actions.retry}
          </button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !error && recipes.length === 0 && (
        <div className="mt-10 flex flex-col items-center justify-center rounded-[2rem] border border-stone-200 bg-white px-6 py-12 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 dark:bg-orange-950/30 dark:text-orange-400">
            <Star size={25} />
          </div>

          <h3 className="mt-5 text-xl font-bold text-stone-900 dark:text-white">
            {t.empty.title}
          </h3>

          <p className="mt-2 max-w-lg text-sm leading-7 text-stone-600 dark:text-stone-400">
            {t.empty.description}
          </p>
        </div>
      )}

      {/* Real Trending Recipes */}
      {!isLoading && !error && recipes.length > 0 && (
        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, index) => (
            <div key={recipe.id} className="relative">
              {/* Ranking */}
              <div className="absolute -top-3 start-4 z-20 flex items-center gap-1.5 rounded-full bg-stone-950 px-3 py-1.5 text-xs font-bold text-white shadow-lg dark:bg-white dark:text-stone-950">
                <Star
                  size={12}
                  className="fill-orange-400 text-orange-400"
                />

                #{index + 1}
              </div>

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
                  <Star size={13} className="fill-current" />

                  {recipe.average_rating > 0
                    ? Number(recipe.average_rating).toFixed(1)
                    : "—"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TrendingRecipesSection;