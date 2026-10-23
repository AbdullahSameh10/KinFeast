import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  ChefHat,
  Mail,
  MessageSquareText,
  Newspaper,
  Quote,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../i18n";

function PressPage() {
  const { language } = useLanguage();
  const t = translations[language].press;
  const isArabic = language === "ar";
  const DirectionArrow = isArabic ? ArrowLeft : ArrowRight;

  useDocumentTitle("Press & Media");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const resourceCards = [
    { icon: BookOpen, ...t.resources.story },
    { icon: Camera, ...t.resources.brand },
    { icon: Newspaper, ...t.resources.coverage },
  ];

  const storyCards = [
    { icon: ChefHat, ...t.highlights.recipes },
    { icon: Sparkles, ...t.highlights.discovery },
    { icon: MessageSquareText, ...t.highlights.community },
  ];

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <section className="relative isolate overflow-hidden border-b border-stone-200/70 dark:border-stone-800">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-100/80 via-stone-50 to-amber-50/50 dark:from-orange-950/40 dark:via-stone-950 dark:to-stone-900" />
        <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border border-orange-300/40 dark:border-orange-700/30" />
        <div aria-hidden="true" className="absolute -right-12 -top-12 -z-10 h-56 w-56 rounded-full border border-orange-300/40 dark:border-orange-700/30" />

        <div className="page-container grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm dark:border-orange-900/70 dark:bg-stone-900/70 dark:text-orange-300">
              <Newspaper size={16} />
              <span>{t.hero.eyebrow}</span>
            </div>
            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-6xl">
              {t.hero.title} <span className="text-orange-600 dark:text-orange-400">{t.hero.highlight}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-300 sm:text-lg">
              {t.hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#media-contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600">
                <Mail size={18} /> {t.hero.primaryAction}
              </a>
              <a href="#about-kinfeast" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white/80 px-6 py-3 font-bold text-stone-800 transition hover:border-orange-300 hover:text-orange-700 dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-100 dark:hover:border-orange-700 dark:hover:text-orange-300">
                {t.hero.secondaryAction} <ArrowDownRight size={18} className={isArabic ? "rotate-90" : ""} />
              </a>
            </div>
            <p className="mt-5 text-sm text-stone-500 dark:text-stone-400">{t.hero.note}</p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-orange-200/60 to-amber-100/40 blur-2xl dark:from-orange-900/20 dark:to-amber-900/10" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-2xl shadow-stone-900/10 dark:border-stone-700 dark:bg-stone-900/90 sm:p-8">
              <div className="flex items-center justify-between border-b border-stone-100 pb-5 dark:border-stone-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-300"><Quote size={24} /></div>
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-stone-500 dark:bg-stone-800 dark:text-stone-400">{t.pressCard.label}</span>
              </div>
              <p className="mt-6 text-2xl font-extrabold leading-snug text-stone-900 dark:text-white">{t.pressCard.title}</p>
              <p className="mt-3 leading-7 text-stone-600 dark:text-stone-300">{t.pressCard.description}</p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-orange-50 p-4 dark:bg-orange-950/30"><ChefHat className="mb-3 text-orange-600 dark:text-orange-300" size={22} /><p className="text-sm font-bold">{t.pressCard.pointOne}</p></div>
                <div className="rounded-2xl bg-stone-100 p-4 dark:bg-stone-800"><Sparkles className="mb-3 text-amber-600 dark:text-amber-300" size={22} /><p className="text-sm font-bold">{t.pressCard.pointTwo}</p></div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-orange-700 dark:text-orange-300"><span className="h-2 w-2 rounded-full bg-orange-500" />{t.pressCard.footer}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about-kinfeast" className="page-container scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">{t.about.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{t.about.title}</h2>
          <p className="mt-5 text-base leading-8 text-stone-600 dark:text-stone-300">{t.about.description}</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {storyCards.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-stone-200 bg-white p-6 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-300"><Icon size={23} /></div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200/80 bg-white py-16 dark:border-stone-800 dark:bg-stone-900/50 sm:py-20">
        <div className="page-container">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">{t.resources.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{t.resources.title}</h2>
            <p className="mt-4 leading-7 text-stone-600 dark:text-stone-300">{t.resources.description}</p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {resourceCards.map(({ icon: Icon, title, description }) => (
              <article key={title} className="flex gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-stone-900">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm dark:bg-stone-800 dark:text-orange-300"><Icon size={21} /></div>
                <div><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{description}</p></div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-stone-500 dark:text-stone-400">{t.resources.availabilityNote}</p>
        </div>
      </section>

      <section id="media-contact" className="page-container scroll-mt-24 py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-stone-900 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14 lg:px-14">
          <div aria-hidden="true" className="absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -right-2 -top-12 h-48 w-48 rounded-full border border-white/10" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">{t.contact.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{t.contact.title}</h2>
              <p className="mt-4 leading-8 text-stone-300">{t.contact.description}</p>
              <p className="mt-4 text-sm text-stone-400">{t.contact.guidance}</p>
            </div>
            <a href={`mailto:hello@kinfeast.com?subject=${encodeURIComponent(t.contact.emailSubject)}`} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-600">
              <Mail size={19} /> <span>hello@kinfeast.com</span> <DirectionArrow size={18} />
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-stone-200 pt-6 text-sm text-stone-500 dark:border-stone-800 dark:text-stone-400 sm:flex-row sm:items-center">
          <p>{t.bottomNote}</p>
          <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-orange-700 transition hover:text-orange-600 dark:text-orange-300">{t.aboutLink} <DirectionArrow size={16} /></Link>
        </div>
      </section>
    </main>
  );
}

export default PressPage;
