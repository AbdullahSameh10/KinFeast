import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../auth/auth.middleware.js";
import {
  createCuisine,
  deleteCuisine,
  getAllCuisines,
  getCuisineById,
  getCuisineByName,
  updateCuisine,
} from "./cuisine.service.js";
import type {
  CreateCuisineInput,
  UpdateCuisineInput,
} from "./cuisine.types.js";
export const getCuisinesController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const cuisines = await getAllCuisines();
    res.status(200).json({
      success: true,
      cuisines,
    });
  } catch (error) {
    console.error("Get cuisines error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch cuisines.",
    });
  }
};
export const getCuisineController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const cuisineId =
      typeof req.params.id === "string" ? req.params.id : undefined;
    if (!cuisineId) {
      res.status(400).json({
        success: false,
        message: "Cuisine ID is required.",
      });
      return;
    }
    const cuisine = await getCuisineById(cuisineId);
    if (!cuisine) {
      res.status(404).json({
        success: false,
        message: "Cuisine not found.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      cuisine,
    });
  } catch (error) {
    console.error("Get cuisine error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch cuisine.",
    });
  }
};
export const createCuisineController = async (
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
    const input = req.body as CreateCuisineInput;
    if (typeof input.name !== "string") {
      res.status(400).json({
        success: false,
        message: "Cuisine name is required.",
      });
      return;
    }
    const name = input.name.trim();
    if (!name) {
      res.status(400).json({
        success: false,
        message: "Cuisine name cannot be empty.",
      });
      return;
    }
    if (name.length > 100) {
      res.status(400).json({
        success: false,
        message: "Cuisine name must not exceed 100 characters.",
      });
      return;
    }
    const existingCuisine = await getCuisineByName(name);
    if (existingCuisine) {
      res.status(409).json({
        success: false,
        message: "A cuisine with this name already exists.",
      });
      return;
    }
    const cuisine = await createCuisine({ name });
    res.status(201).json({
      success: true,
      message: "Cuisine created successfully.",
      cuisine,
    });
  } catch (error) {
    console.error("Create cuisine error:", error);
    if (
      error instanceof Error &&
      error.message.includes("cuisines_name_key")
    ) {
      res.status(409).json({
        success: false,
        message: "A cuisine with this name already exists.",
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: "Unable to create cuisine.",
    });
  }
};
export const updateCuisineController = async (
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
    const cuisineId =
      typeof req.params.id === "string" ? req.params.id : undefined;
    if (!cuisineId) {
      res.status(400).json({
        success: false,
        message: "Cuisine ID is required.",
      });
      return;
    }
    const cuisine = await getCuisineById(cuisineId);
    if (!cuisine) {
      res.status(404).json({
        success: false,
        message: "Cuisine not found.",
      });
      return;
    }
    const input = req.body as UpdateCuisineInput;
    if (typeof input.name !== "string") {
      res.status(400).json({
        success: false,
        message: "Cuisine name is required.",
      });
      return;
    }
    const name = input.name.trim();
    if (!name) {
      res.status(400).json({
        success: false,
        message: "Cuisine name cannot be empty.",
      });
      return;
    }
    if (name.length > 100) {
      res.status(400).json({
        success: false,
        message: "Cuisine name must not exceed 100 characters.",
      });
      return;
    }
    const existingCuisine = await getCuisineByName(name);
    if (
      existingCuisine &&
      String(existingCuisine.id) !== String(cuisineId)
    ) {
      res.status(409).json({
        success: false,
        message: "A cuisine with this name already exists.",
      });
      return;
    }
    const updatedCuisine = await updateCuisine(cuisineId, {
      name,
    });
    res.status(200).json({
      success: true,
      message: "Cuisine updated successfully.",
      cuisine: updatedCuisine,
    });
  } catch (error) {
    console.error("Update cuisine error:", error);
    if (
      error instanceof Error &&
      error.message.includes("cuisines_name_key")
    ) {
      res.status(409).json({
        success: false,
        message: "A cuisine with this name already exists.",
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: "Unable to update cuisine.",
    });
  }
};
export const deleteCuisineController = async (
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
    const cuisineId =
      typeof req.params.id === "string" ? req.params.id : undefined;
    if (!cuisineId) {
      res.status(400).json({
        success: false,
        message: "Cuisine ID is required.",
      });
      return;
    }
    const cuisine = await getCuisineById(cuisineId);
    if (!cuisine) {
      res.status(404).json({
        success: false,
        message: "Cuisine not found.",
      });
      return;
    }
    await deleteCuisine(cuisineId);
    res.status(200).json({
      success: true,
      message: "Cuisine deleted successfully.",
    });
  } catch (error) {
    console.error("Delete cuisine error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to delete cuisine.",
    });
  }
};
