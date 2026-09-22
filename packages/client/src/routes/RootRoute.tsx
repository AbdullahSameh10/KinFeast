import { Navigate } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import { useAuth } from "../hooks/useAuth";

function RootRoute() {
  const { user, isAuthenticated, isLoading } = useAuth();

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
    return <HomePage />;
  }

  switch (user?.role) {
    case "admin":
      return (
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-stone-50 dark:bg-stone-950">
          <Navigate to="/admin" replace />
        </div>
      );

    case "chef":
      return (
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-stone-50 dark:bg-stone-950">
          <Navigate to="/chef" replace />
        </div>
      );

    case "user":
      return (
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-stone-50 dark:bg-stone-950">
          <Navigate to="/dashboard" replace />
        </div>
      );

    default:
      return (
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-stone-50 dark:bg-stone-950">
          <Navigate to="/login" replace />
        </div>
      );
  }
}

export default RootRoute;