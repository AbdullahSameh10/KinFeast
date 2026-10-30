export const cookWithWhatYouHavePage = {
  backHome: "Back to home",
  hero: {
    eyebrow: "Your kitchen, your possibilities",
    title: "Turn what you have into",
    titleEyebrow: "something delicious",
    description:
      "Add the ingredients in your kitchen and discover recipes you can make with what you already have.",
  },
  search: {
    placeholder: "Add an ingredient, e.g. potatoes",
    inputLabel: "Add an ingredient",
    addButton: "Add ingredient",
    findRecipes: "Find recipes",
    quickAdd: "Quick add",
    yourIngredients: "Your ingredients",
    ingredientCount: "ingredients",
    clearAll: "Clear all",
    emptyIngredients:
      "Add ingredients above or choose a quick suggestion to get started.",
    suggestions: {
      tomatoes: "Tomatoes",
      eggs: "Eggs",
      garlic: "Garlic",
      onions: "Onions",
      rice: "Rice",
      chicken: "Chicken",
    },
    removeIngredient: "Remove {{ingredient}}",
  },
  empty: {
    title: "Your next meal starts here",
    description:
      "Add the ingredients you have in your kitchen, then find recipes that make the most of them.",
  },
  loading: {
    title: "Finding recipes for you",
    description: "Checking your ingredients against our recipes...",
  },
  error: {
    title: "We couldn't load your recipes",
    description: "Something went wrong. Please try again in a moment.",
    retry: "Try again",
  },
  noMatches: {
    title: "No ingredient matches just yet",
    description:
      "We couldn't find published recipes using any of these ingredients. Try adding common ingredients or choosing a different combination.",
    chooseIngredients: "Choose ingredients",
  },
  results: {
    alternative: "Alternative inspiration",
    matchesLabel: "Your recipe matches",
    alternativeTitle: "Let's find another way",
    title: "Recipes for your ingredients",
    alternativeDescription:
      "No recipes met the usual missing-ingredient limit, so here are recipes that still use at least one ingredient you have.",
    description:
      "Recipes are ranked by how many of your ingredients they use, then by how many ingredients are missing.",
    recipe: "recipe",
    recipes: "recipes",
    widenedTitle: "We widened the search.",
    widenedDescription:
      "These recipes share at least one of your ingredients, but some may need more than four additional ingredients.",
    ingredientMatch: "ingredient match",
    ingredientMatches: "ingredient matches",
    cookingTime: "{{time}} min",
    missing: "missing",
    youHave: "You have",
    stillNeeded: "Still needed",
    everything: "You have everything!",
    viewRecipe: "View recipe",
  },
  
  filters: {
    title: "Filter recipes",

    category: "Category",
    anyCategory: "All categories",
    cuisine: "Cuisine",
    anyCuisine: "All cuisines",

    cookingTime: "Cooking time",
    under10Minutes: "Under 10 minutes",
    upToMinutes: "Up to {{minutes}} minutes",
    plus60Minutes: "60+ minutes",

    maxMissingIngredients: "Maximum missing ingredients",
    perfectFit: "Perfect fit",
    upToMissing: "Up to {{count}} missing",
    noMissingLimit: "No limit",

    difficulty: "Difficulty",
    anyDifficulty: "Any difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",

    sortBy: "Sort by",
    bestMatch: "Best match",
    newest: "Newest first",
    oldest: "Oldest first",
    mostPopular: "Most popular",
    fewestMissing: "Fewest missing ingredients",
    mostMatched: "Most ingredients matched",
    fastest: "Fastest to cook",

    clearFilters: "Clear filters",
    activeFilters: "active",

    noResultsTitle: "No recipes match these filters",
    noResultsDescription:
      "Try adjusting the cooking time, difficulty, category, cuisine, or missing ingredients.",
    showAll: "Clear filters and show all recipes",
  },
} as const;