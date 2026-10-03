import { useEffect } from "react";

const SITE_NAME = "KinFeast";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${SITE_NAME} - ${title}`;
  }, [title]);
}