import { ChevronDown, Filter, X } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  placeholder: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

function FilterSelect({
  label,
  value,
  placeholder,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-200">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-3 pe-10 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200"
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 rtl:left-3 rtl:right-auto"
        />
      </div>
    </div>
  );
}

interface RecipeFiltersSidebarProps {
  mobileOpen: boolean;
  hasActiveFilters: boolean;
  title: string;
  resetLabel: string;

  categoryLabel: string;
  categoryValue: string;
  categoryPlaceholder: string;
  categoryOptions: FilterOption[];
  onCategoryChange: (value: string) => void;

  cuisineLabel: string;
  cuisineValue: string;
  cuisinePlaceholder: string;
  cuisineOptions: FilterOption[];
  onCuisineChange: (value: string) => void;

  difficultyLabel: string;
  difficultyValue: string;
  difficultyPlaceholder: string;
  difficultyOptions: FilterOption[];
  onDifficultyChange: (value: string) => void;

  onReset: () => void;
}

export default function RecipeFiltersSidebar({
  mobileOpen,
  hasActiveFilters,
  title,
  resetLabel,
  categoryLabel,
  categoryValue,
  categoryPlaceholder,
  categoryOptions,
  onCategoryChange,
  cuisineLabel,
  cuisineValue,
  cuisinePlaceholder,
  cuisineOptions,
  onCuisineChange,
  difficultyLabel,
  difficultyValue,
  difficultyPlaceholder,
  difficultyOptions,
  onDifficultyChange,
  onReset,
}: RecipeFiltersSidebarProps) {
  return (
    <aside className={`${mobileOpen ? "block" : "hidden"} lg:block`}>
      <div className="sticky top-24 rounded-3xl border border-stone-200/80 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-orange-500" />
            <h2 className="font-bold text-stone-900 dark:text-white">
              {title}
            </h2>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400"
            >
              {resetLabel}
            </button>
          )}
        </div>

        <div className="mt-6 space-y-6">
          <FilterSelect
            label={categoryLabel}
            value={categoryValue}
            onChange={onCategoryChange}
            options={categoryOptions}
            placeholder={categoryPlaceholder}
          />

          <FilterSelect
            label={cuisineLabel}
            value={cuisineValue}
            onChange={onCuisineChange}
            options={cuisineOptions}
            placeholder={cuisinePlaceholder}
          />

          <FilterSelect
            label={difficultyLabel}
            value={difficultyValue}
            onChange={onDifficultyChange}
            options={difficultyOptions}
            placeholder={difficultyPlaceholder}
          />
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="mt-7 hidden w-full items-center justify-center gap-2 rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:border-orange-300 hover:text-orange-600 dark:border-stone-800 dark:text-stone-300 dark:hover:border-orange-800 dark:hover:text-orange-400 lg:flex"
          >
            <X size={15} />
            {resetLabel}
          </button>
        )}
      </div>
    </aside>
  );
}