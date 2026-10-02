import { Star } from "lucide-react";
import { MAX_RATING } from "../constants";
import { cn } from "./../../../lib/utils";

interface StarRatingProps {
  value: number;
  size?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
}

export function StarRating({
  value,
  size = 15,
  interactive,
  onChange,
}: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: MAX_RATING }, (_, i) => i + 1).map((star) => {
        const filled = star <= value;
        const starEl = (
          <Star
            size={size}
            className={cn(
              filled
                ? "fill-orange-400 text-orange-400"
                : "text-stone-300 dark:text-stone-700",
            )}
          />
        );

        return interactive ? (
          <button
            key={star}
            type="button"
            onClick={() => onChange?.(star)}
            aria-label={`${star} / ${MAX_RATING}`}
            className="rounded-lg p-1 transition hover:scale-105"
          >
            {starEl}
          </button>
        ) : (
          <span key={star}>{starEl}</span>
        );
      })}
    </div>
  );
}