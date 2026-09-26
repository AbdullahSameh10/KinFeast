import { Router } from "express";
import multer from "multer";
import { authenticateToken, requireRole } from "../auth/auth.middleware.js";
import { uploadRecipeImage } from "./upload.service.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      callback(
        new Error("Only JPEG, PNG, and WebP images are allowed."),
      );
      return;
    }

    callback(null, true);
  },
});

router.post(
  "/recipe-image",
  authenticateToken,
  requireRole("chef"),
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: "Recipe image is required.",
        });

        return;
      }

      const result = await uploadRecipeImage(
        req.file.buffer,
        req.file.originalname,
      );

      res.status(201).json({
        success: true,
        image: {
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        },
      });
    } catch (error) {
      console.error("Recipe image upload error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to upload recipe image.",
      });
    }
  },
);

export default router;