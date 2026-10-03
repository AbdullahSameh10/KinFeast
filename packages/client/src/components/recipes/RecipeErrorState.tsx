import { AlertCircle } from "lucide-react";

interface RecipeErrorStateProps {
  title: string;
  message: string;
  retryLabel: string;
  onRetry: () => void;
}

export default function RecipeErrorState({
  title,
  message,
  retryLabel,
  onRetry,
}: RecipeErrorStateProps) {
  return (
    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-7 dark:border-rose-900/60 dark:bg-rose-950/20">
      <div className="flex flex-col items-start gap-5 sm:flex-row">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300">
          <AlertCircle size={21} />
        </div>

        <div className="flex-1">
          <h2 className="font-bold text-rose-900 dark:text-rose-200">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-rose-700 dark:text-rose-300">
            {message}
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            {retryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}