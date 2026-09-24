import {
  Activity,
  BarChart3,
  ChefHat,
  Eye,
  Heart,
  MessageSquare,
  RefreshCw,
  Utensils,
  Users,
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
import { getAdminAnalytics, type AdminAnalytics } from "../../api/admin.api";
import { Link } from "react-router-dom";

const num = (n: number) => n.toLocaleString();

function formatActivityDate(date: string) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatMarketingSource(sourceKey: string) {
  const labels: Record<string, string> = {
    instagram: "Instagram",
    tiktok: "TikTok",
    youtube: "YouTube",
    search_engine: "Search engine",
    friend: "Friend or family",
    food_community: "Food community",
    another_website: "Another website",
    just_stumbled_upon: "Just stumbled upon KinFeast",
    other: "Other",
  };
  return (
    labels[sourceKey] ??
    sourceKey
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}

function Stat({
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
            {num(value)}
          </p>
        </div>

        <div className={`rounded-xl p-3 ${accentClasses[accent]}`}>{icon}</div>
      </div>
    </article>
  );
}

function Panel({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description?: string;
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
      </div>

      {children}
    </section>
  );
}

function Empty() {
  return (
    <div className="flex h-full min-h-[260px] items-center justify-center px-6 text-center">
      <div>
        <Activity
          size={30}
          className="mx-auto text-stone-300 dark:text-stone-700"
        />

        <p className="mt-3 text-sm font-semibold text-stone-700 dark:text-stone-300">
          No data yet
        </p>

        <p className="mt-1 text-xs text-stone-400">
          Analytics will fill in as KinFeast grows.
        </p>
      </div>
    </div>
  );
}

function AdminAnalyticsPage() {
  const [a, setA] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (refresh = false) => {
    try {
      setError(null);

      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setA(await getAdminAnalytics());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load analytics.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [load]);

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

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-72px)] bg-stone-100 dark:bg-stone-950">
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
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-72px)] bg-stone-100 dark:bg-stone-950">
      <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">
        {/* Page heading */}
        <section className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-orange-600 dark:text-orange-400">
              <BarChart3 size={14} />
              Platform analytics
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-stone-950 dark:text-white sm:text-3xl">
              Analytics
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm text-stone-500 dark:text-stone-400">
              Understand recipe activity, audience growth, and what is happening
              across KinFeast.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void load(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-orange-700 dark:hover:text-orange-400 sm:self-auto"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </section>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        {a && (
          <>
            {/* Stats */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Link
                to="/admin/users"
                className="block min-h-full rounded-2xl transition hover:-translate-y-0.5"
              >
                <Stat
                  label="Total users"
                  value={a.overview.users}
                  icon={<Users size={20} />}
                  accent="orange"
                />
              </Link>

              <Link
                to="/admin/chefs"
                className="block min-h-full rounded-2xl transition hover:-translate-y-0.5"
              >
                <Stat
                  label="Chefs"
                  value={a.overview.chefs}
                  icon={<ChefHat size={20} />}
                  accent="blue"
                />
              </Link>

              <Link
                to="/admin/recipes"
                className="block min-h-full rounded-2xl transition hover:-translate-y-0.5"
              >
                <Stat
                  label="Published recipes"
                  value={a.overview.publishedRecipes}
                  icon={<Utensils size={20} />}
                  accent="green"
                />
              </Link>

              <Link
                to="/admin/moderation"
                className="block min-h-full rounded-2xl transition hover:-translate-y-0.5"
              >
                <Stat
                  label="Recipe views"
                  value={a.overview.views}
                  icon={<Eye size={20} />}
                  accent="amber"
                />
              </Link>
            </section>
            {/* Main charts */}
            <section className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
              {/* Platform activity */}
              <Panel
                title="Platform activity"
                description="Daily views, recipes, and new users over the last 30 days."
              >
                {a.activity.some((x) => x.views || x.recipes || x.users) ? (
                  <div className="h-[340px] p-4 sm:h-[380px] sm:p-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={a.activity}
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
                          minTickGap={28}
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

                        <Line
                          type="monotone"
                          dataKey="users"
                          name="New users"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <Empty />
                )}
              </Panel>

              {/* Recipe status */}
              <Panel
                title="Recipe status"
                description="Current distribution of recipes by moderation status."
              >
                {a.recipeStatus.some((x) => x.count) ? (
                  <div className="h-[340px] p-4 sm:h-[380px] sm:p-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={a.recipeStatus}
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
                          tick={{
                            fontSize: 11,
                            fill: "currentColor",
                          }}
                          className="text-stone-500 dark:text-stone-400"
                        />

                        <Tooltip
                          cursor={{
                            fill: "rgba(120, 113, 108, 0.06)",
                          }}
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
                ) : (
                  <Empty />
                )}
              </Panel>
            </section>
            {/* Categories + cuisine */}
            <section className="mt-6 grid gap-6 lg:grid-cols-2">
              {/* Categories */}
              <Panel
                title="Recipes by category"
                description="Published recipes grouped by their category."
              >
                {a.categories.some((x) => x.count) ? (
                  <div className="grid min-h-[440px] gap-2 p-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:items-center">
                    {/* Donut */}
                    <div className="relative mx-auto h-[300px] w-full max-w-[340px]">
                      <div className="pointer-events-none absolute inset-4 rounded-full bg-gradient-to-br from-stone-100/50 via-transparent to-stone-100/30 blur-2xl dark:from-stone-800/40 dark:to-stone-800/10" />

                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={a.categories.filter((x) => x.count)}
                            dataKey="count"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={85}
                            paddingAngle={3}
                            stroke="none"
                          >
                            {a.categories
                              .filter((x) => x.count)
                              .map((category) => (
                                <Cell
                                  key={category.id}
                                  fill={
                                    categoryColors[category.name] ?? "#64748b"
                                  }
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
                              zIndex: 1000,
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-col gap-1.5">
                      {a.categories.map((category) => {
                        const dot =
                          categoryDotStyles[category.name] ?? "bg-slate-500";

                        const bar =
                          categoryBarStyles[category.name] ?? "bg-slate-500";

                        const pct =
                          (Number(category.count) /
                            Number(a.overview.publishedRecipes)) *
                          100;

                        return (
                          <div
                            key={category.id}
                            className="relative overflow-hidden rounded-lg border border-stone-100 bg-white/70 px-3 py-2 transition-all duration-200 hover:border-stone-200 hover:bg-white hover:shadow-[0_4px_14px_rgba(0,0,0,0.05)] dark:border-stone-800 dark:bg-stone-900/40 dark:hover:border-stone-700 dark:hover:bg-stone-900/70"
                          >
                            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-stone-100/80 dark:bg-stone-800/60">
                              <div
                                className={`h-full ${bar} transition-all duration-500 ease-out`}
                                style={{
                                  width: `${Math.min(pct, 100)}%`,
                                }}
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
                  </div>
                ) : (
                  <Empty />
                )}
              </Panel>

              {/* Cuisine */}
              <Panel
                title="Recipes by cuisine"
                description="Published recipes grouped by cuisine."
              >
                {a.cuisines.some((x) => x.count) ? (
                  <div className="h-[440px] p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={a.cuisines.filter((x) => x.count)}
                        layout="vertical"
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

                        <XAxis
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

                        <YAxis
                          type="category"
                          dataKey="name"
                          width={90}
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 11,
                            fill: "currentColor",
                          }}
                          className="text-stone-500 dark:text-stone-400"
                        />

                        <Tooltip
                          cursor={{
                            fill: "rgba(120, 113, 108, 0.06)",
                          }}
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
                          fill="#0ea5e9"
                          radius={[0, 7, 7, 0]}
                          barSize={24}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <Empty />
                )}
              </Panel>
            </section>
            {/* Marketing analysis */}
            <section className="mt-6">
              
              <Panel
                title="How users found KinFeast"
                description="Where registered users said they heard about KinFeast."
              >
                
                {a.marketingSources.some((source) => source.count > 0) ? (
                  <div className="p-5 sm:p-6">
                    
                    <div className="space-y-5">
                      
                      {a.marketingSources.map((source) => {
                        const maxCount = Math.max(
                          ...a.marketingSources.map((item) => item.count),
                          1,
                        );
                        const barWidth =
                          source.count === 0
                            ? 0
                            : Math.max((source.count / maxCount) * 100, 3);
                        return (
                          <div key={source.id}>
                            
                            <div className="mb-2 flex items-center justify-between gap-4">
                              
                              <div className="min-w-0">
                                
                                <p className="truncate text-sm font-semibold text-stone-800 dark:text-stone-200">
                                  
                                  {formatMarketingSource(
                                    source.source_key,
                                  )}
                                </p>
                              </div>
                              <div className="flex shrink-0 items-center gap-3">
                                
                                <span className="text-sm font-bold text-stone-900 dark:text-white">
                                  
                                  {num(source.count)}
                                </span>
                                <span className="w-12 text-right text-xs font-medium text-stone-400">
                                  
                                  {Number(source.percentage).toFixed(1)}%
                                </span>
                              </div>
                            </div>
                            <div className="h-2.5 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                              
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500"
                                style={{ width: `${barWidth}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4 dark:border-stone-800">
                      
                      <span className="text-xs font-medium text-stone-400">
                        
                        Total attributed registrations
                      </span>
                      <span className="text-sm font-bold text-stone-800 dark:text-stone-200">
                        
                        {num(
                          a.marketingSources.reduce(
                            (total, source) => total + source.count,
                            0,
                          ),
                        )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <Empty />
                )}
              </Panel>
            </section>
            
            {/* Top recipes + chefs */}
            <section className="mt-6 grid gap-6 xl:grid-cols-2">
              <Panel
                title="Top recipes"
                description="Published recipes with the most recorded views."
              >
                {a.topRecipes.length ? (
                  <div className="divide-y divide-stone-100 dark:divide-stone-800">
                    {a.topRecipes.map((r, i) => (
                      <div
                        key={r.id}
                        className="flex items-center gap-4 px-5 py-4 transition hover:bg-stone-50 dark:hover:bg-stone-800/40 sm:px-6"
                      >
                        <span className="w-5 text-sm font-bold text-stone-400">
                          {i + 1}
                        </span>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-stone-900 dark:text-white">
                            {r.title}
                          </p>

                          <p className="mt-1 truncate text-xs text-stone-500 dark:text-stone-400">
                            {r.author_name}
                            {r.category_name ? ` · ${r.category_name}` : ""}
                          </p>
                        </div>

                        <div className="hidden items-center gap-3 text-xs text-stone-500 sm:flex">
                          <span className="inline-flex items-center gap-1">
                            <Eye size={14} />
                            {num(r.views)}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <Heart size={14} />
                            {num(r.likes - 1)}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <MessageSquare size={14} />
                            {num(r.reviews)}
                          </span>
                        </div>

                        <span className="text-sm font-semibold text-stone-700 dark:text-stone-300 sm:hidden">
                          {num(r.views)} views
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty />
                )}
              </Panel>

              <Panel
                title="Top chefs"
                description="Chefs with published recipes and audience reach."
              >
                {a.topChefs.length ? (
                  <div className="divide-y divide-stone-100 dark:divide-stone-800">
                    {a.topChefs.map((c, i) => (
                      <div
                        key={c.id}
                        className="flex items-center gap-4 px-5 py-4 transition hover:bg-stone-50 dark:hover:bg-stone-800/40 sm:px-6"
                      >
                        <span className="w-5 text-sm font-bold text-stone-400">
                          {i + 1}
                        </span>

                        {c.profile_image ? (
                          <img
                            src={c.profile_image}
                            alt=""
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400">
                            <ChefHat size={18} />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-stone-900 dark:text-white">
                            {c.name}
                          </p>

                          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                            {c.published_count} published · {c.follower_count} followers
                          </p>
                        </div>

                        <div className="hidden text-right sm:block">
                          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                            {num(c.recipe_count)}
                          </p>

                          <p className="text-[10px] uppercase tracking-wider text-stone-400">
                            recipes
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty />
                )}
              </Panel>
            </section>
            {/* Secondary stats */}
            <section className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-stone-800 dark:bg-stone-900">
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-300">
                  <Heart size={17} />
                  Likes
                </div>

                <p className="mt-3 text-2xl font-bold text-stone-950 dark:text-white">
                  {num(a.overview.likes)}
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-stone-800 dark:bg-stone-900">
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-300">
                  <MessageSquare size={17} />
                  Reviews
                </div>

                <p className="mt-3 text-2xl font-bold text-stone-950 dark:text-white">
                  {num(a.overview.reviews)}
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-stone-800 dark:bg-stone-900">
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-600 dark:text-stone-300">
                  <Utensils size={17} />
                  Total recipes
                </div>

                <p className="mt-3 text-2xl font-bold text-stone-950 dark:text-white">
                  {num(a.overview.recipes)}
                </p>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default AdminAnalyticsPage;
