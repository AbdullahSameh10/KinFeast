import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RoleRouteProps {
  allowedRole: "user" | "chef" | "admin";
  children: ReactNode;
}

function RoleRoute({ allowedRole, children }: RoleRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
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

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-stone-50 dark:bg-stone-950">
        <Navigate to="/login" replace state={{ from: location.pathname }} />
      </div>
    );
  }

  if (user?.role !== allowedRole) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-stone-50 dark:bg-stone-950">
        <Navigate to="/" replace />
      </div>
    );
  }

  return <>{children}</>;
}

export default RoleRoute;
