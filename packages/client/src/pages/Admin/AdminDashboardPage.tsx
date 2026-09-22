import {
  Activity,
  ChefHat,
  CheckCircle2,
  Clock3,
  RefreshCw,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCallback, useEffect, useState } from "react";

import {
  approveAdminRecipe,
  getAdminDashboard,
  rejectAdminRecipe,
  type AdminDashboard,
} from "../../api/admin.api";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function formatDate(date: string) {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatActivityDate(date: string) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: "orange" | "blue" | "green" | "amber";
}) {
  const accentClasses = {
    orange:
      "bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400",
    blue: "bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400",
    green:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
    amber:
      "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
  };

  return (
    <article className="min-h-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-stone-800 dark:bg-stone-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
            {label}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-stone-950 dark:text-white">
            {value.toLocaleString()}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${accentClasses[accent]}`}>{icon}</div>
      </div>
    </article>
  );
}

function DashboardPanel({
  title,
  description,
  headerAction,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900 ${className}`}
    >
      <div className="flex items-start justify-between gap-4 border-b border-stone-100 px-5 py-4 dark:border-stone-800 sm:px-6">
        <div className="min-w-0">
          <h2 className="font-bold text-stone-950 dark:text-white">{title}</h2>

          {description && (
            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              {description}
            </p>
          )}
        </div>

        {headerAction && <div className="shrink-0">{headerAction}</div>}
      </div>

      {children}
    </section>
  );
}

function EmptyChartState({ message }: { message: string }) {
  return (
    <div className="flex h-full min-h-[260px] items-center justify-center px-6 text-center">
      <div>
        <Activity
          size={30}
          className="mx-auto text-stone-300 dark:text-stone-700"
        />

        <p className="mt-3 text-sm font-semibold text-stone-700 dark:text-stone-300">
          {message}
        </p>

        <p className="mt-1 text-xs text-stone-400">
          Data will appear here as KinFeast grows.
        </p>
      </div>
    </div>
  );
}

function AdminDashboardPage() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [processingRecipeId, setProcessingRecipeId] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async (refresh = false) => {
    try {
      setError(null);

      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const data = await getAdminDashboard();

      setDashboard(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load the admin dashboard.",
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadDashboard();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadDashboard]);

  const moderateRecipe = async (
    recipeId: string,
    action: "approve" | "reject",
  ) => {
    try {
      setProcessingRecipeId(recipeId);
      setError(null);

      const response =
        action === "approve"
          ? await approveAdminRecipe(recipeId)
          : await rejectAdminRecipe(recipeId);

      const categoryId = response.recipe?.category_id;

      setDashboard((current) => {
        if (!current) {
          return current;
        }

        const publishedRecipes =
          action === "approve"
            ? current.stats.publishedRecipes + 1
            : current.stats.publishedRecipes;

        const updatedCategories =
          action === "approve" && categoryId
            ? current.recipeCategories.map((category) => {
                const count =
                  category.id === categoryId
                    ? category.count + 1
                    : category.count;

                return {
                  ...category,
                  count,
                  percentage:
                    publishedRecipes > 0
                      ? Number(((count * 100) / publishedRecipes).toFixed(1))
                      : 0,
                };
              })
            : current.recipeCategories;

        return {
          ...current,

          stats: {
            ...current.stats,
            pendingRecipes: Math.max(0, current.stats.pendingRecipes - 1),
            publishedRecipes,
            rejectedRecipes:
              action === "reject"
                ? current.stats.rejectedRecipes + 1
                : current.stats.rejectedRecipes,
          },

          recipeCategories: updatedCategories,

          recipeStatus: current.recipeStatus.map((item) => {
            if (action === "approve" && item.status === "Pending") {
              return {
                ...item,
                count: Math.max(0, item.count - 1),
              };
            }

            if (action === "approve" && item.status === "Published") {
              return {
                ...item,
                count: item.count + 1,
              };
            }

            if (action === "reject" && item.status === "Pending") {
              return {
                ...item,
                count: Math.max(0, item.count - 1),
              };
            }

            if (action === "reject" && item.status === "Rejected") {
              return {
                ...item,
                count: item.count + 1,
              };
            }

            return item;
          }),

          pendingRecipes: current.pendingRecipes.filter(
            (recipe) => recipe.id !== recipeId,
          ),
        };
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update the recipe.",
      );
    } finally {
      setProcessingRecipeId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-72px)] bg-stone-100 dark:bg-stone-950">
        <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-20 rounded-2xl bg-stone-200 dark:bg-stone-900" />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-28 rounded-2xl bg-stone-200 dark:bg-stone-900"
                />
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
              <div className="h-[390px] rounded-2xl bg-stone-200 dark:bg-stone-900" />
              <div className="h-[390px] rounded-2xl bg-stone-200 dark:bg-stone-900" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="min-h-[calc(100vh-72px)] bg-stone-100 dark:bg-stone-950">
        <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
            {error ?? "Unable to load the admin dashboard."}
          </div>
        </div>
      </div>
    );
  }

  const {
    stats,
    activity,
    recipeCategories,
    recipeStatus,
    pendingRecipes,
    recentUsers,
  } = dashboard;

  const categoryOrder = [
    "Quick & Easy",
    "Asian",
    "Comfort Food",
    "Desserts",
    "Healthy",
    "Mediterranean",
    "Other",
  ];

  const orderedCategories = [...recipeCategories].sort(
    (a, b) => categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name),
  );

  const visibleCategories = orderedCategories.filter(
    (category) => category.count > 0,
  );

  const categoryColors: Record<string, string> = {
    "Quick & Easy": "#f97316",
    Asian: "#0ea5e9",
    "Comfort Food": "#10b981",
    Desserts: "#8b5cf6",
    Healthy: "#eab308",
    Mediterranean: "#ec4899",
    Other: "#64748b",
  };

  const categoryDotStyles: Record<string, string> = {
    "Quick & Easy": "bg-gradient-to-br from-orange-400 to-orange-600",
    Asian: "bg-gradient-to-br from-sky-400 to-sky-600",
    "Comfort Food": "bg-gradient-to-br from-emerald-400 to-emerald-600",
    Desserts: "bg-gradient-to-br from-violet-400 to-violet-600",
    Healthy: "bg-gradient-to-br from-amber-400 to-amber-600",
    Mediterranean: "bg-gradient-to-br from-pink-400 to-pink-600",
    Other: "bg-gradient-to-br from-slate-400 to-slate-600",
  };

  const categoryBarStyles: Record<string, string> = {
    "Quick & Easy": "bg-orange-500",
    Asian: "bg-sky-500",
    "Comfort Food": "bg-emerald-500",
    Desserts: "bg-violet-500",
    Healthy: "bg-amber-500",
    Mediterranean: "bg-pink-500",
    Other: "bg-slate-500",
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-stone-100 dark:bg-stone-950">
      <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">
        {/* Page heading */}
        <section className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-orange-600 dark:text-orange-400">
              <ShieldCheck size={14} />
              Admin workspace
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-stone-950 dark:text-white sm:text-3xl">
              Welcome back, {user?.name}
            </h1>

            <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">
              Here's a quick view of what's happening across KinFeast.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadDashboard(true)}
            disabled={isRefreshing}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-700 dark:hover:text-orange-400 sm:self-auto"
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </section>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Link
            to="/admin/users"
            className="block min-h-full rounded-2xl transition hover:-translate-y-0.5"
          >
            <StatCard
              label="Total users"
              value={stats.users}
              icon={<Users size={20} />}
              accent="orange"
            />
          </Link>

          <Link
            to="/admin/chefs"
            className="block min-h-full rounded-2xl transition hover:-translate-y-0.5"
          >
            <StatCard
              label="Chefs"
              value={stats.chefs}
              icon={<ChefHat size={20} />}
              accent="blue"
            />
          </Link>

          <Link
            to="/admin/recipes"
            className="block min-h-full rounded-2xl transition hover:-translate-y-0.5"
          >
            <StatCard
              label="Published recipes"
              value={stats.publishedRecipes}
              icon={<CheckCircle2 size={20} />}
              accent="green"
            />
          </Link>

          <Link
            to="/admin/moderation"
            className="block min-h-full rounded-2xl transition hover:-translate-y-0.5"
          >
            <StatCard
              label="Pending recipes"
              value={stats.pendingRecipes}
              icon={<Clock3 size={20} />}
              accent="amber"
            />
          </Link>
        </section>

        {/* Main charts */}
        <section className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          {/* Platform activity */}
          <DashboardPanel
            title="Platform activity"
            description="Recipe views and new recipe submissions over the last 7 days."
          >
            <div className="h-[340px] p-4 sm:h-[380px] sm:p-6">
              {activity.length === 0 ? (
                <EmptyChartState message="No activity data yet." />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={activity}
                    margin={{
                      top: 10,
                      right: 8,
                      left: -18,
                      bottom: 4,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="currentColor"
                      className="text-stone-200 dark:text-stone-800"
                    />

                    <XAxis
                      dataKey="date"
                      tickFormatter={formatActivityDate}
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fontSize: 11,
                        fill: "currentColor",
                      }}
                      className="text-stone-400"
                    />

                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fontSize: 11,
                        fill: "currentColor",
                      }}
                      className="text-stone-400"
                    />

                    <Tooltip
                      labelFormatter={(label) =>
                        formatActivityDate(String(label))
                      }
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e7e5e4",
                        background: "#ffffff",
                        fontSize: "12px",
                      }}
                    />

                    <Legend
                      wrapperStyle={{
                        fontSize: "12px",
                        paddingTop: "12px",
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="views"
                      name="Recipe views"
                      stroke="#f97316"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="recipes"
                      name="New recipes"
                      stroke="#0ea5e9"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </DashboardPanel>

          {/* Recipe status */}
          <DashboardPanel
            title="Recipe status"
            description="Current distribution of recipes by moderation status."
          >
            <div className="h-[340px] p-4 sm:h-[380px] sm:p-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={recipeStatus}
                  layout="horizontal"
                  margin={{
                    top: 10,
                    right: 12,
                    left: 10,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="currentColor"
                    className="text-stone-200 dark:text-stone-800"
                  />

                  <YAxis
                    type="number"
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 11,
                      fill: "currentColor",
                    }}
                    className="text-stone-400"
                  />

                  <XAxis
                    dataKey="status"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    width={75}
                    tick={{
                      fontSize: 11,
                      fill: "currentColor",
                    }}
                    className="text-stone-500 dark:text-stone-400"
                  />

                  <Tooltip
                    cursor={{ fill: "rgba(120, 113, 108, 0.06)" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e7e5e4",
                      background: "#ffffff",
                      fontSize: "12px",
                    }}
                  />

                  <Bar
                    dataKey="count"
                    name="Recipes"
                    fill="#f97316"
                    radius={[7, 7, 0, 0]}
                    barSize={26}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardPanel>
        </section>

        {/* Categories + pending */}
        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.35fr]">
          {/* Category donut */}
          <DashboardPanel
            title="Recipe categories"
            description="Published recipes grouped by their category."
          >
            <div className="grid min-h-[440px] gap-2 p-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:items-center">
              {visibleCategories.length === 0 ? (
                <div className="col-span-full">
                  <EmptyChartState message="No published recipes to categorize yet." />
                </div>
              ) : (
                <>
                  {/* Donut chart */}
                  <div className="relative mx-auto h-[300px] w-full max-w-[340px]">
                    <div className="pointer-events-none absolute inset-4 rounded-full bg-gradient-to-br from-stone-100/50 via-transparent to-stone-100/30 blur-2xl dark:from-stone-800/40 dark:to-stone-800/10" />

                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={visibleCategories}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={3}
                          stroke="none"
                        >
                          {visibleCategories.map((category) => (
                            <Cell
                              key={category.id}
                              fill={categoryColors[category.name] ?? "#64748b"}
                            />
                          ))}
                        </Pie>

                        <Tooltip
                          formatter={(value, _name, item) => [
                            `${value} recipes`,
                            item.payload.name,
                          ]}
                          contentStyle={{
                            borderRadius: "14px",
                            border: "1px solid #e7e5e4",
                            background: "#ffffff",
                            fontSize: "12px",
                            boxShadow:
                              "0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 10px -4px rgba(0,0,0,0.05)",
                            padding: "5px 7px",
                            zIndex: "1000",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-col gap-1.5">
                    {recipeCategories.map((category) => {
                      const dot =
                        categoryDotStyles[category.name] ?? "bg-slate-500";
                      const bar =
                        categoryBarStyles[category.name] ?? "bg-slate-500";
                      const pct = Number(category.percentage);

                      return (
                        <div
                          key={category.id}
                          className="relative overflow-hidden rounded-lg border border-stone-100 bg-white/70 px-3 py-2 transition-all duration-200 hover:border-stone-200 hover:bg-white hover:shadow-[0_4px_14px_rgba(0,0,0,0.05)] dark:border-stone-800 dark:bg-stone-900/40 dark:hover:border-stone-700 dark:hover:bg-stone-900/70"
                        >
                          {/* progress track */}
                          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-stone-100/80 dark:bg-stone-800/60">
                            <div
                              className={`h-full ${bar} transition-all duration-500 ease-out`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2">
                              <span
                                className={`h-2 w-2 shrink-0 rounded-full ${dot} ring-2 ring-white dark:ring-stone-900`}
                              />
                              <span className="truncate text-[13px] font-semibold text-stone-700 dark:text-stone-200">
                                {category.name}
                              </span>
                            </div>

                            <div className="flex shrink-0 items-baseline gap-2">
                              <span className="text-[11px] font-medium tabular-nums text-stone-400 dark:text-stone-500">
                                {category.count}
                              </span>
                              <span className="w-12 text-right text-[13px] font-bold tabular-nums text-stone-900 dark:text-white">
                                {pct.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </DashboardPanel>

          {/* Pending recipes */}
          <DashboardPanel
            title="Pending recipes"
            description="Recipes waiting for administrator review."
            headerAction={
              pendingRecipes.length > 0 ? (
                <Link
                  to="/admin/recipes?status=pending"
                  className="text-xs font-semibold text-orange-600 transition hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                >
                  Show all
                </Link>
              ) : undefined
            }
          >
            <div className="dashboard-scrollbar max-h-[460px] min-h-[460px] divide-y divide-stone-100 overflow-y-auto dark:divide-stone-800">
              {pendingRecipes.length === 0 ? (
                <div className="flex min-h-[408px] flex-col items-center justify-center px-6 py-14 text-center">
                  <CheckCircle2 size={34} className="text-emerald-500" />

                  <p className="mt-3 text-sm font-bold text-stone-900 dark:text-white">
                    Everything is caught up.
                  </p>

                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                    There are no recipes waiting for moderation.
                  </p>
                </div>
              ) : (
                pendingRecipes.map((recipe) => (
                  <article
                    key={recipe.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                          Pending
                        </span>

                        {recipe.category_name && (
                          <span className="rounded-full bg-orange-500/10 px-2.5 py-1 text-[10px] font-semibold text-orange-600 dark:text-orange-400">
                            {recipe.category_name}
                          </span>
                        )}

                        {recipe.cuisine_name && (
                          <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-medium text-stone-500 dark:bg-stone-800 dark:text-stone-400">
                            {recipe.cuisine_name}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 truncate text-sm font-bold text-stone-900 dark:text-white">
                        {recipe.title}
                      </h3>

                      <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                        By {recipe.author_name} · {recipe.cooking_time} min ·{" "}
                        {formatDate(recipe.created_at)}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        disabled={processingRecipeId === recipe.id}
                        onClick={() => void moderateRecipe(recipe.id, "reject")}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:border-stone-700 dark:text-stone-300 dark:hover:border-red-900 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                      >
                        <XCircle size={14} />
                        Reject
                      </button>

                      <button
                        type="button"
                        disabled={processingRecipeId === recipe.id}
                        onClick={() =>
                          void moderateRecipe(recipe.id, "approve")
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50 dark:bg-white dark:text-stone-900 dark:hover:bg-orange-400"
                      >
                        <CheckCircle2 size={14} />
                        Approve
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </DashboardPanel>
        </section>

        {/* Recent users */}
        <section className="mt-6">
          <DashboardPanel
            title="Recent users"
            description="Latest registrations across the platform."
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left">
                <thead>
                  <tr className="border-b border-stone-100 text-[10px] uppercase tracking-[0.14em] text-stone-400 dark:border-stone-800">
                    <th className="px-5 py-3 font-bold sm:px-6">User</th>
                    <th className="px-5 py-3 font-bold">Role</th>
                    <th className="px-5 py-3 font-bold">Joined</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {recentUsers.map((recentUser) => (
                    <tr key={recentUser.id}>
                      <td className="px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-xs font-bold text-orange-600 dark:bg-orange-400/10 dark:text-orange-400">
                            {recentUser.name.slice(0, 1).toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-stone-900 dark:text-white">
                              {recentUser.name}
                            </p>

                            <p className="truncate text-xs text-stone-500 dark:text-stone-400">
                              {recentUser.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-bold capitalize text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                          {recentUser.role}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-xs text-stone-500 dark:text-stone-400">
                        {formatDate(recentUser.created_at)}
                      </td>
                    </tr>
                  ))}

                  {recentUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-12 text-center text-sm text-stone-400"
                      >
                        No users yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </DashboardPanel>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
