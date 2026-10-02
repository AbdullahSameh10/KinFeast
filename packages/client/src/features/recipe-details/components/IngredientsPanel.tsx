import { Utensils } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import type { RecipeIngredient } from "../../../api/recipe-details.api";

interface IngredientsPanelProps {
  ingredients: RecipeIngredient[];
  title: string;
  emptyMessage: string;
}

export function IngredientsPanel({
  ingredients,
  title,
  emptyMessage,
}: IngredientsPanelProps) {
  return (
    <Card as="section">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
          <Utensils size={21} />
        </span>
        <div>
          <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
            {title}
          </h2>
          <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
            {ingredients.length}{" "}
            {ingredients.length === 1 ? "ingredient" : "ingredients"}
          </p>
        </div>
      </div>

      {ingredients.length > 0 ? (
        <ul className="mt-7 divide-y divide-stone-100 dark:divide-stone-800">
          {ingredients.map((item) => (
            <li
              key={`${item.ingredient_id}-${item.name}`}
              className="flex items-center justify-between gap-4 py-4"
            >
              <span className="font-medium text-stone-800 dark:text-stone-200">
                {item.name}
              </span>
              {item.quantity && (
                <span className="shrink-0 rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                  {item.quantity}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-7 rounded-2xl bg-stone-50 p-5 text-sm leading-6 text-stone-500 dark:bg-stone-950 dark:text-stone-400">
          {emptyMessage}
        </p>
      )}
    </Card>
  );
}