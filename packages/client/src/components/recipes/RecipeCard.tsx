import { ArrowUpRight, Heart, Utensils } from "lucide-react";
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

/** Difficulty is shown as a 3-step meter instead of a traffic-light badge. */
const DIFFICULTY_LEVEL: Record<Recipe["difficulty"], number> = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

/**
 * Static Tailwind class strings per difficulty step.
 * Tailwind scans source code for complete class names, so dynamic
 * interpolation like `bg-[${color}]` will NOT work. Full classes must
 * appear as literal strings.
 */
const DIFFICULTY_METER_COLORS: Record<number, string> = {
  1: "bg-emerald-700 dark:bg-emerald-400",
  2: "bg-orange-400 dark:bg-orange-600",
  3: "bg-red-600 dark:bg-red-600",
};

function RecipeCard({ recipe }: RecipeCardProps) {
  const { language } = useLanguage();
  const { user } = useAuth();

  const t = translations[language].recipes;

  const [imageFailed, setImageFailed] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const level = DIFFICULTY_LEVEL[recipe.difficulty] ?? 1;

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
    <article className="group relative flex h-full flex-col rounded-[1.75rem] bg-white p-2 ring-1 ring-stone-900/10 transition-all duration-300 focus-within:ring-2 focus-within:ring-emerald-600 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_24px_48px_-24px_rgba(28,25,23,0.45)] motion-reduce:transition-none dark:bg-stone-900 dark:ring-white/10 dark:focus-within:ring-emerald-400">
      {/* Photo "plate": the image sits inside the card frame with its own radius */}
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] bg-emerald-50 dark:bg-stone-800">
        {recipe.recipe_image && !imageFailed ? (
          <img
            src={recipe.recipe_image}
            alt={recipe.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle,rgba(4,120,87,0.16)_1px,transparent_1.5px)] [background-size:14px_14px] dark:bg-[radial-gradient(circle,rgba(110,231,183,0.16)_1px,transparent_1.5px)]"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-900/10 dark:bg-stone-900 dark:text-emerald-300 dark:ring-white/10">
              <Utensils size={28} strokeWidth={1.5} />
            </span>
          </div>
        )}

        {/* Legibility for the chips */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />

        {/* Category */}
        {recipe.category_name && (
          <span className="absolute bottom-3 start-3 inline-block max-w-[65%] truncate rounded-full bg-stone-950/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {recipe.category_name}
          </span>
        )}

        {/* Open indicator: only appears when the card is hovered or focused */}
        <span
          aria-hidden="true"
          className="absolute bottom-3 end-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white text-stone-900 opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
        >
          <ArrowUpRight size={18} className="rtl:-scale-x-100" />
        </span>

        {/* Favorite */}
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
            className={`absolute end-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-90 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none ${
              isFavorited
                ? "bg-white text-rose-500"
                : "bg-stone-950/40 text-white hover:bg-stone-950/60"
            }`}
          >
            <Heart
              size={18}
              strokeWidth={2.2}
              className={isFavorited ? "fill-current" : ""}
            />
          </button>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col px-4 pb-3 pt-5">
        <h2 className="line-clamp-2 font-serif text-[1.35rem] font-semibold leading-[1.25] tracking-tight text-stone-900 dark:text-stone-50">
          <Link
            to={`/recipes/${recipe.id}`}
            className="focus:outline-none"
            aria-label={`${t.accessibility.openRecipe}: ${recipe.title}`}
          >
            {recipe.title}
            {/* Stretched link: the whole card is clickable */}
            <span className="absolute inset-0 z-0" aria-hidden="true" />
          </Link>
        </h2>

        <p className="mt-1.5 truncate text-sm text-stone-500 dark:text-stone-400">
          {t.card.by}{" "}
          <span className="font-medium text-stone-800 dark:text-stone-200">
            {recipe.author_name}
          </span>
        </p>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-stone-600 dark:text-stone-400">
          {recipe.description || t.card.noDescription}
        </p>

        {/* Nutrition-label style facts: heavy rule on top, hairlines between */}
        <dl className="mt-5 grid grid-cols-[auto_auto_1fr] border-t-[3px] border-stone-900 pt-3 dark:border-stone-100">
          {/* Time */}
          <div className="pe-4">
            <dd className="flex items-baseline gap-1 font-serif text-3xl font-semibold tabular-nums leading-none text-stone-900 dark:text-stone-50">
              {recipe.cooking_time !== null ? recipe.cooking_time : "–"}
              {recipe.cooking_time !== null && (
                <span className="font-sans text-xs font-medium text-stone-500 dark:text-stone-400">
                  {t.card.minutes}
                </span>
              )}
            </dd>
          </div>

          {/* Difficulty meter */}
          <div className="flex flex-col justify-center gap-1.5 border-s border-stone-200 px-4 dark:border-stone-700">
            <dd
              className="flex items-center gap-1"
              role="img"
              aria-label={t.difficulty[recipe.difficulty]}
            >
              {[1, 2, 3].map((step) => (
                <span
                  key={step}
                  aria-hidden="true"
                  className={`h-1.5 w-4 rounded-full transition-colors duration-300 ${
                    step <= level
                      ? DIFFICULTY_METER_COLORS[level]
                      : "bg-stone-200 dark:bg-stone-700"
                  }`}
                />
              ))}
            </dd>
            <dd className="text-xs font-medium text-stone-600 dark:text-stone-300">
              {t.difficulty[recipe.difficulty]}
            </dd>
          </div>

          {/* Cuisine */}
          <div className="flex min-w-0 items-center justify-end border-s border-stone-200 ps-4 dark:border-stone-700">
            {recipe.cuisine_name && (
              <dd className="truncate text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                {recipe.cuisine_name}
              </dd>
            )}
          </div>
        </dl>
      </div>
    </article>
  );
}

export default RecipeCard;
