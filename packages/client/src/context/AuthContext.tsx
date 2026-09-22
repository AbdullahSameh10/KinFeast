import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  type LoginData,
  type RegisterData,
} from "../api/auth.api";
import { AuthContext, type AuthContextValue } from "./AuthContext";

const TOKEN_KEY = "recipe_platform_token";

// Minimum time the loading state stays on, so the spinner actually
// gets painted before the app decides to redirect. Prevents the
// "flash then empty page" flicker on fast local auth checks.
const MIN_LOADING_MS = 500;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextValue["user"]>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY),
  );
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const startedAt = Date.now();

    const restoreSession = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);

      if (!storedToken) {
        // Nothing to restore. Still respect MIN_LOADING_MS so the
        // spinner isn't just a one-frame flash.
        const elapsed = Date.now() - startedAt;
        const remaining = MIN_LOADING_MS - elapsed;
        if (remaining > 0) {
          setTimeout(() => setIsLoading(false), remaining);
        } else {
          setIsLoading(false);
        }
        return;
      }

      try {
        const response = await getCurrentUser();
        if (response.success && response.user) {
          setUser(response.user);
        } else {
          logout();
        }
      } catch {
        logout();
      } finally {
        const elapsed = Date.now() - startedAt;
        const remaining = MIN_LOADING_MS - elapsed;
        if (remaining > 0) {
          setTimeout(() => setIsLoading(false), remaining);
        } else {
          setIsLoading(false);
        }
      }
    };

    void restoreSession();
  }, [logout]);

  const login = useCallback(async (data: LoginData) => {
    const response = await loginUser(data);
    if (!response.success || !response.token || !response.user) {
      throw new Error(response.message || "Login failed.");
    }
    localStorage.setItem(TOKEN_KEY, response.token);
    setToken(response.token);
    setUser(response.user);
    return response.user;
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const response = await registerUser(data);
    if (!response.success || !response.user) {
      throw new Error(response.message || "Registration failed.");
    }
    return response.user;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, token, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
