import {
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

import { submitContactMessage } from "../api/contact.api";
import { Button } from "../components/ui/Button";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../i18n";
import axios from "axios";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

function ContactPage() {
  useDocumentTitle("Contact Us");

  const { language } = useLanguage();
  const t = translations[language].contact;

  const [form, setForm] = useState(INITIAL_FORM);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setSubmitError("");
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      nextErrors.name = t.form.validation.name;
    }

    if (!form.email.trim()) {
      nextErrors.email = t.form.validation.emailRequired;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      nextErrors.email = t.form.validation.emailInvalid;
    }

    if (!form.subject.trim()) {
      nextErrors.subject = t.form.validation.subject;
    }

    if (!form.message.trim()) {
      nextErrors.message = t.form.validation.message;
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitted(false);
    setSubmitError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        website: form.website,
      });

      setForm(INITIAL_FORM);
      setErrors({});
      setIsSubmitted(true);
    } catch (error: unknown) {
      const serverMessage = axios.isAxiosError<{
        message?: string;
      }>(error)
        ? error.response?.data?.message
        : undefined;

      setSubmitError(serverMessage || t.form.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:bg-stone-950 dark:text-white dark:placeholder:text-stone-500";

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-stone-50 via-orange-50/30 to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-stone-200/70 dark:border-stone-800">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-500/10" />

          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/10" />
        </div>

        <div className="page-container py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-700 shadow-sm backdrop-blur dark:border-orange-900/60 dark:bg-stone-900/70 dark:text-orange-300">
              <Sparkles size={15} />
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
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="page-container py-16 sm:py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12">
          {/* Contact information */}
          <div className="space-y-5">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-orange-600 dark:text-orange-400">
                <span className="h-px w-7 bg-orange-500" />

                {t.info.eyebrow}
              </span>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-stone-950 dark:text-white sm:text-4xl">
                {t.info.title}
              </h2>

              <p className="mt-4 text-base leading-8 text-stone-600 dark:text-stone-300">
                {t.info.description}
              </p>
            </div>

            <div className="space-y-3">
              {/* Email */}
              <div className="rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/80">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
                    <Mail size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold text-stone-900 dark:text-white">
                      {t.info.emailTitle}
                    </h3>

                    <a
                      href={`mailto:${t.info.email}`}
                      className="mt-1 block text-sm text-stone-600 transition hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
                    >
                      {t.info.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Response */}
              <div className="rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/80">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                    <Clock3 size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold text-stone-900 dark:text-white">
                      {t.info.responseTitle}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-400">
                      {t.info.responseDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/80">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold text-stone-900 dark:text-white">
                      {t.info.locationTitle}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-400">
                      {t.info.locationDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-[2rem] border border-stone-200 bg-white/90 p-6 shadow-2xl shadow-stone-900/5 dark:border-stone-700 dark:bg-stone-900/90 sm:p-8">
            {isSubmitted ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <CheckCircle2 size={32} />
                </div>

                <h2 className="mt-6 text-2xl font-black text-stone-950 dark:text-white sm:text-3xl">
                  {t.form.successTitle}
                </h2>

                <p className="mt-3 max-w-md text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {t.form.successDescription}
                </p>

                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className="mt-7"
                  onClick={() => setIsSubmitted(false)}
                  leftIcon={<MessageCircle size={17} />}
                >
                  {t.form.sendAnother}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-7">
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                    <MessageCircle size={19} />

                    <span className="text-sm font-bold uppercase tracking-[0.12em]">
                      {t.form.eyebrow}
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-black text-stone-950 dark:text-white sm:text-3xl">
                    {t.form.title}
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-400">
                    {t.form.description}
                  </p>
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300"
                  >
                    {submitError}
                  </div>
                )}

                {/* Honeypot: hidden from real visitors and autofill */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                >
                  <label htmlFor="contact-website">Website</label>

                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    value={form.website}
                    onChange={updateField}
                    tabIndex={-1}
                    autoComplete="new-password"
                    data-lpignore="true"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-stone-800 dark:text-stone-200">
                      {t.form.nameLabel}
                    </span>

                    <input
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      maxLength={100}
                      autoComplete="name"
                      placeholder={t.form.namePlaceholder}
                      className={`${fieldClass} ${
                        errors.name
                          ? "border-rose-400"
                          : "border-stone-200 dark:border-stone-700"
                      }`}
                    />

                    {errors.name && (
                      <span className="mt-1.5 block text-xs text-rose-600 dark:text-rose-400">
                        {errors.name}
                      </span>
                    )}
                  </label>

                  {/* Email */}
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-stone-800 dark:text-stone-200">
                      {t.form.emailLabel}
                    </span>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateField}
                      maxLength={254}
                      autoComplete="email"
                      placeholder={t.form.emailPlaceholder}
                      className={`${fieldClass} ${
                        errors.email
                          ? "border-rose-400"
                          : "border-stone-200 dark:border-stone-700"
                      }`}
                    />

                    {errors.email && (
                      <span className="mt-1.5 block text-xs text-rose-600 dark:text-rose-400">
                        {errors.email}
                      </span>
                    )}
                  </label>
                </div>

                {/* Subject */}
                <label className="mt-5 block">
                  <span className="mb-2 block text-sm font-semibold text-stone-800 dark:text-stone-200">
                    {t.form.subjectLabel}
                  </span>

                  <input
                    name="subject"
                    value={form.subject}
                    onChange={updateField}
                    maxLength={150}
                    placeholder={t.form.subjectPlaceholder}
                    className={`${fieldClass} ${
                      errors.subject
                        ? "border-rose-400"
                        : "border-stone-200 dark:border-stone-700"
                    }`}
                  />

                  {errors.subject && (
                    <span className="mt-1.5 block text-xs text-rose-600 dark:text-rose-400">
                      {errors.subject}
                    </span>
                  )}
                </label>

                {/* Message */}
                <label className="mt-5 block">
                  <span className="mb-2 block text-sm font-semibold text-stone-800 dark:text-stone-200">
                    {t.form.messageLabel}
                  </span>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={updateField}
                    maxLength={5000}
                    rows={7}
                    placeholder={t.form.messagePlaceholder}
                    className={`${fieldClass} resize-y ${
                      errors.message
                        ? "border-rose-400"
                        : "border-stone-200 dark:border-stone-700"
                    }`}
                  />

                  <div className="mt-1.5 flex items-center justify-between gap-3">
                    {errors.message ? (
                      <span className="text-xs text-rose-600 dark:text-rose-400">
                        {errors.message}
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="text-xs text-stone-400 dark:text-stone-500">
                      {form.message.length}/5000
                    </span>
                  </div>
                </label>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                  rightIcon={<Send size={17} />}
                  className="mt-6 shadow-lg shadow-orange-500/15"
                >
                  {isSubmitting ? t.form.sending : t.form.submit}
                </Button>

                <p className="mt-3 text-center text-xs leading-5 text-stone-400 dark:text-stone-500">
                  {t.form.privacyNote}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
