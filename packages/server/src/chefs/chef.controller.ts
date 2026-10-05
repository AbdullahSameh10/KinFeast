import type {
  Request,
  Response,
} from "express";

import { getPublicChefs } from "./chef.service.js";

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