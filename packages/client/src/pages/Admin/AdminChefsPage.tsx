import {
  ChevronLeft,
  ChevronRight,
  ChefHat,
  Search,
  Users,
  Utensils,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  getAdminChefs,
  type AdminChef,
} from "../../api/admin.api";

function formatDate(date: string) {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function ChefAvatar({ chef }: { chef: AdminChef }) {
  if (chef.profile_image) {
    return (
      <img
        src={chef.profile_image}
        alt=""
        className="h-12 w-12 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400">
      <ChefHat size={21} />
    </div>
  );
}

function AdminChefsPage() {
  const [chefs, setChefs] = useState<AdminChef[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const loadChefs = async () => {
        try {
          setIsLoading(true);
          setError(null);

          const result = await getAdminChefs({
            search,
            page,
            limit: 12,
          });

          setChefs(result.chefs);
          setPagination(result.pagination);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load chefs.",
          );
        } finally {
          setIsLoading(false);
        }
      };

      void loadChefs();
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [search, page]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-stone-100 dark:bg-stone-950">
      <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">
        {/* Header */}
        <section className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700 dark:border-orange-900/60 dark:bg-orange-950/30 dark:text-orange-300">
            <ChefHat size={14} />
            Chef management
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-stone-950 dark:text-white sm:text-3xl">
            Chefs
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-stone-600 dark:text-stone-400">
            Browse the chefs who create and publish recipes across KinFeast.
          </p>
        </section>

        {/* Search */}
        <section className="mb-6 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-5">
          <label className="relative block">
            <span className="sr-only">Search chefs</span>

            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                handleSearchChange(event.target.value)
              }
              placeholder="Search by chef name or email..."
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3 pl-11 pr-4 text-sm text-stone-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-white"
            />
          </label>
        </section>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Desktop */}
        <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <div className="hidden lg:block">
            <div className="grid grid-cols-[2fr_0.8fr_0.8fr_0.8fr_0.8fr_1fr] border-b border-stone-200 bg-stone-50 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-400">
              <span>Chef</span>
              <span>Recipes</span>
              <span>Published</span>
              <span>Pending</span>
              <span>Followers</span>
              <span>Joined</span>
            </div>

            {isLoading ? (
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[2fr_0.8fr_0.8fr_0.8fr_0.8fr_1fr] items-center gap-4 px-6 py-5"
                  >
                    <div className="h-12 w-56 animate-pulse rounded-xl bg-stone-200 dark:bg-stone-800" />
                    <div className="h-5 w-10 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
                    <div className="h-5 w-10 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
                    <div className="h-5 w-10 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
                    <div className="h-5 w-10 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
                    <div className="h-5 w-24 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
                  </div>
                ))}
              </div>
            ) : chefs.length === 0 ? (
              <div className="px-6 py-20 text-center">
                <ChefHat
                  size={38}
                  className="mx-auto text-stone-300 dark:text-stone-700"
                />

                <p className="mt-4 font-semibold text-stone-900 dark:text-white">
                  No chefs found
                </p>

                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  {search
                    ? "Try changing your search."
                    : "Chef accounts will appear here when they register."}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {chefs.map((chef) => (
                  <div
                    key={chef.id}
                    className="grid grid-cols-[2fr_0.8fr_0.8fr_0.8fr_0.8fr_1fr] items-center gap-4 px-6 py-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <ChefAvatar chef={chef} />

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-stone-950 dark:text-white">
                          {chef.name}
                        </p>

                        <p className="truncate text-sm text-stone-500 dark:text-stone-400">
                          {chef.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-semibold text-stone-700 dark:text-stone-300">
                      <Utensils size={15} />
                      {chef.recipe_count}
                    </div>

                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      {chef.published_count}
                    </span>

                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                      {chef.pending_count}
                    </span>

                    <div className="flex items-center gap-1.5 text-sm font-semibold text-stone-700 dark:text-stone-300">
                      <Users size={15} />
                      {chef.follower_count.toLocaleString()}
                    </div>

                    <span className="text-sm text-stone-500 dark:text-stone-400">
                      {formatDate(chef.created_at)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile / tablet cards */}
          <div className="lg:hidden">
            {isLoading ? (
              <div className="space-y-3 p-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-44 animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-800"
                  />
                ))}
              </div>
            ) : chefs.length === 0 ? (
              <div className="px-5 py-20 text-center">
                <ChefHat
                  size={38}
                  className="mx-auto text-stone-300 dark:text-stone-700"
                />

                <p className="mt-4 font-semibold text-stone-900 dark:text-white">
                  No chefs found
                </p>

                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  {search
                    ? "Try changing your search."
                    : "Chef accounts will appear here when they register."}
                </p>
              </div>
            ) : (
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                {chefs.map((chef) => (
                  <article
                    key={chef.id}
                    className="rounded-2xl border border-stone-200 p-5 dark:border-stone-800"
                  >
                    <div className="flex items-start gap-3">
                      <ChefAvatar chef={chef} />

                      <div className="min-w-0">
                        <h2 className="truncate font-bold text-stone-950 dark:text-white">
                          {chef.name}
                        </h2>

                        <p className="truncate text-xs text-stone-500 dark:text-stone-400">
                          {chef.email}
                        </p>

                        <p className="mt-1 text-xs text-stone-400">
                          Joined {formatDate(chef.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <div className="rounded-xl bg-stone-50 p-3 dark:bg-stone-950">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-stone-400">
                          Recipes
                        </p>

                        <p className="mt-1 text-lg font-bold text-stone-900 dark:text-white">
                          {chef.recipe_count}
                        </p>
                      </div>

                      <div className="rounded-xl bg-stone-50 p-3 dark:bg-stone-950">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-stone-400">
                          Followers
                        </p>

                        <p className="mt-1 text-lg font-bold text-stone-900 dark:text-white">
                          {chef.follower_count.toLocaleString()}
                        </p>
                      </div>

                      <div className="rounded-xl bg-emerald-500/5 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                          Published
                        </p>

                        <p className="mt-1 text-lg font-bold text-emerald-700 dark:text-emerald-300">
                          {chef.published_count}
                        </p>
                      </div>

                      <div className="rounded-xl bg-amber-500/5 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                          Pending
                        </p>

                        <p className="mt-1 text-lg font-bold text-amber-700 dark:text-amber-300">
                          {chef.pending_count}
                        </p>
                      </div>
                    </div>

                    {chef.bio && (
                      <p className="mt-4 line-clamp-2 text-xs leading-5 text-stone-500 dark:text-stone-400">
                        {chef.bio}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {!isLoading && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-stone-200 px-5 py-4 dark:border-stone-800 sm:px-6">
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Page {pagination.page} of {pagination.totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() =>
                    setPage((current) => Math.max(1, current - 1))
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-600 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-300"
                >
                  <ChevronLeft size={14} />
                  Previous
                </button>

                <button
                  type="button"
                  disabled={page >= pagination.totalPages}
                  onClick={() =>
                    setPage((current) =>
                      Math.min(pagination.totalPages, current + 1),
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-600 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-300"
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminChefsPage;