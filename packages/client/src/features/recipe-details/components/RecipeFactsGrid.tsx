import { Clock3, Eye, Heart } from "lucide-react";
import { DIFFICULTY_COLORS, DIFFICULTY_LEVEL } from "../constants";
import { Stat } from "../../../components/ui/Stat";
import type { Recipe } from "../../../api/recipes.api";

interface RecipeFactsGridProps {
  recipe: Recipe;
  likeCount: number;
  viewCount: number;
  labels: {
    minutes: string;
    difficulty: string;
    likes: string;
    views: string;
  };
}

export function RecipeFactsGrid({
  recipe,
  likeCount,
  viewCount,
  labels,
}: RecipeFactsGridProps) {
  const level = DIFFICULTY_LEVEL[recipe.difficulty];

  return (
    <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900 sm:grid-cols-4">
      <div className="border-b border-e border-stone-200 dark:border-stone-800 sm:border-b-0">
        <Stat
          icon={<Clock3 size={18} className="text-orange-500" />}
          value={recipe.cooking_time ?? "–"}
          label={labels.minutes}
        />
      </div>

      <div className="border-b border-stone-200 p-4 dark:border-stone-800 sm:border-b-0 sm:border-e">
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((step) => (
            <span
              key={step}
              className={`h-1.5 w-5 rounded-full ${
                step <= level
                  ? DIFFICULTY_COLORS[level]
                  : "bg-stone-200 dark:bg-stone-700"
              }`}
            />
          ))}
        </div>
        <p className="mt-3 text-sm font-semibold text-stone-900 dark:text-stone-50">
          {recipe.difficulty}
        </p>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {labels.difficulty}
        </p>
      </div>

      <div className="border-e border-stone-200 dark:border-stone-800">
        <Stat
          icon={<Heart size={18} className="text-rose-500" />}
          value={likeCount}
          label={labels.likes}
        />
      </div>

      <Stat
        icon={
          <Eye
            size={18}
            className="text-emerald-600 dark:text-emerald-400"
          />
        }
        value={viewCount}
        label={labels.views}
      />
    </div>
  );
}