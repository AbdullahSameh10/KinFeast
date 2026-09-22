import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "./auth.types.js";
interface AuthTokenPayload {
  userId: string;
  role: UserRole;
  iat: number;
  exp: number;
}
export type AuthenticatedRequest = Request;
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
    return;
  }
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    res.status(401).json({
      success: false,
      message: "Invalid authorization header.",
    });
    return;
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not configured.");
    res.status(500).json({
      success: false,
      message: "Authentication service is not configured.",
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, secret);
    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.userId !== "string" ||
      (decoded.role !== "user" &&
        decoded.role !== "chef" &&
        decoded.role !== "admin") ||
      typeof decoded.iat !== "number" ||
      typeof decoded.exp !== "number"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
      return;
    }
    req.user = decoded as AuthTokenPayload;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: "Token has expired.",
      });
      return;
    }
    res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};
export const requireRole = (...allowedRoles: UserRole[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
      return;
    }
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action.",
      });
      return;
    }
    next();
  };
};
