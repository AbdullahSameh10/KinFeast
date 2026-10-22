
import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  Home,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

function ChefNotFoundPage() {
  const { language } = useLanguage();
  const t = translations[language].chefs.details.notFoundPage;

  const isArabic = language === "ar";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  useDocumentTitle("Chef Not Found");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-stone-50 px-4 py-16 dark:bg-stone-950 sm:px-6 sm:py-20">
      {/* Chef-themed background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/10" />
        <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-500/10" />
      </div>

      <div className="mx-auto w-full max-w-3xl text-center">
        {/* Independent chef-profile illustration */}
        <div className="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
          <div className="absolute inset-0 -rotate-6 rounded-[3rem] bg-gradient-to-br from-amber-200/80 via-orange-200/60 to-rose-200/50 dark:from-amber-950/60 dark:via-orange-950/50 dark:to-rose-950/40" />

          <div className="absolute inset-2 rounded-[2.5rem] border border-white/80 bg-white/85 shadow-xl shadow-stone-950/5 backdrop-blur dark:border-stone-700 dark:bg-stone-900/85" />

          <div className="relative flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/70 dark:text-orange-400 sm:h-20 sm:w-20">
              <ChefHat
                size={42}
                strokeWidth={1.6}
                className="sm:h-12 sm:w-12"
              />
            </div>

            <span className="mt-2 text-4xl font-black tracking-tighter text-stone-900 dark:text-white sm:text-5xl">
              404
            </span>
          </div>

          <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200 bg-amber-100 text-amber-700 shadow-lg dark:border-amber-900/60 dark:bg-amber-950 dark:text-amber-400">
            <Sparkles size={21} />
          </div>

          <div className="absolute -bottom-2 -left-3 flex h-11 w-11 items-center justify-center rounded-xl border border-orange-200 bg-orange-100 text-orange-600 shadow-lg dark:border-orange-900/60 dark:bg-orange-950 dark:text-orange-400">
            <Users size={21} />
          </div>
        </div>

        {/* Context-specific message */}
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-800 shadow-sm backdrop-blur dark:border-amber-900/60 dark:bg-stone-900/70 dark:text-amber-300">
          <ChefHat size={15} />
          {t.badge}
        </span>

        <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-6xl">
          {t.title}

          <span className="mt-2 block bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
            {t.highlight}
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-stone-600 dark:text-stone-300 sm:text-base sm:leading-8">
          {t.description}
        </p>

        {/* Navigation actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/chefs"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/30"
          >
            <Users size={17} />
            {t.chefsAction}
            <Arrow
              size={16}
              className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            />
          </Link>

          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white/80 px-6 py-3 text-sm font-bold text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/20 dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
          >
            <Home size={17} />
            {t.homeAction}
          </Link>
        </div>

        <div
          aria-hidden="true"
          className="mx-auto mt-12 h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400"
        />
      </div>
    </main>
  );
}

export default ChefNotFoundPage;
