import type {
  Request,
  Response,
} from "express";

import { getPublicChefs, getChefByUsername } from "./chef.service.js";

export const getPublicChefsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 12;

    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : "";

    const result = await getPublicChefs({
      page,
      limit,
      search,
    });

    res.status(200).json({
      success: true,
      chefs: result.chefs,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error(
      "Public chefs error:",
      error,
    );

    res.status(500).json({
      success: false,
      message: "Unable to load chefs.",
    });
  }
};


export const getChefByUsernameController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { username } = req.params;

    if (typeof username !== "string" || !username.trim()) {
      res.status(400).json({
        success: false,
        message: "A valid chef Username is required.",
      });
      return;
    }

    const chef = await getChefByUsername(username);

    if (!chef) {
      res.status(404).json({
        success: false,
        message: "Chef not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      chef,
    });
  } catch (error) {
    console.error("Get chef details error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load chef details.",
    });
  }
};
