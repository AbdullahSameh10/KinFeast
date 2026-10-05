import {
  AlertCircle,
  ChefHat,
  Heart,
  Loader2,
  Search,
  Users,
  Utensils,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  followChef,
  getChefs,
  getFollowStatus,
  unfollowChef,
  type Chef,
} from "../../api/chefs.api";
import { useAuth } from "../../hooks/useAuth";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";
import Pagination from "./../../components/ui/Pagination";

const CHEFS_PER_PAGE = 12;

function ChefAvatar({ chef }: { chef: Chef }) {
  if (chef.profile_image) {
    return (
      <img
        src={chef.profile_image}
        alt={chef.name}
        className="h-24 w-24 rounded-3xl object-cover shadow-lg ring-4 ring-white dark:ring-stone-900"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex h-24 w-24 items-center justify-center rounded-3xl bg-orange-100 text-orange-600 shadow-lg ring-4 ring-white dark:bg-orange-950/50 dark:text-orange-400 dark:ring-stone-900"
    >
      <ChefHat size={38} />
    </div>
  );
}

function ChefsPage() {
  useDocumentTitle("Chefs");

  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const t = translations[language].chefs;
  const resultsSectionRef = useRef<HTMLElement | null>(null);

  const [chefs, setChefs] = useState<Chef[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: CHEFS_PER_PAGE,
    total: 0,
    totalPages: 0,
  });

  const [following, setFollowing] = useState<Record<string, boolean>>({});

  const [followLoading, setFollowLoading] = useState<
    Record<string, boolean>
  >({});

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadChefs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const result = await getChefs({
        page,
        limit: CHEFS_PER_PAGE,
        search,
      });

      setChefs(result.chefs);
      setPagination(result.pagination);

      /*
       * The public chefs endpoint does not require authentication.
       *
       * If the current visitor is authenticated, we also load the
       * follow state for the chefs currently visible on the page.
       */
      if (isAuthenticated) {
        const statuses = await Promise.allSettled(
          result.chefs.map(async (chef) => ({
            id: String(chef.id),
            following: await getFollowStatus(chef.id),
          })),
        );

        const nextFollowing: Record<string, boolean> = {};

        statuses.forEach((status) => {
          if (status.status === "fulfilled") {
            nextFollowing[status.value.id] = status.value.following;
          }
        });

        setFollowing(nextFollowing);
      } else {
        setFollowing({});
      }
    } catch (requestError) {
      console.error("Chefs page loading error:", requestError);

      setError(
        requestError instanceof Error
          ? requestError.message
          : t.error.description,
      );
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, page, search, t.error.description]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadChefs();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadChefs]);

  /*
   * Match the behavior already used in the Recipes page:
   * changing search returns the user to the first page.
   */
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPage(1);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  const handleFollowToggle = async (chef: Chef) => {
    /*
     * Do nothing if the visitor isn't authenticated or if the chef
     * is the currently logged-in chef.
     */
    if (!isAuthenticated || String(user?.id) === String(chef.id)) {
      return;
    }

    const chefId = String(chef.id);
    const currentlyFollowing = Boolean(following[chefId]);

    try {
      setFollowLoading((current) => ({
        ...current,
        [chefId]: true,
      }));

      if (currentlyFollowing) {
        await unfollowChef(chef.id);

        setFollowing((current) => ({
          ...current,
          [chefId]: false,
        }));

        setChefs((current) =>
          current.map((item) =>
            String(item.id) === chefId
              ? {
                  ...item,
                  follower_count: Math.max(
                    0,
                    item.follower_count - 1,
                  ),
                }
              : item,
          ),
        );
      } else {
        await followChef(chef.id);

        setFollowing((current) => ({
          ...current,
          [chefId]: true,
        }));

        setChefs((current) =>
          current.map((item) =>
            String(item.id) === chefId
              ? {
                  ...item,
                  follower_count: item.follower_count + 1,
                }
              : item,
          ),
        );
      }
    } catch (requestError) {
      console.error("Chef follow action error:", requestError);

      setError(
        requestError instanceof Error
          ? requestError.message
          : t.follow.error,
      );
    } finally {
      setFollowLoading((current) => ({
        ...current,
        [chefId]: false,
      }));
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    window.requestAnimationFrame(() => {
      resultsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-orange-50/30 to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200/70 dark:border-stone-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(245,158,11,0.10),transparent_25%)]" />

        <div className="page-container relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-orange-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
              {t.badge}
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-stone-950 dark:text-white sm:text-5xl lg:text-6xl">
              {t.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-400 sm:text-lg">
              {t.description}
            </p>
          </div>

          {/* Search */}
          <div className="mt-10 max-w-4xl">
            <label htmlFor="chef-search" className="sr-only">
              {t.search.label}
            </label>

            <div className="relative">
              <Search
                size={20}
                aria-hidden="true"
                className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 rtl:left-auto rtl:right-5"
              />

              <input
                id="chef-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.search.placeholder}
                className="h-16 w-full rounded-2xl border border-stone-200 bg-white/90 px-14 text-base text-stone-900 shadow-xl shadow-stone-900/5 outline-none backdrop-blur-xl transition-all placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-stone-800 dark:bg-stone-900/90 dark:text-white dark:placeholder:text-stone-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="page-container py-10 sm:py-12 lg:py-16">
        {/* Result header */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
              {isLoading
                ? t.loading
                : `${pagination.total} ${
                    pagination.total === 1
                      ? t.results.chef
                      : t.results.chefs
                  }`}
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 sm:flex">
            <ChefHat
              size={15}
              className="text-orange-500"
            />

            {t.results.badge}
          </div>
        </div>

        {/* Error */}
        {error && !isLoading && (
          <div className="mb-7 rounded-3xl border border-rose-200 bg-rose-50 p-7 dark:border-rose-900/60 dark:bg-rose-950/20">
            <div className="flex flex-col items-start gap-5 sm:flex-row">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300">
                <AlertCircle size={21} />
              </div>

              <div className="flex-1">
                <h2 className="font-bold text-rose-900 dark:text-rose-200">
                  {t.error.title}
                </h2>

                <p className="mt-1 text-sm leading-6 text-rose-700 dark:text-rose-300">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => void loadChefs()}
                  className="mt-4 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
                >
                  {t.error.retry}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="h-24 w-24 rounded-3xl bg-stone-200 dark:bg-stone-800" />

                <div className="mt-5 h-5 w-36 rounded bg-stone-200 dark:bg-stone-800" />

                <div className="mt-3 h-4 w-full rounded bg-stone-200 dark:bg-stone-800" />

                <div className="mt-2 h-4 w-4/5 rounded bg-stone-200 dark:bg-stone-800" />

                <div className="mt-6 h-10 w-full rounded-xl bg-stone-200 dark:bg-stone-800" />
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!isLoading && !error && chefs.length > 0 && (
          <section ref={resultsSectionRef} className="min-w-0">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {chefs.map((chef) => {
                const chefId = String(chef.id);

                const isOwnProfile =
                  String(user?.id) === chefId;

                const isFollowing =
                  Boolean(following[chefId]);

                const isFollowLoading =
                  Boolean(followLoading[chefId]);

                return (
                  <article
                    key={chef.id}
                    className="group relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-orange-900/70"
                  >
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-orange-500/5 blur-2xl transition-opacity group-hover:opacity-100" />

                    {/* Header */}
                    <div className="relative flex items-start justify-between gap-4">
                      <ChefAvatar chef={chef} />

                      <div className="flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                        <Users size={14} />

                        {chef.follower_count.toLocaleString()}
                      </div>
                    </div>

                    {/* Name / Bio */}
                    <div className="relative mt-5">
                      <h2 className="text-xl font-black text-stone-950 dark:text-white">
                        {chef.name}
                      </h2>

                      <p className="mt-2 min-h-[48px] text-sm leading-6 text-stone-500 dark:text-stone-400">
                        {chef.bio || t.card.defaultBio}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="relative mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-stone-50 p-3.5 dark:bg-stone-950/70">
                        <div className="flex items-center gap-2 text-orange-500">
                          <Utensils size={16} />

                          <span className="text-xs font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                            {t.card.recipes}
                          </span>
                        </div>

                        <p className="mt-2 text-lg font-black text-stone-900 dark:text-white">
                          {chef.published_count}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-stone-50 p-3.5 dark:bg-stone-950/70">
                        <div className="flex items-center gap-2 text-rose-500">
                          <Heart size={16} />

                          <span className="text-xs font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                            {t.card.followers}
                          </span>
                        </div>

                        <p className="mt-2 text-lg font-black text-stone-900 dark:text-white">
                          {chef.follower_count.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="relative mt-6">
                      {!isAuthenticated ? (
                        <Link
                          to="/login"
                          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-bold text-white transition hover:bg-orange-600"
                        >
                          <Heart size={16} />

                          {t.follow.signIn}
                        </Link>
                      ) : isOwnProfile ? (
                        <Link
                          to="/chef"
                          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm font-bold text-stone-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200 dark:hover:border-orange-800 dark:hover:text-orange-400"
                        >
                          {t.card.yourProfile}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          disabled={isFollowLoading}
                          onClick={() =>
                            void handleFollowToggle(chef)
                          }
                          className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                            isFollowing
                              ? "border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:border-orange-900/60 dark:bg-orange-950/30 dark:text-orange-300 dark:hover:bg-orange-950/50"
                              : "bg-orange-500 text-white hover:bg-orange-600"
                          }`}
                        >
                          {isFollowLoading ? (
                            <Loader2
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <Heart
                              size={16}
                              fill={
                                isFollowing
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          )}

                          {isFollowLoading
                            ? t.follow.loading
                            : isFollowing
                              ? t.follow.following
                              : t.follow.follow}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              previousLabel={t.pagination.previous}
              nextLabel={t.pagination.next}
            />
          </section>
        )}

        {/* Empty */}
        {!isLoading && !error && chefs.length === 0 && (
          <div className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white/70 px-6 text-center dark:border-stone-700 dark:bg-stone-900/50">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400">
              <Search size={27} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-stone-900 dark:text-white">
              {t.empty.title}
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-stone-500 dark:text-stone-400">
              {t.empty.description}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ChefsPage;