import { createContext } from "react";
import type {
  AuthUser,
  LoginData,
  RegisterData,
} from "../api/auth.api";
export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<AuthUser>;
  register: (data: RegisterData) => Promise<AuthUser>;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
