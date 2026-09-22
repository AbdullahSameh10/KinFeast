import {
  ArrowRight,
  ChevronRight,
  Clock,
  Heart,
  Flame,
  Globe,
  Coffee,
  Cake,
  Salad,
  Pizza,
  Utensils,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

const categoryConfig = [
  {
    key: "quickAndEasy",
    icon: Clock,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900&h=700&fit=crop",
    className: "lg:col-span-2",
    gradient: "from-blue-600/90 to-cyan-600/90",
  },
  {
    key: "healthy",
    icon: Salad,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&h=500&fit=crop",
    className: "",
    gradient: "from-emerald-600/90 to-green-600/90",
  },
  {
    key: "comfortFood",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=700&h=500&fit=crop",
    className: "",
    gradient: "from-rose-600/90 to-pink-600/90",
  },
  {
    key: "asian",
    icon: Utensils,
    image:
      "https://www.marionskitchen.com/wp-content/uploads/2022/04/Garlic-Prawn-Pad-See-Ew-02.jpg",
    className: "",
    gradient: "from-red-600/90 to-orange-600/90",
  },
  {
    key: "mediterranean",
    icon: Globe,
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&h=500&fit=crop",
    className: "lg:col-span-2",
    gradient: "from-amber-600/90 to-orange-600/90",
  },
  {
    key: "desserts",
    icon: Cake,
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=700&h=500&fit=crop",
    className: "",
    gradient: "from-purple-600/90 to-pink-600/90",
  },
] as const;

const trendingCategoryConfig = [
  {
    key: "quickAndEasy",
    nameKey: "quickAndEasy",
  },
  {
    key: "asian",
    nameKey: "asian",
  },
  {
    key: "desserts",
    nameKey: "desserts",
  },
] as const;

function CategoriesSection() {
  const { language } = useLanguage();
  const t = translations[language].categories;

  return (
    <section className="relative overflow-hidden bg-transparent py-24 sm:py-32">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-orange-300/10 blur-3xl dark:bg-orange-500/5" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl dark:bg-amber-500/5" />

        {/* Floating Decorations */}
        <div className="animate-float-slow absolute left-[5%] top-[20%] opacity-10">
          <Pizza size={48} className="text-orange-400" />
        </div>

        <div className="animate-float-delayed absolute right-[5%] top-[30%] opacity-10">
          <Coffee size={40} className="text-amber-400" />
        </div>

        <div className="animate-float-slow absolute bottom-[25%] left-[8%] opacity-5">
          <Flame size={56} className="text-orange-400" />
        </div>
      </div>

      <div className="page-container relative">
        {/* Section Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 rounded-full bg-orange-500/10 px-4 py-2 backdrop-blur-sm dark:bg-orange-400/10">
              <Sparkles size={14} className="text-orange-500" />

              <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                {t.badge.title}
              </span>

              <span className="h-1 w-1 rounded-full bg-orange-400" />

              <span className="text-xs font-medium text-orange-500/70">
                {t.badge.subtitle}
              </span>
            </div>

            <h2 className="mt-5 min-h-fit text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl dark:text-white">
              {t.title.firstLine}

              <span className="block min-h-14 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                {t.title.highlight}
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-lg leading-relaxed text-stone-600 dark:text-stone-300">
              {t.description}
            </p>
          </div>

          <button
            type="button"
            className="group inline-flex h-12 w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40 active:scale-95"
          >
            <span>{t.actions.exploreAll}</span>

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Trending Tags */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-stone-400 dark:text-stone-500">
            <TrendingUp size={14} className="text-orange-400" />
            {t.trending.label}
          </span>

          {trendingCategoryConfig.map(({ key, nameKey }) => {
            const trendingCategory = t.trending.categories[nameKey];

            return (
              <span
                key={key}
                className="inline-flex items-center gap-2 rounded-full bg-stone-100/80 px-3 py-1.5 text-xs font-medium text-stone-600 backdrop-blur-sm dark:bg-stone-800/50 dark:text-stone-300"
              >
                {trendingCategory.name}

                <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold text-orange-500 dark:bg-orange-400/10 dark:text-orange-400">
                  {trendingCategory.badge}
                </span>
              </span>
            );
          })}
        </div>

        {/* Category Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:auto-rows-[210px] lg:grid-cols-4">
          {categoryConfig.map((category) => {
            const categoryText = t.items[category.key];
            const Icon = category.icon;

            return (
              <button
                key={category.key}
                type="button"
                className={`group relative min-h-[240px] overflow-hidden rounded-3xl text-left shadow-lg shadow-stone-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-200/30 lg:min-h-0 dark:shadow-stone-900/50 dark:hover:shadow-orange-900/20 ${category.className}`}
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={t.imageAlt[category.key]}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Animated Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-80 transition-opacity duration-500 group-hover:opacity-70`}
                />

                {/* Secondary Gradient for Depth */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Category Icon Badge */}
                <div className="absolute right-4 top-4 rounded-2xl bg-white/20 p-2.5 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white/30">
                  <Icon size={20} className="text-white" />
                </div>

                {/* Recipe Count Badge */}
                <div className="absolute left-4 top-4 rounded-full bg-black/30 px-3 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/40">
                  {categoryText.count}
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold text-white">
                          {categoryText.name}
                        </h3>

                        {/* Hover Indicator */}
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>

                      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/80 transition-opacity duration-300 group-hover:text-white/90">
                        {categoryText.description}
                      </p>
                    </div>

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-orange-500">
                      <ChevronRight
                        size={20}
                        className="transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  {/* Animated Bottom Bar */}
                  <div className="mt-4 h-0.5 w-0 rounded-full bg-white/40 transition-all duration-700 group-hover:w-full" />
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-400/20 to-amber-400/20 blur-xl" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-stone-100/60 p-6 backdrop-blur-sm sm:p-8 dark:bg-stone-900/40">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20">
              <Utensils size={20} className="text-orange-500" />
            </div>

            <div>
              <p className="text-sm font-semibold text-stone-900 dark:text-white">
                {t.bottomCta.title}
              </p>

              <p className="text-sm text-stone-500 dark:text-stone-400">
                {t.bottomCta.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="group inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-2.5 text-sm font-semibold text-stone-700 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 hover:shadow-lg dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-700 dark:hover:bg-orange-950/30 dark:hover:text-orange-400"
          >
            <span>{t.actions.tryIngredientSearch}</span>

            <ChevronRight
              size={16}
              className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }

          50% {
            transform: translate(15px, -15px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }

          50% {
            transform: translate(-15px, 15px) rotate(-5deg);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default CategoriesSection;
