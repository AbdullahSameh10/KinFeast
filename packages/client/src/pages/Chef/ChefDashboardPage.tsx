import {
  BarChart3,
  BookOpen,
  ChefHat,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function ChefDashboardPage() {
  const { user } = useAuth();

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-stone-50 dark:bg-stone-950">
      <div className="page-container py-10 sm:py-14">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
              <ChefHat size={14} />
              Chef workspace
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-950 dark:text-white sm:text-4xl">
              Welcome back, {user?.name}.
            </h1>

            <p className="mt-3 max-w-2xl text-stone-600 dark:text-stone-400">
              Create recipes, manage your kitchen, and grow your presence on
              KinFeast.
            </p>
          </div>

          <Link
            to="/recipes/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            <Plus size={18} />
            Add recipe
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "My Recipes",
              description: "Manage your published recipes and drafts.",
              icon: BookOpen,
            },
            {
              title: "Add Recipe",
              description: "Share your next recipe with the community.",
              icon: Plus,
            },
            {
              title: "Analytics",
              description: "See how your recipes are performing.",
              icon: BarChart3,
            },
          ].map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                <Icon size={21} />
              </div>

              <h2 className="mt-5 font-bold text-stone-950 dark:text-white">
                {title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-stone-500 dark:text-stone-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ChefDashboardPage;