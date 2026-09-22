export type UserRole = "user" | "chef" | "admin";
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: "user" | "chef";
  marketingSourceId: string;
  marketingOtherDetails?: string | null;
}
export interface LoginInput {
  email: string;
  password: string;
}
