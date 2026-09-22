import type { Response } from "express";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";
import { getAdminDashboard } from "./admin.service.js";
import { getAdminUsers } from "./admin.users.service.js";
import { getAdminChefs } from "./admin.chefs.service.js";
import {
  getAdminModerationQueue,
  getAdminRecipeFilters,
  getAdminRecipes,
} from "./admin.recipes.service.js";
import { getAdminAnalytics } from "./admin.analytics.service.js";

export const getAdminDashboardController = async (
  _req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const dashboard = await getAdminDashboard();

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load admin dashboard.",
    });
  }
};

export const getAdminUsersController = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const search = typeof req.query.search === "string" ? req.query.search : "";

    const role =
      req.query.role === "user" ||
      req.query.role === "chef" ||
      req.query.role === "admin"
        ? req.query.role
        : undefined;

    const parsedPage = Number(req.query.page);
    const parsedLimit = Number(req.query.limit);

    const page =
      Number.isFinite(parsedPage) && parsedPage > 0
        ? Math.floor(parsedPage)
        : 1;

    const limit =
      Number.isFinite(parsedLimit) && parsedLimit > 0
        ? Math.floor(parsedLimit)
        : 12;

    const result = await getAdminUsers({
      search,
      role,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Admin users error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load admin users.",
    });
  }
};

export const getAdminChefsController = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const search = typeof req.query.search === "string" ? req.query.search : "";

    const parsedPage = Number(req.query.page);
    const parsedLimit = Number(req.query.limit);

    const page =
      Number.isFinite(parsedPage) && parsedPage > 0
        ? Math.floor(parsedPage)
        : 1;

    const limit =
      Number.isFinite(parsedLimit) && parsedLimit > 0
        ? Math.floor(parsedLimit)
        : 12;

    const result = await getAdminChefs({
      search,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Admin chefs error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load admin chefs.",
    });
  }
};

export const getAdminRecipesController = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const search = typeof req.query.search === "string" ? req.query.search : "";

    const status = typeof req.query.status === "string" ? req.query.status : "";

    const category =
      typeof req.query.category === "string" ? req.query.category : "";

    const cuisine =
      typeof req.query.cuisine === "string" ? req.query.cuisine : "";

    const parsedPage = Number(req.query.page);
    const parsedLimit = Number(req.query.limit);

    const page =
      Number.isFinite(parsedPage) && parsedPage > 0
        ? Math.floor(parsedPage)
        : 1;

    const limit =
      Number.isFinite(parsedLimit) && parsedLimit > 0
        ? Math.floor(parsedLimit)
        : 12;

    const result = await getAdminRecipes({
      search,
      status,
      category,
      cuisine,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Admin recipes error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load recipes.",
    });
  }
};

export const getAdminRecipeFiltersController = async (
  _req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const result = await getAdminRecipeFilters();

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Admin recipe filters error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load recipe filters.",
    });
  }
};

export const getAdminModerationController = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const search = typeof req.query.search === "string" ? req.query.search : "";

    const parsedPage = Number(req.query.page);
    const parsedLimit = Number(req.query.limit);

    const page =
      Number.isFinite(parsedPage) && parsedPage > 0
        ? Math.floor(parsedPage)
        : 1;

    const limit =
      Number.isFinite(parsedLimit) && parsedLimit > 0
        ? Math.floor(parsedLimit)
        : 12;

    const result = await getAdminModerationQueue({
      search,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Admin moderation error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load moderation queue.",
    });
  }
};

export const getAdminAnalyticsController = async (
  _req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const analytics = await getAdminAnalytics();
    res.status(200).json({ success: true, analytics });
  } catch (error) {
    console.error("Admin analytics error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load admin analytics.",
    });
  }
};
