import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  Compass,
  Home,
  Search,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useDocumentTitle } from "./../hooks/useDocumentTitle";
import { useLanguage } from "./../hooks/useLanguage";
import { translations } from "./../i18n";
import { useEffect } from "react";

function NotFoundPage() {
  const { language } = useLanguage();
  const t = translations[language].notFound;

  const isArabic = language === "ar";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  useDocumentTitle("Page Not Found");

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  return (
    <main className="relative isolate flex min-h-[65vh] items-center justify-center overflow-hidden bg-gradient-to-br from-stone-50 via-orange-50/40 to-amber-50/30 px-4 py-16 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 sm:px-6 sm:py-20">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-500/10" />

        <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/10" />

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-300/10 blur-3xl dark:bg-rose-500/5" />
      </div>

      <div className="mx-auto w-full max-w-3xl text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
          <div className="absolute inset-0 rounded-[2.5rem] rotate-6 bg-gradient-to-br from-orange-200/70 to-amber-200/60 dark:from-orange-950/60 dark:to-amber-950/40" />

          <div className="absolute inset-2 rounded-[2rem] border border-white/80 bg-white/80 shadow-xl shadow-orange-950/5 backdrop-blur dark:border-stone-700 dark:bg-stone-900/80" />

          <div className="relative flex flex-col items-center">
            <UtensilsCrossed
              size={48}
              strokeWidth={1.6}
              className="text-orange-500 sm:h-14 sm:w-14"
            />

            <span className="mt-2 text-5xl font-black tracking-tighter text-stone-900 dark:text-white sm:text-6xl">
              404
            </span>
          </div>

          <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-200 bg-orange-100 text-orange-600 shadow-lg dark:border-orange-900/60 dark:bg-orange-950 dark:text-orange-400">
            <Search size={21} />
          </div>

          <div className="absolute -bottom-2 -left-3 flex h-11 w-11 items-center justify-center rounded-xl border border-amber-200 bg-amber-100 text-amber-700 shadow-lg dark:border-amber-900/60 dark:bg-amber-950 dark:text-amber-400">
            <ChefHat size={22} />
          </div>
        </div>

        {/* Heading */}
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-700 shadow-sm backdrop-blur dark:border-orange-900/60 dark:bg-stone-900/70 dark:text-orange-300">
          <Compass size={15} />
          {t.badge}
        </span>

        <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-6xl">
          {t.title}

          <span className="mt-2 block bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
            {t.highlight}
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-stone-600 dark:text-stone-300 sm:text-base sm:leading-8">
          {t.description}
        </p>

        {/* Navigation actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/30"
          >
            <Home size={17} />
            {t.homeAction}
          </Link>

          <Link
            to="/recipes"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white/80 px-6 py-3 text-sm font-bold text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/20 dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
          >
            <UtensilsCrossed size={17} />
            {t.recipesAction}
            <Arrow
              size={16}
              className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            />
          </Link>
        </div>

        <p className="mt-8 text-sm text-stone-500 dark:text-stone-400">
          {t.chefPrompt}{" "}
          <Link
            to="/chefs"
            className="font-bold text-orange-600 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-700 dark:text-orange-400 dark:decoration-orange-800 dark:hover:text-orange-300"
          >
            {t.chefsLink}
          </Link>
        </p>

        <div
          aria-hidden="true"
          className="mx-auto mt-12 h-1 w-16 rounded-full bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400"
        />
      </div>
    </main>
  );
}

export default NotFoundPage;