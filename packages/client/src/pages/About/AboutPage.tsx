import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChefHat,
  Compass,
  Heart,
  Lightbulb,
  Sparkles,
  Users,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";
import { useEffect } from "react";

function AboutPage() {
  useDocumentTitle("About KinFeast");

  const { language } = useLanguage();
  const t = translations[language].about;
  const isArabic = language === "ar";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  const values = [
    {
      icon: Compass,
      title: t.values.discovery.title,
      description: t.values.discovery.description,
      iconClass:
        "bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400",
    },
    {
      icon: Users,
      title: t.values.community.title,
      description: t.values.community.description,
      iconClass:
        "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    },
    {
      icon: Heart,
      title: t.values.sharing.title,
      description: t.values.sharing.description,
      iconClass:
        "bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: BookOpen,
      title: t.steps.discover.title,
      description: t.steps.discover.description,
    },
    {
      number: "02",
      icon: ChefHat,
      title: t.steps.meet.title,
      description: t.steps.meet.description,
    },
    {
      number: "03",
      icon: Utensils,
      title: t.steps.cook.title,
      description: t.steps.cook.description,
    },
  ];

  useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-stone-50 via-orange-50/30 to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      {/* Hero */}{" "}
      <section className="relative isolate overflow-hidden border-b border-stone-200/70 dark:border-stone-800">
        {" "}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          {" "}
          <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-500/10" />{" "}
          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/10" />{" "}
          <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-rose-300/10 blur-3xl dark:bg-rose-500/5" />{" "}
        </div>
        <div className="page-container relative py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-700 shadow-sm backdrop-blur dark:border-orange-900/60 dark:bg-stone-900/70 dark:text-orange-300">
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
              href="#our-story"
              className="mx-auto mt-12 inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
            >
              {t.hero.scrollLabel}
              <ArrowDown size={15} className="animate-bounce" />
            </a>
          </div>
        </div>
      </section>
      {/* Our story */}
      <section id="our-story" className="scroll-mt-24 py-20 sm:py-28">
        <div className="page-container">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-orange-600 dark:text-orange-400">
                <span className="h-px w-7 bg-orange-500" />
                {t.story.eyebrow}
              </span>

              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-stone-950 dark:text-white sm:text-4xl lg:text-5xl">
                {t.story.title}
                <span className="mt-1 block text-orange-500">
                  {t.story.highlight}
                </span>
              </h2>

              <p className="mt-6 text-base leading-8 text-stone-600 dark:text-stone-300">
                {t.story.paragraphOne}
              </p>

              <p className="mt-4 text-base leading-8 text-stone-600 dark:text-stone-300">
                {t.story.paragraphTwo}
              </p>

              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-orange-200/70 bg-orange-50/70 p-5 dark:border-orange-900/50 dark:bg-orange-950/20">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm dark:bg-stone-900">
                  <Lightbulb size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-white">
                    {t.story.calloutTitle}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-300">
                    {t.story.calloutDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-orange-300/30 via-amber-200/20 to-rose-300/30 blur-2xl dark:from-orange-500/10 dark:via-amber-500/10 dark:to-rose-500/10" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-2xl shadow-stone-900/5 backdrop-blur dark:border-stone-700 dark:bg-stone-900/90 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                      KinFeast
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-stone-950 dark:text-white sm:text-3xl">
                      {t.story.cardTitle}
                    </h3>
                  </div>

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20">
                    <Heart size={27} fill="currentColor" />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {t.story.cardDescription}
                </p>

                <div className="mt-7 space-y-3">
                  {t.story.cardPoints.map((point, index) => {
                    const PointIcon = index === 0 ? BookOpen : index === 1 ? Users : ChefHat;

                    return (
                      <div
                        key={point}
                        className="flex items-center gap-3 rounded-xl bg-stone-50 p-3.5 dark:bg-stone-800/70"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
                          <PointIcon size={18} />
                        </div>
                        <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">
                          {point}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-7 flex items-center gap-2 border-t border-stone-200 pt-5 text-sm font-semibold text-stone-500 dark:border-stone-700 dark:text-stone-400">
                  <Heart size={15} className="text-orange-500" />
                  {t.story.cardFooter}
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute -bottom-5 -left-5 hidden h-16 w-16 items-center justify-center rounded-2xl border border-orange-100 bg-white text-orange-500 shadow-xl dark:border-stone-700 dark:bg-stone-900 sm:flex"
              >
                <Utensils size={27} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Mission */}
      <section className="relative overflow-hidden border-y border-stone-200/70 bg-white/60 py-20 dark:border-stone-800 dark:bg-stone-900/40 sm:py-24">
        <div className="page-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
              <Lightbulb size={27} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
              {t.mission.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-stone-950 dark:text-white sm:text-4xl lg:text-5xl">
              {t.mission.title}
            </h2>

            <p className="mt-6 text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg sm:leading-9">
              {t.mission.description}
            </p>
          </div>
        </div>
      </section>
      {/* Values */}
      <section className="py-20 sm:py-28">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
              <Sparkles size={14} />
              {t.values.eyebrow}
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-stone-950 dark:text-white sm:text-4xl">
              {t.values.title}
            </h2>

            <p className="mt-4 text-base leading-7 text-stone-600 dark:text-stone-300">
              {t.values.description}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-7">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="group relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white/80 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-950/5 dark:border-stone-800 dark:bg-stone-900/80 dark:hover:border-orange-900/70 sm:p-8"
                >
                  <span className="absolute end-5 top-5 text-5xl font-black text-stone-100 transition-colors group-hover:text-orange-100/80 dark:text-stone-800/70 dark:group-hover:text-orange-950/40">
                    0{index + 1}
                  </span>

                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${value.iconClass}`}
                  >
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-stone-950 dark:text-white">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* How it works */}
      <section className="border-y border-stone-200/70 bg-stone-100/70 py-20 dark:border-stone-800 dark:bg-stone-900/50 sm:py-24">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-orange-600 dark:text-orange-400">
              {t.steps.eyebrow}
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-stone-950 dark:text-white sm:text-4xl">
              {t.steps.title}
            </h2>

            <p className="mt-4 text-base leading-7 text-stone-600 dark:text-stone-300">
              {t.steps.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative rounded-3xl border border-stone-200 bg-white p-7 shadow-sm dark:border-stone-800 dark:bg-stone-950 sm:p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                      <Icon size={23} />
                    </div>
                    <span className="text-3xl font-black tracking-tight text-orange-200 dark:text-orange-950">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-stone-950 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="page-container">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 px-6 py-12 shadow-2xl shadow-orange-950/15 sm:px-12 sm:py-16 lg:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
              <div className="absolute -end-20 -top-32 h-80 w-80 rounded-full border-[45px] border-white/10" />
              <div className="absolute -bottom-40 start-1/4 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/15 text-white backdrop-blur">
                <Heart size={27} />
              </div>

              <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {t.cta.title}
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-orange-50 sm:text-lg">
                {t.cta.description}
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/recipes"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-orange-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-50 focus:outline-none focus:ring-4 focus:ring-white/40"
                >
                  {t.cta.primaryAction}
                  <Arrow
                    size={17}
                    className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  />
                </Link>

                <Link
                  to="/chefs"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  <ChefHat size={17} />
                  {t.cta.secondaryAction}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
