import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

import heroIllustration from "../../assets/hero illustration.png";

import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { language } = useLanguage();

  const t = translations[language].auth;
  const isArabic = language === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await login({
        email: email.trim(),
        password,
      });

      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError(t.login.invalidCredentials);
        } else {
          setError(t.login.genericError);
        }
      } else {
        setError(err instanceof Error ? err.message : t.login.genericError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-stone-50 dark:bg-stone-950"
    >
      {/* Ambient brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px] dark:bg-orange-500/[0.07]"
      />

      <div className="page-container relative flex min-h-[calc(100vh-5rem)] items-center py-10 sm:py-14 lg:py-16">
        <div className="auth-page-transition mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-[0_30px_90px_-35px_rgba(28,25,23,0.25)] dark:border-stone-800 dark:bg-stone-900 dark:shadow-black/30 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Visual panel */}
          <div className="relative hidden min-h-[650px] overflow-hidden bg-orange-50 dark:bg-stone-950 lg:block">
            {/* Warm background glow */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-[100px]"
            />

            {/* Decorative rings */}
            <div
              aria-hidden="true"
              className="absolute -left-28 -top-28 h-72 w-72 rounded-full border border-orange-400/20 dark:border-orange-400/10"
            />
            <div
              aria-hidden="true"
              className="absolute -left-16 -top-16 h-48 w-48 rounded-full border border-orange-400/20 dark:border-orange-400/10"
            />

            <div className="relative flex h-full flex-col justify-between p-10 xl:p-12">
              {/* Brand badge */}
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-700/20 bg-orange-600/20 px-3.5 py-2 text-xs font-semibold tracking-wide text-orange-700 dark:border-orange-400/20 dark:bg-orange-400/10 dark:text-orange-300">
                <Sparkles size={14} />
                {t.login.eyebrow}
              </div>

              {/* Artwork */}
              <div className="relative flex flex-1 items-center justify-center">
                <img
                  src={heroIllustration}
                  alt=""
                  className="relative z-10 w-[88%] max-w-[520px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Brand message */}
              <div className="relative z-20 max-w-lg">
                <div className="mb-4 h-1 w-10 rounded-full bg-orange-500" />

                <p className="text-2xl font-bold leading-tight text-stone-950 dark:text-white sm:text-3xl">
                  {t.login.leftTitle}
                </p>

                <p className="mt-3 max-w-md text-sm leading-6 text-stone-500 dark:text-stone-400">
                  {t.login.leftSubtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Form panel */}
          <div className="flex min-h-[650px] flex-col justify-center bg-white p-7 dark:bg-stone-900 sm:p-10 lg:p-12 xl:p-14">
            <div className="mx-auto w-full max-w-md">
              {/* Mobile brand indicator */}
              <div className="mb-8 lg:hidden">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-2 text-xs font-semibold tracking-wide text-orange-600 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
                  <Sparkles size={14} />
                  {t.login.eyebrow}
                </div>
              </div>

              {/* Heading */}
              <div className="mb-9">
                <h1 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-white sm:text-4xl">
                  {t.login.title}
                </h1>

                <p className="mt-3 text-sm leading-6 text-stone-500 dark:text-stone-400">
                  {t.login.subtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-2.5 block text-sm font-semibold text-stone-800 dark:text-stone-200"
                  >
                    {t.login.email}
                  </label>

                  <div className="relative">
                    <Mail
                      aria-hidden="true"
                      size={18}
                      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      }`}
                    />

                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={t.login.emailPlaceholder}
                      autoComplete="email"
                      required
                      className={`w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-white dark:focus:border-orange-500 dark:focus:bg-stone-950 ${
                        isArabic ? "pl-4 pr-11" : "pl-11 pr-4"
                      }`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="login-password"
                    className="mb-2.5 block text-sm font-semibold text-stone-800 dark:text-stone-200"
                  >
                    {t.login.password}
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      aria-hidden="true"
                      size={18}
                      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-stone-400 ${
                        isArabic ? "right-4" : "left-4"
                      }`}
                    />

                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder={t.login.passwordPlaceholder}
                      autoComplete="current-password"
                      required
                      className={`w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-white dark:focus:border-orange-500 dark:focus:bg-stone-950 ${
                        isArabic ? "pl-12 pr-11" : "pl-11 pr-12"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={
                        showPassword
                          ? t.login.hidePassword
                          : t.login.showPassword
                      }
                      className={`absolute top-1/2 -translate-y-1/2 rounded-lg p-1 text-stone-400 transition hover:text-stone-700 dark:hover:text-stone-200 ${
                        isArabic ? "left-3" : "right-3"
                      }`}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                  >
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-[0_12px_25px_-12px_rgba(249,115,22,0.8)] transition hover:bg-orange-600 hover:shadow-[0_16px_30px_-12px_rgba(249,115,22,0.9)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? t.login.submitting : t.login.submit}

                  {!isSubmitting &&
                    (isArabic ? (
                      <ArrowLeft
                        size={17}
                        className="transition-transform group-hover:-translate-x-0.5"
                      />
                    ) : (
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    ))}
                </button>
              </form>

              {/* Register */}
              <div className="mt-8 border-t border-stone-100 pt-7 text-center dark:border-stone-800">
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {t.login.noAccount}{" "}
                  <Link
                    to="/register"
                    viewTransition
                    className="font-bold text-orange-600 transition-colors hover:text-orange-500 dark:text-orange-400"
                  >
                    {t.login.createAccount}
                  </Link>
                </p>
              </div>

              {/* Back home */}
              <div className="mt-5 text-center">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-xs font-medium text-stone-400 transition-colors hover:text-stone-700 dark:hover:text-stone-200"
                >
                  {isArabic ? (
                    <ArrowRight size={14} />
                  ) : (
                    <ArrowLeft size={14} />
                  )}

                  {t.login.backHome}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
