import apiClient from "./client";

export interface AdminDashboardStats {
  users: number;
  chefs: number;
  publishedRecipes: number;
  pendingRecipes: number;
  rejectedRecipes: number;
}

export interface AdminActivityPoint {
  date: string;
  views: number;
  recipes: number;
}

export interface AdminRecipeCategory {
  id: number;
  name: string;
  count: number;
  percentage: number;
}

export interface AdminRecipeStatus {
  status: "Published" | "Pending" | "Rejected";
  count: number;
}

export interface AdminRecentUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "chef" | "admin";
  created_at: string;
}

export interface AdminPendingRecipe {
  id: string;
  author_id: string;
  author_name: string;
  title: string;
  description: string | null;
  cooking_time: number;
  difficulty: "Easy" | "Medium" | "Hard";
  created_at: string;
  status: "pending";
  cuisine_name: string | null;
  category_name: string | null;
}

export interface AdminDashboard {
  stats: AdminDashboardStats;
  activity: AdminActivityPoint[];
  recipeCategories: AdminRecipeCategory[];
  recipeStatus: AdminRecipeStatus[];
  recentUsers: AdminRecentUser[];
  pendingRecipes: AdminPendingRecipe[];
}

export interface AdminAnalyticsOverview {
  users: number;
  chefs: number;
  recipes: number;
  publishedRecipes: number;
  pendingRecipes: number;
  rejectedRecipes: number;
  views: number;
  likes: number;
  reviews: number;
}
export interface AdminAnalyticsActivityPoint {
  date: string;
  views: number;
  recipes: number;
  users: number;
}
export interface AdminAnalyticsStatusPoint {
  status: "Published" | "Pending" | "Rejected";
  count: number;
}
export interface AdminAnalyticsCategoryPoint {
  id: number;
  name: string;
  count: number;
}
export interface AdminAnalyticsCuisinePoint {
  id: number;
  name: string;
  count: number;
}
export interface AdminAnalyticsTopRecipe {
  id: string;
  title: string;
  author_name: string;
  category_name: string | null;
  views: number;
  likes: number;
  reviews: number;
}

export interface AdminAnalyticsMarketingSource {
  id: string;
  source_key: string;
  count: number;
  percentage: number;
}

export interface AdminAnalyticsTopChef {
  id: string;
  name: string;
  profile_image: string | null;
  recipe_count: number;
  published_count: number;
  follower_count: number;
}
export interface AdminAnalytics {
  overview: AdminAnalyticsOverview;
  activity: AdminAnalyticsActivityPoint[];
  recipeStatus: AdminAnalyticsStatusPoint[];
  categories: AdminAnalyticsCategoryPoint[];
  cuisines: AdminAnalyticsCuisinePoint[];
  marketingSources: AdminAnalyticsMarketingSource[];
  topRecipes: AdminAnalyticsTopRecipe[];
  topChefs: AdminAnalyticsTopChef[];
}
interface AdminAnalyticsResponse {
  success: boolean;
  message?: string;
  analytics?: AdminAnalytics;
}

interface AdminDashboardResponse {
  success: boolean;
  message?: string;
  dashboard?: AdminDashboard;
}

interface RecipeModerationResponse {
  success: boolean;
  message: string;
  recipe?: {
    id: string;
    author_id: string;
    cuisine_id: number | null;
    category_id: number;
    title: string;
    description: string | null;
    instructions: string;
    cooking_time: number;
    difficulty: "Easy" | "Medium" | "Hard";
    created_at: string;
    status: "published" | "rejected";
  };
}

export interface AdminUsersResult {
  users: AdminUser[];
  pagination: AdminUsersPagination;
}

interface AdminUsersResponse {
  success: boolean;
  message?: string;
  users?: AdminUser[];
  pagination?: AdminUsersPagination;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "chef" | "admin";
  bio: string | null;
  profile_image: string | null;
  created_at: string;
}
export interface AdminUsersPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminChef {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  profile_image: string | null;
  created_at: string;
  recipe_count: number;
  published_count: number;
  pending_count: number;
  rejected_count: number;
  follower_count: number;
}

export interface AdminChefsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminChefsResult {
  chefs: AdminChef[];
  pagination: AdminChefsPagination;
}

interface AdminChefsResponse {
  success: boolean;
  message?: string;
  chefs?: AdminChef[];
  pagination?: AdminChefsPagination;
}

export interface AdminRecipe {
  id: string;
  title: string;
  description: string | null;
  status: "pending" | "published" | "rejected";
  difficulty: string | null;
  recipe_image: string | null;
  cooking_time: number | null;
  created_at: string;

  author_id: string;
  author_name: string;
  author_email: string;
  author_profile_image: string | null;

  category_id: number;
  category_name: string;
  category_slug: string;

  cuisine_id: number;
  cuisine_name: string;
  cuisine_slug: string;
}

export interface AdminRecipesPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminRecipesResult {
  recipes: AdminRecipe[];
  pagination: AdminRecipesPagination;
}

interface AdminRecipesResponse {
  success: boolean;
  message?: string;
  recipes?: AdminRecipe[];
  pagination?: AdminRecipesPagination;
}

export interface AdminRecipeFilter {
  id: number;
  name: string;
  slug: string;
}

interface AdminRecipeFiltersResponse {
  success: boolean;
  message?: string;
  categories?: AdminRecipeFilter[];
  cuisines?: AdminRecipeFilter[];
}

export interface AdminModerationRecipe {
  id: string;
  title: string;
  description: string | null;
  status: "pending";
  difficulty: "Easy" | "Medium" | "Hard" | string;
  recipe_image: string | null;
  cooking_time: number | null;
  created_at: string;

  author_id: string;
  author_name: string;
  author_email: string;
  author_profile_image: string | null;

  category_id: number;
  category_name: string;

  cuisine_id: number | null;
  cuisine_name: string | null;
}

export interface AdminModerationPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface AdminModerationResponse {
  success: boolean;
  message?: string;
  recipes?: AdminModerationRecipe[];
  pagination?: AdminModerationPagination;
}

export const getAdminDashboard = async (): Promise<AdminDashboard> => {
  const response =
    await apiClient.get<AdminDashboardResponse>("/admin/dashboard");

  if (!response.data.success || !response.data.dashboard) {
    throw new Error(response.data.message || "Unable to load admin dashboard.");
  }

  return response.data.dashboard;
};

export const approveAdminRecipe = async (
  recipeId: string,
): Promise<RecipeModerationResponse> =>
  (
    await apiClient.patch<RecipeModerationResponse>(
      `/admin/recipes/${recipeId}/approve`,
    )
  ).data;

export const rejectAdminRecipe = async (
  recipeId: string,
): Promise<RecipeModerationResponse> =>
  (
    await apiClient.patch<RecipeModerationResponse>(
      `/admin/recipes/${recipeId}/reject`,
    )
  ).data;

export const getAdminUsers = async ({
  search = "",
  role,
  page = 1,
  limit = 12,
}: {
  search?: string;
  role?: "user" | "chef" | "admin";
  page?: number;
  limit?: number;
}): Promise<AdminUsersResult> => {
  const response = await apiClient.get<AdminUsersResponse>("/admin/users", {
    params: {
      search: search || undefined,
      role: role || undefined,
      page,
      limit,
    },
  });

  if (
    !response.data.success ||
    !response.data.users ||
    !response.data.pagination
  ) {
    throw new Error(response.data.message || "Unable to load users.");
  }

  return {
    users: response.data.users,
    pagination: response.data.pagination,
  };
};

export const getAdminChefs = async ({
  search = "",
  page = 1,
  limit = 12,
}: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<AdminChefsResult> => {
  const response = await apiClient.get<AdminChefsResponse>("/admin/chefs", {
    params: {
      search: search || undefined,
      page,
      limit,
    },
  });

  if (
    !response.data.success ||
    !response.data.chefs ||
    !response.data.pagination
  ) {
    throw new Error(response.data.message || "Unable to load chefs.");
  }

  return {
    chefs: response.data.chefs,
    pagination: response.data.pagination,
  };
};

export const getAdminRecipes = async ({
  search = "",
  status = "",
  category = "",
  cuisine = "",
  page = 1,
  limit = 12,
}: {
  search?: string;
  status?: string;
  category?: string;
  cuisine?: string;
  page?: number;
  limit?: number;
}): Promise<AdminRecipesResult> => {
  const response = await apiClient.get<AdminRecipesResponse>("/admin/recipes", {
    params: {
      search: search || undefined,
      status: status || undefined,
      category: category || undefined,
      cuisine: cuisine || undefined,
      page,
      limit,
    },
  });

  if (
    !response.data.success ||
    !response.data.recipes ||
    !response.data.pagination
  ) {
    throw new Error(response.data.message || "Unable to load recipes.");
  }

  return {
    recipes: response.data.recipes,
    pagination: response.data.pagination,
  };
};

export const getAdminRecipeFilters = async (): Promise<{
  categories: AdminRecipeFilter[];
  cuisines: AdminRecipeFilter[];
}> => {
  const response = await apiClient.get<AdminRecipeFiltersResponse>(
    "/admin/recipes/filters",
  );

  if (
    !response.data.success ||
    !response.data.categories ||
    !response.data.cuisines
  ) {
    throw new Error(response.data.message || "Unable to load recipe filters.");
  }

  return {
    categories: response.data.categories,
    cuisines: response.data.cuisines,
  };
};

export const getAdminModerationQueue = async ({
  search = "",
  page = 1,
  limit = 12,
}: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{
  recipes: AdminModerationRecipe[];
  pagination: AdminModerationPagination;
}> => {
  const response = await apiClient.get<AdminModerationResponse>(
    "/admin/moderation",
    {
      params: {
        search: search || undefined,
        page,
        limit,
      },
    },
  );

  if (
    !response.data.success ||
    !response.data.recipes ||
    !response.data.pagination
  ) {
    throw new Error(
      response.data.message || "Unable to load moderation queue.",
    );
  }

  return {
    recipes: response.data.recipes,
    pagination: response.data.pagination,
  };
};

export const getAdminAnalytics = async (): Promise<AdminAnalytics> => {
  const response =
    await apiClient.get<AdminAnalyticsResponse>("/admin/analytics");
  if (!response.data.success || !response.data.analytics) {
    throw new Error(response.data.message || "Unable to load admin analytics.");
  }
  return response.data.analytics;
};
