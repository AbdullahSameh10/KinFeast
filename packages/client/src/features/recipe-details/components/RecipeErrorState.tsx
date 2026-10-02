import { Link } from "react-router-dom";
import { Utensils } from "lucide-react";
import { Button } from "../../../components/ui/Button";

interface RecipeErrorStateProps {
  message: string;
  title: string;
  retryLabel: string;
  backLabel: string;
  onRetry: () => void;
}

export function RecipeErrorState({
  message,
  title,
  retryLabel,
  backLabel,
  onRetry,
}: RecipeErrorStateProps) {
  return (
    <main className="page-container flex min-h-[65vh] items-center justify-center py-16">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
          <Utensils size={28} />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-semibold text-stone-900 dark:text-stone-50">
          {title}
        </h1>
        <p className="mt-3 leading-7 text-stone-600 dark:text-stone-400">
          {message}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button variant="primary" onClick={onRetry}>
            {retryLabel}
          </Button>
          <Link to="/recipes">
            <Button variant="secondary">{backLabel}</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}