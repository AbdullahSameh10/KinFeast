import {
  BarChart3,
  Bell,
  ChefHat,
  LayoutDashboard,
  Menu,
  Moon,
  PanelLeftClose,
  Search,
  ShieldCheck,
  Sun,
  Users,
  Utensils,
  X,
  LogOut,
  PanelLeftOpen,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logoDark from "../../assets/logo (dark).png";
import logoLight from "../../assets/logo (light).png";
import logoCollapsed from "../../assets/logo-collapsed.png";

import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

interface AdminShellProps {
  children: ReactNode;
}

const navigation = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, enabled: true },
  { label: "Users", href: "/admin/users", icon: Users, enabled: true },
  { label: "Chefs", href: "/admin/chefs", icon: ChefHat, enabled: true },
  { label: "Recipes", href: "/admin/recipes", icon: Utensils, enabled: true },
  { label: "Moderation", href: "/admin/moderation", icon: ShieldCheck, enabled: true },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3, enabled: true },
];

function AdminShell({ children }: AdminShellProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const closeMobileSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleToggleCollapse = () => setIsCollapsed((current) => !current);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-950 dark:bg-stone-950 dark:text-white">
      {/* Mobile backdrop */}
      <button
        type="button"
        aria-label="Close admin sidebar"
        onClick={closeMobileSidebar}
        className={`fixed inset-0 z-40 bg-stone-950/50 backdrop-blur-sm transition-opacity lg:hidden ${
          isSidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 overflow-x-hidden left-0 z-50 flex w-72 flex-col border-r border-stone-200 bg-white transition-all duration-300 dark:border-stone-800 dark:bg-stone-900 ${
          isCollapsed ? "lg:w-20" : "lg:w-64"
        } ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex h-[72px] shrink-0 items-center border-b border-stone-200 dark:border-stone-800 ${
            isCollapsed ? "justify-center px-3" : "justify-between px-5"
          }`}
        >
          <NavLink
            to="/admin"
            onClick={closeMobileSidebar}
            className="shrink-0"
          >
            <img
              src={isCollapsed ? logoCollapsed : logoDark}
              alt="KinFeast"
              width={150}
              height={40}
              className={`hidden dark:block ${
                isCollapsed ? "w-10 object-cover object-left" : "w-[150px]"
              }`}
            />
            <img
              src={isCollapsed ? logoCollapsed : logoLight}
              alt="KinFeast"
              width={150}
              height={40}
              className={`block dark:hidden ${
                isCollapsed ? "w-10 object-cover object-left" : "w-[150px]"
              }`}
            />
          </NavLink>

          {/* Mobile close */}
          <button
            type="button"
            onClick={closeMobileSidebar}
            className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 overflow-auto px-3 py-6 ${isCollapsed && "mt-[27px]"}`}>
          <p
            className={`mb-3 px-3 text-[10px] max-h-[15px] font-bold uppercase tracking-[0.18em] text-stone-400 ${
              isCollapsed ? "lg:hidden" : ""
            }`}
          >
            Workspace
          </p>

          <div className={`flex overflow-x-hidden ${isCollapsed ? "h-full" : "h-[calc(100%-27px)]"} flex-1 flex-col space-y-1.5`}>
            {navigation.map((item) => {
              const Icon = item.icon;

              if (!item.enabled) {
                return (
                  <div
                    key={item.label}
                    className={`group relative flex cursor-default items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-stone-400 dark:text-stone-600 ${
                      isCollapsed ? "lg:justify-center lg:px-0" : ""
                    }`}
                    title={`${item.label} — coming soon`}
                  >
                    <Icon size={19} strokeWidth={1.8} />
                    <span className={isCollapsed ? "lg:hidden" : ""}>
                      {item.label}
                    </span>
                    {!isCollapsed && (
                      <span className="ml-auto rounded-full bg-stone-100 px-2 py-0.5 text-[9px] font-semibold text-stone-400 dark:bg-stone-800 dark:text-stone-500">
                        Soon
                      </span>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  onClick={closeMobileSidebar}
                  end={item.href === "/admin"}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      isCollapsed ? "lg:justify-center lg:px-0" : ""
                    } ${
                      isActive
                        ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
                    }`
                  }
                >
                  <Icon size={19} strokeWidth={1.9} />
                  <span className={isCollapsed ? "lg:hidden" : ""}>
                    {item.label}
                  </span>
                </NavLink>
              );
            })}

            {/* Collapse / Expand — as an option in the sidebar list */}
            <div className="flex h-full items-end">
              <button
                type="button"
                onClick={handleToggleCollapse}
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                className={`group hidden w-full items-center gap-3 rounded-xl border border-dashed border-stone-200 px-3 py-3 text-sm font-semibold text-stone-500 transition hover:border-stone-300 hover:bg-stone-100 hover:text-stone-900 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-600 dark:hover:bg-stone-800 dark:hover:text-white lg:flex ${
                  isCollapsed ? "lg:justify-center lg:px-0" : ""
                }`}
              >
                {isCollapsed ? (
                  <PanelLeftOpen size={19} strokeWidth={1.9} />
                ) : (
                  <PanelLeftClose size={19} strokeWidth={1.9} />
                )}
                <span className={isCollapsed ? "lg:hidden" : ""}>
                  {isCollapsed ? "Expand" : "Collapse"}
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Admin identity */}
        <div className="border-t border-stone-200  p-3 dark:border-stone-800">
          <div
            className={`flex items-center gap-3 rounded-xl bg-stone-50 p-3 overflow-x-hidden dark:bg-stone-950 ${
              isCollapsed ? "lg:justify-center lg:p-2" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400">
              {user?.profile_image ? (
                <img
                  src={user.profile_image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <Users size={17} />
              )}
            </div>

            <div
              className={`flex w-full items-center justify-between ${
                isCollapsed ? "lg:hidden" : ""
              }`}
            >
              <div className="flex flex-col">
                <p className="truncate text-xs font-bold text-stone-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="truncate text-[11px] text-stone-500 dark:text-stone-400">
                  Administrator
                </p>
              </div>
              <div
                title="Sign out"
                onClick={handleLogout}
                className="group flex items-center justify-center rounded-lg p-1 transition hover:bg-stone-100 hover:text-stone-950 dark:hover:bg-stone-800 dark:hover:text-white"
              >
                <LogOut
                  size={20}
                  className="cursor-pointer transition-colors duration-150 group-hover:text-red-500"
                />
              </div>
            </div>
          </div>
          <div
                title="Sign out"
                onClick={handleLogout}
                className={`${isCollapsed ? "flex" : "hidden"} group items-center justify-center rounded-lg p-4 mt-2.5 transition bg-stone-100 hover:text-stone-950 dark:bg-stone-800 dark:hover:text-white`}
              >
                <LogOut
                  size={20}
                  className="cursor-pointer transition-colors duration-150 group-hover:text-red-500"
                />
              </div>
        </div>
      </aside>

      {/* Main workspace */}
      <div
        className={`min-h-screen transition-[padding] duration-300 ${
          isCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between gap-4 border-b border-stone-200 bg-white/90 px-4 backdrop-blur-xl dark:border-stone-800 dark:bg-stone-900/90 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            {/* Mobile: open sidebar */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-xl p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 lg:hidden"
              aria-label="Open admin sidebar"
            >
              <Menu size={21} />
            </button>

            {/* Search */}
            <div className="relative hidden w-72 md:block lg:w-96">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="search"
                placeholder="Search the dashboard..."
                className="h-10 w-full rounded-xl border border-stone-200 bg-stone-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 dark:border-stone-800 dark:bg-stone-950 dark:text-white dark:focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-xl p-2.5 text-stone-600 transition hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button
              type="button"
              className="relative rounded-xl p-2.5 text-stone-600 transition hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
              aria-label="Notifications"
            >
              <Bell size={19} />
            </button>

            <div className="mx-1 hidden h-7 w-px bg-stone-200 dark:bg-stone-800 sm:block" />

            <button
              type="button"
              onClick={handleLogout}
              title="Sign out"
              className="group inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-sm font-medium text-stone-700 shadow-sm transition-all duration-200 hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 active:scale-[0.98] dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-600 dark:hover:bg-stone-800 dark:hover:text-stone-100 dark:focus-visible:ring-stone-500 dark:focus-visible:ring-offset-stone-900"
            >
              <span>Sign out</span>
              <LogOut
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}

export default AdminShell;
