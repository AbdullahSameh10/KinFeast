import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface GuestRouteProps {
  children: ReactNode;
}

function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-stone-50 dark:bg-stone-950">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-orange-500 dark:border-stone-700 dark:border-t-orange-400"
          aria-label="Loading"
        />
      </div>
    );
  }

  // Already logged in? Send them away from /login and /register.
  if (isAuthenticated) {
    // `state.from` is useful if you want to preserve where the user
    // was eading before the redirect. Here we intentionally ignore
    return (
    // it and just go home.
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-stone-50 dark:bg-stone-950">
        <Navigate to="/" replace state={{ from: location.pathname }} />
      </div>
    );
  }

  return <>{children}</>;
}

export default GuestRoute;
