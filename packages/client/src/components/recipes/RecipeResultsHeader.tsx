import { X } from "lucide-react";

interface RecipeResultsHeaderProps {
  label: string;
  hasActiveFilters: boolean;
  isLoading: boolean;
  resetLabel: string;
  onReset: () => void;
}

export default function RecipeResultsHeader({
  label,
  hasActiveFilters,
  isLoading,
  resetLabel,
  onReset,
}: RecipeResultsHeaderProps) {
  return (
    <div className="mb-6 hidden items-center justify-between lg:flex">
      <div>
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
          {label}
        </p>
      </div>

      {hasActiveFilters && !isLoading && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-950/30"
        >
          <X size={15} />
          {resetLabel}
        </button>
      )}
    </div>
  );
}