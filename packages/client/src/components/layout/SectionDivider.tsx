import { ChefHat, Heart, Utensils } from "lucide-react";

const SectionDivider = () => {
  return (
    <div className="w-full py-10 sm:py-12" aria-hidden="true">
      <div className="relative flex items-center justify-center gap-6">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-stone-300/60 sm:w-32 dark:to-stone-700/60" />

        <div className="flex items-center gap-4">
          <ChefHat size={16} className="text-stone-400 dark:text-stone-600" />
          <span className="text-stone-300 dark:text-stone-700">•</span>
          <Heart size={14} className="text-rose-400/70" />
          <span className="text-stone-300 dark:text-stone-700">•</span>
          <Utensils size={16} className="text-stone-400 dark:text-stone-600" />
        </div>

        <div className="h-px w-20 bg-gradient-to-l from-transparent to-stone-300/60 sm:w-32 dark:to-stone-700/60" />
      </div>
    </div>
  );
};
export default SectionDivider;