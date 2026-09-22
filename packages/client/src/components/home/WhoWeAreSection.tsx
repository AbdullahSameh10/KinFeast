import {
  ArrowRight,
  Heart,
  Utensils,
  Users,
  Coffee,
  ChefHat,
  Sparkles,
  Globe,
  Leaf,
  Clock,
  MessageCircle,
  Award,
} from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

function WhoWeAreSection() {
  const { language } = useLanguage();
  const t = translations[language].whoWeAre;

  const kinTags = [
    { icon: Users, label: t.kin.tags.community },
    { icon: Coffee, label: t.kin.tags.connection },
    { icon: MessageCircle, label: t.kin.tags.belonging },
  ];

  const feastTags = [
    { icon: Globe, label: t.feast.tags.global },
    { icon: Leaf, label: t.feast.tags.fresh },
    { icon: Clock, label: t.feast.tags.timeless },
  ];

  const stats = [
    { number: "2M+", label: t.stats.foodLovers, icon: Users },
    { number: "15K+", label: t.stats.recipes, icon: Utensils },
    { number: "4.9★", label: t.stats.averageRating, icon: Award },
    { number: "180+", label: t.stats.countries, icon: Globe },
  ];

  return (
    <section className="relative overflow-hidden bg-transparent py-24 sm:py-32">
      {/* Animated Background Decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -left-48 top-1/4 h-96 w-96 rounded-full bg-orange-300/10 blur-3xl dark:bg-orange-500/10" />
        <div className="animate-float-delayed absolute -right-48 bottom-1/4 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl dark:bg-amber-500/10" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-300/5 blur-3xl dark:bg-rose-500/5" />
      </div>

      <div className="page-container relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-orange-500/10 px-4 py-2 backdrop-blur-sm dark:bg-orange-400/10">
            <Sparkles size={14} className="text-orange-500" />

            <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              {t.badge}
            </span>
          </div>

          <h2 className="mt-6 text-4xl min-h-fit font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl dark:text-white">
            {t.title.firstLine}

            <span className="mt-2 block min-h-[70px] bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              {t.title.highlight}
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl dark:text-stone-300">
            {t.description}
          </p>
        </div>

        {/* Illustrated Cards */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2 lg:gap-10">
          {/* Kin Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/80 p-8 shadow-xl shadow-stone-200/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-200/30 dark:bg-stone-900/80 dark:shadow-stone-900/50 dark:hover:shadow-orange-900/30">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-400/5 blur-2xl transition-all duration-500 group-hover:bg-orange-400/10" />

            <div className="relative flex items-start gap-5">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-400/10 shadow-lg shadow-orange-500/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-orange-500/20 dark:from-orange-400/20 dark:to-orange-500/10">
                  <Heart
                    size={28}
                    className="text-orange-500 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="absolute -right-2 -top-2 h-3 w-3 animate-pulse rounded-full bg-orange-400" />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-stone-900 dark:text-white">
                  {t.kin.title}
                </h3>

                <p className="mt-2 text-base font-medium text-orange-500">
                  {t.kin.subtitle}
                </p>
              </div>
            </div>

            <p className="relative mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              {t.kin.description}
            </p>

            <div className="relative mt-6 flex flex-wrap gap-2">
              {kinTags.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-orange-50/80 px-3.5 py-2 text-xs font-medium text-orange-600 backdrop-blur-sm transition-all hover:bg-orange-100 hover:shadow-md dark:bg-orange-950/30 dark:text-orange-400 dark:hover:bg-orange-950/50"
                >
                  <Icon size={12} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Feast Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/80 p-8 shadow-xl shadow-stone-200/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-200/30 dark:bg-stone-900/80 dark:shadow-stone-900/50 dark:hover:shadow-amber-900/30">
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-amber-400/5 blur-2xl transition-all duration-500 group-hover:bg-amber-400/10" />

            <div className="relative flex items-start gap-5">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/10 shadow-lg shadow-amber-500/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-amber-500/20 dark:from-amber-400/20 dark:to-amber-500/10">
                  <Utensils
                    size={28}
                    className="text-amber-500 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="absolute -bottom-2 -left-2 h-3 w-3 animate-pulse rounded-full bg-amber-400 delay-75" />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-stone-900 dark:text-white">
                  {t.feast.title}
                </h3>

                <p className="mt-2 text-base font-medium text-amber-500">
                  {t.feast.subtitle}
                </p>
              </div>
            </div>

            <p className="relative mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              {t.feast.description}
            </p>

            <div className="relative mt-6 flex flex-wrap gap-2">
              {feastTags.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-amber-50/80 px-3.5 py-2 text-xs font-medium text-amber-600 backdrop-blur-sm transition-all hover:bg-amber-100 hover:shadow-md dark:bg-amber-950/30 dark:text-amber-400 dark:hover:bg-amber-950/50"
                >
                  <Icon size={12} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-2xl bg-white/60 p-6 text-center backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/80 hover:shadow-xl dark:bg-stone-900/60 dark:hover:bg-stone-900/80"
            >
              <stat.icon className="mx-auto mb-3 h-6 w-6 text-stone-400 transition-colors group-hover:text-orange-500 dark:text-stone-600 dark:group-hover:text-orange-400" />

              <div className="text-2xl font-bold text-stone-900 dark:text-white">
                {stat.number}
              </div>

              <div className="mt-1 text-xs font-medium text-stone-500 dark:text-stone-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Brand Statement */}
        <div className="relative mx-auto mt-20 max-w-4xl">
          <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

          <div className="text-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 px-6 py-3 backdrop-blur-sm">
              <ChefHat size={20} className="text-orange-500" />

              <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">
                {t.brand.name}
              </span>

              <span className="text-stone-400">{t.brand.equals}</span>

              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-sm font-bold text-transparent">
                {t.brand.statement}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40 active:scale-95"
              >
                {t.actions.discoverStory}

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                />
              </button>

              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-stone-200 bg-white/80 px-8 py-3.5 text-sm font-semibold text-stone-700 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 hover:shadow-lg dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:border-orange-700 dark:hover:bg-orange-950/30 dark:hover:text-orange-400"
              >
                {t.actions.joinCommunity}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.1); }
          66% { transform: translate(-10px, 10px) scale(0.9); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-20px, 20px) scale(0.9); }
          66% { transform: translate(15px, -15px) scale(1.1); }
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

export default WhoWeAreSection;
