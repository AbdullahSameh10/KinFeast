import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Search,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import {
  getAdminRecipeFilters,
  getAdminRecipes,
  type AdminRecipe,
  type AdminRecipeFilter,
} from "../../api/admin.api";

const PAGE_SIZE = 12;

const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "published", label: "Published" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
];

const statusClasses: Record<string, string> = {
  published:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  rejected: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const formatCookingTime = (minutes: number | null) => {
  if (!minutes) return "—";

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  return remaining ? `${hours}h ${remaining}m` : `${hours}h`;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getStatusLabel = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1);

export default function AdminRecipesPage() {
  const [recipes, setRecipes] = useState<AdminRecipe[]>([]);
  const [categories, setCategories] = useState<AdminRecipeFilter[]>([]);
  const [cuisines, setCuisines] = useState<AdminRecipeFilter[]>([]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [filtersLoading, setFiltersLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_error, setError] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        setFiltersLoading(true);

        const result = await getAdminRecipeFilters();

        setCategories(result.categories);
        setCuisines(result.cuisines);
      } catch (err) {
        console.error(err);
      } finally {
        setFiltersLoading(false);
      }
    };

    void loadFilters();
  }, []);

  const loadRecipes = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getAdminRecipes({
        search: debouncedSearch,
        status,
        category,
        cuisine,
        page,
        limit: PAGE_SIZE,
      });

      setRecipes(result.recipes);
      setTotal(result.pagination.total);
      setTotalPages(Math.max(1, result.pagination.totalPages));
    } catch (err) {
      console.error(err);

      setError(err instanceof Error ? err.message : "Unable to load recipes.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status, category, cuisine, page]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadRecipes();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadRecipes]);

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleCuisineChange = (value: string) => {
    setCuisine(value);
    setPage(1);
  };

  const hasFilters =
    Boolean(search) || Boolean(status) || Boolean(category) || Boolean(cuisine);

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setStatus("");
    setCategory("");
    setCuisine("");
    setPage(1);
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-stone-100 dark:bg-stone-950">
      <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">
        {/* Header */}
        <section className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700 dark:border-orange-900/60 dark:bg-orange-950/30 dark:text-orange-300">
            <BookOpen size={14} />
            Recipe management
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-stone-950 dark:text-white sm:text-3xl">
                Recipes
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-stone-600 dark:text-stone-400">
                Browse and manage recipes across the KinFeast platform.
              </p>
            </div>

            <div className="text-sm font-medium text-stone-500 dark:text-stone-400">
              {total} {total === 1 ? "recipe" : "recipes"}
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="mb-6 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_180px_180px_auto]">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search recipes or chefs..."
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3 pl-11 pr-4 text-sm text-stone-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-white"
              />
            </div>

            {/* Status */}
            <select
              value={status}
              onChange={(event) => handleStatusChange(event.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-white"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Category */}
            <select
              value={category}
              onChange={(event) => handleCategoryChange(event.target.value)}
              disabled={filtersLoading}
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-stone-700 dark:bg-stone-950 dark:text-white"
            >
              <option value="">All categories</option>

              {categories.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* Cuisine */}
            <select
              value={cuisine}
              onChange={(event) => handleCuisineChange(event.target.value)}
              disabled={filtersLoading}
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-stone-700 dark:bg-stone-950 dark:text-white"
            >
              <option value="">All cuisines</option>

              {cuisines.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            {/* Clear */}
            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
              >
                Clear
              </button>
            ) : (
              <div />
            )}
          </div>
        </section>

        {/* Desktop Table */}
        <section className="hidden overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900 md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-left dark:border-stone-800 dark:bg-stone-950">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                    Recipe
                  </th>

                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                    Chef
                  </th>

                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                    Category
                  </th>

                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                    Cuisine
                  </th>

                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                    Status
                  </th>

                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                    Created
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <tr
                      key={`loading-row-${index}`}
                      className="border-b border-stone-100 last:border-0 dark:border-stone-800"
                    >
                      {Array.from({ length: 6 }).map((_, cellIndex) => (
                        <td
                          key={`loading-cell-${index}-${cellIndex}`}
                          className="px-4 py-5"
                        >
                          <div className="h-4 animate-pulse rounded-lg bg-stone-100 dark:bg-stone-800" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <tr
                      key={recipe.id}
                      className="border-b border-stone-100 transition last:border-0 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800/40"
                    >
                      {/* Recipe */}
                      <td className="px-6 py-5">
                        <div className="max-w-[280px]">
                          <p className="truncate font-semibold text-stone-950 dark:text-white">
                            {recipe.title}
                          </p>

                          <div className="mt-1 flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                            <span className="flex items-center gap-1">
                              <Clock3 size={13} />
                              {formatCookingTime(recipe.cooking_time)}
                            </span>

                            {recipe.difficulty && (
                              <>
                                <span>•</span>
                                <span>{recipe.difficulty}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Chef */}
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          {recipe.author_profile_image ? (
                            <img
                              src={recipe.author_profile_image}
                              alt=""
                              className="h-9 w-9 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-bold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                              {getInitials(recipe.author_name)}
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-stone-900 dark:text-white">
                              {recipe.author_name}
                            </p>

                            <p className="max-w-[180px] truncate text-xs text-stone-500 dark:text-stone-400">
                              {recipe.author_email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-5">
                        <span className="inline-flex rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                          {recipe.category_name}
                        </span>
                      </td>

                      {/* Cuisine */}
                      <td className="px-4 py-5 text-sm text-stone-600 dark:text-stone-300">
                        {recipe.cuisine_name || "—"}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            statusClasses[recipe.status]
                          }`}
                        >
                          {getStatusLabel(recipe.status)}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="px-4 py-5 text-sm text-stone-500 dark:text-stone-400">
                        {formatDate(recipe.created_at)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <BookOpen
                        size={38}
                        className="mx-auto text-stone-300 dark:text-stone-700"
                      />

                      <p className="mt-4 font-semibold text-stone-900 dark:text-white">
                        No recipes found
                      </p>

                      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Mobile Cards */}
        <div className="space-y-3 md:hidden">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`mobile-loading-${index}`}
                className="h-44 animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-900"
              />
            ))
          ) : recipes.length > 0 ? (
            recipes.map((recipe) => (
              <article
                key={recipe.id}
                className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold text-stone-950 dark:text-white">
                      {recipe.title}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                      <Clock3 size={13} />

                      {formatCookingTime(recipe.cooking_time)}

                      {recipe.difficulty && (
                        <>
                          <span>•</span>
                          <span>{recipe.difficulty}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      statusClasses[recipe.status]
                    }`}
                  >
                    {getStatusLabel(recipe.status)}
                  </span>
                </div>

                <div className="mt-4 rounded-xl bg-stone-50 p-3 dark:bg-stone-950">
                  <div className="flex items-center gap-3">
                    {recipe.author_profile_image ? (
                      <img
                        src={recipe.author_profile_image}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-bold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                        {getInitials(recipe.author_name)}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-stone-900 dark:text-white">
                        {recipe.author_name}
                      </p>

                      <p className="truncate text-xs text-stone-500 dark:text-stone-400">
                        {recipe.author_email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Category
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-stone-700 dark:text-stone-300">
                      {recipe.category_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Cuisine
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-stone-700 dark:text-stone-300">
                      {recipe.cuisine_name || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Created
                    </p>

                    <p className="mt-1 text-sm font-medium text-stone-700 dark:text-stone-300">
                      {formatDate(recipe.created_at)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      Status
                    </p>

                    <p className="mt-1 text-sm font-medium text-stone-700 dark:text-stone-300">
                      {getStatusLabel(recipe.status)}
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-stone-200 bg-white px-6 py-14 text-center dark:border-stone-800 dark:bg-stone-900">
              <BookOpen
                size={38}
                className="mx-auto text-stone-300 dark:text-stone-700"
              />

              <p className="mt-4 font-semibold text-stone-900 dark:text-white">
                No recipes found
              </p>

              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Page {page} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 text-stone-600 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 text-stone-600 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
