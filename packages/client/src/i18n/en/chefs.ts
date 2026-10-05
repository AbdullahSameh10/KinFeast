export const chefs = {
  badge: "Meet the chefs",

  title: "Discover the people behind the recipes.",

  description:
    "Explore the chefs shaping KinFeast, discover their cooking stories, and follow the creators whose recipes you want to see more of.",

  search: {
    label: "Search chefs",
    placeholder: "Search chefs by name...",
  },

  loading: "Loading chefs...",

  results: {
    chef: "chef",
    chefs: "chefs",
    badge: "KinFeast creators",
  },

  card: {
    defaultBio:
      "A passionate KinFeast chef sharing recipes with the community.",
    recipes: "Recipes",
    followers: "Followers",
    yourProfile: "Your chef profile",
  },

  follow: {
    follow: "Follow chef",
    following: "Following",
    loading: "Updating...",
    signIn: "Sign in to follow",
    error: "Unable to update the follow status.",
  },

  pagination: {
    previous: "Previous",
    next: "Next",
  },

  empty: {
    title: "No chefs found",
    description:
      "Try another name or clear your search to discover more KinFeast chefs.",
  },

  error: {
    title: "We couldn't load the chefs",
    description:
      "Something went wrong while loading the chefs.",
    retry: "Try again",
  },
} as const;