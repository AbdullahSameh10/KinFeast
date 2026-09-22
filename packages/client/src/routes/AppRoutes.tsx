import { Route, Routes } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import GuestRoute from "./GuestRoute";
import AdminDashboardPage from "../pages/Admin/AdminDashboardPage";
import RootRoute from "./RootRoute";
import UserDashboardPage from "../pages/User/UserDashboardPage";
import ChefDashboardPage from "../pages/Chef/ChefDashboardPage";
import RoleRoute from "./RoleRoute";
import AdminUsersPage from "../pages/Admin/AdminUsersPage";
import AdminChefsPage from "../pages/Admin/AdminChefsPage";
import AdminRecipesPage from "../pages/Admin/AdminRecipesPage";
import AdminAnalyticsPage from "../pages/Admin/AdminAnalyticsPage";
import AdminModerationPage from "../pages/Admin/AdminModerationPage";

function AppRoutes() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<RootRoute />} />

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
