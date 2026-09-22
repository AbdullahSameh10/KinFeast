import apiClient from "./client";
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "user" | "chef";
  marketingSourceId: string;
  marketingOtherDetails?: string | null;
}
export interface LoginData {
  email: string;
  password: string;
}
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "chef" | "admin";
  bio: string | null;
  profile_image: string | null;
  created_at: string;
}
export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: AuthUser;
}
export const registerUser = async (
  data: RegisterData,
): Promise<AuthResponse> =>
  (await apiClient.post<AuthResponse>("/auth/register", data)).data;
export const loginUser = async (
  data: LoginData,
): Promise<AuthResponse> =>
  (await apiClient.post<AuthResponse>("/auth/login", data)).data;
export const getCurrentUser = async (): Promise<AuthResponse> =>
  (await apiClient.get<AuthResponse>("/auth/me")).data;
export const getChefArea = async (): Promise<AuthResponse> =>
  (await apiClient.get<AuthResponse>("/auth/chef-area")).data;
export const getAdminArea = async (): Promise<AuthResponse> =>
  (await apiClient.get<AuthResponse>("/auth/admin-area")).data;
