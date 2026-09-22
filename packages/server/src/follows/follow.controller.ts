import type { Response } from "express";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";

import { followChef, unfollowChef, isFollowing } from "./follow.service.js";

export const followChefController = async (
  req: AuthenticatedRequest,
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

    const followingId =
      typeof req.params.id === "string" ? req.params.id : undefined;

    if (!followingId) {
      res.status(400).json({
        success: false,
        message: "User ID is required.",
      });

      return;
    }

    const follow = await followChef(req.user.userId, followingId);

    if (!follow) {
      res.status(200).json({
        success: true,
        message: "You are already following this chef.",
      });

      return;
    }

    res.status(201).json({
      success: true,
      message: "Chef followed successfully.",
      follow,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "CANNOT_FOLLOW_SELF") {
        res.status(400).json({
          success: false,
          message: "You cannot follow yourself.",
        });

        return;
      }

      if (error.message === "USER_NOT_FOUND") {
        res.status(404).json({
          success: false,
          message: "User not found.",
        });

        return;
      }

      if (error.message === "TARGET_NOT_CHEF") {
        res.status(403).json({
          success: false,
          message: "You can only follow chefs.",
        });

        return;
      }
    }

    console.error("Follow chef error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to follow chef.",
    });
  }
};

export const unfollowChefController = async (
  req: AuthenticatedRequest,
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

    const followingId =
      typeof req.params.id === "string" ? req.params.id : undefined;

    if (!followingId) {
      res.status(400).json({
        success: false,
        message: "User ID is required.",
      });

      return;
    }

    const follow = await unfollowChef(req.user.userId, followingId);

    if (!follow) {
      res.status(404).json({
        success: false,
        message: "You are not following this chef.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Chef unfollowed successfully.",
    });
  } catch (error) {
    console.error("Unfollow chef error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to unfollow chef.",
    });
  }
};

export const getFollowStatusController = async (
  req: AuthenticatedRequest,
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

    const followingId =
      typeof req.params.id === "string" ? req.params.id : undefined;

    if (!followingId) {
      res.status(400).json({
        success: false,
        message: "User ID is required.",
      });

      return;
    }

    const follow = await isFollowing(req.user.userId, followingId);

    res.status(200).json({
      success: true,
      following: Boolean(follow),
    });
  } catch (error) {
    console.error("Get follow status error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to check follow status.",
    });
  }
};
