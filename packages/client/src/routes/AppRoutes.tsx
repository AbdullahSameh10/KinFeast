import { Route, Routes } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import GuestRoute from "./GuestRoute";
import RootRoute from "./RootRoute";
import RoleRoute from "./RoleRoute";
import {
  AboutPage,
  AdminAnalyticsPage,
  AdminChefsPage,
  AdminDashboardPage,
  AdminModerationPage,
  AdminRecipesPage,
  AdminUsersPage,
  CategoriesPage,
  ChefDashboardPage,
  ChefDetailsPage,
  ChefsPage,
  ContactPage,
  DevelopmentPage,
  LoginPage,
  NotFoundPage,
  RecipeDetailsPage,
  RecipesPage,
  RegisterPage,
  TrendingPage,
  UserDashboardPage,
  CookWithWhatYouHavePage,
  PrivacyPolicyPage,
  TermsPage,
  CookiesPolicyPage,
  AccessibilityPage,
  CommunityGuidelinesPage,
  PressPage,
  HowItWorksPage,
  HelpCenterPage,
  ApiLicensingPage
} from "../pages";

function AppRoutes() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<RootRoute />} />

        <Route path="/recipes" element={<RecipesPage />} />

        <Route path="/recipes/:slug" element={<RecipeDetailsPage />} />

        <Route path="/cook-with-what-you-have" element={<CookWithWhatYouHavePage />} />

        <Route path="/chefs" element={<ChefsPage />} />

        <Route path="/chefs/:username" element={<ChefDetailsPage />} />

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

        <Route path="/categories" element={<CategoriesPage />} />

        <Route path="/featured-chefs" element={<DevelopmentPage />} />

        <Route path="/become-a-chef" element={<DevelopmentPage />} />

        <Route path="/creator-program" element={<DevelopmentPage />} />

        <Route path="/partner-with-us" element={<DevelopmentPage />} />

        <Route path="/careers" element={<DevelopmentPage />} />

        <Route path="/how-it-works" element={<HowItWorksPage />} />

        <Route path="/press" element={<PressPage />} />

        <Route path="/business/restaurants" element={<DevelopmentPage />} />

        <Route path="/business/brands" element={<DevelopmentPage />} />

        <Route path="/business/advertising" element={<DevelopmentPage />} />

        <Route path="/business/api" element={<ApiLicensingPage />} />

        <Route path="/help" element={<HelpCenterPage />} />

        <Route path="/privacy" element={<PrivacyPolicyPage />} />

        <Route path="/terms" element={<TermsPage />} />

        <Route path="/cookies" element={<CookiesPolicyPage />} />

        <Route path="/accessibility" element={<AccessibilityPage />} />

        <Route path="/community-guidelines" element={<CommunityGuidelinesPage />} />

        <Route path="/social/instagram" element={<DevelopmentPage />} />

        <Route path="/social/youtube" element={<DevelopmentPage />} />

        <Route path="/social/tiktok" element={<DevelopmentPage />} />

        <Route path="/social/pinterest" element={<DevelopmentPage />} />

        <Route path="/social/x" element={<DevelopmentPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}

export default AppRoutes;
