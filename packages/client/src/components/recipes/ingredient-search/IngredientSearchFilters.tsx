import { Filter, RotateCcw } from "lucide-react";

import type {
  CookingTimeFilter,
  DifficultyFilter,
  IngredientSearchFilterLabels,
  IngredientSearchFilterState,
  IngredientSearchSortOption,
} from "../../../types/ingredientSearchFilters.types";
import type { RecipeCategory, Cuisine } from "../../../api/recipes.api";

interface IngredientSearchFiltersProps {
  labels: IngredientSearchFilterLabels;
  filters: IngredientSearchFilterState;
  categories: RecipeCategory[];
  cuisines: Cuisine[];
  activeFilterCount: number;
  onCategoryChange: (value: string) => void;
  onCuisineChange: (value: string) => void;
  onCookingTimeChange: (value: CookingTimeFilter) => void;
  onMaxMissingIngredientsChange: (value: number) => void;
  onDifficultyChange: (value: DifficultyFilter) => void;
  onSortChange: (value: IngredientSearchSortOption) => void;
  onClear: () => void;
}

const cookingTimeOptions: {
  value: CookingTimeFilter;
  labelKey: "under10Minutes" | "upToMinutes" | "plus60Minutes";
  minutes?: number;
}[] = [
  { value: 0, labelKey: "under10Minutes" },
  { value: 20, labelKey: "upToMinutes", minutes: 20 },
  { value: 30, labelKey: "upToMinutes", minutes: 30 },
  { value: 40, labelKey: "upToMinutes", minutes: 40 },
  { value: 50, labelKey: "upToMinutes", minutes: 50 },
  { value: 60, labelKey: "upToMinutes", minutes: 60 },
  { value: 61, labelKey: "plus60Minutes" },
];

const difficultyOptions: DifficultyFilter[] = [
  "Easy",
  "Medium",
  "Hard",
];

export default function IngredientSearchFilters({
  labels,
  filters,
  categories,
  cuisines,
  activeFilterCount,
  onCategoryChange,
  onCuisineChange,
  onCookingTimeChange,
  onMaxMissingIngredientsChange,
  onDifficultyChange,
  onSortChange,
  onClear,
}: IngredientSearchFiltersProps) {
  const selectClassName =
    "w-full rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100";

  const fieldLabelClassName =
    "mb-2 block text-sm font-semibold text-stone-700 dark:text-stone-200";

  const rangeClassName =
    "mt-3 w-full cursor-pointer accent-orange-500";

  const cookingTimeIndex = cookingTimeOptions.findIndex(
    (option) => option.value === filters.cookingTime,
  );

  const selectedTimeOption =
    cookingTimeOptions[cookingTimeIndex] ?? cookingTimeOptions[2];

  const difficultyIndex =
    filters.difficulty === null
      ? 0
      : difficultyOptions.indexOf(filters.difficulty) + 1;

  const difficultyLabel =
    filters.difficulty === null
      ? labels.anyDifficulty
      : filters.difficulty === "Easy"
        ? labels.easy
        : filters.difficulty === "Medium"
          ? labels.medium
          : labels.hard;

  return (
    <aside className="h-fit rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6 dark:border-stone-800 dark:bg-stone-900 lg:sticky lg:top-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter size={19} className="text-orange-500" />

          <h3 className="font-bold text-stone-900 dark:text-white">
            {labels.title}
          </h3>

          {activeFilterCount > 0 && (
            <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700 dark:bg-orange-400/10 dark:text-orange-300">
              {activeFilterCount} {labels.activeFilters}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 transition hover:text-orange-700 dark:text-orange-400"
          >
            <RotateCcw size={15} />
            {labels.clearFilters}
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-6">
        {/* Category */}
        <div>
          <label
            htmlFor="ingredient-search-category"
            className={fieldLabelClassName}
          >
            {labels.category}
          </label>

          <select
            id="ingredient-search-category"
            value={filters.categoryId}
            onChange={(event) => onCategoryChange(event.target.value)}
            className={selectClassName}
          >
            <option value="">{labels.anyCategory}</option>

            {categories.map((category) => (
              <option key={category.id} value={String(category.id)}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Cuisine */}
        <div>
          <label
            htmlFor="ingredient-search-cuisine"
            className={fieldLabelClassName}
          >
            {labels.cuisine}
          </label>

          <select
            id="ingredient-search-cuisine"
            value={filters.cuisineId}
            onChange={(event) => onCuisineChange(event.target.value)}
            className={selectClassName}
          >
            <option value="">{labels.anyCuisine}</option>

            {cuisines.map((cuisine) => (
              <option key={cuisine.id} value={String(cuisine.id)}>
                {cuisine.name}
              </option>
            ))}
          </select>
        </div>

        {/* Cooking time slider */}
        <div>
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="ingredient-search-cooking-time"
              className={fieldLabelClassName}
            >
              {labels.cookingTime}
            </label>

            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700 dark:bg-orange-400/10 dark:text-orange-300">
              {selectedTimeOption.labelKey === "upToMinutes"
                ? labels.upToMinutes.replace(
                    "{{minutes}}",
                    String(selectedTimeOption.minutes),
                  )
                : labels[selectedTimeOption.labelKey]}
            </span>
          </div>

          <input
            id="ingredient-search-cooking-time"
            type="range"
            min={0}
            max={6}
            step={1}
            value={Math.max(0, cookingTimeIndex)}
            onChange={(event) => {
              const option =
                cookingTimeOptions[Number(event.target.value)];

              if (option) onCookingTimeChange(option.value);
            }}
            className={rangeClassName}
            aria-label={labels.cookingTime}
          />

          <div className="mt-2 grid grid-cols-7 text-center text-[10px] font-medium text-stone-500 dark:text-stone-400">
            {["<10", "20", "30", "40", "50", "60", "+60"].map(
              (label) => (
                <span key={label}>{label}</span>
              ),
            )}
          </div>
        </div>

        {/* Maximum missing ingredients slider */}
        <div>
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="ingredient-search-missing"
              className={fieldLabelClassName}
            >
              {labels.maxMissingIngredients}
            </label>

            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700 dark:bg-orange-400/10 dark:text-orange-300">
              {filters.maxMissingIngredients === 0
                ? labels.perfectFit
                : filters.maxMissingIngredients === 9
                  ? labels.noMissingLimit
                  : labels.upToMissing.replace(
                      "{{count}}",
                      String(filters.maxMissingIngredients),
                    )}
            </span>
          </div>

          <input
            id="ingredient-search-missing"
            type="range"
            min={0}
            max={9}
            step={1}
            value={filters.maxMissingIngredients}
            onChange={(event) =>
              onMaxMissingIngredientsChange(Number(event.target.value))
            }
            className={rangeClassName}
            aria-label={labels.maxMissingIngredients}
          />

          <div className="mt-2 flex justify-between text-[10px] font-medium text-stone-500 dark:text-stone-400">
            {Array.from({ length: 10 }, (_, index) => (
              <span key={index}>{index === 9 ? "+9" : index}</span>
            ))}
          </div>
        </div>

        {/* Difficulty slider */}
        <div>
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="ingredient-search-difficulty"
              className={fieldLabelClassName}
            >
              {labels.difficulty}
            </label>

            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700 dark:bg-orange-400/10 dark:text-orange-300">
              {difficultyLabel}
            </span>
          </div>

          <input
            id="ingredient-search-difficulty"
            type="range"
            min={0}
            max={3}
            step={1}
            value={difficultyIndex}
            onChange={(event) => {
              const value = Number(event.target.value);

              onDifficultyChange(
                value === 0
                  ? null
                  : difficultyOptions[value - 1],
              );
            }}
            className={rangeClassName}
            aria-label={labels.difficulty}
          />

          <div className="mt-2 grid grid-cols-4 text-center text-[11px] font-medium text-stone-500 dark:text-stone-400">
            <span>{labels.anyDifficulty}</span>
            <span>{labels.easy}</span>
            <span>{labels.medium}</span>
            <span>{labels.hard}</span>
          </div>
        </div>

        {/* Sort */}
        <div>
          <label
            htmlFor="ingredient-search-sort"
            className={fieldLabelClassName}
          >
            {labels.sortBy}
          </label>

          <select
            id="ingredient-search-sort"
            value={filters.sortBy}
            onChange={(event) =>
              onSortChange(
                event.target.value as IngredientSearchSortOption,
              )
            }
            className={selectClassName}
          >
            <option value="bestMatch">{labels.bestMatch}</option>
            <option value="newest">{labels.newest}</option>
            <option value="oldest">{labels.oldest}</option>
            <option value="mostPopular">{labels.mostPopular}</option>
            <option value="fastest">{labels.fastest}</option>
            <option value="fewestMissing">{labels.fewestMissing}</option>
            <option value="mostMatched">{labels.mostMatched}</option>
          </select>
        </div>
      </div>
    </aside>
  );
}