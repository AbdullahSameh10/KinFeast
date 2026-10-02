import { useCallback, useState } from "react";
import { SHARE_FEEDBACK_MS } from "../constants";

export function useShare(title: string) {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), SHARE_FEEDBACK_MS);
    } catch {
      /* user cancelled */
    }
  }, [title]);

  return { copied, share };
}