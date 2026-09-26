function RecipeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900">
      <div className="aspect-[16/10] animate-pulse bg-stone-200 dark:bg-stone-800" />

      <div className="space-y-4 p-5">
        <div className="h-6 w-4/5 animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800" />

        <div className="h-4 w-2/5 animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800" />

        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded-lg bg-stone-100 dark:bg-stone-800/80" />
          <div className="h-3 w-4/5 animate-pulse rounded-lg bg-stone-100 dark:bg-stone-800/80" />
        </div>

        <div className="border-t border-stone-100 pt-4 dark:border-stone-800">
          <div className="h-4 w-1/3 animate-pulse rounded-lg bg-stone-100 dark:bg-stone-800/80" />
        </div>

        <div className="h-11 w-full animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  );
}

export default RecipeCardSkeleton;