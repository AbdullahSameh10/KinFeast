export const recipes = {
  badge: "Discover & cook",
  title: "Find your next favorite recipe",
  description:
    "Explore delicious recipes from our growing community of cooks and chefs. Search, filter, and find something worth making today.",

  search: {
    label: "Search recipes",
    placeholder: "Search by recipe, ingredient, chef, cuisine...",
  },

  filters: {
    title: "Refine your search",
    category: "Category",
    cuisine: "Cuisine",
    difficulty: "Difficulty",
    allCategories: "All categories",
    allCuisines: "All cuisines",
    allDifficulties: "All difficulties",
    reset: "Reset filters",
  },

  difficulty: {
    Easy: "Easy",
    Medium: "Medium",
    Hard: "Hard",
  },

  results: {
    recipe: "recipe",
    recipes: "recipes",
    found: "found",
    noResultsTitle: "No recipes found",
    noResultsDescription:
      "Try changing your search or removing some filters to discover more recipes.",
    clearFilters: "Clear filters",
  },

  card: {
    by: "By",
    minutes: "min",
    viewRecipe: "View recipe",
    noDescription: "A delicious recipe waiting to be discovered.",
    favorite: "Save to favorites",
    unfavorite: "Remove from favorites",
  },

  loading: {
    title: "Finding delicious recipes...",
  },

  error: {
    title: "We couldn't load the recipes",
    description:
      "Something went wrong while connecting to KinFeast. Please try again.",
    retry: "Try again",
  },

  accessibility: {
    searchIcon: "Search",
    clearSearch: "Clear search",
    openRecipe: "Open recipe",
  },
} as const;