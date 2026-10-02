import { Play } from "lucide-react";
import type { RecipeMedia } from "../../../api/recipe-details.api";

interface MediaGalleryProps {
  media: RecipeMedia[];
  title: string;
  heading: string;
  videoLabel: string;
}

export function MediaGallery({
  media,
  title,
  heading,
  videoLabel,
}: MediaGalleryProps) {
  if (!media.length) return null;

  return (
    <section className="page-container py-8 sm:py-10">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
          KinFeast
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-stone-900 dark:text-stone-50">
          {heading}
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-stone-900/10 dark:bg-stone-900 dark:ring-white/10"
          >
            {item.media_type === "image" ? (
              <img
                src={item.media_url}
                alt={title}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            ) : (
              <div className="relative aspect-video bg-black">
                <video
                  controls
                  preload="metadata"
                  className="h-full w-full object-contain"
                >
                  <source src={item.media_url} />
                </video>
                <div className="pointer-events-none absolute start-3 top-3 flex items-center gap-2 rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white">
                  <Play size={13} fill="currentColor" />
                  {videoLabel}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}