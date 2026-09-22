export const trendingRecipes = {
  badge: "From the community",
  title: "Recipes you could make today.",
  description:
    "Discover dishes people are cooking, sharing, and loving right now.",
  actions: {
    exploreRecipes: "Explore recipes",
  },
  labels: {
    by: "by",
    servings: "servings",
    save: "Save",
  },
  recipes: {
    creamyGarlicParmesanPasta: {
      title: "Creamy Garlic Parmesan Pasta",
      author: "Maria",
      time: "25 min",
      tags: {
        italian: "Italian",
        quick: "Quick",
      },
    },
    mediterraneanHarvestBowl: {
      title: "Mediterranean Harvest Bowl",
      author: "Alex",
      time: "20 min",
      tags: {
        healthy: "Healthy",
        fresh: "Fresh",
      },
    },
    honeyGarlicSalmon: {
      title: "Honey Garlic Salmon",
      author: "Kenji",
      time: "30 min",
      tags: {
        seafood: "Seafood",
        easy: "Easy",
      },
    },
  },
} as const;
