
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AppShell from "../components/layout/AppShell";
import GuestRoute from "./GuestRoute";
import RootRoute from "./RootRoute";
import RoleRoute from "./RoleRoute";

// Admin pages
const AdminAnalyticsPage = lazy(
  () => import("../pages/Admin/AdminAnalyticsPage"),
);
const AdminChefsPage = lazy(
  () => import("../pages/Admin/AdminChefsPage"),
);
const AdminDashboardPage = lazy(
  () => import("../pages/Admin/AdminDashboardPage"),
);
const AdminModerationPage = lazy(
  () => import("../pages/Admin/AdminModerationPage"),
);
const AdminRecipesPage = lazy(
  () => import("../pages/Admin/AdminRecipesPage"),
);
const AdminUsersPage = lazy(
  () => import("../pages/Admin/AdminUsersPage"),
);

// Authentication pages
const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/Auth/RegisterPage"));

// Chef pages
const ChefDashboardPage = lazy(
  () => import("../pages/Chef-Dashboard/ChefDashboardPage"),
);
const ChefsPage = lazy(() => import("../pages/Chefs/ChefsPage"));
const ChefDetailsPage = lazy(
  () => import("../pages/Chefs/ChefDetailsPage"),
);

// General pages
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const CategoriesPage = lazy(
  () => import("../pages/CategoriesPage"),
);
const DevelopmentPage = lazy(
  () => import("../pages/DevelopmentPage"),
);
const UserDashboardPage = lazy(
  () => import("../pages/User/UserDashboardPage"),
);
const NotFoundPage = lazy(
  () => import("../pages/NotFoundPage"),
);

// Recipe pages
const RecipesPage = lazy(
  () => import("../pages/Recipes/RecipesPage"),
);
const RecipeDetailsPage = lazy(
  () => import("../pages/Recipes/RecipeDetailsPage"),
);
const TrendingPage = lazy(
  () => import("../pages/Recipes/TrendingPage"),
);
const CookWithWhatYouHavePage = lazy(
  () => import("../pages/Recipes/CookWithWhatYouHavePage"),
);

// Informational pages
const PrivacyPolicyPage = lazy(
  () => import("../pages/PrivacyPolicyPage"),
);
const TermsPage = lazy(
  () => import("../pages/TermsPage"),
);
const CookiesPolicyPage = lazy(
  () => import("../pages/CookiesPolicyPage"),
);
const AccessibilityPage = lazy(
  () => import("../pages/AccessibilityPage"),
);
const CommunityGuidelinesPage = lazy(
  () => import("../pages/CommunityGuidelinesPage"),
);
const PressPage = lazy(
  () => import("../pages/PressPage"),
);
const HowItWorksPage = lazy(
  () => import("../pages/HowItWorksPage"),
);
const HelpCenterPage = lazy(
  () => import("../pages/HelpCenterPage"),
);
const ApiLicensingPage = lazy(
  () => import("../pages/ApiLicensingPage"),
);

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

function AppRoutes() {
  return (
    <AppShell>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<RootRoute />} />

          <Route path="/recipes" element={<RecipesPage />} />

          <Route
            path="/recipes/:slug"
            element={<RecipeDetailsPage />}
          />

          <Route
            path="/cook-with-what-you-have"
            element={<CookWithWhatYouHavePage />}
          />

          <Route path="/chefs" element={<ChefsPage />} />

          <Route
            path="/chefs/:username"
            element={<ChefDetailsPage />}
          />

          <Route
            path="/dashboard"
            element={
              <RoleRoute allowedRole="user">
                <UserDashboardPage />
              </RoleRoute>
            }
          />

          <Route
            path="/chef"
            element={
              <RoleRoute allowedRole="chef">
                <ChefDashboardPage />
              </RoleRoute>
            }
          />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route
            path="/admin"
            element={
              <RoleRoute allowedRole="admin">
                <AdminDashboardPage />
              </RoleRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <RoleRoute allowedRole="admin">
                <AdminUsersPage />
              </RoleRoute>
            }
          />

          <Route
            path="/admin/chefs"
            element={
              <RoleRoute allowedRole="admin">
                <AdminChefsPage />
              </RoleRoute>
            }
          />

          <Route
            path="/admin/recipes"
            element={
              <RoleRoute allowedRole="admin">
                <AdminRecipesPage />
              </RoleRoute>
            }
          />

          <Route
            path="/admin/moderation"
            element={
              <RoleRoute allowedRole="admin">
                <AdminModerationPage />
              </RoleRoute>
            }
          />

          <Route
            path="/admin/analytics"
            element={
              <RoleRoute allowedRole="admin">
                <AdminAnalyticsPage />
              </RoleRoute>
            }
          />

          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />

          <Route
            path="/register"
            element={
              <GuestRoute>
                <RegisterPage />
              </GuestRoute>
            }
          />

          <Route path="/trending" element={<TrendingPage />} />

          <Route
            path="/categories"
            element={<CategoriesPage />}
          />

          <Route
            path="/featured-chefs"
            element={<DevelopmentPage />}
          />

          <Route
            path="/become-a-chef"
            element={<DevelopmentPage />}
          />

          <Route
            path="/creator-program"
            element={<DevelopmentPage />}
          />

          <Route
            path="/partner-with-us"
            element={<DevelopmentPage />}
          />

          <Route
            path="/careers"
            element={<DevelopmentPage />}
          />

          <Route
            path="/how-it-works"
            element={<HowItWorksPage />}
          />

          <Route path="/press" element={<PressPage />} />

          <Route
            path="/business/restaurants"
            element={<DevelopmentPage />}
          />

          <Route
            path="/business/brands"
            element={<DevelopmentPage />}
          />

          <Route
            path="/business/advertising"
            element={<DevelopmentPage />}
          />

          <Route
            path="/business/api"
            element={<ApiLicensingPage />}
          />

          <Route path="/help" element={<HelpCenterPage />} />

          <Route
            path="/privacy"
            element={<PrivacyPolicyPage />}
          />

          <Route path="/terms" element={<TermsPage />} />

          <Route
            path="/cookies"
            element={<CookiesPolicyPage />}
          />

          <Route
            path="/accessibility"
            element={<AccessibilityPage />}
          />

          <Route
            path="/community-guidelines"
            element={<CommunityGuidelinesPage />}
          />

          <Route
            path="/social/instagram"
            element={<DevelopmentPage />}
          />

          <Route
            path="/social/youtube"
            element={<DevelopmentPage />}
          />

          <Route
            path="/social/tiktok"
            element={<DevelopmentPage />}
          />

          <Route
            path="/social/pinterest"
            element={<DevelopmentPage />}
          />

          <Route
            path="/social/x"
            element={<DevelopmentPage />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}

export default AppRoutes;
