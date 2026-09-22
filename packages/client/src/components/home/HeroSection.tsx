import { ArrowRight, Clock, Sparkles, TrendingUp } from "lucide-react";
import heroIllustration from "../../assets/hero illustration.png";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

export default function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language].hero;
  return (
    <section className="relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-500/10" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl dark:bg-amber-500/10" />
      </div>
      <div className="page-container relative grid min-h-[calc(100vh-5rem)] items-center gap-12 py-12 sm:py-16 lg:grid-cols-2 lg:gap-8 lg:py-8">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-600 backdrop-blur-sm dark:bg-orange-400/10 dark:text-orange-400">
            <Sparkles size={16} className="animate-pulse" aria-hidden="true" />
            {t.badge}
          </div>
          {/* Headline */}
          <h1 className="min-h-fit text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl dark:text-white">
            {t.title.firstLine}
            <span className="block min-h-[70px] bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              {t.title.highlight}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600 sm:text-xl dark:text-stone-300">
            {t.description}
          </p>
          {/* Search Section */}
          <div className="mt-10 max-w-xl">
            <button
              type="button"
              className="group relative inline-flex h-14 min-w-[140px] shrink-0 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/40 active:scale-95 sm:min-w-[160px]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>{t.discover}</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </span>
              {/* Animated background shimmer */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1s_infinite]" />
            </button>
          </div>
          {/* Social Proof */}
          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${i + 10}`}
                  alt=""
                  className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-stone-900"
                />
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-orange-500 text-xs font-bold text-white dark:border-stone-900">
                +2k
              </div>
            </div>
            <div className="text-sm text-stone-600 dark:text-stone-300">
              <span className="font-semibold text-stone-900 dark:text-white">
                2,458
              </span>{" "}
              {t.socialProof.recipesShared}
            </div>
          </div>
        </div>
        {/* Hero Image */}
        <div className="relative mx-auto w-full max-w-2xl lg:-mr-8">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-400/20 to-amber-400/20 blur-2xl" />
          <img
            src={heroIllustration}
            alt={t.imageAlt}
            className="relative h-auto w-full object-contain"
          />
          {/* Floating Stats */}
          <div className="absolute -right-4 top-1/4 hidden rounded-2xl bg-white/90 px-4 py-3 shadow-xl backdrop-blur-sm transition duration-300 hover:cursor-pointer hover:bg-white lg:block dark:bg-stone-900/90 dark:hover:bg-stone-900">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <TrendingUp size={16} />
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900 dark:text-white">
                  {t.stats.trending}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {t.stats.trendingDescription}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -left-4 bottom-1/4 hidden rounded-2xl bg-white/90 px-4 py-3 shadow-xl backdrop-blur-sm transition duration-300 hover:cursor-pointer hover:bg-white lg:block dark:bg-stone-900/90 dark:hover:bg-stone-900">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400">
                <Clock size={16} />
              </div>
              <div>
                <p className="text-sm font-bold text-stone-900 dark:text-white">
                  {t.stats.underThirtyMinutes}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {t.stats.underThirtyMinutesDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
