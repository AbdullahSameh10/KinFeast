import { Route, Routes } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import GuestRoute from "./GuestRoute";
import RootRoute from "./RootRoute";
import RoleRoute from "./RoleRoute";
import {
  AdminAnalyticsPage,
  AdminChefsPage,
  AdminDashboardPage,
  AdminModerationPage,
  AdminRecipesPage,
  AdminUsersPage,
  ChefDashboardPage,
  LoginPage,
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
      </Routes>
    </AppShell>
  );
}

export default AppRoutes;
