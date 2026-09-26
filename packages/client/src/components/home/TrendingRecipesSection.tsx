import { ArrowRight, Bookmark, Clock3, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

const trendingRecipes = [
  {
    id: 1,
    translationKey: "creamyGarlicParmesanPasta",
    servings: 4,
    rating: "4.8",
    image:
      "https://www.allrecipes.com/thmb/IrY572TXic4UXXVn8EetsarI3S0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-269500-creamy-garlic-pasta-Beauties-4x3-f404628aad2a435a9985b2cf764209b5.jpg",
    tagKeys: ["italian", "quick"],
  },
  {
    id: 2,
    translationKey: "mediterraneanHarvestBowl",
    servings: 2,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&h=650&fit=crop",
    tagKeys: ["healthy", "fresh"],
  },
  {
    id: 3,
    translationKey: "honeyGarlicSalmon",
    servings: 3,
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&h=650&fit=crop",
    tagKeys: ["seafood", "easy"],
  },
] as const;

function TrendingRecipesSection() {
  const { language } = useLanguage();
  const t = translations[language].trendingRecipes;

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
          to="/recipes"
          className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-orange-500 transition-colors hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
        >
          {t.actions.exploreRecipes}

          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </Link>
      </div>

      {/* Recipe Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trendingRecipes.map((recipe) => {
          const recipeTranslation = t.recipes[recipe.translationKey];

          return (
            <article
              key={recipe.id}
              className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:bg-stone-900"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipeTranslation.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {recipe.tagKeys.map((tagKey) => (
                    <span
                      key={tagKey}
                      className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md"
                    >
                      {recipeTranslation.tags[tagKey as keyof typeof recipeTranslation.tags]}
                    </span>
                  ))}
                </div>

                {/* Save */}
                <button
                  type="button"
                  aria-label={`${t.labels.save} ${recipeTranslation.title}`}
                  className="absolute right-4 top-4 rounded-full bg-white/90 p-2.5 text-stone-700 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-white dark:bg-stone-900/90 dark:text-stone-200 dark:hover:bg-stone-900"
                >
                  <Bookmark size={17} />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-stone-900 dark:text-white">
                      {recipeTranslation.title}
                    </h3>

                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                      {t.labels.by} {recipeTranslation.author}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 dark:bg-orange-950/40">
                    <Star
                      size={14}
                      className="fill-orange-500 text-orange-500"
                    />

                    <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                      {recipe.rating}
                    </span>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-5 flex items-center gap-5 border-t border-stone-100 pt-4 text-sm text-stone-500 dark:border-stone-800 dark:text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <Clock3 size={15} />
                    <span>{recipeTranslation.time}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Users size={15} />
                    <span>
                      {recipe.servings} {t.labels.servings}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default TrendingRecipesSection;
