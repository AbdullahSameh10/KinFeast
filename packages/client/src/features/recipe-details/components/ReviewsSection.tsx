import { Link } from "react-router-dom";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { StarRating } from "./StarRating";
import { ReviewForm } from "./ReviewForm";
import { Card } from "../../../components/ui/Card";
import { computeAverageRating, formatRecipeDate } from "../utils";
import type { RecipeReview } from "../../../api/recipe-details.api";

interface ReviewsSectionProps {
  reviews: RecipeReview[];
  language: string;
  isAuthenticated: boolean;
  canReview: boolean;
  onReviewSubmit: (rating: number, comment: string) => Promise<void>;
  t: {
    reviews: {
      title: string;
      average: string;
      noReviews: string;
      beFirst: string;
      signIn: string;
      [key: string]: string;
    };
    actions: {
      loginToLike: string;
    };
  };
}

export function ReviewsSection({
  reviews,
  language,
  isAuthenticated,
  canReview,
  onReviewSubmit,
  t,
}: ReviewsSectionProps) {
  const averageRating = computeAverageRating(reviews);

  return (
    <section className="page-container py-10 sm:py-14 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        {/* Summary */}
        <Card variant="emerald" className="max-h-80">
          <MessageCircle
            size={24}
            className="text-emerald-600 dark:text-emerald-400"
          />
          <h2 className="mt-5 font-serif text-3xl font-semibold">
            {t.reviews.title}
          </h2>

          <div className="mt-7 flex items-end gap-3">
            <span className="font-serif text-5xl font-semibold">
              {averageRating > 0 ? averageRating.toFixed(1) : "—"}
            </span>
            <span className="pb-1 text-sm text-emerald-700 dark:text-emerald-300">
              {t.reviews.average}
            </span>
          </div>

          <div className="mt-4">
            <StarRating
              value={Math.round(averageRating)}
              size={19}
            />
          </div>

          <p className="mt-4 text-sm text-emerald-700/70 dark:text-emerald-300/70">
            {reviews.length}{" "}
            {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </Card>

        {/* List + Form */}
        <div>
          {reviews.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-stone-300 p-8 text-center dark:border-stone-700">
              <MessageCircle
                size={26}
                className="mx-auto text-stone-400 dark:text-stone-500"
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
                      <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">
                        {formatRecipeDate(review.created_at, language)}
                      </p>
                    </div>
                    <StarRating value={review.rating} />
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

          {isAuthenticated && canReview && (
            <ReviewForm onSubmit={onReviewSubmit} labels={{
                write: t.reviews.write,
                rating: t.reviews.rating,
                placeholder: t.reviews.placeholder,
                submit: t.reviews.submit,
                submitting: t.reviews.submitting,
            }} />
          )}

          {!isAuthenticated && (
            <div className="mt-6 rounded-[1.5rem] border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {t.reviews.signIn}
              </p>
              <Link
                to="/login"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400"
              >
                {t.actions.loginToLike}
                <ArrowLeft size={15} className="rtl:rotate-180" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}