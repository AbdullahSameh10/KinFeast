import { useState } from "react";
import { StarRating } from "./StarRating";
import { Button } from "../../../components/ui/Button";

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => Promise<void>;
  labels: {
    write: string;
    rating: string;
    placeholder: string;
    submit: string;
    submitting: string;
  };
}

export function ReviewForm({ onSubmit, labels }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!rating) return;
    setIsSubmitting(true);
    try {
      await onSubmit(rating, comment);
      setRating(0);
      setComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 rounded-[1.5rem] bg-stone-50 p-6 dark:bg-stone-900/50">
      <h3 className="font-semibold text-stone-900 dark:text-stone-100">
        {labels.write}
      </h3>
      <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
        {labels.rating}
      </p>

      <div className="mt-3">
        <StarRating
          value={rating}
          size={25}
          interactive
          onChange={setRating}
        />
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        placeholder={labels.placeholder}
        className="mt-4 w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
      />

      <Button
        variant="primary"
        onClick={() => void handleSubmit()}
        disabled={!rating}
        isLoading={isSubmitting}
        className="mt-4"
      >
        {isSubmitting ? labels.submitting : labels.submit}
      </Button>
    </div>
  );
}