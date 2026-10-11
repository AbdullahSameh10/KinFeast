import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary.js";

export const uploadRecipeImage = async (
  buffer: Buffer,
  originalName: string,
): Promise<UploadApiResponse> => {
  const extension = originalName.split(".").pop()?.toLowerCase() || "jpg";

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "kinfeast/recipes",
        resource_type: "image",
        format: extension === "png" ? "png" : "jpg",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Image upload failed."));
          return;
        }

        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
};

export const uploadCategoryImage = async (
  buffer: Buffer,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "kinfeast/categories",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Category image upload failed."));
          return;
        }

        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
};
