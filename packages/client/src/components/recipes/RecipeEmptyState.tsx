import { Check, Search } from "lucide-react";

interface RecipeEmptyStateProps {
  title: string;
  description: string;
  clearLabel: string;
  showClearButton: boolean;
  onClear: () => void;
}

export default function RecipeEmptyState({
  title,
  description,
  clearLabel,
  showClearButton,
  onClear,
}: RecipeEmptyStateProps) {
  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white/70 px-6 text-center dark:border-stone-700 dark:bg-stone-900/50">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400">
        <Search size={27} />
      </div>

      <h2 className="mt-5 text-xl font-bold text-stone-900 dark:text-white">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-stone-500 dark:text-stone-400">
        {description}
      </p>

      {showClearButton && (
        <button
          type="button"
          onClick={onClear}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          <Check size={16} />
          {clearLabel}
        </button>
      )}
    </div>
  );
}