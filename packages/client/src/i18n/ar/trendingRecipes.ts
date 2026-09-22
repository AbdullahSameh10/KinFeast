export const trendingRecipes = {
  badge: "من المجتمع",
  title: "وصفات يمكنك إعدادها اليوم.",
  description:
    "اكتشف الأطباق التي يطبخها الناس ويشاركونها ويحبونها الآن.",
  actions: {
    exploreRecipes: "استكشف الوصفات",
  },
  labels: {
    by: "بواسطة",
    servings: "حصص",
    save: "حفظ",
  },
  recipes: {
    creamyGarlicParmesanPasta: {
      title: "باستا كريمية بالثوم والبارميزان",
      author: "ماريا",
      time: "25 دقيقة",
      tags: {
        italian: "إيطالي",
        quick: "سريع",
      },
    },
    mediterraneanHarvestBowl: {
      title: "وعاء الحصاد المتوسطي",
      author: "أليكس",
      time: "20 دقيقة",
      tags: {
        healthy: "صحي",
        fresh: "طازج",
      },
    },
    honeyGarlicSalmon: {
      title: "سلمون بالعسل والثوم",
      author: "كينجي",
      time: "30 دقيقة",
      tags: {
        seafood: "مأكولات بحرية",
        easy: "سهل",
      },
    },
  },
} as const;
