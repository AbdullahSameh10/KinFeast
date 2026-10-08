export const trendingRecipes = {
  badge: "What's cooking now",
  title: "Trending recipes",
  description:
    "See what the KinFeast community is cooking, saving, rating, and loving right now.",

  stats: {
    views: "views",
    likes: "likes",
    saves: "saves",
    reviews: "reviews",
    rating: "rating",
  },

  ranking: {
    label: "Trending",
    first: "Top pick",
    second: "Second",
    third: "Third",
  },

  card: {
    by: "By",
    minutes: "min",
    viewRecipe: "View recipe",
  },

  actions: {
    exploreTrending: "View all trending",
    exploreRecipes: "Explore all recipes",
    retry: "Try again",
  },

  loading: {
    title: "Finding what's trending...",
    description:
      "We're gathering the latest activity from the KinFeast community.",
  },

  empty: {
    title: "Nothing is trending yet",
    description:
      "As the community starts cooking, saving, and rating recipes, the most popular dishes will appear here.",
    exploreRecipes: "Explore recipes",
  },

  error: {
    title: "We couldn't load trending recipes",
    description:
      "Something went wrong while connecting to KinFeast. Please try again.",
    retry: "Try again",
  },

  accessibility: {
    openRecipe: "Open recipe",
    recipeRank: "Trending rank",
  },
} as const;