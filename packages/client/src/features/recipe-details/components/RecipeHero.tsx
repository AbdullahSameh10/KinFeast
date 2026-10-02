import { useState } from "react";
import { Utensils } from "lucide-react";

interface RecipeHeroProps {
  image?: string;
  title: string;
  categoryName: string;
}

export function RecipeHero({ image, title, categoryName }: RecipeHeroProps) {
  const [failed, setFailed] = useState(false);
  const showImage = image && !failed;

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-stone-100 shadow-xl ring-1 ring-stone-900/10 dark:bg-stone-800 dark:ring-white/10">
      <div className="aspect-[4/3]">
        {showImage ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle,rgba(4,120,87,0.16)_1px,transparent_1.5px)] [background-size:16px_16px]"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm dark:bg-stone-900 dark:text-emerald-300">
              <Utensils size={34} strokeWidth={1.4} />
            </span>
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 pt-16">
        <span className="inline-flex rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-stone-800 backdrop-blur-md dark:bg-stone-900/90 dark:text-stone-200">
          {categoryName}
        </span>
      </div>
    </div>
  );
}