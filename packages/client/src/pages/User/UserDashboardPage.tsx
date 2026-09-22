import { BookOpen, ChefHat, Heart, Users } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function UserDashboardPage() {
  const { user } = useAuth();

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-stone-50 dark:bg-stone-950">
      <div className="page-container py-10 sm:py-14">
        <div className="mb-10">
          <span className="inline-flex rounded-full bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
            Your KinFeast
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-950 dark:text-white sm:text-4xl">
            Welcome back, {user?.name}.
          </h1>

          <p className="mt-3 max-w-2xl text-stone-600 dark:text-stone-400">
            Discover recipes, connect with chefs, and be part of the KinFeast
            community.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Recipes",
              description: "Discover something delicious.",
              icon: BookOpen,
            },
            {
              title: "Chefs",
              description: "Meet the people behind the recipes.",
              icon: ChefHat,
            },
            {
              title: "Saved",
              description: "Your favorite recipes.",
              icon: Heart,
            },
            {
              title: "Community",
              description: "See what's happening.",
              icon: Users,
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

export default UserDashboardPage;