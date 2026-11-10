import { Suspense, type ReactNode } from "react";

import AdminShell from "./AdminShell";
import Footer from "./Footer";
import Navbar from "../navigation/Navbar";

import { useAuth } from "../../hooks/useAuth";

interface AppShellProps {
  children: ReactNode;
}

function RouteLoadingFallback() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-orange-500 dark:border-stone-700 dark:border-t-orange-400"
        aria-hidden="true"
      />
    </div>
  );
}

function AppShell({ children }: AppShellProps) {
  const { user, isLoading } = useAuth();

  if (!isLoading && user?.role === "admin") {
    return <AdminShell>{children}</AdminShell>;
  }

  return (
    <div className="app-shell relative overflow-x-clip">
      <Navbar />

      <Suspense fallback={<RouteLoadingFallback />}>
        <main className="app-main">{children}</main>
        <Footer />
      </Suspense>
    </div>
  );
}

export default AppShell;
