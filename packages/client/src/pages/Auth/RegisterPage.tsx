import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  Eye,
  EyeOff,
  Globe2,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";

import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaSearchengin,
  FaUserFriends,
  FaUsers,
  FaGlobe,
  FaLightbulb,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi"

import heroIllustration from "../../assets/hero illustration.png";
import {
  getMarketingSources,
  type MarketingSource,
} from "../../api/marketing.api";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

const sourceTranslationKeys = {
  instagram: { name: "instagram", icon: FaInstagram },
  tiktok: { name: "tiktok", icon: FaTiktok },
  youtube: { name: "youtube", icon: FaYoutube },
  search_engine: { name: "searchEngine", icon: FaSearchengin },
  friend: { name: "friend", icon: FaUserFriends },
  food_community: { name: "foodCommunity", icon: FaUsers },
  another_website: { name: "anotherWebsite", icon: FaGlobe },
  just_stumbled_upon: { name: "justStumbledUpon", icon: HiSparkles },
  other: { name: "other", icon: FaLightbulb },
} as const;

type SourceTranslationKey = keyof typeof sourceTranslationKeys;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { language } = useLanguage();

  const t = translations[language].auth.register;
  const isArabic = language === "ar";

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"user" | "chef" | "">("");
  const [marketingSourceId, setMarketingSourceId] = useState("");
  const [marketingOtherDetails, setMarketingOtherDetails] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSources, setIsLoadingSources] = useState(false);
  const [marketingSources, setMarketingSources] = useState<MarketingSource[]>(
    [],
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordRequirements = useMemo(
    () => [
      {
        key: "length",
        label: t.passwordStep.requirementLength,
        valid: password.length >= 8,
      },
      {
        key: "uppercase",
        label: t.passwordStep.requirementUppercase,
        valid: /[A-Z]/.test(password),
      },
      {
        key: "lowercase",
        label: t.passwordStep.requirementLowercase,
        valid: /[a-z]/.test(password),
      },
      {
        key: "number",
        label: t.passwordStep.requirementNumber,
        valid: /\d/.test(password),
      },
      {
        key: "special",
        label: t.passwordStep.requirementSpecial,
        valid: /[^A-Za-z0-9]/.test(password),
      },
    ],
    [password, t.passwordStep],
  );

  const passwordScore = passwordRequirements.filter(
    (requirement) => requirement.valid,
  ).length;
  const passwordStrength =
    passwordScore >= 5
      ? t.passwordStep.strong
      : passwordScore >= 3
        ? t.passwordStep.good
        : passwordScore === 2
          ? t.passwordStep.fair
          : t.passwordStep.weak;

  useEffect(() => {
    if (step !== 3 || marketingSources.length > 0) {
      return;
    }

    let isMounted = true;
    setIsLoadingSources(true);
    setError("");

    getMarketingSources()
      .then((sources) => {
        if (!isMounted) return;

        const activeSources = [...sources]
          .filter(
            (source) =>
              source.is_active && source.source_key in sourceTranslationKeys,
          )
          .sort((a, b) => a.sort_order - b.sort_order);

        setMarketingSources(activeSources);
      })
      .catch((err: unknown) => {
        if (isMounted) {
          console.error("Failed to load marketing sources:", err);

          if (isMounted) {
            setError(t.sourceStep.loadError);
          }
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingSources(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [step, marketingSources.length, t.sourceStep.loadError]);

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const getRegistrationError = (err: unknown) => {
    if (!(err instanceof Error)) {
      return t.errors.generic;
    }

    const message = err.message.toUpperCase();

    if (message.includes("EMAIL_ALREADY_EXISTS")) {
      return t.errors.emailExists;
    }
    if (message.includes("MARKETING_SOURCE_INVALID")) {
      return t.validation.sourceRequired;
    }
    if (message.includes("MARKETING_OTHER_DETAILS_REQUIRED")) {
      return t.validation.otherRequired;
    }
    if (message.includes("MARKETING_OTHER_DETAILS_TOO_LONG")) {
      return t.sourceStep.otherTooLong;
    }

    return t.errors.generic;
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      if (!name.trim()) return t.validation.nameRequired;
      if (!email.trim()) return t.validation.emailRequired;
      if (!validateEmail(email)) return t.validation.emailInvalid;
    }

    if (currentStep === 2 && !role) {
      return t.validation.experienceRequired;
    }

    if (currentStep === 3) {
      if (!marketingSourceId) return t.validation.sourceRequired;

      const selectedSource = marketingSources.find(
        (source) => source.id === marketingSourceId,
      );

      if (selectedSource?.source_key === "other") {
        if (!marketingOtherDetails.trim()) return t.validation.otherRequired;
        if (marketingOtherDetails.trim().length > 255) {
          return t.sourceStep.otherTooLong;
        }
      }
    }

    if (currentStep === 4) {
      if (!password) return t.validation.passwordRequired;
      if (password.length < 8) return t.validation.passwordTooShort;
      if (passwordScore < 5) return t.validation.passwordWeak;
      if (password !== confirmPassword) return t.validation.passwordMismatch;
      if (!consent) return t.validation.consentRequired;
    }

    return "";
  };

  const handleNext = () => {
    setError("");
    const validationError = validateStep(step);

    if (validationError) {
      setError(validationError);
      return;
    }

    setStep((currentStep) => Math.min(currentStep + 1, 4));
  };

  const handleBack = () => {
    setError("");
    setStep((currentStep) => Math.max(currentStep - 1, 1));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const validationError = validateStep(4);
    if (validationError) {
      setError(validationError);
      return;
    }

    const selectedSource = marketingSources.find(
      (source) => source.id === marketingSourceId,
    );

    if (!selectedSource || !role) {
      setError(t.errors.generic);
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        marketingSourceId: selectedSource.id,
        marketingOtherDetails:
          selectedSource.source_key === "other"
            ? marketingOtherDetails.trim()
            : null,
      });

      setIsSuccess(true);
    } catch (err) {
      setError(getRegistrationError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSource = marketingSources.find(
    (source) => source.id === marketingSourceId,
  );
  const isOtherSource = selectedSource?.source_key === "other";

  if (isSuccess) {
    return (
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className=" relative min-h-[calc(100vh-5rem)] overflow-hidden bg-stone-50 dark:bg-stone-950"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px] dark:bg-orange-500/[0.07]"
        />

        <div className="page-container relative flex min-h-[calc(100vh-5rem)] items-center py-10 sm:py-14 lg:py-16">
          <div className="auth-page-transition mx-auto w-full max-w-3xl rounded-[2rem] border border-stone-200/80 bg-white p-8 text-center shadow-[0_30px_90px_-35px_rgba(28,25,23,0.25)] dark:border-stone-800 dark:bg-stone-900 dark:shadow-black/30 sm:p-12 lg:p-16">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
              <Check size={38} strokeWidth={2.5} />
            </div>

            <div className="mx-auto mt-8 max-w-xl">
              <h1 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-white sm:text-4xl">
                {t.success.title}
              </h1>
              <p className="mt-4 text-sm leading-7 text-stone-500 dark:text-stone-400 sm:text-base">
                {t.success.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/login", { viewTransition: true })}
              className="group mt-9 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-[0_12px_25px_-12px_rgba(249,115,22,0.8)] transition hover:bg-orange-600 hover:shadow-[0_16px_30px_-12px_rgba(249,115,22,0.9)] sm:w-auto sm:min-w-56"
            >
              {t.success.signIn}
              {isArabic ? (
                <ArrowLeft
                  size={17}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
              ) : (
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              )}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className=" relative min-h-[calc(100vh-5rem)] overflow-hidden bg-stone-50 dark:bg-stone-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px] dark:bg-orange-500/[0.07]"
      />

      <div className="page-container relative flex min-h-[calc(100vh-5rem)] items-center py-10 sm:py-14 lg:py-16">
        <div className="auth-page-transition mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-[0_30px_90px_-35px_rgba(28,25,23,0.25)] dark:border-stone-800 dark:bg-stone-900 dark:shadow-black/30 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Visual panel */}
          <div className="relative hidden min-h-[650px] overflow-hidden bg-orange-50 dark:bg-stone-950 lg:block">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="absolute -left-28 -top-28 h-72 w-72 rounded-full border border-orange-400/20 dark:border-orange-400/10"
            />
            <div
              aria-hidden="true"
              className="absolute -left-16 -top-16 h-48 w-48 rounded-full border border-orange-400/20 dark:border-orange-400/10"
            />

            <div className="relative flex h-full flex-col justify-between p-10 xl:p-12">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-700/20 bg-orange-600/20 px-3.5 py-2 text-xs font-semibold tracking-wide text-orange-700 dark:border-orange-400/20 dark:bg-orange-400/10 dark:text-orange-300">
                <Sparkles size={14} />
                {t.eyebrow}
              </div>
              <div className="relative flex flex-1 items-center justify-center">
                <img
                  src={heroIllustration}
                  alt=""
                  className="relative z-10 w-[88%] max-w-[520px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)]"
                />
              </div>
              650px
              <div className="relative z-20 max-w-lg">
                <div className="mb-4 h-1 w-10 rounded-full bg-orange-500" />
                <p className="text-2xl font-bold leading-tight text-stone-950 dark:text-white sm:text-3xl">
                  {t.title}
                </p>
                <p className="mt-3 max-w-md text-sm leading-6 text-stone-500 dark:text-stone-400">
                  {t.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Registration panel */}
          <div className="flex min-h-[650px] flex-col bg-white p-7 dark:bg-stone-900 sm:p-10 lg:p-12 xl:p-14">
            <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
              <div className="mb-8 lg:hidden">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-2 text-xs font-semibold tracking-wide text-orange-600 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
                  <Sparkles size={14} />
                  {t.eyebrow}
                </div>
              </div>

              {/* Step indicator */}
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400">
                  <span>
                    {t.stepLabel} {step} {t.ofLabel} 4
                  </span>
                  <span>{Math.round((step / 4) * 100)}%</span>
                </div>

                <div
                  className="flex items-center gap-1.5"
                  aria-label={`${t.stepLabel} ${step} ${t.ofLabel} 4`}
                >
                  {[1, 2, 3, 4].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className="flex flex-1 items-center gap-1.5"
                    >
                      <div
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          stepNumber <= step
                            ? "bg-orange-500"
                            : "bg-stone-200 dark:bg-stone-700"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 transition-opacity duration-200">
                <h1 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-white sm:text-4xl">
                  {step === 1 && t.detailsStep.title}
                  {step === 2 && t.experienceStep.title}
                  {step === 3 && t.sourceStep.title}
                  {step === 4 && t.passwordStep.title}
                </h1>

                <p className="mt-3 text-sm leading-6 text-stone-500 dark:text-stone-400">
                  {step === 1 && t.detailsStep.subtitle}
                  {step === 2 && t.experienceStep.subtitle}
                  {step === 3 && t.sourceStep.subtitle}
                  {step === 4 && t.passwordStep.subtitle}
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                >
                  {error}
                </div>
              )}

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (step === 4) {
                    void handleSubmit(event);
                  } else {
                    handleNext();
                  }
                }}
              >
                <div>
                  {step === 1 && (
                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor="register-name"
                          className="mb-2.5 block text-sm font-semibold text-stone-800 dark:text-stone-200"
                        >
                          {t.detailsStep.name}
                        </label>
                        <div className="relative">
                          <UserRound
                            aria-hidden="true"
                            size={18}
                            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-stone-400 ${
                              isArabic ? "right-4" : "left-4"
                            }`}
                          />
                          <input
                            id="register-name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder={t.detailsStep.namePlaceholder}
                            autoComplete="name"
                            className={`w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-white dark:focus:border-orange-500 dark:focus:bg-stone-950 ${
                              isArabic ? "pl-4 pr-11" : "pl-11 pr-4"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="register-email"
                          className="mb-2.5 block text-sm font-semibold text-stone-800 dark:text-stone-200"
                        >
                          {t.detailsStep.email}
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
                            id="register-email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder={t.detailsStep.emailPlaceholder}
                            autoComplete="email"
                            className={`w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-white dark:focus:border-orange-500 dark:focus:bg-stone-950 ${
                              isArabic ? "pl-4 pr-11" : "pl-11 pr-4"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <fieldset className="space-y-3">
                      <legend className="sr-only">
                        {t.experienceStep.title}
                      </legend>

                      <button
                        type="button"
                        aria-pressed={role === "user"}
                        onClick={() => {
                          setRole("user");
                          setError("");
                        }}
                        className={`group flex w-full items-start gap-4 rounded-2xl border p-5 text-start outline-none transition focus-visible:ring-4 focus-visible:ring-orange-500/10 ${
                          role === "user"
                            ? "border-orange-400 bg-orange-50/80 shadow-[0_15px_35px_-24px_rgba(249,115,22,0.9)] dark:border-orange-500/70 dark:bg-orange-500/10"
                            : "border-stone-200 bg-stone-50 hover:border-orange-300 hover:bg-orange-50/60 dark:border-stone-700 dark:bg-stone-950 dark:hover:border-orange-500/50 dark:hover:bg-orange-500/5"
                        }`}
                      >
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                            role === "user"
                              ? "bg-orange-500 text-white"
                              : "bg-white text-stone-500 shadow-sm dark:bg-stone-900 dark:text-stone-400"
                          }`}
                        >
                          <Globe2 size={20} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-3">
                            <span className="text-sm font-bold text-stone-900 dark:text-white">
                              {t.experienceStep.discover}
                            </span>
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                                role === "user"
                                  ? "border-orange-500 bg-orange-500 text-white"
                                  : "border-stone-300 dark:border-stone-600"
                              }`}
                            >
                              {role === "user" && (
                                <Check size={13} strokeWidth={3} />
                              )}
                            </span>
                          </span>
                          <span className="mt-1.5 block text-sm leading-6 text-stone-500 dark:text-stone-400">
                            {t.experienceStep.discoverDescription}
                          </span>
                        </span>
                      </button>

                      <button
                        type="button"
                        aria-pressed={role === "chef"}
                        onClick={() => {
                          setRole("chef");
                          setError("");
                        }}
                        className={`group flex w-full items-start gap-4 rounded-2xl border p-5 text-start outline-none transition focus-visible:ring-4 focus-visible:ring-orange-500/10 ${
                          role === "chef"
                            ? "border-orange-400 bg-orange-50/80 shadow-[0_15px_35px_-24px_rgba(249,115,22,0.9)] dark:border-orange-500/70 dark:bg-orange-500/10"
                            : "border-stone-200 bg-stone-50 hover:border-orange-300 hover:bg-orange-50/60 dark:border-stone-700 dark:bg-stone-950 dark:hover:border-orange-500/50 dark:hover:bg-orange-500/5"
                        }`}
                      >
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                            role === "chef"
                              ? "bg-orange-500 text-white"
                              : "bg-white text-stone-500 shadow-sm dark:bg-stone-900 dark:text-stone-400"
                          }`}
                        >
                          <UsersRound size={20} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-3">
                            <span className="text-sm font-bold text-stone-900 dark:text-white">
                              {t.experienceStep.create}
                            </span>
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                                role === "chef"
                                  ? "border-orange-500 bg-orange-500 text-white"
                                  : "border-stone-300 dark:border-stone-600"
                              }`}
                            >
                              {role === "chef" && (
                                <Check size={13} strokeWidth={3} />
                              )}
                            </span>
                          </span>
                          <span className="mt-1.5 block text-sm leading-6 text-stone-500 dark:text-stone-400">
                            {t.experienceStep.createDescription}
                          </span>
                        </span>
                      </button>
                    </fieldset>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      {isLoadingSources ? (
                        <div className="space-y-3" aria-live="polite">
                          {[1, 2, 3, 4].map((item) => (
                            <div
                              key={item}
                              className="h-[66px] animate-pulse rounded-2xl bg-stone-100 dark:bg-stone-800"
                            />
                          ))}
                          <p className="sr-only">{t.sourceStep.loading}</p>
                        </div>
                      ) : marketingSources.length > 0 ? (
                        <div className="grid gap-3 sm:grid-cols-2">
                          {marketingSources.map((source) => {
                            const sourceKey =
                              source.source_key as SourceTranslationKey;
                            const translationKey =
                              sourceTranslationKeys[sourceKey];
                            const isSelected = marketingSourceId === source.id;

                            return (
                              <button
                                key={source.id}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => {
                                  setMarketingSourceId(source.id);
                                  setError("");
                                }}
                                className={`flex min-h-[66px] items-center gap-3 rounded-2xl border px-4 py-3 text-start outline-none transition focus-visible:ring-4 focus-visible:ring-orange-500/10 ${
                                  isSelected
                                    ? "border-orange-400 bg-orange-50 text-stone-900 dark:border-orange-500/70 dark:bg-orange-500/10 dark:text-white"
                                    : "border-stone-200 bg-stone-50 text-stone-700 hover:border-orange-300 hover:bg-orange-50/60 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-300 dark:hover:border-orange-500/50 dark:hover:bg-orange-500/5"
                                }`}
                              >
                                <span
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                                    isSelected
                                      ? "bg-orange-500 text-white"
                                      : "bg-white text-stone-400 shadow-sm dark:bg-stone-900"
                                  }`}
                                >
                                  {isSelected ? (
                                    <Check size={16} strokeWidth={3} />
                                  ) : (
                                    translationKey.icon && (
                                      <translationKey.icon size={16} />
                                    )
                                  )}
                                </span>
                                <span className="min-w-0 flex-1 text-sm font-semibold">
                                  {t.sourceStep[translationKey.name]}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
                          {t.sourceStep.loadError}
                        </div>
                      )}

                      {isOtherSource && (
                        <div className="pt-1">
                          <label
                            htmlFor="register-marketing-other"
                            className="mb-2.5 block text-sm font-semibold text-stone-800 dark:text-stone-200"
                          >
                            {t.sourceStep.otherPlaceholder}
                          </label>
                          <div className="relative">
                            <MessageCircle
                              aria-hidden="true"
                              size={18}
                              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-stone-400 ${
                                isArabic ? "right-4" : "left-4"
                              }`}
                            />
                            <input
                              id="register-marketing-other"
                              type="text"
                              value={marketingOtherDetails}
                              onChange={(event) =>
                                setMarketingOtherDetails(event.target.value)
                              }
                              placeholder={t.sourceStep.otherPlaceholder}
                              maxLength={255}
                              className={`w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-white dark:focus:border-orange-500 dark:focus:bg-stone-950 ${
                                isArabic ? "pl-4 pr-11" : "pl-11 pr-4"
                              }`}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor="register-password"
                          className="mb-2.5 block text-sm font-semibold text-stone-800 dark:text-stone-200"
                        >
                          {t.passwordStep.password}
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
                            id="register-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            placeholder={t.passwordStep.passwordPlaceholder}
                            autoComplete="new-password"
                            className={`w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-white dark:focus:border-orange-500 dark:focus:bg-stone-950 ${
                              isArabic ? "pl-12 pr-11" : "pl-11 pr-12"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((current) => !current)
                            }
                            aria-label={
                              showPassword
                                ? t.passwordStep.hidePassword
                                : t.passwordStep.showPassword
                            }
                            className={`absolute top-1/2 -translate-y-1/2 rounded-lg p-1 text-stone-400 transition hover:text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:hover:text-stone-200 ${
                              isArabic ? "left-3" : "right-3"
                            }`}
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>

                        <div className="mt-3" aria-live="polite">
                          <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                            <span className="text-stone-500 dark:text-stone-400">
                              {t.passwordStep.strength}
                            </span>
                            <span className="text-stone-700 dark:text-stone-200">
                              {passwordStrength}
                            </span>
                          </div>
                          <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5].map((bar) => (
                              <span
                                key={bar}
                                className={`h-1.5 flex-1 rounded-full transition-all ${
                                  bar <= passwordScore
                                    ? "bg-orange-500"
                                    : "bg-stone-200 dark:bg-stone-700"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <ul
                          className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2"
                          aria-label={t.passwordStep.strength}
                        >
                          {passwordRequirements.map((requirement) => (
                            <li
                              key={requirement.key}
                              className={`flex items-center gap-2 text-xs transition-colors ${
                                requirement.valid
                                  ? "text-orange-700 dark:text-orange-300"
                                  : "text-stone-500 dark:text-stone-400"
                              }`}
                            >
                              <span
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                  requirement.valid
                                    ? "border-orange-500 bg-orange-500 text-white"
                                    : "border-stone-300 dark:border-stone-600"
                                }`}
                              >
                                {requirement.valid && (
                                  <Check size={10} strokeWidth={3} />
                                )}
                              </span>
                              {requirement.label}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <label
                          htmlFor="register-confirm-password"
                          className="mb-2.5 block text-sm font-semibold text-stone-800 dark:text-stone-200"
                        >
                          {t.passwordStep.confirmPassword}
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
                            id="register-confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(event) =>
                              setConfirmPassword(event.target.value)
                            }
                            placeholder={
                              t.passwordStep.confirmPasswordPlaceholder
                            }
                            autoComplete="new-password"
                            className={`w-full rounded-2xl border border-stone-200 bg-stone-50 py-3.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-white dark:focus:border-orange-500 dark:focus:bg-stone-950 ${
                              isArabic ? "pl-12 pr-11" : "pl-11 pr-12"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword((current) => !current)
                            }
                            aria-label={
                              showConfirmPassword
                                ? t.passwordStep.hidePassword
                                : t.passwordStep.showPassword
                            }
                            className={`absolute top-1/2 -translate-y-1/2 rounded-lg p-1 text-stone-400 transition hover:text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:hover:text-stone-200 ${
                              isArabic ? "left-3" : "right-3"
                            }`}
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </div>

                      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3.5 dark:border-stone-700 dark:bg-stone-950">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(event) => setConsent(event.target.checked)}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-stone-300 text-orange-500 accent-orange-500 focus:ring-orange-500/20 dark:border-stone-600"
                        />
                        <span className="text-xs leading-5 text-stone-600 dark:text-stone-400">
                          {t.passwordStep.consent}
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                <div className="mt-7 flex gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-sm font-bold text-stone-700 transition hover:border-stone-300 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-stone-600 dark:hover:bg-stone-800"
                    >
                      {isArabic ? (
                        <ArrowRight size={17} />
                      ) : (
                        <ArrowLeft size={17} />
                      )}
                      {step === 2
                        ? t.experienceStep.back
                        : step === 3
                          ? t.sourceStep.back
                          : t.passwordStep.back}
                    </button>
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isLoadingSources}
                      className="group inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-[0_12px_25px_-12px_rgba(249,115,22,0.8)] transition hover:bg-orange-600 hover:shadow-[0_16px_30px_-12px_rgba(249,115,22,0.9)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {step === 1
                        ? t.detailsStep.continue
                        : step === 2
                          ? t.experienceStep.continue
                          : t.sourceStep.continue}
                      {isArabic ? (
                        <ArrowLeft
                          size={17}
                          className="transition-transform group-hover:-translate-x-0.5"
                        />
                      ) : (
                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      )}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3.5 text-sm font-bold text-white shadow-[0_12px_25px_-12px_rgba(249,115,22,0.8)] transition hover:bg-orange-600 hover:shadow-[0_16px_30px_-12px_rgba(249,115,22,0.9)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting
                        ? t.passwordStep.creatingAccount
                        : t.passwordStep.createAccount}
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
                  )}
                </div>
              </form>

              <div className="mt-8 border-t border-stone-100 pt-7 text-center dark:border-stone-800">
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {t.hasAccount}{" "}
                  <Link
                    to="/login"
                    viewTransition
                    className="font-bold text-orange-600 transition-colors hover:text-orange-500 dark:text-orange-400"
                  >
                    {t.signIn}
                  </Link>
                </p>
              </div>

              <div className="mt-5 text-center">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-xs font-medium text-stone-400 transition-colors hover:text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:hover:text-stone-200"
                >
                  {isArabic ? (
                    <ArrowRight size={14} />
                  ) : (
                    <ArrowLeft size={14} />
                  )}
                  {t.backHome}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
