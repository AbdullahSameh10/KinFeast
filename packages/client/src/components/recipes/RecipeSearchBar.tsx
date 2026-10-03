import { Search, X } from "lucide-react";

interface RecipeSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  clearLabel: string;
}

export default function RecipeSearchBar({
  value,
  onChange,
  label,
  placeholder,
  clearLabel,
}: RecipeSearchBarProps) {
  return (
    <div className="mt-10 max-w-4xl">
      <label htmlFor="recipe-search" className="sr-only">
        {label}
      </label>

      <div className="relative">
        <Search
          size={20}
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 rtl:left-auto rtl:right-5"
        />

        <input
          id="recipe-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-16 w-full rounded-2xl border border-stone-200 bg-white/90 px-14 text-base text-stone-900 shadow-xl shadow-stone-900/5 outline-none backdrop-blur-xl transition-all placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-stone-800 dark:bg-stone-900/90 dark:text-white dark:placeholder:text-stone-500"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label={clearLabel}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200 rtl:left-4 rtl:right-auto"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}