import {
  ChevronLeft,
  ChevronRight,
  Search,
  ShieldCheck,
  UserRound,
  ChefHat,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  getAdminUsers,
  type AdminUser,
} from "../../api/admin.api";

const ROLE_LABELS = {
  user: "User",
  chef: "Chef",
  admin: "Admin",
} as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function RoleIcon({ role }: { role: AdminUser["role"] }) {
  if (role === "chef") {
    return <ChefHat size={15} />;
  }

  if (role === "admin") {
    return <ShieldCheck size={15} />;
  }

  return <UserRound size={15} />;
}

function roleClasses(role: AdminUser["role"]) {
  if (role === "admin") {
    return "bg-purple-500/10 text-purple-700 dark:text-purple-300";
  }

  if (role === "chef") {
    return "bg-orange-500/10 text-orange-700 dark:text-orange-300";
  }

  return "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300";
}

function UserAvatar({ user }: { user: AdminUser }) {
  if (user.profile_image) {
    return (
      <img
        src={user.profile_image}
        alt=""
        className="h-11 w-11 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
      <UserRound size={19} />
    </div>
  );
}

function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<
    "" | AdminUser["role"]
  >("");
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
      const loadUsers = async () => {
        try {
          setIsLoading(true);
          setError(null);

          const result = await getAdminUsers({
            search,
            role: role || undefined,
            page,
            limit: 12,
          });

          setUsers(result.users);
          setPagination(result.pagination);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load users.",
          );
        } finally {
          setIsLoading(false);
        }
      };

      void loadUsers();
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [search, role, page]);

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
    setPage(1);
  };

  const handleRoleChange = (
    value: "" | AdminUser["role"],
  ) => {
    setRole(value);
    setPage(1);
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-stone-50 dark:bg-stone-950">
      <div className="page-container py-8 sm:py-10 lg:py-12">
        {/* Header */}
        <section className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700 dark:border-orange-900/60 dark:bg-orange-950/30 dark:text-orange-300">
            <ShieldCheck size={14} />
            User management
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-white sm:text-4xl">
            Users
          </h1>

          <p className="mt-2 max-w-2xl text-stone-600 dark:text-stone-400">
            Browse and manage the people who make up the KinFeast community.
          </p>
        </section>

        {/* Filters */}
        <section className="mb-6 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <label className="relative block">
              <span className="sr-only">
                Search users
              </span>

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
                placeholder="Search by name or email..."
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 py-3 pl-11 pr-4 text-sm text-stone-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-white"
              />
            </label>

            <label>
              <span className="sr-only">
                Filter by role
              </span>

              <select
                value={role}
                onChange={(event) =>
                  handleRoleChange(
                    event.target.value as "" | AdminUser["role"],
                  )
                }
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-white"
              >
                <option value="">All roles</option>
                <option value="user">Users</option>
                <option value="chef">Chefs</option>
                <option value="admin">Admins</option>
              </select>
            </label>
          </div>
        </section>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        {/* User list */}
        <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
          {/* Desktop */}
          <div className="hidden md:block">
            <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] border-b border-stone-200 bg-stone-50 px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-500 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-400">
              <span>User</span>
              <span>Email</span>
              <span>Role</span>
              <span>Joined</span>
            </div>

            {isLoading ? (
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[2fr_1.5fr_1fr_1fr] items-center gap-4 px-6 py-5"
                  >
                    <div className="h-11 w-48 animate-pulse rounded-xl bg-stone-200 dark:bg-stone-800" />
                    <div className="h-5 w-40 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
                    <div className="h-7 w-20 animate-pulse rounded-full bg-stone-200 dark:bg-stone-800" />
                    <div className="h-5 w-24 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
                  </div>
                ))}
              </div>
            ) : users.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <UserRound
                  size={34}
                  className="mx-auto text-stone-400"
                />
                <p className="mt-3 font-semibold text-stone-900 dark:text-white">
                  No users found
                </p>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  Try changing your search or role filter.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-[2fr_1.5fr_1fr_1fr] items-center gap-4 px-6 py-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <UserAvatar user={user} />

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-stone-950 dark:text-white">
                          {user.name}
                        </p>

                        <p className="truncate text-sm text-stone-500 dark:text-stone-400">
                          {user.bio || "No bio added"}
                        </p>
                      </div>
                    </div>

                    <p className="truncate text-sm text-stone-600 dark:text-stone-300">
                      {user.email}
                    </p>

                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${roleClasses(user.role)}`}
                    >
                      <RoleIcon role={user.role} />
                      {ROLE_LABELS[user.role]}
                    </span>

                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      {formatDate(user.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            {isLoading ? (
              <div className="space-y-3 p-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-24 animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-800"
                  />
                ))}
              </div>
            ) : users.length === 0 ? (
              <div className="px-5 py-16 text-center">
                <UserRound
                  size={34}
                  className="mx-auto text-stone-400"
                />
                <p className="mt-3 font-semibold text-stone-900 dark:text-white">
                  No users found
                </p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {users.map((user) => (
                  <article
                    key={user.id}
                    className="p-4"
                  >
                    <div className="flex items-start gap-3">
                      <UserAvatar user={user} />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="truncate font-semibold text-stone-950 dark:text-white">
                            {user.name}
                          </h2>

                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${roleClasses(user.role)}`}
                          >
                            <RoleIcon role={user.role} />
                            {ROLE_LABELS[user.role]}
                          </span>
                        </div>

                        <p className="mt-1 truncate text-sm text-stone-500 dark:text-stone-400">
                          {user.email}
                        </p>

                        <p className="mt-2 text-xs text-stone-400 dark:text-stone-500">
                          Joined {formatDate(user.created_at)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {!isLoading && pagination.totalPages > 0 && (
            <div className="flex flex-col gap-3 border-t border-stone-200 px-4 py-4 dark:border-stone-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Showing{" "}
                <span className="font-semibold text-stone-700 dark:text-stone-200">
                  {(pagination.page - 1) * pagination.limit + 1}
                </span>
                {" – "}
                <span className="font-semibold text-stone-700 dark:text-stone-200">
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total,
                  )}
                </span>
                {" of "}
                <span className="font-semibold text-stone-700 dark:text-stone-200">
                  {pagination.total}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => current - 1)
                  }
                  disabled={pagination.page <= 1}
                  className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <span className="px-2 text-sm font-semibold text-stone-600 dark:text-stone-300">
                  {pagination.page} / {pagination.totalPages}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => current + 1)
                  }
                  disabled={
                    pagination.page >= pagination.totalPages
                  }
                  className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminUsersPage;