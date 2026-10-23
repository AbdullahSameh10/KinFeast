import {
  ArrowRight,
  BookOpen,
  ChefHat,
  CircleHelp,
  CookingPot,
  LifeBuoy,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
  ChevronDown,
  MessageCircle,
  Compass,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../i18n";

type CategoryKey =
  | "gettingStarted"
  | "recipes"
  | "accounts"
  | "chefs"
  | "privacy"
  | "troubleshooting";

const CATEGORY_CONFIG = [
  {
    id: "gettingStarted",
    icon: Compass,
    color: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  },
  {
    id: "recipes",
    icon: CookingPot,
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  },
  {
    id: "accounts",
    icon: UserRound,
    color:
      "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  },
  {
    id: "chefs",
    icon: ChefHat,
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },
  {
    id: "privacy",
    icon: ShieldCheck,
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
  {
    id: "troubleshooting",
    icon: LifeBuoy,
    color:
      "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  },
] as const;

const CATEGORY_LINKS: Record<CategoryKey, string> = {
  gettingStarted: "/recipes",
  recipes: "/cook-with-what-you-have",
  accounts: "/login",
  chefs: "/chefs",
  privacy: "/privacy",
  troubleshooting: "/contact",
};

function HelpCenterPage() {
  useDocumentTitle("Help Center");

  const { language } = useLanguage();
  const t = translations[language].helpCenter;
  const isArabic = language === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<CategoryKey | "all">("all");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const categories = CATEGORY_CONFIG.map((config) => ({
    ...config,
    ...{
      ...t.categories[config.id],
    },
  }));

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();

  const filteredQuestions = useMemo(() => {
    return t.faq.questions.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      const searchableText =
        `${item.question} ${item.answer} ${t.categories[item.category].title}`
          .toLocaleLowerCase();

      const matchesSearch =
        !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [t, activeCategory, normalizedQuery]);

  const chooseCategory = (category: CategoryKey | "all") => {
    setActiveCategory(category);
    setOpenQuestion(null);
  };

  const runSearch = (value: string) => {
    setSearchQuery(value);
    setOpenQuestion(null);
  };

  const hasFilters =
    searchQuery.trim().length > 0 || activeCategory !== "all";

  const sectionHeadingClass =
    "text-2xl font-black tracking-tight text-stone-950 dark:text-white sm:text-3xl";

  const secondaryTextClass =
    "text-sm leading-7 text-stone-600 dark:text-stone-400 sm:text-base";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen overflow-hidden bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-white"
    >
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-stone-200/70 dark:border-stone-800">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-500/10" />
          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/10" />
        </div>

        <div className="page-container py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-orange-700 shadow-sm backdrop-blur dark:border-orange-900/60 dark:bg-stone-900/70 dark:text-orange-300">
              <Sparkles size={15} aria-hidden="true" />
              {t.hero.badge}
            </span>

            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-6xl">
              {t.hero.title}
              <span className="mt-2 block bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                {t.hero.highlight}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg">
              {t.hero.description}
            </p>

            <form
              className="mx-auto mt-9 flex max-w-2xl flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-2 shadow-xl shadow-orange-950/5 dark:border-stone-700 dark:bg-stone-900 sm:flex-row sm:items-center"
              role="search"
              onSubmit={(event) => {
                event.preventDefault();
                document
                  .getElementById("help-faq")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search
                  size={21}
                  className="shrink-0 text-orange-500"
                  aria-hidden="true"
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => runSearch(event.target.value)}
                  placeholder={t.hero.searchPlaceholder}
                  aria-label={t.hero.searchPlaceholder}
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400 dark:text-white dark:placeholder:text-stone-500 sm:text-base"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => runSearch("")}
                    aria-label={isArabic ? "مسح البحث" : "Clear search"}
                    className="rounded-lg p-2 text-stone-500 transition hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    <X size={17} aria-hidden="true" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-500/20"
              >
                <Search size={17} aria-hidden="true" />
                {t.hero.searchButton}
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-stone-500 dark:text-stone-400">
                {t.hero.popular}
              </span>

              {t.hero.popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    runSearch(term);
                    document
                      .getElementById("help-faq")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full border border-stone-200 bg-white/70 px-3 py-1.5 font-medium text-stone-600 transition hover:border-orange-300 hover:text-orange-700 dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-300 dark:hover:border-orange-700 dark:hover:text-orange-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="page-container py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-orange-600 dark:text-orange-400">
              <BookOpen size={17} aria-hidden="true" />
              {isArabic ? "اعثر على ما تحتاجه" : "FIND WHAT YOU NEED"}
            </span>

            <h2 className={sectionHeadingClass}>
              {t.categories.heading}
            </h2>

            <p className={`mx-auto mt-3 max-w-2xl ${secondaryTextClass}`}>
              {t.categories.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const selected = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    chooseCategory(category.id as CategoryKey)
                  }
                  aria-pressed={selected}
                  className={`group rounded-2xl border p-5 text-start transition duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-950/5 focus:outline-none focus:ring-4 focus:ring-orange-500/15 dark:hover:border-orange-800 ${
                    selected
                      ? "border-orange-400 bg-orange-50/70 ring-1 ring-orange-200 dark:border-orange-700 dark:bg-orange-950/20 dark:ring-orange-900"
                      : "border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${category.color}`}
                    >
                      <Icon size={23} aria-hidden="true" />
                    </span>

                    <ArrowRight
                      size={19}
                      aria-hidden="true"
                      className={`mt-1 shrink-0 text-stone-400 transition group-hover:text-orange-500 ${
                        isArabic
                          ? "rotate-180 group-hover:-translate-x-1"
                          : "group-hover:translate-x-1"
                      }`}
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-stone-900 dark:text-white">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-400">
                    {category.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="help-faq"
        className="scroll-mt-24 border-y border-stone-200/70 bg-white dark:border-stone-800 dark:bg-stone-900/40"
      >
        <div className="page-container py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-orange-600 dark:text-orange-400">
                  <CircleHelp size={18} aria-hidden="true" />
                  {isArabic ? "الإجابات التي تبحث عنها" : "ANSWERS THAT HELP"}
                </span>

                <h2 className={sectionHeadingClass}>
                  {t.faq.heading}
                </h2>

                <p className={`mt-3 ${secondaryTextClass}`}>
                  {t.faq.description}
                </p>
              </div>

              <p className="shrink-0 text-sm font-semibold text-stone-500 dark:text-stone-400">
                {isArabic
                  ? `${filteredQuestions.length} نتيجة`
                  : `${filteredQuestions.length} ${
                      filteredQuestions.length === 1 ? "result" : "results"
                    }`}
              </p>
            </div>

            {/* Filter controls */}
            <div className="mt-7 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => chooseCategory("all")}
                aria-pressed={activeCategory === "all"}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === "all"
                    ? "border-orange-600 bg-orange-600 text-white"
                    : "border-stone-200 bg-white text-stone-600 hover:border-orange-300 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
                }`}
              >
                {isArabic ? "الكل" : "All topics"}
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    chooseCategory(category.id as CategoryKey)
                  }
                  aria-pressed={activeCategory === category.id}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    activeCategory === category.id
                      ? "border-orange-600 bg-orange-600 text-white"
                      : "border-stone-200 bg-white text-stone-600 hover:border-orange-300 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {hasFilters && (
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => {
                    runSearch("");
                    chooseCategory("all");
                  }}
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300"
                >
                  <X size={15} aria-hidden="true" />
                  {t.faq.clearFilters}
                </button>
              </div>
            )}

            <div className="mt-7 space-y-3">
              {filteredQuestions.map((item, index) => {
                const expanded = openQuestion === item.id;

                return (
                  <article
                    key={item.id}
                    className={`overflow-hidden rounded-2xl border bg-white transition dark:bg-stone-950 ${
                      expanded
                        ? "border-orange-300 shadow-sm dark:border-orange-900"
                        : "border-stone-200 dark:border-stone-800"
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`question-${item.id}`}
                        aria-expanded={expanded}
                        aria-controls={`answer-${item.id}`}
                        onClick={() =>
                          setOpenQuestion(expanded ? null : item.id)
                        }
                        className="flex w-full items-center gap-4 px-5 py-5 text-start sm:px-6"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-sm font-bold text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="min-w-0 flex-1 text-sm font-bold leading-7 text-stone-900 dark:text-white sm:text-base">
                          {item.question}
                        </span>

                        <ChevronDown
                          size={20}
                          aria-hidden="true"
                          className={`shrink-0 text-stone-400 transition-transform duration-200 ${
                            expanded ? "rotate-180 text-orange-600" : ""
                          }`}
                        />
                      </button>
                    </h3>

                    {expanded && (
                      <div
                        id={`answer-${item.id}`}
                        role="region"
                        aria-labelledby={`question-${item.id}`}
                        className="border-t border-stone-100 px-5 pb-5 pt-4 dark:border-stone-800 sm:px-6 sm:pb-6"
                      >
                        <p className="text-sm leading-8 text-stone-600 dark:text-stone-300 sm:text-base">
                          {item.answer}
                        </p>

                        <Link
                          to={CATEGORY_LINKS[item.category]}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-700 transition hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300"
                        >
                          {isArabic ? "اعرف المزيد" : "Learn more"}
                          <ArrowRight
                            size={16}
                            aria-hidden="true"
                            className={isArabic ? "rotate-180" : ""}
                          />
                        </Link>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="mt-7 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 py-12 text-center dark:border-stone-700 dark:bg-stone-900/60">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                  <Search size={25} aria-hidden="true" />
                </span>

                <h3 className="mt-5 text-xl font-bold text-stone-900 dark:text-white">
                  {t.faq.emptyTitle}
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-stone-600 dark:text-stone-400">
                  {t.faq.emptyDescription}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    runSearch("");
                    chooseCategory("all");
                  }}
                  className="mt-6 rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-500/20"
                >
                  {t.faq.clearFilters}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Helpful links */}
      <section className="page-container py-14 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          <Link
            to="/recipes"
            className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-orange-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-800"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
              <CookingPot size={22} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold">
                {isArabic ? "تصفّح الوصفات" : "Browse Recipes"}
              </span>
              <span className="mt-1 block text-xs leading-5 text-stone-500 dark:text-stone-400">
                {isArabic ? "اكتشف أطباقًا جديدة" : "Discover something delicious"}
              </span>
            </span>
            <ArrowRight
              size={17}
              aria-hidden="true"
              className={`text-stone-400 transition group-hover:text-orange-500 ${
                isArabic ? "rotate-180" : ""
              }`}
            />
          </Link>

          <Link
            to="/chefs"
            className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-orange-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-800"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              <ChefHat size={22} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold">
                {isArabic ? "اكتشف الطهاة" : "Meet the Chefs"}
              </span>
              <span className="mt-1 block text-xs leading-5 text-stone-500 dark:text-stone-400">
                {isArabic ? "تعرّف على مجتمع الطهاة" : "Explore chef profiles"}
              </span>
            </span>
            <ArrowRight
              size={17}
              aria-hidden="true"
              className={`text-stone-400 transition group-hover:text-orange-500 ${
                isArabic ? "rotate-180" : ""
              }`}
            />
          </Link>

          <Link
            to="/contact"
            className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-orange-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-800"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              <MessageCircle size={22} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold">
                {isArabic ? "تواصل معنا" : "Contact Us"}
              </span>
              <span className="mt-1 block text-xs leading-5 text-stone-500 dark:text-stone-400">
                {isArabic ? "نحن هنا للمساعدة" : "We're here to help"}
              </span>
            </span>
            <ArrowRight
              size={17}
              aria-hidden="true"
              className={`text-stone-400 transition group-hover:text-orange-500 ${
                isArabic ? "rotate-180" : ""
              }`}
            />
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="page-container pb-16 sm:pb-20">
        <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-orange-600 to-amber-600 px-6 py-12 text-center shadow-xl shadow-orange-950/10 sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-white/10 blur-2xl"
          />

          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white">
            <CircleHelp size={28} aria-hidden="true" />
          </span>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-orange-100">
            {t.contact.eyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            {t.contact.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-orange-50 sm:text-base">
            {t.contact.description}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-orange-700 transition hover:bg-orange-50 focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              <MessageCircle size={18} aria-hidden="true" />
              {t.contact.button}
              <ArrowRight
                size={17}
                aria-hidden="true"
                className={isArabic ? "rotate-180" : ""}
              />
            </Link>

            <Link
              to="/recipes"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              {t.contact.browseRecipes}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HelpCenterPage;
