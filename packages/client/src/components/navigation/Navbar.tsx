import { Link } from "react-router-dom";
import {
  Globe2,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import logoDark from "../../assets/logo (dark).png";
import logoLight from "../../assets/logo (light).png";

import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import { useAuth } from "../../hooks/useAuth";
import type { Language } from "../../context/LanguageContext";
import { translations } from "../../i18n";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  const t = translations[language].navbar;

  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const navigation = !isAuthenticated
    ? [
        { label: t.discover, href: "/" },
        { label: t.recipes, href: "/recipes" },
        { label: t.chefs, href: "/chefs" },
        { label: t.about, href: "/about" },
      ]
    : user?.role === "admin"
      ? [
          { label: t.dashboard, href: "/admin" },
          { label: t.users, href: "/admin/users" },
        ]
      : user?.role === "chef"
        ? [
            { label: t.dashboard, href: "/chef" },
            { label: t.recipes, href: "/recipes" },
          ]
        : [
            { label: t.dashboard, href: "/dashboard" },
            { label: t.recipes, href: "/recipes" },
            { label: t.chefs, href: "/chefs" },
          ];

  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setIsLanguageOpen(false);
    setIsMobileLanguageOpen(false);
  };

  const closeMobileMenu = () => {
  setIsMenuOpen(false);
  setIsMobileLanguageOpen(false);
};

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  // Close menus when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsLanguageOpen(false);
        setIsMobileLanguageOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/95 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
      <nav
        className="page-container flex h-20 items-center justify-between gap-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="user-select-none shrink-0"
          aria-label="KinFeast home"
          onClick={closeMobileMenu}
        >
          <img
            src={logoDark}
            alt="KinFeast"
            width={200}
            height={53}
            className="hidden scale-90 dark:block"
          />

          <img
            src={logoLight}
            alt="KinFeast"
            width={200}
            height={53}
            className="block scale-90 dark:hidden"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((navItem) => (
            <Link
              key={navItem.href}
              to={navItem.href}
              className="text-sm font-medium text-stone-700 transition-colors duration-300 hover:text-orange-500 dark:text-stone-200 dark:hover:text-orange-500"
            >
              {navItem.label}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search */}
          <button
            type="button"
            aria-label={t.search}
            className="rounded-full p-2.5 text-stone-700 transition-colors hover:bg-stone-200 hover:text-stone-950 dark:text-stone-200 dark:hover:bg-stone-800 dark:hover:text-white"
          >
            <Search size={19} strokeWidth={2} />
          </button>

          {/* Language Selector */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => {
                setIsLanguageOpen((current) => !current);
                setIsProfileOpen(false);
              }}
              aria-label={t.language}
              aria-expanded={isLanguageOpen}
              className="rounded-full p-2.5 text-stone-700 transition-colors hover:bg-stone-200 hover:text-stone-950 dark:text-stone-200 dark:hover:bg-stone-800 dark:hover:text-white"
            >
              <Globe2 size={19} strokeWidth={2} />
            </button>

            {isLanguageOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-2xl border border-stone-200 bg-white p-1.5 shadow-xl dark:border-stone-700 dark:bg-stone-900">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleLanguageChange(item.code)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      language === item.code
                        ? "bg-orange-500/10 font-semibold text-orange-600 dark:bg-orange-400/10 dark:text-orange-400"
                        : "text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800"
                    }`}
                  >
                    <span>{item.label}</span>

                    {language === item.code && (
                      <span
                        className="text-xs text-orange-500 dark:text-orange-400"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t.lightMode : t.darkMode}
            className="rounded-full p-2.5 text-stone-700 transition-colors hover:bg-stone-200 hover:text-stone-950 dark:text-stone-200 dark:hover:bg-stone-800 dark:hover:text-white"
          >
            {theme === "dark" ? (
              <Sun size={19} strokeWidth={2} />
            ) : (
              <Moon size={19} strokeWidth={2} />
            )}
          </button>

          {/* Auth Actions */}
          {isAuthenticated && user ? (
            <div
              ref={profileRef}
              className="relative hidden sm:block"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsProfileOpen((current) => !current)}
                aria-label={t.profile}
                aria-expanded={isProfileOpen}
                className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white text-stone-700 transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-500/50 dark:hover:bg-orange-500/10 dark:hover:text-orange-400"
              >
                {user.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={20} strokeWidth={2} />
                )}
              </button>

              <div
                className={`absolute right-0 top-full pt-2 transition-all duration-200 ${
                  isProfileOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0"
                }`}
              >
                <div className="w-72 overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-xl dark:border-stone-700 dark:bg-stone-900">
                  {/* Account Info */}
                  <div className="flex items-center gap-3 rounded-xl px-3 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400">
                      {user.profile_image ? (
                        <img
                          src={user.profile_image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound size={18} strokeWidth={2} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-stone-900 dark:text-white">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-stone-500 dark:text-stone-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="my-1 border-t border-stone-100 dark:border-stone-800" />

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-stone-700 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-stone-200 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                  >
                    <LogOut size={18} strokeWidth={2} />
                    <span>{t.logout}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Desktop Login */}
              <Link
                to="/login"
                viewTransition
                className="hidden rounded-full px-4 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-200 dark:text-stone-200 dark:hover:bg-stone-800 sm:block"
              >
                {t.login}
              </Link>

              {/* Desktop Signup */}
              <Link
                to="/register"
                viewTransition
                className="hidden rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200 sm:block"
              >
                {t.signup}
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen((current) => !current);
              setIsLanguageOpen(false);
              setIsProfileOpen(false);
            }}
            aria-label={t.menu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="relative rounded-full p-2.5 text-stone-700 transition-colors hover:bg-stone-200 hover:text-stone-950 dark:text-stone-200 dark:hover:bg-stone-800 dark:hover:text-white md:hidden"
          >
            <span className="relative block h-[22px] w-[22px]">
              <Menu
                size={22}
                strokeWidth={2}
                className={`absolute inset-0 transition-all duration-300 ease-out ${
                  isMenuOpen
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />

              <X
                size={22}
                strokeWidth={2}
                className={`absolute inset-0 transition-all duration-300 ease-out ${
                  isMenuOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay + Sidebar */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label={t.closeMenu}
          onClick={closeMobileMenu}
          className={`absolute inset-0 h-full w-full bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sidebar */}
        <aside
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={`absolute right-0 top-0 flex h-dvh w-full flex-col bg-stone-50 shadow-2xl transition-transform duration-300 ease-out dark:bg-stone-950 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex h-20 shrink-0 items-center justify-between border-b border-stone-200 px-5 dark:border-stone-800">
            <Link to="/" aria-label="KinFeast home" onClick={closeMobileMenu}>
              <img
                src={logoDark}
                alt="KinFeast"
                width={180}
                height={48}
                className="hidden scale-90 dark:block"
              />

              <img
                src={logoLight}
                alt="KinFeast"
                width={180}
                height={48}
                className="block scale-90 dark:hidden"
              />
            </Link>

            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label={t.closeMenu}
              className="rounded-full p-2.5 text-stone-700 transition-colors hover:bg-stone-200 hover:text-stone-950 dark:text-stone-200 dark:hover:bg-stone-800 dark:hover:text-white"
            >
              <X size={22} strokeWidth={2} />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
            {/* Logged-in Account */}
            {isAuthenticated && user && (
              <>
                <div className="mb-5 flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400">
                    {user.profile_image ? (
                      <img
                        src={user.profile_image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound size={20} strokeWidth={2} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-stone-900 dark:text-white">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-stone-500 dark:text-stone-400">
                      {user.email}
                    </p>
                  </div>
                </div>
              </>
            )}
            {/* Navigation Links */}
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={closeMobileMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                className="rounded-2xl px-4 py-4 text-base font-medium text-stone-700 transition-all duration-200 hover:bg-orange-500/10 hover:text-orange-500 dark:text-stone-200 dark:hover:bg-orange-400/10 dark:hover:text-orange-400"
              >
                {t.discover}
              </Link>

              <Link
                to="/recipes"
                onClick={closeMobileMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                className="rounded-2xl px-4 py-4 text-base font-medium text-stone-700 transition-all duration-200 hover:bg-orange-500/10 hover:text-orange-500 dark:text-stone-200 dark:hover:bg-orange-400/10 dark:hover:text-orange-400"
              >
                {t.recipes}
              </Link>

              <Link
                to="/chefs"
                onClick={closeMobileMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                className="rounded-2xl px-4 py-4 text-base font-medium text-stone-700 transition-all duration-200 hover:bg-orange-500/10 hover:text-orange-500 dark:text-stone-200 dark:hover:bg-orange-400/10 dark:hover:text-orange-400"
              >
                {t.chefs}
              </Link>

              <Link
                to="/about"
                onClick={closeMobileMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                className="rounded-2xl px-4 py-4 text-base font-medium text-stone-700 transition-all duration-200 hover:bg-orange-500/10 hover:text-orange-500 dark:text-stone-200 dark:hover:bg-orange-400/10 dark:hover:text-orange-400"
              >
                {t.about}
              </Link>
            </div>
            {/* Divider */}
            <div className="my-6 border-t border-stone-200 dark:border-stone-800" />
            {/* Mobile Auth Actions */}
            {isAuthenticated && user ? (
              <button
                type="button"
                onClick={handleLogout}
                tabIndex={isMenuOpen ? 0 : -1}
                className="flex items-center justify-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                <LogOut size={18} strokeWidth={2} />
                <span>{t.logout}</span>
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  viewTransition
                  onClick={closeMobileMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className="rounded-full border border-stone-200 px-5 py-3 text-center text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-100 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-900"
                >
                  {t.login}
                </Link>

                <Link
                  to="/register"
                  viewTransition
                  onClick={closeMobileMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className="rounded-full bg-stone-900 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200"
                >
                  {t.signup}
                </Link>
              </div>
            )}
            {/* Mobile Language Selector */}
<div className="mt-4">
  <button
    type="button"
    onClick={() =>
      setIsMobileLanguageOpen((current) => !current)
    }
    aria-expanded={isMobileLanguageOpen}
    aria-controls="mobile-language-options"
    className="flex w-full items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
  >
    <span className="flex items-center gap-3">
      <Globe2
        size={19}
        strokeWidth={2}
        className="text-stone-500 dark:text-stone-400"
      />

      <span>{t.language}</span>
    </span>

    <span className="flex items-center gap-2">
      <span className="text-sm font-medium text-orange-500 dark:text-orange-400">
        {languages.find((item) => item.code === language)?.label}
      </span>

      <svg
        viewBox="0 0 20 20"
        fill="none"
        className={`h-4 w-4 text-stone-400 transition-transform duration-200 ${
          isMobileLanguageOpen ? "rotate-180" : ""
        }`}
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  </button>

  {/* Language Options */}
<div
  id="mobile-language-options"
  className={`grid transition-all duration-200 ease-out ${
    isMobileLanguageOpen
      ? "mt-2 grid-rows-[1fr] opacity-100"
      : "grid-rows-[0fr] opacity-0"
  }`}
>
  <div className="min-h-0 overflow-hidden">
    <div
      className="
        dashboard-scrollbar
        max-h-64
        overflow-y-auto
        rounded-2xl
        border border-stone-200
        bg-white
        p-1.5
        dark:border-stone-800
        dark:bg-stone-900
      "
    >
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => handleLanguageChange(item.code)}
          tabIndex={isMenuOpen && isMobileLanguageOpen ? 0 : -1}
          className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors ${
            language === item.code
              ? "bg-orange-500/10 font-semibold text-orange-600 dark:bg-orange-400/10 dark:text-orange-400"
              : "text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800"
          }`}
        >
          <span>{item.label}</span>

          {language === item.code && (
            <span
              className="text-sm text-orange-500 dark:text-orange-400"
              aria-hidden="true"
            >
              ✓
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
</div>
</div>

{/* Mobile Theme */}
<button
  type="button"
  onClick={toggleTheme}
  tabIndex={isMenuOpen ? 0 : -1}
  className="mt-4 flex items-center justify-center gap-2 rounded-full border border-stone-200 px-5 py-3 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-100 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-900"
>
  {theme === "dark" ? (
    <>
      <Sun size={18} strokeWidth={2} />
      <span>{t.lightMode}</span>
    </>
  ) : (
    <>
      <Moon size={18} strokeWidth={2} />
      <span>{t.darkMode}</span>
    </>
  )}
</button>
          </div>
        </aside>
      </div>
    </header>
  );
}

export default Navbar;
