
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChefHat,
  Clock3,
  ExternalLink,
  Globe,
  Heart,
  Loader2,
  Mail,
  MapPin,
  RefreshCw,
  Share2,
  Sparkles,
  Utensils,
  Users,
} from "lucide-react";

import { FaInstagram } from "react-icons/fa";

import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  followChef,
  getChefByUsername,
  getFollowStatus,
  unfollowChef,
  type ChefDetails,
  type ChefRecipe,
} from "../../api/chefs.api";
import { useAuth } from "../../hooks/useAuth";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

function ChefDetailsPage() {
  const { username } = useParams<{ username: string }>();
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const t = translations[language].chefs.details;

  const [chef, setChef] = useState<ChefDetails | null>(null);
  const [following, setFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const [error, setError] = useState("");
  const [followError, setFollowError] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const isOwnProfile =
    Boolean(chef) && String(user?.id) === String(chef?.id);

  const recipes = chef?.recipes ?? [];
  const signatureRecipes = recipes.slice(0, 6);
  const locale = language === "ar" ? "ar-EG" : "en-US";

  useDocumentTitle(chef?.name ?? "Chef Profile");

  const formatNumber = (value: number) =>
    value.toLocaleString(locale);

  const formatDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
    });
  };

  const websiteUrl = chef?.website?.trim()
    ? /^https?:\/\//i.test(chef.website.trim())
      ? chef.website.trim()
      : `https://${chef.website.trim()}`
    : "";

  const instagramHandle = chef?.instagram
    ?.trim()
    .replace(/^@/, "")
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/\/.*$/, "");

  const instagramUrl = instagramHandle
    ? `https://www.instagram.com/${instagramHandle}/`
    : "";

  const loadChef = useCallback(async () => {
    if (!username?.trim()) {
      setChef(null);
      setError(t.notFoundDescription);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setFollowError("");

      const result = await getChefByUsername(username);
      setChef(result);

      if (
        isAuthenticated &&
        String(user?.id) !== String(result.id)
      ) {
        try {
          const status = await getFollowStatus(result.id);
          setFollowing(status);
        } catch (statusError) {
          console.error("Chef follow status error:", statusError);
          setFollowing(false);
        }
      } else {
        setFollowing(false);
      }
    } catch (requestError) {
      console.error("Chef profile loading error:", requestError);
      setChef(null);
      setError(
        requestError instanceof Error
          ? requestError.message
          : t.errorDescription,
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    username,
    isAuthenticated,
    user,
    t.notFoundDescription,
    t.errorDescription,
  ]);

  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      void loadChef();
    }, 0);

    return () => window.clearTimeout(timeoutID);
  }, [loadChef]);

  const handleFollowToggle = async () => {
    if (!chef || !isAuthenticated || isOwnProfile || followLoading) {
      return;
    }

    const wasFollowing = following;

    try {
      setFollowLoading(true);
      setFollowError("");

      if (wasFollowing) {
        await unfollowChef(chef.id);
      } else {
        await followChef(chef.id);
      }

      setFollowing(!wasFollowing);

      setChef((current) =>
        current
          ? {
              ...current,
              follower_count: Math.max(
                0,
                current.follower_count + (wasFollowing ? -1 : 1),
              ),
            }
          : current,
      );
    } catch (requestError) {
      console.error("Chef follow action error:", requestError);
      setFollowError(
        requestError instanceof Error
          ? requestError.message
          : t.errorFollow,
      );
    } finally {
      setFollowLoading(false);
    }
  };

  const handleShare = async () => {
    setShareMessage("");

    try {
      if (navigator.share) {
        await navigator.share({
          title: chef?.name ?? "KinFeast",
          text: t.shareProfileText,
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setShareMessage(t.linkCopied);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (shareError) {
      if (shareError instanceof Error && shareError.name === "AbortError") {
        return;
      }

      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setShareMessage(t.linkCopied);
        window.setTimeout(() => setCopied(false), 2200);
      } catch {
        setShareMessage(t.shareUnavailable);
      }
    }
  };

  const followButton = (fullWidth = false) => {
    if (!chef) return null;

    const base =
      "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-stone-900";

    if (!isAuthenticated) {
      return (
        <Link
          to="/login"
          className={`${base} ${fullWidth ? "w-full" : ""} bg-orange-500 text-white hover:bg-orange-600`}
        >
          <Heart size={17} aria-hidden="true" />
          {t.signInToFollow}
        </Link>
      );
    }

    if (isOwnProfile) {
      return (
        <Link
          to="/chef"
          className={`${base} ${fullWidth ? "w-full" : ""} border border-stone-200 bg-white text-stone-800 hover:border-orange-300 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100`}
        >
          <ChefHat size={17} aria-hidden="true" />
          {t.ownProfile}
        </Link>
      );
    }

    return (
      <button
        type="button"
        onClick={() => void handleFollowToggle()}
        disabled={followLoading}
        aria-pressed={following}
        className={`${base} ${fullWidth ? "w-full" : ""} ${
          following
            ? "border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        {followLoading ? (
          <Loader2 size={17} className="animate-spin" aria-hidden="true" />
        ) : following ? (
          <Check size={17} aria-hidden="true" />
        ) : (
          <Heart size={17} aria-hidden="true" />
        )}
        {followLoading
          ? t.followLoading
          : following
            ? t.following
            : t.follow}
      </button>
    );
  };

  const sectionHeading = (
    id: string,
    eyebrow: string,
    heading: string,
    description?: string,
  ) => (
    <div className="mb-6">
      <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="text-2xl font-black tracking-tight text-stone-950 dark:text-white sm:text-3xl"
      >
        {heading}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-400">
          {description}
        </p>
      )}
    </div>
  );

  const recipeCard = (recipe: ChefRecipe, featured = false) => (
    <article
      key={recipe.id}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-900/70 dark:hover:shadow-black/20"
    >
      <Link
        to={`/recipes/${encodeURIComponent(recipe.slug)}`}
        aria-label={`${t.viewRecipe}: ${recipe.title}`}
        className="relative block aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800"
      >
        {recipe.recipe_image ? (
          <img
            src={recipe.recipe_image}
            alt={recipe.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-orange-500 dark:text-orange-400">
            <Utensils size={38} aria-hidden="true" />
          </div>
        )}

        {featured && (
          <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-orange-700 shadow-sm backdrop-blur dark:bg-stone-950/90 dark:text-orange-300">
            <Sparkles size={13} aria-hidden="true" />
            {t.signature}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {recipe.cuisine_name && (
            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-950/40 dark:text-orange-300">
              {recipe.cuisine_name}
            </span>
          )}
          {recipe.category_name && (
            <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-600 dark:bg-stone-800 dark:text-stone-300">
              {recipe.category_name}
            </span>
          )}
        </div>

        <h3 className="text-lg font-extrabold leading-snug text-stone-950 dark:text-white">
          <Link
            to={`/recipes/${encodeURIComponent(recipe.slug)}`}
            className="rounded-sm transition hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:hover:text-orange-400"
          >
            {recipe.title}
          </Link>
        </h3>

        {recipe.description?.trim() && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
            {recipe.description.trim()}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5 text-xs font-semibold text-stone-500 dark:text-stone-400">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={15} aria-hidden="true" />
            {formatNumber(recipe.cooking_time)} {t.cookingTime}
          </span>
          <span>{recipe.difficulty}</span>
        </div>

        <Link
          to={`/recipes/${encodeURIComponent(recipe.slug)}`}
          className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-stone-200 px-3 py-2 text-sm font-bold text-stone-800 transition hover:border-orange-300 hover:text-orange-600 dark:border-stone-700 dark:text-stone-100 dark:hover:border-orange-800 dark:hover:text-orange-400"
        >
          {t.viewRecipe}
          <ArrowUpRight size={16} className="rtl:rotate-[-90deg]" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );

  if (isLoading) {
    return (
      <main
        className="min-h-screen bg-stone-50 px-4 py-8 dark:bg-stone-950 sm:px-6"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-5 w-40 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
              <div className="h-6 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="mx-auto mt-6 h-36 w-36 rounded-3xl bg-stone-200 dark:bg-stone-800" />
              <div className="mt-6 h-5 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="mt-3 h-4 rounded bg-stone-100 dark:bg-stone-800/70" />
              <div className="mt-2 h-4 w-4/5 rounded bg-stone-100 dark:bg-stone-800/70" />
              <div className="mt-6 h-11 rounded-xl bg-stone-200 dark:bg-stone-800" />
            </div>
            <div>
              <div className="h-8 w-2/5 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900"
                  >
                    <div className="aspect-[16/10] bg-stone-200 dark:bg-stone-800" />
                    <div className="space-y-3 p-5">
                      <div className="h-4 rounded bg-stone-200 dark:bg-stone-800" />
                      <div className="h-4 w-2/3 rounded bg-stone-100 dark:bg-stone-800/70" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <span className="sr-only">{t.loading}</span>
      </main>
    );
  }

  if (error || !chef) {
    const notFound = !chef;

    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-4 py-16 dark:bg-stone-950">
        <section className="w-full max-w-xl rounded-3xl border border-stone-200 bg-white p-7 text-center shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
            {notFound ? <ChefHat size={30} /> : <RefreshCw size={28} />}
          </div>
          <h1 className="mt-5 text-2xl font-black text-stone-950 dark:text-white">
            {notFound ? t.notFoundTitle : t.errorTitle}
          </h1>
          <p role="alert" className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-400">
            {error || t.notFoundDescription}
          </p>
          {!notFound && (
            <button
              type="button"
              onClick={() => void loadChef()}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <RefreshCw size={17} aria-hidden="true" />
              {t.retry}
            </button>
          )}
          <Link
            to="/chefs"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-200 px-5 py-3 font-bold text-stone-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-stone-700 dark:text-stone-200 dark:hover:border-orange-800"
          >
            <ArrowLeft size={17} className="rtl:rotate-180" aria-hidden="true" />
            {t.back}
          </Link>
        </section>
      </main>
    );
  }

  const hasCredentials =
    Boolean(chef.philosophy?.trim()) ||
    Boolean(chef.certifications?.some((item) => item.trim())) ||
    Boolean(chef.achievements?.some((item) => item.trim()));

  const hasContact =
    Boolean(chef.contact_email?.trim()) ||
    Boolean(websiteUrl) ||
    Boolean(instagramUrl);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <a
        href="#chef-content"
        className="sr-only z-50 rounded-xl bg-white p-3 text-stone-900 focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:shadow-xl"
      >
        {t.skipToContent}
      </a>

      <div className="border-b border-stone-200/80 bg-white/80 dark:border-stone-800 dark:bg-stone-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/chefs"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-bold text-stone-600 transition hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-stone-300 dark:hover:text-orange-400"
          >
            <ArrowLeft size={17} className="rtl:rotate-180" aria-hidden="true" />
            {t.back}
          </Link>

          <span className="hidden items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-stone-400 sm:inline-flex">
            <ChefHat size={16} className="text-orange-500" aria-hidden="true" />
            KinFeast
          </span>
        </div>
      </div>

      <div
        id="chef-content"
        className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8"
      >
        <div className="grid items-start gap-7 lg:grid-cols-[310px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-10">
          <aside className="lg:sticky lg:top-6">
            <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <div className="h-2 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600" />

              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                    <ChefHat size={14} aria-hidden="true" />
                    {chef.title?.trim() || t.chefTitle}
                  </span>
                  {chef.available_for_work === true && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                      <CheckCircle2 size={14} aria-hidden="true" />
                      {t.availableForWork}
                    </span>
                  )}
                </div>

                <h1 className="mt-5 break-words text-3xl font-black tracking-tight text-stone-950 dark:text-white">
                  {chef.name}
                </h1>

                <div className="mt-5 flex justify-center sm:justify-start">
                  {chef.profile_image ? (
                    <img
                      src={chef.profile_image}
                      alt={chef.name}
                      className="h-36 w-36 rounded-3xl object-cover ring-4 ring-orange-50 dark:ring-stone-800"
                    />
                  ) : (
                    <div className="flex h-36 w-36 items-center justify-center rounded-3xl bg-orange-50 text-orange-500 ring-4 ring-orange-50 dark:bg-orange-950/40 dark:text-orange-300 dark:ring-stone-800">
                      <ChefHat size={54} aria-hidden="true" />
                    </div>
                  )}
                </div>

                {chef.location?.trim() && (
                  <p className="mt-4 flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
                    <MapPin size={16} className="shrink-0 text-orange-500" aria-hidden="true" />
                    {chef.location.trim()}
                  </p>
                )}

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-stone-600 dark:text-stone-400">
                  {chef.bio?.trim() || t.defaultBio}
                </p>

                {chef.specialties?.some((item) => item.trim()) && (
                  <div className="mt-5">
                    <h2 className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      {t.specialties}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {chef.specialties
                        .filter((item) => item.trim())
                        .map((item, index) => (
                          <span
                            key={`${item}-${index}`}
                            className="rounded-full border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-700 dark:border-stone-700 dark:text-stone-300"
                          >
                            {item.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-stone-50 p-3 dark:bg-stone-800/70">
                    <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
                      <Utensils size={16} className="text-orange-500" aria-hidden="true" />
                      <span className="text-xs font-semibold">{t.recipes}</span>
                    </div>
                    <p className="mt-2 text-2xl font-black text-stone-950 dark:text-white">
                      {formatNumber(chef.published_count ?? recipes.length)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-stone-50 p-3 dark:bg-stone-800/70">
                    <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
                      <Users size={16} className="text-orange-500" aria-hidden="true" />
                      <span className="text-xs font-semibold">{t.followers}</span>
                    </div>
                    <p className="mt-2 text-2xl font-black text-stone-950 dark:text-white">
                      {formatNumber(chef.follower_count)}
                    </p>
                  </div>
                </div>

                {chef.created_at && (
                  <p className="mt-4 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <CalendarDays size={15} className="shrink-0" aria-hidden="true" />
                    {t.joined} {formatDate(chef.created_at)}
                  </p>
                )}

                {chef.experience_years != null && chef.experience_years >= 0 && (
                  <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300">
                    <Award size={16} className="text-orange-500" aria-hidden="true" />
                    {formatNumber(chef.experience_years)} {t.years} {t.experience.toLocaleLowerCase(locale)}
                  </p>
                )}

                <div className="mt-6 space-y-3">
                  {followButton(true)}

                  <button
                    type="button"
                    onClick={() => void handleShare()}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-bold text-stone-700 transition hover:border-orange-300 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
                  >
                    {copied ? (
                      <Check size={17} aria-hidden="true" />
                    ) : (
                      <Share2 size={17} aria-hidden="true" />
                    )}
                    {copied ? t.linkCopied : t.shareProfile}
                  </button>

                  {shareMessage && (
                    <p role="status" className="text-center text-xs text-stone-500 dark:text-stone-400">
                      {shareMessage}
                    </p>
                  )}

                  {followError && (
                    <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                      {followError}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </aside>

          <div className="min-w-0 space-y-12">
            <section aria-labelledby="signature-heading">
              {sectionHeading(
                "signature-heading",
                t.featuredEyebrow,
                t.signatureRecipes,
                t.signatureDescription,
              )}

              {signatureRecipes.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {signatureRecipes.map((recipe) => recipeCard(recipe, true))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center dark:border-stone-700 dark:bg-stone-900">
                  <Utensils size={30} className="mx-auto text-orange-500" aria-hidden="true" />
                  <h3 className="mt-4 font-bold text-stone-900 dark:text-white">
                    {t.noRecipes}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-500 dark:text-stone-400">
                    {t.noRecipesDescription}
                  </p>
                </div>
              )}
            </section>

            {hasCredentials && (
              <section aria-labelledby="credentials-heading">
                {sectionHeading(
                  "credentials-heading",
                  t.credentialsEyebrow,
                  t.credentials,
                )}

                <div className="space-y-4">
                  {chef.philosophy?.trim() && (
                    <article className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 dark:border-stone-800 dark:bg-stone-900">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-300">
                          <ChefHat size={20} aria-hidden="true" />
                        </span>
                        <h3 className="font-extrabold text-stone-950 dark:text-white">
                          {t.philosophy}
                        </h3>
                      </div>
                      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-stone-600 dark:text-stone-400">
                        {chef.philosophy.trim()}
                      </p>
                    </article>
                  )}

                  <div className="grid gap-4 md:grid-cols-2">
                    {chef.certifications?.some((item) => item.trim()) && (
                      <article className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                        <div className="flex items-center gap-3">
                          <BadgeCheck size={20} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                          <h3 className="font-extrabold text-stone-950 dark:text-white">
                            {t.certifications}
                          </h3>
                        </div>
                        <ul className="mt-4 space-y-3">
                          {chef.certifications
                            .filter((item) => item.trim())
                            .map((item, index) => (
                              <li key={`${item}-${index}`} className="flex items-start gap-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
                                <CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                                <span>{item.trim()}</span>
                              </li>
                            ))}
                        </ul>
                      </article>
                    )}

                    {chef.achievements?.some((item) => item.trim()) && (
                      <article className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                        <div className="flex items-center gap-3">
                          <Award size={20} className="text-amber-600 dark:text-amber-400" aria-hidden="true" />
                          <h3 className="font-extrabold text-stone-950 dark:text-white">
                            {t.achievements}
                          </h3>
                        </div>
                        <ul className="mt-4 space-y-3">
                          {chef.achievements
                            .filter((item) => item.trim())
                            .map((item, index) => (
                              <li key={`${item}-${index}`} className="flex items-start gap-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
                                <CheckCircle2 size={16} className="mt-1 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                                <span>{item.trim()}</span>
                              </li>
                            ))}
                        </ul>
                      </article>
                    )}
                  </div>
                </div>
              </section>
            )}

            {hasContact && (
              <section aria-labelledby="connect-heading">
                {sectionHeading(
                  "connect-heading",
                  t.connectEyebrow,
                  t.connect,
                  t.connectDescription,
                )}

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {chef.contact_email?.trim() && (
                    <a
                      href={`mailto:${chef.contact_email.trim()}`}
                      className="group flex min-h-20 items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 transition hover:border-orange-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-800"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-300">
                        <Mail size={20} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-extrabold text-stone-900 dark:text-white">{t.email}</span>
                        <span className="mt-1 block truncate text-xs text-stone-500 dark:text-stone-400">{chef.contact_email.trim()}</span>
                      </span>
                      <ArrowUpRight size={16} className="shrink-0 text-stone-400 transition group-hover:text-orange-500" aria-hidden="true" />
                    </a>
                  )}

                  {websiteUrl && (
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-20 items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 transition hover:border-orange-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-800"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-300">
                        <Globe size={20} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-extrabold text-stone-900 dark:text-white">{t.website}</span>
                        <span className="mt-1 block truncate text-xs text-stone-500 dark:text-stone-400">{websiteUrl.replace(/^https?:\/\//i, "")}</span>
                      </span>
                      <ExternalLink size={15} className="shrink-0 text-stone-400 transition group-hover:text-orange-500" aria-hidden="true" />
                    </a>
                  )}

                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-20 items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 transition hover:border-orange-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-800"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-300">
                        <FaInstagram size={20} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-extrabold text-stone-900 dark:text-white">{t.instagram}</span>
                        <span className="mt-1 block truncate text-xs text-stone-500 dark:text-stone-400">@{instagramHandle}</span>
                      </span>
                      <ExternalLink size={15} className="shrink-0 text-stone-400 transition group-hover:text-orange-500" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>

        <section className="mt-14 border-t border-stone-200 pt-10 dark:border-stone-800" aria-labelledby="archive-heading">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                {t.archiveEyebrow}
              </p>
              <h2 id="archive-heading" className="text-2xl font-black tracking-tight text-stone-950 dark:text-white sm:text-3xl">
                {t.recipeArchive}
              </h2>
              <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-400">
                {t.archiveDescription}
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-stone-700 ring-1 ring-stone-200 dark:bg-stone-900 dark:text-stone-200 dark:ring-stone-800">
              <Utensils size={16} className="text-orange-500" aria-hidden="true" />
              {formatNumber(recipes.length)} {t.recipeCountLabel}
            </span>
          </div>

          {recipes.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recipes.map((recipe) => recipeCard(recipe))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center dark:border-stone-700 dark:bg-stone-900">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 dark:bg-orange-950/40 dark:text-orange-300">
                <Utensils size={26} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-stone-950 dark:text-white">{t.noRecipes}</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-stone-600 dark:text-stone-400">{t.noRecipesDescription}</p>
            </div>
          )}
        </section>

        <section className="mt-12 overflow-hidden rounded-3xl bg-stone-900 text-white dark:bg-stone-900">
          <div className="relative px-6 py-9 sm:px-10 sm:py-11">
            <div className="pointer-events-none absolute -end-10 -top-16 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-orange-300">
                  {t.communityCtaEyebrow}
                </p>
                <h2 className="text-2xl font-black sm:text-3xl">
                  {t.communityCtaTitle}
                </h2>
                <p className="mt-3 text-sm leading-7 text-stone-300">
                  {t.communityCtaDescription}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:min-w-48">
                {followButton(true)}
                <Link
                  to="/chefs"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  {t.exploreChefs}
                  <ArrowUpRight size={16} className="rtl:rotate-[-90deg]" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ChefDetailsPage;