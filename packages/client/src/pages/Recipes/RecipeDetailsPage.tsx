import { useCallback, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useAuth } from "./../../hooks/useAuth";
import { useLanguage } from "./../../hooks/useLanguage";
import { translations } from "./../../i18n";

import { createRecipeReview } from "./../../api/recipe-details.api";
import RecipeDetailsSkeleton from "./../../components/recipes/RecipeDetailsSkeleton";

// Feature
import { useRecipeDetails } from "./../../features/recipe-details/hooks/useRecipeDetails";
import { useRecipeActions } from "./../../features/recipe-details/hooks/useRecipeActions";
import { useShare } from "./../../features/recipe-details/hooks/useShare";
import {
  parseInstructions,
  formatRecipeDate,
} from "./../../features/recipe-details/utils";

import { RecipeHero } from "./../../features/recipe-details/components/RecipeHero";
import { RecipeFactsGrid } from "./../../features/recipe-details/components/RecipeFactsGrid";
import { RecipeActions } from "./../../features/recipe-details/components/RecipeActions";
import { IngredientsPanel } from "./../../features/recipe-details/components/IngredientsPanel";
import { InstructionsPanel } from "./../../features/recipe-details/components/InstructionsPanel";
import { MediaGallery } from "./../../features/recipe-details/components/MediaGallery";
import { ReviewsSection } from "./../../features/recipe-details/components/ReviewsSection";
import { RecipeErrorState } from "./../../features/recipe-details/components/RecipeErrorState";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

function RecipeDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const t = translations[language].recipeDetails;

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  const details = useRecipeDetails({
    slug,
    isAuthenticated,
    errorMessage: t.errorDescription,
  });

  useDocumentTitle(
    details.recipe?.title
      ? details.recipe.title
      : "Recipe",
  );

  const requireAuth = useCallback(() => navigate("/login"), [navigate]);

  const actions = useRecipeActions({
    id: details.recipe ? String(details.recipe.id) : undefined,
    isAuthenticated,
    onRequireAuth: requireAuth,
  });

  const share = useShare(details.recipe?.title ?? "KinFeast recipe");

  const instructionSteps = useMemo(
    () => parseInstructions(details.recipe?.instructions),
    [details.recipe?.instructions],
  );

  const handleReviewSubmit = useCallback(
    async (rating: number, comment: string) => {
      if (!details.recipe) return;
      try {
        const newReview = await createRecipeReview(details.recipe.id, rating, comment);
        details.patch("reviews", [newReview, ...details.reviews]);
      } catch (err) {
        console.error("Review submission error:", err);
      }
    },
    [details],
  );

  if (details.isLoading) return <RecipeDetailsSkeleton />;

  if (details.error || !details.recipe) {
    return (
      <RecipeErrorState
        title={t.errorTitle}
        message={details.error || t.errorDescription}
        retryLabel={t.retry}
        backLabel={t.backToRecipes}
        onRetry={details.reload}
      />
    );
  }

  const { recipe } = details;
  const canReview = String(user?.id) !== String(recipe.author_id);

  return (
    <main className="overflow-hidden bg-gradient-to-br from-stone-50 via-orange-50/30 to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      {/* Hero */}
      <section className="page-container py-8 sm:py-10 lg:py-14">
        <Link
          to="/recipes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
        >
          <ArrowLeft size={17} className="rtl:rotate-180" />
          {t.backToRecipes}
        </Link>

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <RecipeHero
            image={recipe.recipe_image ?? undefined}
            title={recipe.title}
            categoryName={recipe.category_name}
          />

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2">
              {recipe.cuisine_name && (
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                  {recipe.cuisine_name}
                </span>
              )}
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span className="text-sm text-stone-500 dark:text-stone-400">
                {formatRecipeDate(recipe.created_at, language)}
              </span>
            </div>

            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-stone-950 dark:text-stone-50 sm:text-5xl lg:text-6xl">
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

            <RecipeFactsGrid
              recipe={recipe}
              likeCount={details.likeCount}
              viewCount={details.viewCount}
              labels={{
                minutes: t.labels.minutes,
                difficulty: t.labels.difficulty,
                likes: t.labels.likes,
                views: t.labels.views,
              }}
            />

            <RecipeActions
              isFavorited={details.isFavorited}
              isLiked={details.isLiked}
              isActionLoading={actions.isActionLoading}
              shareCopied={share.copied}
              onFavorite={() =>
                actions.toggleFavorite(details.isFavorited, (v) =>
                  details.patch("isFavorited", v),
                )
              }
              onLike={() =>
                actions.toggleLike(details.isLiked, (v, delta) => {
                  details.patch("isLiked", v);
                  details.patch(
                    "likeCount",
                    Math.max(0, details.likeCount + delta),
                  );
                })
              }
              onShare={() => void share.share()}
              labels={{
                save: t.actions.save,
                saved: t.actions.saved,
                like: t.actions.like,
                liked: t.actions.liked,
                share: t.actions.share,
                copied: t.actions.copied,
              }}
            />
          </div>
        </div>
      </section>

      {/* Ingredients + Instructions */}
      <section className="page-container py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <IngredientsPanel
            ingredients={details.ingredients}
            title={t.labels.ingredients}
            emptyMessage="No ingredients have been added yet."
          />
          <InstructionsPanel
            steps={instructionSteps}
            title={t.labels.instructions}
            stepLabel={t.instructions.step}
          />
        </div>
      </section>

      <MediaGallery
        media={details.media}
        title={recipe.title}
        heading={t.labels.media}
        videoLabel={t.media.video}
      />

      <ReviewsSection
        reviews={details.reviews}
        language={language}
        isAuthenticated={isAuthenticated}
        canReview={canReview}
        onReviewSubmit={handleReviewSubmit}
        t={t}
      />
    </main>
  );
}

export default RecipeDetailsPage;
