import { Bookmark, Check, Heart, Share2 } from "lucide-react";
import { Button } from "../../../components/ui/Button";

interface RecipeActionsProps {
  isFavorited: boolean;
  isLiked: boolean;
  isActionLoading: boolean;
  shareCopied: boolean;
  onFavorite: () => void;
  onLike: () => void;
  onShare: () => void;
  labels: {
    save: string;
    saved: string;
    like: string;
    liked: string;
    share: string;
    copied: string;
  };
}

export function RecipeActions({
  isFavorited,
  isLiked,
  isActionLoading,
  shareCopied,
  onFavorite,
  onLike,
  onShare,
  labels,
}: RecipeActionsProps) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <Button
        variant={isFavorited ? "primary" : "secondary"}
        onClick={onFavorite}
        disabled={isActionLoading}
        leftIcon={
          <Bookmark
            size={18}
            className={isFavorited ? "fill-current" : ""}
          />
        }
      >
        {isFavorited ? labels.saved : labels.save}
      </Button>

      <Button
        variant={isLiked ? "danger" : "secondary"}
        onClick={onLike}
        disabled={isActionLoading}
        leftIcon={
          <Heart size={18} className={isLiked ? "fill-current" : ""} />
        }
      >
        {isLiked ? labels.liked : labels.like}
      </Button>

      <Button
        variant="secondary"
        onClick={onShare}
        leftIcon={
          shareCopied ? <Check size={18} /> : <Share2 size={18} />
        }
        className="hover:border-emerald-300 hover:text-emerald-700 dark:hover:border-emerald-800 dark:hover:text-emerald-400"
      >
        {shareCopied ? labels.copied : labels.share}
      </Button>
    </div>
  );
}