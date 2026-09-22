import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Search,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import {
  approveAdminRecipe,
  getAdminModerationQueue,
  rejectAdminRecipe,
  type AdminModerationRecipe,
} from "../../api/admin.api";

const PAGE_SIZE = 12;

type Action = "approve" | "reject";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const formatTime = (minutes: number | null) => {
  if (!minutes) return "—";
  if (minutes < 60) return `${minutes} min`;
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

export default function AdminModerationPage() {
  const [recipes, setRecipes] = useState<AdminModerationRecipe[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<{
    recipe: AdminModerationRecipe;
    action: Action;
  } | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [search]);

  const loadQueue = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getAdminModerationQueue({
        search: debouncedSearch,
        page,
        limit: PAGE_SIZE,
      });
      setRecipes(result.recipes);
      setTotal(result.pagination.total);
      setTotalPages(Math.max(1, result.pagination.totalPages));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unable to load moderation queue.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page]);

  useEffect(() => {
    void loadQueue();
  }, [loadQueue]);

  const moderateRecipe = async () => {
    if (!confirming) return;

    const { recipe, action } = confirming;
    try {
      setProcessingId(recipe.id);
      setConfirming(null);
      setError("");

      const response =
        action === "approve"
          ? await approveAdminRecipe(recipe.id)
          : await rejectAdminRecipe(recipe.id);

      if (!response.success) {
        throw new Error(response.message || `Unable to ${action} recipe.`);
      }

      await loadQueue();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : `Unable to ${action} recipe.`);
    } finally {
      setProcessingId(null);
    }
  };

  const hasFilters = Boolean(search);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-stone-100 dark:bg-stone-950">
      <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">
        <section className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700 dark:border-orange-900/60 dark:bg-orange-950/30 dark:text-orange-300">
            <ShieldCheck size={14} />
            Content moderation
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-stone-950 dark:text-white sm:text-3xl">
                Moderation queue
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-stone-600 dark:text-stone-400">
                Review submitted recipes before they become visible across KinFeast.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
              {total} pending {total === 1 ? "recipe" : "recipes"}
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xl">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search recipe titles or chefs..."
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3 pl-11 pr-4 text-sm text-stone-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-white"
              />
            </div>
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setDebouncedSearch("");
                  setPage(1);
                }}
                className="self-start rounded-2xl px-4 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </section>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </div>
        )}

        <section className="hidden overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900 md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px]">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-left dark:border-stone-800 dark:bg-stone-950">
                  {[
                    "Recipe",
                    "Chef",
                    "Category",
                    "Cuisine",
                    "Submitted",
                    "Actions",
                  ].map((label) => (
                    <th key={label} className="px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <tr key={`loading-${index}`} className="border-b border-stone-100 dark:border-stone-800">
                      {Array.from({ length: 6 }).map((__, cell) => (
                        <td key={`loading-${index}-${cell}`} className="px-5 py-6">
                          <div className="h-4 animate-pulse rounded-lg bg-stone-100 dark:bg-stone-800" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : recipes.length ? (
                  recipes.map((recipe) => (
                    <tr key={recipe.id} className="border-b border-stone-100 last:border-0 transition hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-800/40">
                      <td className="px-5 py-5">
                        <div className="max-w-[270px]">
                          <p className="truncate font-semibold text-stone-950 dark:text-white">{recipe.title}</p>
                          <div className="mt-1 flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                            <span className="flex items-center gap-1"><Clock3 size={13} />{formatTime(recipe.cooking_time)}</span>
                            <span>•</span>
                            <span>{recipe.difficulty}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          {recipe.author_profile_image ? (
                            <img src={recipe.author_profile_image} alt="" className="h-9 w-9 rounded-full object-cover" />
                          ) : (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-bold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">{getInitials(recipe.author_name)}</div>
                          )}
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-stone-900 dark:text-white">{recipe.author_name}</p>
                            <p className="max-w-[170px] truncate text-xs text-stone-500 dark:text-stone-400">{recipe.author_email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5"><span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">{recipe.category_name}</span></td>
                      <td className="px-5 py-5 text-sm text-stone-600 dark:text-stone-300">{recipe.cuisine_name || "—"}</td>
                      <td className="px-5 py-5 text-sm text-stone-500 dark:text-stone-400">{formatDate(recipe.created_at)}</td>
                      <td className="px-5 py-5">
                        <div className="flex gap-2">
                          <button type="button" disabled={processingId === recipe.id} onClick={() => setConfirming({ recipe, action: "reject" })} className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:border-stone-700 dark:text-stone-300 dark:hover:border-red-900 dark:hover:bg-red-950/30 dark:hover:text-red-400"><XCircle size={14} />Reject</button>
                          <button type="button" disabled={processingId === recipe.id} onClick={() => setConfirming({ recipe, action: "approve" })} className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50 dark:bg-white dark:text-stone-900 dark:hover:bg-orange-400"><CheckCircle2 size={14} />Approve</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={6} className="px-6 py-16 text-center"><ShieldCheck size={40} className="mx-auto text-stone-300 dark:text-stone-700" /><p className="mt-4 font-semibold text-stone-900 dark:text-white">Queue is clear</p><p className="mt-1 text-sm text-stone-500 dark:text-stone-400">There are no pending recipes matching your search.</p></td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-3 md:hidden">
          {loading ? Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-56 animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-900" />) : recipes.length ? recipes.map((recipe) => (
            <article key={recipe.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0"><h2 className="truncate font-semibold text-stone-950 dark:text-white">{recipe.title}</h2><p className="mt-2 text-xs text-stone-500 dark:text-stone-400">{formatTime(recipe.cooking_time)} · {recipe.difficulty} · {formatDate(recipe.created_at)}</p></div>
                <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">Pending</span>
              </div>
              <div className="mt-4 rounded-xl bg-stone-50 p-3 dark:bg-stone-950"><div className="flex items-center gap-3">{recipe.author_profile_image ? <img src={recipe.author_profile_image} alt="" className="h-9 w-9 rounded-full object-cover" /> : <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-bold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">{getInitials(recipe.author_name)}</div>}<div className="min-w-0"><p className="truncate text-sm font-semibold text-stone-900 dark:text-white">{recipe.author_name}</p><p className="truncate text-xs text-stone-500 dark:text-stone-400">{recipe.author_email}</p></div></div></div>
              <div className="mt-4 grid grid-cols-2 gap-3"><div><p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Category</p><p className="mt-1 truncate text-sm font-medium text-stone-700 dark:text-stone-300">{recipe.category_name}</p></div><div><p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Cuisine</p><p className="mt-1 truncate text-sm font-medium text-stone-700 dark:text-stone-300">{recipe.cuisine_name || "—"}</p></div></div>
              <div className="mt-4 flex gap-2"><button type="button" disabled={processingId === recipe.id} onClick={() => setConfirming({ recipe, action: "reject" })} className="flex-1 rounded-xl border border-stone-200 px-3 py-2.5 text-xs font-semibold text-stone-600 dark:border-stone-700 dark:text-stone-300">Reject</button><button type="button" disabled={processingId === recipe.id} onClick={() => setConfirming({ recipe, action: "approve" })} className="flex-1 rounded-xl bg-stone-900 px-3 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-stone-900">Approve</button></div>
            </article>
          )) : <div className="rounded-2xl border border-stone-200 bg-white px-6 py-14 text-center dark:border-stone-800 dark:bg-stone-900"><ShieldCheck size={40} className="mx-auto text-stone-300 dark:text-stone-700" /><p className="mt-4 font-semibold text-stone-900 dark:text-white">Queue is clear</p><p className="mt-1 text-sm text-stone-500 dark:text-stone-400">There are no pending recipes matching your search.</p></div>}
        </div>

        {totalPages > 1 && (
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <p className="text-sm text-stone-500 dark:text-stone-400">Page {page} of {totalPages}</p>
            <div className="flex items-center gap-2">
              <button type="button" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 text-stone-600 disabled:opacity-40 dark:border-stone-700 dark:text-stone-300"><ChevronLeft size={18} /></button>
              <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 text-stone-600 disabled:opacity-40 dark:border-stone-700 dark:text-stone-300"><ChevronRight size={18} /></button>
            </div>
          </div>
        )}
      </div>

      {confirming && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400"><ShieldCheck size={21} /></div>
              <button type="button" onClick={() => setConfirming(null)} className="rounded-xl p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-white" aria-label="Close confirmation"><X size={18} /></button>
            </div>
            <h2 className="mt-5 text-lg font-bold text-stone-950 dark:text-white">{confirming.action === "approve" ? "Approve recipe?" : "Reject recipe?"}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">You are about to {confirming.action} <span className="font-semibold text-stone-900 dark:text-white">{confirming.recipe.title}</span> submitted by {confirming.recipe.author_name}.</p>
            <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setConfirming(null)} className="rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-600 dark:border-stone-700 dark:text-stone-300">Cancel</button><button type="button" onClick={() => void moderateRecipe()} className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white ${confirming.action === "approve" ? "bg-stone-900 hover:bg-orange-600 dark:bg-white dark:text-stone-900" : "bg-red-600 hover:bg-red-700"}`}>{confirming.action === "approve" ? "Approve recipe" : "Reject recipe"}</button></div>
          </div>
        </div>
      )}
    </main>
  );
}
