
export const helpCenter = {
  hero: {
    badge: "YOUR KITCHEN COMPANION",
    title: "How can we",
    highlight: "help you?",
    description:
      "Find answers, discover how everything works, and get back to what you love most — cooking.",
    searchPlaceholder: "Search for answers, recipes, accounts...",
    searchButton: "Search",
    popular: "Popular searches:",
    popularSearches: ["Find recipes", "Ingredient search", "Chef accounts"],
  },
  categories: {
    heading: "Explore the Help Center",
    description:
      "Browse topics to find the answers and guidance you need.",
    gettingStarted: {
      title: "Getting Started",
      description: "Learn the basics and explore the platform.",
    },
    recipes: {
      title: "Recipes & Ingredients",
      description: "Discover recipes and cook with what you have.",
    },
    accounts: {
      title: "Accounts & Profiles",
      description: "Understand accounts, profiles, and dashboards.",
    },
    chefs: {
      title: "Chefs & Community",
      description: "Explore chefs and learn about sharing recipes.",
    },
    privacy: {
      title: "Privacy & Security",
      description: "Learn about privacy, cookies, and your data.",
    },
    troubleshooting: {
      title: "Troubleshooting",
      description: "Find guidance for common website issues.",
    },
  },
  faq: {
    heading: "Frequently asked questions",
    description: "Quick answers to questions you may have.",
    emptyTitle: "No matching answers found",
    emptyDescription:
      "Try another search term or choose a different category.",
    clearFilters: "Clear search and filters",
    questions: [
      {
        id: "explore-recipes",
        category: "gettingStarted",
        question: "How do I discover recipes?",
        answer:
          "Visit the Recipes page to browse available dishes. You can also explore recipe categories, check out trending recipes, or visit a chef's profile to discover more.",
      },
      {
        id: "find-ingredients",
        category: "recipes",
        question: "Can I find recipes using ingredients I already have?",
        answer:
          "Yes! Open Cook With What You Have and enter the ingredients available in your kitchen. The feature helps you discover recipes that match what you have on hand.",
      },
      {
        id: "ingredient-matching",
        category: "recipes",
        question: "Does ingredient search understand different cuts of meat?",
        answer:
          "Ingredient matching is designed to help you discover relevant recipes, including related ingredient variations. Results can depend on the ingredients recorded for each recipe.",
      },
      {
        id: "recipe-details",
        category: "recipes",
        question: "Where can I find a recipe's ingredients and instructions?",
        answer:
          "Open a recipe from its card to visit its recipe details page. Available ingredients, preparation instructions, and other recipe information are displayed there.",
      },
      {
        id: "create-account",
        category: "accounts",
        question: "How do I create an account?",
        answer:
          "Choose Register and follow the instructions on the registration page. Once registered, you can access the account features available to your role.",
      },
      {
        id: "dashboard",
        category: "accounts",
        question: "What is my dashboard for?",
        answer:
          "Your dashboard provides access to features available for your account role. Regular users and chefs have different dashboards and permissions.",
      },
      {
        id: "become-chef",
        category: "chefs",
        question: "How can I become a chef on the platform?",
        answer:
          "Chef-related access depends on the platform's current registration and account-role process. Check the available registration options or contact us if you need assistance.",
      },
      {
        id: "find-chefs",
        category: "chefs",
        question: "How can I explore chefs and their recipes?",
        answer:
          "Visit the Chefs page to browse chef profiles. Open a chef's profile to see the information and recipes available on that page.",
      },
      {
        id: "privacy-policy",
        category: "privacy",
        question: "How is my personal information handled?",
        answer:
          "Read our Privacy Policy to understand how personal information is handled. You can also review the Terms of Use and Cookie Policy for more information about using the platform.",
      },
      {
        id: "cookies",
        category: "privacy",
        question: "Why does the website use cookies?",
        answer:
          "Cookies and similar technologies may be used to support website functionality and other disclosed purposes. See the Cookie Policy for details about their use.",
      },
      {
        id: "website-problems",
        category: "troubleshooting",
        question: "What should I do if a page is not working?",
        answer:
          "Try refreshing the page and checking your internet connection. If the problem continues, contact us and include the page you were visiting and a description of the issue.",
      },
      {
        id: "contact-support",
        category: "troubleshooting",
        question: "How can I get further assistance?",
        answer:
          "Visit our Contact Us page and send us a message describing your question or issue. Include enough information to help us understand what happened.",
      },
    ],
  },
  contact: {
    eyebrow: "STILL NEED A HAND?",
    title: "We're here to help.",
    description:
      "Couldn't find what you were looking for? Send us a message and tell us how we can help.",
    button: "Contact Us",
    browseRecipes: "Explore Recipes",
  },
} as const;
