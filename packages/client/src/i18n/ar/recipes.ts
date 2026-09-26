export const recipes = {
  badge: "اكتشف واطبخ",
  title: "اكتشف وصفتك المفضلة القادمة",
  description:
    "استكشف وصفات شهية من مجتمعنا المتنامي من الطهاة وصنّاع الطعام. ابحث وصفِّ النتائج واعثر على وصفة تستحق التجربة اليوم.",

  search: {
    label: "ابحث عن وصفات",
    placeholder: "ابحث باسم الوصفة أو المكوّن أو الطاهي أو المطبخ...",
  },

  filters: {
    title: "تصفية النتائج",
    category: "التصنيف",
    cuisine: "المطبخ",
    difficulty: "مستوى الصعوبة",
    allCategories: "كل التصنيفات",
    allCuisines: "كل المطابخ",
    allDifficulties: "كل المستويات",
    reset: "إعادة ضبط الفلاتر",
  },

  difficulty: {
    Easy: "سهل",
    Medium: "متوسط",
    Hard: "صعب",
  },

  results: {
    recipe: "وصفة",
    recipes: "وصفات",
    found: "تم العثور عليها",
    noResultsTitle: "لم نجد وصفات",
    noResultsDescription:
      "جرّب تغيير البحث أو إزالة بعض الفلاتر لاكتشاف المزيد من الوصفات.",
    clearFilters: "مسح الفلاتر",
  },

  card: {
    by: "بواسطة",
    minutes: "دقيقة",
    viewRecipe: "عرض الوصفة",
    noDescription: "وصفة شهية بانتظار اكتشافها.",
    favorite: "حفظ في المفضلة",
unfavorite: "إزالة من المفضلة",
  },

  loading: {
    title: "نبحث عن وصفات شهية...",
  },

  error: {
    title: "تعذر تحميل الوصفات",
    description:
      "حدث خطأ أثناء الاتصال بمنصة KinFeast. يرجى المحاولة مرة أخرى.",
    retry: "حاول مرة أخرى",
  },

  accessibility: {
    searchIcon: "بحث",
    clearSearch: "مسح البحث",
    openRecipe: "فتح الوصفة",
  },
} as const;