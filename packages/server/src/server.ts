import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./auth/auth.routes.js";
import recipeRoutes from "./recipes/recipe.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import favoriteRoutes from "./favorites/favorite.routes.js";
import followRoutes from "./follows/follow.routes.js";
import reviewRoutes from "./reviews/review.routes.js";
import likeRoutes from "./likes/like.routes.js";
import ingredientRoutes from "./ingredients/ingredient.routes.js";
import recipeIngredientRoutes from "./recipe-ingredients/recipeIngredient.routes.js";
import recipeMediaRoutes from "./recipe-media/recipeMedia.routes.js";
import viewRoutes from "./views/view.routes.js";
import cuisineRoutes from "./cuisines/cuisine.routes.js";
import recipeCategoryRoutes from "./recipe-categories/recipeCategory.routes.js";
import marketingRoutes from "./marketing/marketing.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", favoriteRoutes);
app.use("/api", followRoutes);
app.use("/api", reviewRoutes);
app.use("/api", likeRoutes);
app.use("/api", ingredientRoutes);
app.use("/api", recipeIngredientRoutes);
app.use("/api", recipeMediaRoutes);
app.use("/api", viewRoutes);
app.use("/api/cuisines", cuisineRoutes);
app.use("/api/recipe-categories", recipeCategoryRoutes);
app.use("/api/marketing", marketingRoutes);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`🚀🚀 KinFeast API running on port ${PORT}`);
});
