function RecipeDetailsSkeleton() {
  return (
    <div className="page-container animate-pulse py-10 sm:py-14 lg:py-16">
      <div className="h-5 w-32 rounded bg-stone-200 dark:bg-stone-800" />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="aspect-[4/3] rounded-[2rem] bg-stone-200 dark:bg-stone-800" />

        <div className="flex flex-col justify-center">
          <div className="h-4 w-24 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="mt-4 h-12 w-4/5 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="mt-4 h-5 w-2/5 rounded bg-stone-200 dark:bg-stone-800" />

          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-4 w-5/6 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-4 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
          </div>

          <div className="mt-8 h-16 rounded-2xl bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="h-96 rounded-[2rem] bg-stone-200 dark:bg-stone-800" />
        <div className="h-96 rounded-[2rem] bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  );
}

export default RecipeDetailsSkeleton;