
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChefHat,
  Compass,
  Heart,
  Search,
  Sparkles,
  Utensils,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../i18n";

function HowItWorksPage() {
  const { language } = useLanguage();
  const t = translations[language].howItWorks;
  const isArabic = language === "ar";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  useDocumentTitle("How It Works");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const steps = [
    {
      number: "01",
      icon: Compass,
      title: t.steps.discover.title,
      description: t.steps.discover.description,
      link: "/recipes",
      linkLabel: t.steps.discover.action,
      iconClass:
        "bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400",
    },
    {
      number: "02",
      icon: ChefHat,
      title: t.steps.explore.title,
      description: t.steps.explore.description,
      link: "/chefs",
      linkLabel: t.steps.explore.action,
      iconClass:
        "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    },
    {
      number: "03",
      icon: Search,
      title: t.steps.personalize.title,
      description: t.steps.personalize.description,
      link: "/cook-with-what-you-have",
      linkLabel: t.steps.personalize.action,
      iconClass:
        "bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
    },
    {
      number: "04",
      icon: Utensils,
      title: t.steps.cook.title,
      description: t.steps.cook.description,
      link: "/categories",
      linkLabel: t.steps.cook.action,
      iconClass:
        "bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400",
    },
  ];

  const highlights = [
    {
      icon: BookOpen,
      title: t.highlights.recipes.title,
      description: t.highlights.recipes.description,
    },
    {
      icon: ChefHat,
      title: t.highlights.chefs.title,
      description: t.highlights.chefs.description,
    },
    {
      icon: Heart,
      title: t.highlights.inspiration.title,
      description: t.highlights.inspiration.description,
    },
  ];

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen overflow-hidden bg-gradient-to-br from-stone-50 via-orange-50/30 to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950"
    >
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-stone-200/70 dark:border-stone-800">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-500/10" />
          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/10" />
          <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-rose-300/10 blur-3xl dark:bg-rose-500/5" />
        </div>

        <div className="page-container relative py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-orange-700 shadow-sm backdrop-blur dark:border-orange-900/60 dark:bg-stone-900/70 dark:text-orange-300">
              <Sparkles size={15} />
              {t.hero.badge}
            </span>

            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-7xl">
              {t.hero.title}
              <span className="mt-2 block bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                {t.hero.highlight}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg sm:leading-9">
              {t.hero.description}
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/recipes"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-500/25"
              >
                {t.hero.primaryAction}
                <Arrow
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                />
              </Link>

              <Link
                to="/chefs"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white/80 px-6 py-3 text-sm font-bold text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-600 dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
              >
                <ChefHat size={17} />
                {t.hero.secondaryAction}
              </Link>
            </div>

            <a
              href="#journey"
              className="mx-auto mt-12 inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
            >
              {t.hero.scrollLabel}
              <span aria-hidden="true" className="animate-bounce">
                ↓
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Journey steps */}
      <section id="journey" className="scroll-mt-24 py-20 sm:py-28">
        <div className="page-container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-orange-600 dark:text-orange-400">
              <span className="h-px w-7 bg-orange-500" />
              {t.journey.eyebrow}
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-stone-950 dark:text-white sm:text-4xl lg:text-5xl">
              {t.journey.title}
              <span className="mt-2 block text-orange-500">
                {t.journey.highlight}
              </span>
            </h2>

            <p className="mt-6 text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg">
              {t.journey.description}
            </p>
          </div>

          <div className="relative mx-auto mt-14 max-w-6xl">
            <div
              aria-hidden="true"
              className="absolute bottom-12 left-1/2 top-12 hidden w-px -translate-x-1/2 bg-gradient-to-b from-orange-200 via-amber-200 to-rose-200 dark:from-orange-900 dark:via-amber-900 dark:to-rose-900 lg:block"
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.number}
                    className="group relative flex h-full flex-col rounded-3xl border border-stone-200/80 bg-white/80 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-950/5 dark:border-stone-800 dark:bg-stone-900/70 dark:hover:border-orange-900 sm:p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${step.iconClass}`}
                      >
                        <Icon size={26} strokeWidth={1.8} />
                      </div>

                      <span className="text-4xl font-black tracking-tight text-stone-100 transition group-hover:text-orange-100 dark:text-stone-800 dark:group-hover:text-orange-950/60 sm:text-5xl">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-7 text-xl font-extrabold text-stone-950 dark:text-white sm:text-2xl">
                      {step.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-7 text-stone-600 dark:text-stone-300 sm:text-base sm:leading-8">
                      {step.description}
                    </p>

                    <Link
                      to={step.link}
                      className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-orange-600 transition hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-4 dark:text-orange-400 dark:hover:text-orange-300 dark:focus:ring-offset-stone-900"
                    >
                      {step.linkLabel}
                      <Arrow
                        size={16}
                        className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                      />
                    </Link>

                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -bottom-2 ${
                        isArabic ? "-left-2" : "-right-2"
                      } hidden h-12 w-12 rounded-2xl border border-orange-100/70 bg-orange-50/50 dark:border-orange-950 dark:bg-orange-950/20 lg:block`}
                    />

                    {index === 1 && (
                      <span className="sr-only">{t.journey.middleLabel}</span>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Platform highlights */}
      <section className="border-y border-stone-200/70 bg-white/60 py-20 dark:border-stone-800 dark:bg-stone-900/30 sm:py-24">
        <div className="page-container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.14em] text-orange-600 dark:text-orange-400">
              {t.highlights.eyebrow}
            </span>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-stone-950 dark:text-white sm:text-4xl">
              {t.highlights.title}
            </h2>

            <p className="mt-5 text-base leading-8 text-stone-600 dark:text-stone-300">
              {t.highlights.description}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-stone-200/80 bg-stone-50/80 p-6 transition hover:border-orange-200 hover:bg-white dark:border-stone-800 dark:bg-stone-950/50 dark:hover:border-orange-900 dark:hover:bg-stone-900 sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold text-stone-950 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28">
        <div className="page-container">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 px-6 py-14 text-center shadow-2xl shadow-orange-950/10 sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
              <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full border border-white/20" />
              <div className="absolute -left-12 -top-16 h-48 w-48 rounded-full border border-white/20" />
              <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
            </div>

            <div className="mx-auto max-w-3xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/30">
                <Heart size={28} />
              </div>

              <h2 className="mt-7 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                {t.cta.title}
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
                {t.cta.description}
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/recipes"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-orange-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-50 focus:outline-none focus:ring-4 focus:ring-white/40"
                >
                  {t.cta.primaryAction}
                  <Arrow
                    size={17}
                    className="transition-transform hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  {t.cta.secondaryAction}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HowItWorksPage;
