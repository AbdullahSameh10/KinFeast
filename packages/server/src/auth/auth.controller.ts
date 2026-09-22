import type { Request, Response } from "express";
import {
  getUserById,
  loginUser,
  registerUser,
} from "./auth.service.js";
import type { LoginInput, RegisterInput, UserRole } from "./auth.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: UserRole;
        iat: number;
        exp: number;
      };
    }
  }
}

export const register = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      name,
      email,
      password,
      role,
      marketingSourceId,
      marketingOtherDetails,
    } = req.body as RegisterInput;
    if (!name || !email || !password || !role || !marketingSourceId) {
      res.status(400).json({
        success: false,
        message:
          "Name, email, password, role, and marketing source are required.",
      });
      return;
    }
    if (role !== "user" && role !== "chef") {
      res.status(400).json({
        success: false,
        message: "You can only register as a user or chef.",
      });
      return;
    }
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
      return;
    }
    const user = await registerUser({
      name,
      email,
      password,
      role,
      marketingSourceId,
      marketingOtherDetails,
    });
    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
      return;
    }
    if (error instanceof Error && error.message === "MARKETING_SOURCE_INVALID") {
      res.status(400).json({
        success: false,
        message: "Please select a valid marketing source.",
      });
      return;
    }
    if (
      error instanceof Error &&
      error.message === "MARKETING_OTHER_DETAILS_REQUIRED"
    ) {
      res.status(400).json({
        success: false,
        message: "Please tell us where you heard about KinFeast.",
      });
      return;
    }
    if (
      error instanceof Error &&
      error.message === "MARKETING_OTHER_DETAILS_TOO_LONG"
    ) {
      res.status(400).json({
        success: false,
        message: "Your answer must be 255 characters or fewer.",
      });
      return;
    }    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to create account.",
    });
  }
};
export const login = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, password } = req.body as LoginInput;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
      return;
    }
    const result = await loginUser({
      email,
      password,
    });
    res.status(200).json({
      success: true,
      message: "Login successful.",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to log in.",
    });
  }
};
export const getMe = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
      return;
    }
    const user = await getUserById(req.user.userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Current user retrieved successfully.",
      user,
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to load current user.",
    });
  }
};
export const getChefArea = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res.status(200).json({
    success: true,
    message: `Chef area accessed by user ${req.user?.userId}.`,
  });
};
export const getAdminArea = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res.status(200).json({
    success: true,
    message: `Admin area accessed by user ${req.user?.userId}.`,
  });
};



