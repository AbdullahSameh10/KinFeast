import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock3,
  Eye,
  Heart,
  LoaderCircle,
  MessageCircle,
  Play,
  Share2,
  Star,
  Utensils,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  addFavorite,
  getFavoriteStatus,
  removeFavorite,
} from "../../api/favorites.api";

import {
  addRecipeLike,
  createRecipeReview,
  getRecipeById,
  getRecipeIngredients,
  getRecipeLikeCount,
  getRecipeLikeStatus,
  getRecipeMedia,
  getRecipeReviews,
  getRecipeViewCount,
  recordRecipeView,
  removeRecipeLike,
  type RecipeIngredient,
  type RecipeMedia,
  type RecipeReview,
} from "../../api/recipe-details.api";

import type { Recipe } from "../../api/recipes.api";

import RecipeDetailsSkeleton from "../../components/recipes/RecipeDetailsSkeleton";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

const DIFFICULTY_LEVEL: Record<Recipe["difficulty"], number> = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

const DIFFICULTY_COLORS: Record<number, string> = {
  1: "bg-emerald-500",
  2: "bg-orange-400",
  3: "bg-red-500",
};

function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const t = translations[language].recipeDetails;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [media, setMedia] = useState<RecipeMedia[]>([]);
  const [reviews, setReviews] = useState<RecipeReview[]>([]);

  const [likeCount, setLikeCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);

  const [imageFailed, setImageFailed] = useState(false);

  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const [shareCopied, setShareCopied] = useState(false);
  const [error, setError] = useState("");

  const loadRecipe = useCallback(async () => {
    if (!id) {
      setError(t.notFound);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const [
        recipeData,
        ingredientsData,
        mediaData,
        reviewsData,
        likesData,
        viewsData,
      ] = await Promise.all([
        getRecipeById(id),
        getRecipeIngredients(id),
        getRecipeMedia(id),
        getRecipeReviews(id),
        getRecipeLikeCount(id),
        getRecipeViewCount(id),
      ]);

      setRecipe(recipeData);
      setIngredients(ingredientsData);
      setMedia(mediaData);
      setReviews(reviewsData);
      setLikeCount(likesData);
      setViewCount(viewsData);

      if (isAuthenticated) {
        const [favoriteStatus, likeStatus] = await Promise.all([
          getFavoriteStatus(id),
          getRecipeLikeStatus(id),
        ]);

        setIsFavorited(favoriteStatus);
        setIsLiked(likeStatus);

        try {
          await recordRecipeView(id);
          const updatedViewCount = await getRecipeViewCount(id);
          setViewCount(updatedViewCount);
        } catch {
          // View recording is non-critical.
        }
      } else {
        setIsFavorited(false);
        setIsLiked(false);
      }
    } catch (requestError) {
      console.error("Recipe details loading error:", requestError);

      setError(
        requestError instanceof Error
          ? requestError.message
          : t.errorDescription,
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    id,
    isAuthenticated,
    t.errorDescription,
    t.notFound,
  ]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadRecipe();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadRecipe]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setImageFailed(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [recipe?.recipe_image]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );

    return total / reviews.length;
  }, [reviews]);

  const instructionSteps = useMemo(() => {
    if (!recipe?.instructions) {
      return [];
    }

    return recipe.instructions
      .split(/\r?\n+/)
      .map((step) => step.trim())
      .filter(Boolean);
  }, [recipe]);

  const difficultyLevel = recipe
    ? DIFFICULTY_LEVEL[recipe.difficulty]
    : 1;

  const handleFavorite = async () => {
    if (!id || !isAuthenticated || isActionLoading) {
      navigate("/login");
      return;
    }

    const previousValue = isFavorited;

    setIsFavorited(!previousValue);
    setIsActionLoading(true);

    try {
      if (previousValue) {
        await removeFavorite(id);
      } else {
        await addFavorite(id);
      }
    } catch {
      setIsFavorited(previousValue);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleLike = async () => {
    if (!id || !isAuthenticated || isActionLoading) {
      navigate("/login");
      return;
    }

    const previousValue = isLiked;

    setIsLiked(!previousValue);
    setLikeCount((count) =>
      previousValue ? Math.max(0, count - 1) : count + 1,
    );

    setIsActionLoading(true);

    try {
      if (previousValue) {
        await removeRecipeLike(id);
      } else {
        await addRecipeLike(id);
      }
    } catch {
      setIsLiked(previousValue);

      setLikeCount((count) =>
        previousValue ? count + 1 : Math.max(0, count - 1),
      );
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: recipe?.title ?? "KinFeast recipe",
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);
      setShareCopied(true);

      window.setTimeout(() => {
        setShareCopied(false);
      }, 2000);
    } catch {
      // User cancelled the share dialog.
    }
  };

  const handleReviewSubmit = async () => {
    if (!id || !isAuthenticated) {
      navigate("/login");
      return;
    }

    if (selectedRating === 0) {
      return;
    }

    setIsReviewSubmitting(true);

    try {
      const newReview = await createRecipeReview(
        id,
        selectedRating,
        reviewComment,
      );

      setReviews((current) => [newReview, ...current]);
      setSelectedRating(0);
      setReviewComment("");
    } catch (requestError) {
      console.error("Review submission error:", requestError);
    } finally {
      setIsReviewSubmitting(false);
    }
  };

  if (isLoading) {
    return <RecipeDetailsSkeleton />;
  }

  if (error || !recipe) {
    return (
      <main className="page-container flex min-h-[65vh] items-center justify-center py-16">
        <div className="max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
            <Utensils size={28} />
          </div>

          <h1 className="mt-6 font-serif text-3xl font-semibold text-stone-900 dark:text-stone-50">
            {t.errorTitle}
          </h1>

          <p className="mt-3 leading-7 text-stone-600 dark:text-stone-400">
            {error || t.errorDescription}
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => void loadRecipe()}
              className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              {t.retry}
            </button>

            <Link
              to="/recipes"
              className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200"
            >
              {t.backToRecipes}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const formattedDate = new Intl.DateTimeFormat(
    language === "ar" ? "ar-EG" : "en-US",
    {
      dateStyle: "medium",
    },
  ).format(new Date(recipe.created_at));

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="page-container py-8 sm:py-10 lg:py-14">
        <Link
          to="/recipes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
        >
          <ArrowLeft
            size={17}
            className="rtl:rotate-180"
          />
          {t.backToRecipes}
        </Link>

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Hero image */}
          <div className="relative overflow-hidden rounded-[2rem] bg-stone-100 shadow-xl ring-1 ring-stone-900/10 dark:bg-stone-900 dark:ring-white/10">
            <div className="aspect-[4/3]">
              {recipe.recipe_image && !imageFailed ? (
                <img
                  src={recipe.recipe_image}
                  alt={recipe.title}
                  className="h-full w-full object-cover"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle,rgba(4,120,87,0.16)_1px,transparent_1.5px)] [background-size:16px_16px] dark:bg-[radial-gradient(circle,rgba(110,231,183,0.14)_1px,transparent_1.5px)]"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm dark:bg-stone-950 dark:text-emerald-300">
                    <Utensils size={34} strokeWidth={1.4} />
                  </span>
                </div>
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 pt-16">
              <span className="inline-flex rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-stone-800 backdrop-blur-md">
                {recipe.category_name}
              </span>
            </div>
          </div>

          {/* Recipe summary */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2">
              {recipe.cuisine_name && (
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                  {recipe.cuisine_name}
                </span>
              )}

              <span className="text-stone-300 dark:text-stone-700">
                •
              </span>

              <span className="text-sm text-stone-500 dark:text-stone-400">
                {formattedDate}
              </span>
            </div>

            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-950 sm:text-5xl lg:text-6xl dark:text-stone-50">
              {recipe.title}
            </h1>

            <p className="mt-4 text-base font-medium text-stone-600 dark:text-stone-300">
              {t.labels.by}{" "}
              <span className="text-stone-900 dark:text-stone-100">
                {recipe.author_name}
              </span>
            </p>

            {recipe.description && (
              <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-400">
                {recipe.description}
              </p>
            )}

            {/* Facts */}
            <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900 sm:grid-cols-4">
              <div className="border-b border-e border-stone-200 p-4 dark:border-stone-800 sm:border-b-0">
                <Clock3
                  size={18}
                  className="text-orange-500"
                />

                <p className="mt-2 text-xl font-semibold text-stone-900 dark:text-stone-50">
                  {recipe.cooking_time ?? "–"}
                </p>

                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {t.labels.minutes}
                </p>
              </div>

              <div className="border-b border-stone-200 p-4 dark:border-stone-800 sm:border-b-0 sm:border-e">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((step) => (
                    <span
                      key={step}
                      className={`h-1.5 w-5 rounded-full ${
                        step <= difficultyLevel
                          ? DIFFICULTY_COLORS[difficultyLevel]
                          : "bg-stone-200 dark:bg-stone-700"
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-3 text-sm font-semibold text-stone-900 dark:text-stone-50">
                  {recipe.difficulty}
                </p>

                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {t.labels.difficulty}
                </p>
              </div>

              <div className="border-e border-stone-200 p-4 dark:border-stone-800">
                <Heart
                  size={18}
                  className="text-rose-500"
                />

                <p className="mt-2 text-xl font-semibold text-stone-900 dark:text-stone-50">
                  {likeCount}
                </p>

                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {t.labels.likes}
                </p>
              </div>

              <div className="p-4">
                <Eye
                  size={18}
                  className="text-emerald-600 dark:text-emerald-400"
                />

                <p className="mt-2 text-xl font-semibold text-stone-900 dark:text-stone-50">
                  {viewCount}
                </p>

                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {t.labels.views}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void handleFavorite()}
                disabled={isActionLoading}
                className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isFavorited
                    ? "bg-orange-500 text-white"
                    : "border border-stone-200 bg-white text-stone-700 hover:border-orange-300 hover:text-orange-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
                }`}
              >
                <Bookmark
                  size={18}
                  className={isFavorited ? "fill-current" : ""}
                />

                {isFavorited
                  ? t.actions.saved
                  : t.actions.save}
              </button>

              <button
                type="button"
                onClick={() => void handleLike()}
                disabled={isActionLoading}
                className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isLiked
                    ? "bg-rose-500 text-white"
                    : "border border-stone-200 bg-white text-stone-700 hover:border-rose-300 hover:text-rose-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-rose-800 dark:hover:text-rose-400"
                }`}
              >
                <Heart
                  size={18}
                  className={isLiked ? "fill-current" : ""}
                />

                {isLiked ? t.actions.liked : t.actions.like}
              </button>

              <button
                type="button"
                onClick={() => void handleShare()}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-700 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-emerald-800 dark:hover:text-emerald-400"
              >
                {shareCopied ? (
                  <Check size={18} />
                ) : (
                  <Share2 size={18} />
                )}

                {shareCopied
                  ? t.actions.copied
                  : t.actions.share}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients + Instructions */}
      <section className="page-container py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          {/* Ingredients */}
          <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-stone-900/10 sm:p-8 dark:bg-stone-900 dark:ring-white/10">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                <Utensils size={21} />
              </span>

              <div>
                <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
                  {t.labels.ingredients}
                </h2>

                <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
                  {ingredients.length}{" "}
                  {ingredients.length === 1
                    ? "ingredient"
                    : "ingredients"}
                </p>
              </div>
            </div>

            {ingredients.length > 0 ? (
              <ul className="mt-7 divide-y divide-stone-100 dark:divide-stone-800">
                {ingredients.map((ingredient) => (
                  <li
                    key={`${ingredient.ingredient_id}-${ingredient.name}`}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <span className="font-medium text-stone-800 dark:text-stone-200">
                      {ingredient.name}
                    </span>

                    {ingredient.quantity && (
                      <span className="shrink-0 rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                        {ingredient.quantity}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-7 rounded-2xl bg-stone-50 p-5 text-sm leading-6 text-stone-500 dark:bg-stone-950 dark:text-stone-400">
                No ingredients have been added yet.
              </p>
            )}
          </section>

          {/* Instructions */}
          <section className="rounded-[2rem] bg-stone-950 p-6 text-white shadow-sm sm:p-8 dark:bg-stone-950">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-orange-400">
                <Clock3 size={21} />
              </span>

              <div>
                <h2 className="font-serif text-2xl font-semibold">
                  {t.labels.instructions}
                </h2>

                <p className="mt-0.5 text-sm text-stone-400">
                  {instructionSteps.length}{" "}
                  {instructionSteps.length === 1
                    ? t.instructions.step
                    : `${t.instructions.step}s`}
                </p>
              </div>
            </div>

            <ol className="mt-8 space-y-7">
              {instructionSteps.map((step, index) => (
                <li
                  key={`${index}-${step.slice(0, 20)}`}
                  className="flex gap-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold text-orange-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="pt-1 text-sm leading-7 text-stone-300">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>

      {/* Recipe media */}
      {media.length > 0 && (
        <section className="page-container py-8 sm:py-10">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
              KinFeast
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold text-stone-900 dark:text-stone-50">
              {t.labels.media}
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {media.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-stone-900/10 dark:bg-stone-900 dark:ring-white/10"
              >
                {item.media_type === "image" ? (
                  <img
                    src={item.media_url}
                    alt={recipe.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div className="relative aspect-video bg-black">
                    <video
                      controls
                      preload="metadata"
                      className="h-full w-full object-contain"
                    >
                      <source src={item.media_url} />
                    </video>

                    <div className="pointer-events-none absolute start-3 top-3 flex items-center gap-2 rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white">
                      <Play size={13} fill="currentColor" />
                      {t.media.video}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="page-container py-10 sm:py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          {/* Review summary */}
          <div className="rounded-[2rem] bg-emerald-950 p-7 text-white sm:p-8">
            <MessageCircle
              size={24}
              className="text-emerald-300"
            />

            <h2 className="mt-5 font-serif text-3xl font-semibold">
              {t.reviews.title}
            </h2>

            <div className="mt-7 flex items-end gap-3">
              <span className="font-serif text-5xl font-semibold">
                {averageRating > 0
                  ? averageRating.toFixed(1)
                  : "—"}
              </span>

              <span className="pb-1 text-sm text-emerald-200">
                {t.reviews.average}
              </span>
            </div>

            <div className="mt-4 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={19}
                  className={
                    star <= Math.round(averageRating)
                      ? "fill-orange-400 text-orange-400"
                      : "text-white/20"
                  }
                />
              ))}
            </div>

            <p className="mt-4 text-sm text-emerald-100/70">
              {reviews.length}{" "}
              {reviews.length === 1
                ? "review"
                : "reviews"}
            </p>
          </div>

          {/* Reviews list */}
          <div>
            {reviews.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-stone-300 p-8 text-center dark:border-stone-700">
                <MessageCircle
                  size={26}
                  className="mx-auto text-stone-400"
                />

                <h3 className="mt-4 font-semibold text-stone-900 dark:text-stone-100">
                  {t.reviews.noReviews}
                </h3>

                <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                  {t.reviews.beFirst}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-[1.5rem] bg-white p-5 ring-1 ring-stone-900/10 dark:bg-stone-900 dark:ring-white/10"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-stone-900 dark:text-stone-100">
                          {review.user_name}
                        </p>

                        <p className="mt-1 text-xs text-stone-400">
                          {new Intl.DateTimeFormat(
                            language === "ar"
                              ? "ar-EG"
                              : "en-US",
                            {
                              dateStyle: "medium",
                            },
                          ).format(
                            new Date(review.created_at),
                          )}
                        </p>
                      </div>

                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={15}
                            className={
                              star <= review.rating
                                ? "fill-orange-400 text-orange-400"
                                : "text-stone-300 dark:text-stone-700"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {review.comment && (
                      <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-400">
                        {review.comment}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}

            {/* Review form */}
            {isAuthenticated &&
            String(user?.id) !== String(recipe.author_id) ? (
              <div className="mt-6 rounded-[1.5rem] bg-stone-50 p-6 dark:bg-stone-950">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                  {t.reviews.write}
                </h3>

                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  {t.reviews.rating}
                </p>

                <div className="mt-3 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setSelectedRating(star)
                      }
                      aria-label={`${star} / 5`}
                      className="rounded-lg p-1 transition hover:scale-105"
                    >
                      <Star
                        size={25}
                        className={
                          star <= selectedRating
                            ? "fill-orange-400 text-orange-400"
                            : "text-stone-300 dark:text-stone-700"
                        }
                      />
                    </button>
                  ))}
                </div>

                <textarea
                  value={reviewComment}
                  onChange={(event) =>
                    setReviewComment(event.target.value)
                  }
                  rows={4}
                  placeholder={t.reviews.placeholder}
                  className="mt-4 w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
                />

                <button
                  type="button"
                  onClick={() => void handleReviewSubmit()}
                  disabled={
                    selectedRating === 0 ||
                    isReviewSubmitting
                  }
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isReviewSubmitting && (
                    <LoaderCircle
                      size={16}
                      className="animate-spin"
                    />
                  )}

                  {isReviewSubmitting
                    ? t.reviews.submitting
                    : t.reviews.submit}
                </button>
              </div>
            ) : !isAuthenticated ? (
              <div className="mt-6 rounded-[1.5rem] border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {t.reviews.signIn}
                </p>

                <Link
                  to="/login"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400"
                >
                  {t.actions.loginToLike}
                  <ArrowLeft
                    size={15}
                    className="rtl:rotate-180"
                  />
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

export default RecipeDetailsPage;