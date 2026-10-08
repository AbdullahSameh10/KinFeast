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
  ChefDashboardPage,
  ChefsPage,
  ContactPage,
  DevelopmentPage,
  LoginPage,
  NotFoundPage,
  RecipeDetailsPage,
  RecipesPage,
  RegisterPage,
  UserDashboardPage,
} from "../pages";

function AppRoutes() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<RootRoute />} />

        <Route path="/recipes" element={<RecipesPage />} />

        <Route path="/recipes/:slug" element={<RecipeDetailsPage />} />

        <Route path="/chefs" element={<ChefsPage />} />

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

        <Route path="/trending" element={<DevelopmentPage />} />

        <Route path="/categories" element={<DevelopmentPage />} />

        <Route path="/featured-chefs" element={<DevelopmentPage />} />

        <Route path="/become-a-chef" element={<DevelopmentPage />} />

        <Route path="/creator-program" element={<DevelopmentPage />} />

        <Route path="/partner-with-us" element={<DevelopmentPage />} />

        <Route path="/careers" element={<DevelopmentPage />} />

        <Route path="/how-it-works" element={<DevelopmentPage />} />

        <Route path="/press" element={<DevelopmentPage />} />

        <Route path="/business/restaurants" element={<DevelopmentPage />} />

        <Route path="/business/brands" element={<DevelopmentPage />} />

        <Route path="/business/advertising" element={<DevelopmentPage />} />

        <Route path="/business/api" element={<DevelopmentPage />} />

        <Route path="/help" element={<DevelopmentPage />} />

        <Route path="/privacy" element={<DevelopmentPage />} />

        <Route path="/terms" element={<DevelopmentPage />} />

        <Route path="/cookies" element={<DevelopmentPage />} />

        <Route path="/accessibility" element={<DevelopmentPage />} />

        <Route path="/community-guidelines" element={<DevelopmentPage />} />

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
