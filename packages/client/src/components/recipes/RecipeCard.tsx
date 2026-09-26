import { ArrowUpRight, ChefHat, Clock3, Utensils, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Recipe } from "../../api/recipes.api";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

import {
  addFavorite,
  getFavoriteStatus,
  removeFavorite,
} from "../../api/favorites.api";
import { useAuth } from "../../hooks/useAuth";

interface RecipeCardProps {
  recipe: Recipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  const { language } = useLanguage();
  const { user } = useAuth();

  const t = translations[language].recipes;

  const [imageFailed, setImageFailed] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const difficultyClass = {
    Easy: "bg-emerald-50/95 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950/70 dark:text-emerald-300 dark:ring-emerald-400/20",
    Medium:
      "bg-amber-50/95 text-amber-700 ring-amber-600/20 dark:bg-amber-950/70 dark:text-amber-300 dark:ring-amber-400/20",
    Hard: "bg-rose-50/95 text-rose-700 ring-rose-600/20 dark:bg-rose-950/70 dark:text-rose-300 dark:ring-rose-400/20",
  }[recipe.difficulty];

  useEffect(() => {
    let cancelled = false;

    const loadFavoriteStatus = async () => {
      if (!user) {
        setIsFavorited(false);
        return;
      }

      try {
        const favorited = await getFavoriteStatus(recipe.id);
        if (!cancelled) setIsFavorited(favorited);
      } catch {
        if (!cancelled) setIsFavorited(false);
      }
    };

    void loadFavoriteStatus();

    return () => {
      cancelled = true;
    };
  }, [recipe.id, user]);

  const handleFavoriteToggle = async () => {
    if (!user || isFavoriteLoading) return;

    const previousValue = isFavorited;
    setIsFavorited(!previousValue);
    setIsFavoriteLoading(true);

    try {
      if (previousValue) {
        await removeFavorite(recipe.id);
      } else {
        await addFavorite(recipe.id);
      }
    } catch {
      setIsFavorited(previousValue);
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:ring-orange-100/60 focus-within:ring-2 focus-within:ring-orange-400 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-900/60 dark:hover:ring-orange-900/20">
      {/* Visual header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-orange-100 via-amber-50 to-stone-100 dark:from-orange-950/50 dark:via-stone-900 dark:to-stone-950">
        {recipe.recipe_image && !imageFailed ? (
          <img
            src={recipe.recipe_image}
            alt={recipe.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.22),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.18),transparent_35%)]" />
            <div className="relative flex h-full items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/60 backdrop-blur-sm dark:bg-stone-950/40">
                <Utensils
                  size={38}
                  strokeWidth={1.5}
                  className="text-orange-400 transition-transform duration-500 group-hover:scale-110 dark:text-orange-600"
                />
              </div>
            </div>
          </>
        )}

        {/* Top gradient for legibility */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 via-black/5 to-transparent" />

        {/* Difficulty badge */}
        <span
          className={`absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset backdrop-blur-md ${difficultyClass}`}
        >
          {t.difficulty[recipe.difficulty]}
        </span>

        {/* Favorite button */}
        {user && (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void handleFavoriteToggle();
            }}
            disabled={isFavoriteLoading}
            aria-label={isFavorited ? t.card.unfavorite : t.card.favorite}
            aria-pressed={isFavorited}
            title={isFavorited ? t.card.unfavorite : t.card.favorite}
            className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-stone-900 ${
              isFavorited
                ? "border-orange-200 bg-white text-orange-500 dark:border-orange-900/60 dark:bg-stone-950 dark:text-orange-400"
                : "border-white/60 bg-white/90 text-stone-600 hover:scale-105 hover:text-orange-500 dark:border-stone-700 dark:bg-stone-950/85 dark:text-stone-300 dark:hover:text-orange-400"
            }`}
          >
            <Heart
              size={18}
              strokeWidth={2.2}
              className={isFavorited ? "fill-current" : ""}
            />
          </button>
        )}

        {/* Category chip pinned to bottom of image */}
        {recipe.category_name && (
          <span className="absolute bottom-3 left-4 inline-flex max-w-[70%] truncate rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium tracking-wide text-stone-700 shadow-sm backdrop-blur-md dark:bg-stone-950/80 dark:text-stone-200">
            {recipe.category_name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="line-clamp-2 text-lg font-bold leading-7 tracking-tight text-stone-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
              <Link
                to={`/recipes/${recipe.id}`}
                className="focus:outline-none"
                aria-label={`${t.accessibility.openRecipe}: ${recipe.title}`}
              >
                {recipe.title}
                {/* Stretch link so the whole card is clickable */}
                <span className="absolute inset-0 z-0" aria-hidden="true" />
              </Link>
            </h2>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400">
              <ChefHat size={15} className="shrink-0" />
              <span className="truncate">
                {t.card.by}{" "}
                <span className="font-medium text-stone-700 dark:text-stone-300">
                  {recipe.author_name}
                </span>
              </span>
            </div>
          </div>

          <ArrowUpRight
            size={19}
            aria-hidden="true"
            className="mt-1 shrink-0 text-stone-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-500 rtl:rotate-[-90deg]"
          />
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-stone-500 dark:text-stone-400">
          {recipe.description || t.card.noDescription}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-stone-100 pt-4 dark:border-stone-800">
          {recipe.cooking_time !== null && (
            <div className="flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400">
              <Clock3 size={15} className="shrink-0" />
              <span>
                {recipe.cooking_time} {t.card.minutes}
              </span>
            </div>
          )}

          {recipe.cuisine_name && (
            <div className="flex items-center gap-1.5 text-sm font-medium text-orange-600 dark:text-orange-400">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-orange-400 dark:bg-orange-500"
              />
              <span className="max-w-full truncate">{recipe.cuisine_name}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          to={`/recipes/${recipe.id}`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative z-10 mt-5 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-500 focus:outline-none dark:bg-white dark:text-stone-900 dark:hover:bg-orange-400 dark:hover:text-white"
        >
          {t.card.viewRecipe}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-[-90deg]"
          />
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;