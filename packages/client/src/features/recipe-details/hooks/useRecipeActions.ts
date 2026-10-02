import { useCallback, useState } from "react";
import {
  addFavorite,
  removeFavorite,
} from "../../../api/favorites.api";
import {
  addRecipeLike,
  removeRecipeLike,
} from "../../../api/recipe-details.api";

interface UseRecipeActionsArgs {
  id: string | undefined;
  isAuthenticated: boolean;
  onRequireAuth: () => void;
}

export function useRecipeActions({
  id,
  isAuthenticated,
  onRequireAuth,
}: UseRecipeActionsArgs) {
  const [isActionLoading, setIsActionLoading] = useState(false);

  const toggleFavorite = useCallback(
    async (
      current: boolean,
      onOptimistic: (v: boolean) => void,
    ) => {
      if (!id || !isAuthenticated) return onRequireAuth();
      if (isActionLoading) return;

      onOptimistic(!current);
      setIsActionLoading(true);
      try {
        if (current) await removeFavorite(id);
        else await addFavorite(id);
      } catch {
        onOptimistic(current);
      } finally {
        setIsActionLoading(false);
      }
    },
    [id, isAuthenticated, isActionLoading, onRequireAuth],
  );

  const toggleLike = useCallback(
    async (
      current: boolean,
      onOptimistic: (v: boolean, delta: number) => void,
    ) => {
      if (!id || !isAuthenticated) return onRequireAuth();
      if (isActionLoading) return;

      onOptimistic(!current, current ? -1 : 1);
      setIsActionLoading(true);
      try {
        if (current) await removeRecipeLike(id);
        else await addRecipeLike(id);
      } catch {
        onOptimistic(current, current ? 1 : -1);
      } finally {
        setIsActionLoading(false);
      }
    },
    [id, isAuthenticated, isActionLoading, onRequireAuth],
  );

  return { isActionLoading, toggleFavorite, toggleLike };
}