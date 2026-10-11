export const categoriesPage = {
  badge: "Explore the possibilities",
  title: "What are you craving today?",
  description:
    "Find your next favorite dish. Explore our collection by category and discover something delicious to make.",
  search: {
    label: "Search categories",
    placeholder: "Search categories...",
  },
  results: {
    all: "All categories",
    count: "categories to explore",
    recipe: "recipe",
    recipes: "recipes",
    noResultsTitle: "No categories found",
    noResultsDescription:
      "Try another search term to discover more delicious possibilities.",
    clearSearch: "Clear search",
  },
  card: {
    explore: "Explore category",
    imageAlt: "Food from this category",
  },
  loading: {
    title: "Finding your next favorite...",
    description: "We're gathering all our delicious categories.",
  },
  error: {
    title: "We couldn't load the categories",
    description:
      "Something went wrong while connecting to KinFeast. Please try again.",
    retry: "Try again",
  },
  empty: {
    title: "Our collection is growing",
    description:
      "There aren't any categories to show just yet. Please check back soon.",
    browseRecipes: "Browse all recipes",
  },
  bottomCta: {
    title: "Already know what you want to cook?",
    description:
      "Head straight to our recipe collection and find your next kitchen adventure.",
    action: "Explore all recipes",
  },
} as const;