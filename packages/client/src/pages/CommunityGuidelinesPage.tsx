import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChefHat,
  HeartHandshake,
  Home,
  MessageCircleWarning,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { useLanguage } from "../hooks/useLanguage";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

import { communityGuidelines as enGuidelines } from "../i18n/en/communityGuidelines";
import { communityGuidelines as arGuidelines } from "../i18n/ar/communityGuidelines";

const ICONS = [
  HeartHandshake,
  ChefHat,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MessageCircleWarning,
  MessageCircleWarning,
  ShieldCheck,
];

function CommunityGuidelinesPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const content = isArabic ? arGuidelines : enGuidelines;

  useDocumentTitle("Community Guidelines");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "en"}
      className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100"
    >
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-orange-100/80 bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:border-stone-800 dark:from-stone-900 dark:via-stone-950 dark:to-stone-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-24 -top-28 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-500/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-36 -start-24 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl dark:bg-amber-500/10"
        />

        <div className="page-container relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200/70 bg-white/90 text-orange-500 shadow-sm dark:border-orange-900/50 dark:bg-stone-900 dark:text-orange-400">
              <HeartHandshake size={30} strokeWidth={1.7} />
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100/70 px-4 py-2 text-xs font-semibold text-orange-700 dark:border-orange-900/60 dark:bg-orange-950/40 dark:text-orange-300">
              <Sparkles size={14} />
              {content.badge}
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl lg:text-5xl">
              {content.title}
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg">
              {content.subtitle}
            </p>

            <p className="mt-5 text-xs font-medium text-stone-500 dark:text-stone-400">
              {content.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="page-container py-10 sm:py-14">
        <div className="mx-auto max-w-5xl">
          {/* Introduction */}
          <section className="mb-8 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                <ChefHat size={23} />
              </div>

              <div className="min-w-0">
                <h2 className="text-xl font-bold text-stone-900 dark:text-white sm:text-2xl">
                  {content.introduction.title}
                </h2>

                <p className="mt-3 text-sm leading-8 text-stone-600 dark:text-stone-300 sm:text-base">
                  {content.introduction.description}
                </p>
              </div>
            </div>
          </section>

          {/* Guideline sections */}
          <div className="space-y-5">
            {content.sections.map((section, index) => {
              const Icon = ICONS[index] ?? CheckCircle2;

              return (
                <section
                  key={section.number}
                  className="group rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm transition-colors hover:border-orange-200 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-900/70 sm:p-8"
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-100 dark:bg-orange-950/40 dark:text-orange-400 dark:group-hover:bg-orange-950/70 sm:h-14 sm:w-14">
                      <Icon size={25} strokeWidth={1.7} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          dir="ltr"
                          className="inline-flex h-7 min-w-9 items-center justify-center rounded-lg bg-stone-100 px-2 text-xs font-bold tabular-nums text-stone-500 dark:bg-stone-800 dark:text-stone-400"
                        >
                          {section.number}
                        </span>

                        <h2 className="text-lg font-bold leading-7 text-stone-900 dark:text-white sm:text-xl">
                          {section.title}
                        </h2>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300 sm:text-base sm:leading-8">
                        {section.description}
                      </p>

                      <ul className="mt-5 space-y-3">
                        {section.points.map((point, pointIndex) => (
                          <li
                            key={`${section.number}-${pointIndex}`}
                            className="flex items-start gap-3 text-sm leading-7 text-stone-600 dark:text-stone-300 sm:text-base"
                          >
                            <CheckCircle2
                              size={18}
                              strokeWidth={1.8}
                              className="mt-1 shrink-0 text-orange-500 dark:text-orange-400"
                              aria-hidden="true"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Closing section */}
          <section className="mt-8 overflow-hidden rounded-3xl border border-orange-200/70 bg-gradient-to-br from-orange-50 to-amber-50 p-6 dark:border-orange-900/50 dark:from-stone-900 dark:to-orange-950/20 sm:p-9">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm dark:bg-stone-800 dark:text-orange-400">
                <HeartHandshake size={25} />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-extrabold text-stone-900 dark:text-white sm:text-2xl">
                  {content.closing.title}
                </h2>

                <p className="mt-3 text-sm leading-8 text-stone-600 dark:text-stone-300 sm:text-base">
                  {content.closing.description}
                </p>

                <div className="mt-7 border-t border-orange-200/70 pt-6 dark:border-stone-700">
                  <h3 className="text-base font-bold text-stone-900 dark:text-white">
                    {content.closing.contactTitle}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
                    {content.closing.contactDescription}
                  </p>

                  <Link
                    to="/contact"
                    className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-900"
                  >
                    {content.closing.contactButton}
                    {isArabic ? (
                      <ArrowLeft size={16} />
                    ) : (
                      <ArrowRight size={16} />
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition-colors hover:border-orange-300 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-orange-800 dark:hover:text-orange-400"
            >
              {isArabic ? (
                <ArrowRight size={17} />
              ) : (
                <ArrowLeft size={17} />
              )}
              {content.backButton}
            </button>

            <Link
              to="/"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition-colors hover:border-orange-300 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-orange-800 dark:hover:text-orange-400"
            >
              <Home size={17} />
              {content.homeButton}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CommunityGuidelinesPage;
