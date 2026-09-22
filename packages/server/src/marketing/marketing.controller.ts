import type { Request, Response } from "express";
import { getActiveMarketingSources } from "./marketing.service.js";
export const getSources = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const sources = await getActiveMarketingSources();
    res.status(200).json({
      success: true,
      sources,
    });
  } catch (error) {
    console.error("Get marketing sources error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to load marketing sources.",
    });
  }
};
