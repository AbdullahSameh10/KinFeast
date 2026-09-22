export const categories = {
  badge: {
    title: "Categories",
    subtitle: "Discover your next meal",
  },
  title: {
    firstLine: "Find what you're",
    highlight: "craving today.",
  },
  description:
    "Explore recipes by mood, cuisine, and craving. From quick dinners to indulgent desserts.",
  actions: {
    exploreAll: "Explore all",
    tryIngredientSearch: "Try ingredient search",
  },
  trending: {
    label: "Trending:",
    categories: {
      quickAndEasy: {
        name: "Quick & Easy",
        badge: "Most Popular",
      },
      asian: {
        name: "Asian",
        badge: "Trending",
      },
      desserts: {
        name: "Desserts",
        badge: "Rising",
      },
    },
  },
  items: {
    quickAndEasy: {
      name: "Quick & Easy",
      description: "Delicious meals without the wait.",
      count: "1,234 recipes",
    },
    healthy: {
      name: "Healthy",
      description: "Fresh food that feels good.",
      count: "2,456 recipes",
    },
    comfortFood: {
      name: "Comfort Food",
      description: "The dishes that feel like home.",
      count: "1,876 recipes",
    },
    asian: {
      name: "Asian",
      description: "Bold flavors, endless variety.",
      count: "1,543 recipes",
    },
    mediterranean: {
      name: "Mediterranean",
      description: "Simple ingredients, rich traditions.",
      count: "987 recipes",
    },
    desserts: {
      name: "Desserts",
      description: "Save room for something sweet.",
      count: "2,101 recipes",
    },
  },
  bottomCta: {
    title: "Can't find what you're looking for?",
    description: "Use our smart search to discover recipes by ingredients",
  },
  imageAlt: {
    quickAndEasy: "Quick and easy recipe",
    healthy: "Healthy recipe",
    comfortFood: "Comfort food recipe",
    asian: "Asian recipe",
    mediterranean: "Mediterranean recipe",
    desserts: "Dessert recipe",
  },
} as const;
