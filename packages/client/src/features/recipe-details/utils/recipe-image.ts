interface RecipeImageSources {
  src: string;
  srcSet?: string;
  sizes: string;
}

function optimizeUnsplashUrl(
  imageUrl: string,
  width: number,
): string {
  const url = new URL(imageUrl);

  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", "75");

  return url.toString();
}

export function getRecipeImageSources(
  imageUrl: string,
): RecipeImageSources {
  try {
    const url = new URL(imageUrl);

    if (url.hostname !== "images.unsplash.com") {
      return {
        src: imageUrl,
        sizes: "100vw",
      };
    }

    const widths = [480, 768, 1200];

    const srcSet = widths
      .map(
        (width) =>
          `${optimizeUnsplashUrl(imageUrl, width)} ${width}w`,
      )
      .join(", ");

    return {
      src: optimizeUnsplashUrl(imageUrl, 1200),
      srcSet,
      sizes: "(max-width: 768px) 100vw, 1200px",
    };
  } catch {
    return {
      src: imageUrl,
      sizes: "100vw",
    };
  }
}
