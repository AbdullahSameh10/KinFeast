
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://kinfeast.vercel.app";

export function useCanonicalUrl() {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalUrl = new URL(pathname, SITE_URL).toString();

    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = canonicalUrl;
  }, [pathname]);
}
