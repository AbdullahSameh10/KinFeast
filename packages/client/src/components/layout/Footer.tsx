import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";

import logoDark from "../../assets/logo (dark).png";
import logoLight from "../../assets/logo (light).png";

import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

const SOCIAL_LINKS = [
  {
    icon: FaInstagram,
    href: "/social/instagram",
    label: "instagram" as const,
    color: "hover:text-pink-500",
  },
  {
    icon: FaYoutube,
    href: "/social/youtube",
    label: "youtube" as const,
    color: "hover:text-red-500",
  },
  {
    icon: FaTiktok,
    href: "/social/tiktok",
    label: "tiktok" as const,
    color: "hover:text-stone-950 dark:hover:text-white",
  },
  {
    icon: FaPinterestP,
    href: "/social/pinterest",
    label: "pinterest" as const,
    color: "hover:text-red-500",
  },
  {
    icon: FaXTwitter,
    href: "/social/x",
    label: "x" as const,
    color: "hover:text-stone-950 dark:hover:text-white",
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

    if (!email) {
      return;
    }

    setIsSubmitted(true);
    setEmail("");

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const columnEntries = [
    t.columns.discover,
    t.columns.joinKinFeast,
    t.columns.company,
    t.columns.business,
    t.columns.support,
  ];

  return (
    <footer className="relative border-t border-stone-200/70 bg-gradient-to-b from-stone-50 to-white dark:border-stone-800/70 dark:from-stone-950 dark:to-stone-900">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

      <div className="page-container py-14 sm:py-16 lg:py-20">
        {/* Brand row */}
        <div className="flex flex-col gap-8 border-b border-stone-200/70 pb-10 dark:border-stone-800/70 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
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

            <p className="mt-4 text-base font-medium text-stone-800 dark:text-stone-200">
              {t.brand.tagline}
            </p>

            <p className="mt-2 max-w-xl text-sm leading-7 text-stone-600 dark:text-stone-400">
              {t.brand.description}
            </p>
          </div>

          {/* Language selector */}
          <div className="shrink-0">
            <label className="sr-only" htmlFor="footer-language">
              {t.languageSelectorLabel}
            </label>

            <select
              id="footer-language"
              aria-label={t.languageSelectorLabel}
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value as typeof language)
              }
              className="rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 outline-none transition-colors hover:border-orange-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid gap-12 py-12 lg:grid-cols-12">
          {/* Contact / newsletter */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold text-stone-900 dark:text-white">
              {t.newsletter.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
              {t.newsletter.description}
            </p>

            <form onSubmit={handleSubmit} className="mt-5">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletter.placeholder}
                  aria-label={t.newsletter.placeholder}
                  required
                  className="h-11 min-w-0 flex-1 rounded-xl border border-stone-200 bg-white px-3.5 text-sm text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:placeholder:text-stone-500"
                />

                <button
                  type="submit"
                  aria-label={t.newsletter.subscribe}
                  className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white transition-all hover:bg-orange-600 active:scale-95"
                >
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  />
                </button>
              </div>

              {isSubmitted && (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {t.newsletter.thanks}
                </p>
              )}
            </form>

            <p className="mt-2 text-[11px] leading-5 text-stone-400 dark:text-stone-500">
              {t.newsletter.disclaimer}
            </p>

            <div className="mt-7 space-y-3">
              <a
                href={`mailto:${t.contact.email}`}
                className="flex items-center gap-3 text-sm text-stone-600 transition-colors hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
              >
                <Mail
                  size={16}
                  className="shrink-0 text-orange-500"
                />
                <span>{t.contact.email}</span>
              </a>

              <a
                href={`tel:${translations.en.footer.contact.phone.replace(
                  /\s+/g,
                  "",
                )}`}
                className="flex items-center gap-3 text-sm text-stone-600 transition-colors hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
              >
                <Phone
                  size={16}
                  className="shrink-0 text-orange-500"
                />
                <span>{t.contact.phone}</span>
              </a>

              <div className="flex items-start gap-3 text-sm text-stone-600 dark:text-stone-400">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-orange-500"
                />
                <span>{t.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Footer columns */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 xl:grid-cols-5">
              {columnEntries.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
                    {column.title}
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {column.links.map((item, index) => (
                      <li key={item}>
                        <Link
                          to={column.hrefs[index]}
                          className="group inline-flex items-center text-sm text-stone-600 transition-colors hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
                        >
                          <span className="relative">
                            {String(item)}

                            {"hiringBadge" in column &&
                              index === 3 && (
                                <span className="ms-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                  {String(column.hiringBadge)}
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
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-200/70 dark:border-stone-800/70">
        <div className="page-container flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Copyright */}
          <p className="text-xs text-stone-500 dark:text-stone-500">
            © {new Date().getFullYear()} KinFeast. {t.legal.copyright}
          </p>

          {/* Social links */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(
              ({ icon: Icon, href, label, color }) => (
                <Link
                  key={label}
                  to={href}
                  aria-label={String(t.social[label as keyof typeof t.social])}
                  title={String(t.social[label as keyof typeof t.social])}
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors dark:bg-stone-800 dark:text-stone-400 ${color}`}
                >
                  <Icon size={15} />
                </Link>
              ),
            )}
          </div>

          {/* Made with care */}
          <p className="text-xs text-stone-500 dark:text-stone-500 lg:text-end">
            {t.madeWithCare}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;