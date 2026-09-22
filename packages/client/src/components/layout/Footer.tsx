import { Link } from "react-router-dom";
import { ArrowRight, Download, Mail, MapPin, Phone } from "lucide-react";
import logoDark from "../../assets/logo (dark).png";
import logoLight from "../../assets/logo (light).png";
import { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";
import {
  FaFacebook,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

import appStore from "./../../assets/app-store.svg";
import googlePlay from "./../../assets/google-play.svg";

const SOCIAL_LINKS = [
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  {
    icon: FaPinterestP,
    href: "#",
    label: "Pinterest",
    color: "hover:text-red-500",
  },
  {
    icon: FaTiktok,
    href: "#",
    label: "TikTok",
    color: "hover:text-stone-900 dark:hover:text-white",
  },
  { icon: FaYoutube, href: "#", label: "YouTube", color: "hover:text-red-500" },
  {
    icon: FaFacebook,
    href: "#",
    label: "Facebook",
    color: "hover:text-blue-600",
  },
];

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { language, setLanguage } = useLanguage();
  const t = translations[language].footer;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmail("");
    }
  };

  const columnEntries = [
    t.columns.discover,
    t.columns.community,
    t.columns.company,
  ];

  return (
    <footer className="relative bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />

      <div className="page-container py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-3">
            <Link to="/" className="inline-block">
              <img
                src={logoDark}
                alt="KinFeast"
                width={160}
                height={42}
                className="hidden dark:block"
              />
              <img
                src={logoLight}
                alt="KinFeast"
                width={160}
                height={42}
                className="block dark:hidden"
              />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {t.brand.description}
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-stone-600 dark:text-stone-400">
                <Mail size={16} className="text-orange-400" />
                <a
                  href={`mailto:${t.contact.email}`}
                  className="hover:text-orange-500"
                >
                  {t.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600 dark:text-stone-400">
                <Phone size={16} className="text-orange-400" />
                <span>{t.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600 dark:text-stone-400">
                <MapPin size={16} className="text-orange-400" />
                <span>{t.contact.address}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors dark:bg-stone-800 dark:text-stone-400 ${color}`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {columnEntries.map((col) => (
                <div key={col.title}>
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
                    {col.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {col.links.map((item) => (
                      <li key={item}>
                        <Link
                          to="#"
                          className="group flex items-center text-sm text-stone-600 transition-colors hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
                        >
                          <span className="relative">
                            {String(item)}
                            {"hiringBadge" in col && item === col.links[1] && (
                              <span className="ms-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                {String(col.hiringBadge)}
                              </span>
                            )}
                            <span className="absolute -bottom-0.5 start-0 h-px w-0 bg-orange-400 transition-all group-hover:w-full" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter + app download */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50/70 p-6 dark:from-orange-950/20 dark:to-amber-950/10">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
                {t.newsletter.title}
              </h3>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                {t.newsletter.description}
              </p>

              <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.newsletter.placeholder}
                    aria-label={t.newsletter.placeholder}
                    className="h-11 flex-1 rounded-xl border-0 bg-white/70 px-4 text-sm text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:ring-2 focus:ring-orange-400 dark:bg-stone-800/50 dark:text-white dark:placeholder:text-stone-500"
                    required
                  />
                  <button
                    type="submit"
                    className="group relative h-11 min-w-[100px] overflow-hidden rounded-xl bg-orange-500 px-4 text-sm font-semibold text-white transition-all hover:bg-orange-600 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {t.newsletter.subscribe}
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      />
                    </span>
                  </button>
                </div>
                {isSubmitted && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {t.newsletter.thanks}
                  </p>
                )}
              </form>
              <p className="mt-3 text-[10px] text-stone-400 dark:text-stone-500">
                {t.newsletter.disclaimer}
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href="#"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 px-3 py-2.5 text-xs font-medium text-stone-700 transition-colors hover:border-orange-400 hover:text-orange-500 dark:border-stone-700 dark:text-stone-300 rtl:flex-row-reverse"
              >
                <img src={appStore} alt="App Store" width={14} height={14} />
                App Store
                <Download size={14} />
              </a>
              <a
                href="#"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 px-3 py-2.5 text-xs font-medium text-stone-700 transition-colors hover:border-orange-400 hover:text-orange-500 dark:border-stone-700 dark:text-stone-300 rtl:flex-row-reverse"
              >
                <img
                  src={googlePlay}
                  alt="Google Play"
                  width={14}
                  height={14}
                />
                Google Play
                <Download size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-200/70 dark:border-stone-800/70">
        <div className="page-container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <div className="order-2 text-xs text-stone-400 dark:text-stone-500 md:order-1">
            © {new Date().getFullYear()} KinFeast. {t.copyright}
          </div>

          <div className="order-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs md:order-2">
            <Link
              to="/privacy"
              className="text-stone-500 hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
            >
              {t.legal.privacy}
            </Link>
            <Link
              to="/terms"
              className="text-stone-500 hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
            >
              {t.legal.terms}
            </Link>
            <Link
              to="/cookies"
              className="text-stone-500 hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
            >
              {t.legal.cookies}
            </Link>
            <Link
              to="/accessibility"
              className="text-stone-500 hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
            >
              {t.legal.accessibility}
            </Link>
          </div>

          <select
            aria-label={t.languageSelectorLabel}
            value={language}
            onChange={(e) => setLanguage(e.target.value as typeof language)}
            className="order-3 rounded-lg border border-stone-200 bg-transparent px-2 py-1.5 text-xs text-stone-500 outline-none dark:border-stone-700 dark:text-stone-400"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
