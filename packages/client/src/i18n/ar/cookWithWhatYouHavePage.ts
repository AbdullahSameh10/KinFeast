export const cookWithWhatYouHavePage = {
  backHome: "العودة إلى الرئيسية",
  hero: {
    eyebrow: "مطبخك، وإمكانياتك",
    title: "حوّل مكوناتك إلى",
    titleEyebrow: "وجبة لذيذة",
    description:
      "أضف المكونات الموجودة في مطبخك واكتشف وصفات يمكنك إعدادها بما لديك بالفعل.",
  },
  search: {
    placeholder: "أضف مكونًا، مثل البطاطس",
    inputLabel: "أضف مكونًا",
    addButton: "إضافة مكون",
    findRecipes: "ابحث عن وصفات",
    quickAdd: "إضافة سريعة",
    yourIngredients: "المكونات المتوفرة لديك",
    ingredientCount: "مكونات",
    clearAll: "مسح الكل",
    emptyIngredients:
      "أضف المكونات أعلاه أو اختر أحد الاقتراحات للبدء.",
    suggestions: {
      tomatoes: "طماطم",
      eggs: "بيض",
      garlic: "ثوم",
      onions: "بصل",
      rice: "أرز",
      chicken: "دجاج",
    },
    removeIngredient: "إزالة {{ingredient}}",
  },
  empty: {
    title: "وجبتك القادمة تبدأ من هنا",
    description:
      "أضف المكونات الموجودة في مطبخك، واكتشف وصفات تستفيد منها بأفضل طريقة.",
  },
  loading: {
    title: "نعثر على وصفات تناسبك",
    description: "نبحث عن وصفات تناسب المكونات المتوفرة لديك...",
  },
  error: {
    title: "تعذّر تحميل الوصفات",
    description: "حدث خطأ ما. يُرجى المحاولة مرة أخرى بعد قليل.",
    retry: "حاول مرة أخرى",
  },
  noMatches: {
    title: "لم نعثر على وصفات مناسبة بعد",
    description:
      "لم نعثر على وصفات منشورة تستخدم أيًا من هذه المكونات. جرّب إضافة مكونات شائعة أو اختيار مجموعة مختلفة.",
    chooseIngredients: "اختر المكونات",
  },
  results: {
    alternative: "اقتراحات بديلة",
    matchesLabel: "الوصفات المناسبة لمكوناتك",
    alternativeTitle: "لنجرب خيارات أخرى",
    title: "وصفات تناسب مكوناتك",
    alternativeDescription:
      "لم نجد وصفات ضمن الحد المعتاد للمكونات الناقصة، لذا نعرض وصفات تستخدم مكونًا واحدًا على الأقل من مكوناتك.",
    description:
      "نرتب الوصفات حسب عدد المكونات المتوفرة لديك التي تستخدمها، ثم حسب عدد المكونات الناقصة.",
    recipe: "وصفة",
    recipes: "وصفات",
    widenedTitle: "وسّعنا نطاق البحث.",
    widenedDescription:
      "تحتوي هذه الوصفات على مكون واحد على الأقل من مكوناتك، لكن قد تحتاج بعضها إلى أكثر من أربعة مكونات إضافية.",
    ingredientMatch: "مكون متطابق",
    ingredientMatches: "مكونات متطابقة",
    cookingTime: "{{time}} دقيقة",
    missing: "ناقص",
    youHave: "متوفر لديك",
    stillNeeded: "المكونات التي تحتاجها",
    everything: "كل المكونات متوفرة لديك!",
    viewRecipe: "عرض الوصفة",
  },
  
    filters: {
    title: "تصفية الوصفات",

    category: "التصنيف",
    anyCategory: "كل التصنيفات",
    cuisine: "المطبخ",
    anyCuisine: "كل المطابخ",

    cookingTime: "وقت الطهي",
    under10Minutes: "أقل من 10 دقائق",
    upToMinutes: "حتى {{minutes}} دقيقة",
    plus60Minutes: "+60 دقيقة",

    maxMissingIngredients: "الحد الأقصى للمكونات الناقصة",
    perfectFit: "تطابق مثالي",
    upToMissing: "حتى {{count}} مكونات ناقصة",
    noMissingLimit: "بلا حد أقصى",

    difficulty: "مستوى الصعوبة",
    anyDifficulty: "كل المستويات",
    easy: "سهل",
    medium: "متوسط",
    hard: "صعب",

    sortBy: "ترتيب حسب",
    bestMatch: "أفضل تطابق",
    newest: "الأحدث أولًا",
    oldest: "الأقدم أولًا",
    mostPopular: "الأكثر شعبية",
    fewestMissing: "أقل عدد من المكونات الناقصة",
    mostMatched: "أكبر عدد من المكونات المتوفرة",
    fastest: "الأسرع تحضيرًا",

    clearFilters: "مسح عوامل التصفية",
    activeFilters: "نشطة",

    noResultsTitle: "لا توجد وصفات تطابق هذه الخيارات",
    noResultsDescription:
      "جرّب تعديل وقت الطهي أو مستوى الصعوبة أو التصنيف أو المطبخ أو عدد المكونات الناقصة.",
    showAll: "مسح عوامل التصفية وعرض جميع الوصفات",
  },
} as const;