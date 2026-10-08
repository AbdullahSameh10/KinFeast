import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Construction, Home } from "lucide-react";

import { useLanguage } from "./../hooks/useLanguage";
import { useDocumentTitle } from "./../hooks/useDocumentTitle";
import { useEffect } from "react";

const PAGE_CONTENT = {
  en: {
    title: "This KinFeast feature is under development",
    description:
      "You found one of the pages we're currently building. The link is already connected, and this space will soon become a complete KinFeast experience.",
    back: "Go back",
    home: "Back to home",
    badge: "Under development",
  },
  ar: {
    title: "هذه الميزة في KinFeast قيد التطوير",
    description:
      "لقد وصلت إلى إحدى الصفحات التي نعمل على تطويرها حاليًا. الرابط متصل بالفعل، وستتحول هذه المساحة قريبًا إلى تجربة KinFeast متكاملة.",
    back: "العودة",
    home: "العودة إلى الرئيسية",
    badge: "قيد التطوير",
  },
} as const;

function DevelopmentPage() {
  const location = useLocation();
  const { language } = useLanguage();

  const content = PAGE_CONTENT[language];

  useDocumentTitle("Under Development");

  const isArabic = language === "ar";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-[70vh] bg-white dark:bg-stone-950">
      <div className="page-container flex min-h-[70vh] items-center justify-center py-20">
        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-100 text-orange-500 dark:bg-orange-950/30 dark:text-orange-400">
            <Construction size={36} strokeWidth={1.8} />
          </div>

          <div className="mt-7 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/20 dark:text-orange-400">
            {content.badge}
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
            {content.title}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-stone-600 dark:text-stone-400">
            {content.description}
          </p>

          <p
            dir="ltr"
            className="mt-4 text-xs text-stone-400 dark:text-stone-600"
          >
            {location.pathname}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-stone-200 px-5 text-sm font-semibold text-stone-700 transition-colors hover:border-orange-400 hover:text-orange-500 dark:border-stone-700 dark:text-stone-300 dark:hover:border-orange-500 dark:hover:text-orange-400"
            >
              {isArabic ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              {content.back}
            </button>

            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              <Home size={16} />
              {content.home}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DevelopmentPage;
