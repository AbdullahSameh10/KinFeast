import apiClient from "./client";

export interface Chef {
  id: number | string;
  name: string;
  bio: string | null;
  profile_image: string | null;
  created_at: string;
  recipe_count: number;
  published_count: number;
  follower_count: number;
}

export interface ChefsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ChefsResponse {
  success: boolean;
  chefs: Chef[];
  pagination: ChefsPagination;
  message?: string;
}

interface FollowStatusResponse {
  success: boolean;
  following: boolean;
  message?: string;
}

export interface GetChefsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export async function getChefs(
  params: GetChefsParams = {},
): Promise<{ chefs: Chef[]; pagination: ChefsPagination }> {
  const response = await apiClient.get<ChefsResponse>("/chefs", {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 12,
      search: params.search || undefined,
    },
  });

  if (!response.data.success) {
    throw new Error(response.data.message ?? "Unable to fetch chefs.");
  }

  return {
    chefs: response.data.chefs,
    pagination: response.data.pagination,
  };
}

export async function getFollowStatus(chefId: number | string) {
  const response = await apiClient.get<FollowStatusResponse>(
    `/users/${chefId}/follow`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Unable to check follow status.",
    );
  }

  return response.data.following;
}

export async function followChef(chefId: number | string) {
  const response = await apiClient.post<{
    success: boolean;
    message?: string;
  }>(`/users/${chefId}/follow`);

  if (!response.data.success) {
    throw new Error(response.data.message ?? "Unable to follow chef.");
  }
}

export async function unfollowChef(chefId: number | string) {
  const response = await apiClient.delete<{
    success: boolean;
    message?: string;
  }>(`/users/${chefId}/follow`);

  if (!response.data.success) {
    throw new Error(response.data.message ?? "Unable to unfollow chef.");
  }
}