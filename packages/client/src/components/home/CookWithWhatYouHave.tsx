import {
  ArrowRight,
  Plus,
  Sparkles,
  X,
  Utensils,
  Clock,
  ChefHat,
  Zap,
  ShoppingBag,
  Flame,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";

const suggestedIngredients = [
  "tomatoes",
  "eggs",
  "garlic",
  "onions",
  "rice",
  "chicken",
] as const;

function CookWithWhatYouHave() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].cookWithWhatYouHave;

  const addIngredient = (ingredient: string) => {
    const value = ingredient.trim();
    if (!value) return;
    const alreadyAdded = ingredients.some(
      (item) => item.toLowerCase() === value.toLowerCase(),
    );
    if (alreadyAdded) return;
    setIngredients((current) => [...current, value]);
    setInput("");
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients((current) => current.filter((item) => item !== ingredient));
  };

  const handleSubmit = () => {
    if (input.trim()) {
      addIngredient(input);
    }
  };

  return (
    <section className="relative overflow-hidden bg-transparent py-24 sm:py-32">
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Floating Elements */}
        <div className="animate-float-slow absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-orange-300/10 blur-3xl dark:bg-orange-500/10" />
        <div className="animate-float-delayed absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl dark:bg-amber-500/10" />

        {/* Food Icon Decorations */}
        <div className="animate-float-slow absolute left-[10%] top-[15%] opacity-20">
          <Utensils size={48} className="text-orange-400" />
        </div>
        <div className="animate-float-delayed absolute right-[15%] top-[20%] opacity-20">
          <ChefHat size={40} className="text-amber-400" />
        </div>
        <div className="animate-float-slow absolute bottom-[25%] left-[20%] opacity-10">
          <ShoppingBag size={36} className="text-orange-400" />
        </div>
        <div className="animate-float-delayed absolute bottom-[15%] right-[10%] opacity-10">
          <Zap size={44} className="text-amber-400" />
        </div>
</div>

      <div className="page-container relative">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3 rounded-full bg-orange-500/10 px-4 py-2 backdrop-blur-sm dark:bg-orange-400/10">
              <Sparkles size={16} className="animate-pulse text-orange-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                {t.badge.title}
              </span>
              <span className="h-1 w-1 rounded-full bg-orange-400" />
              <span className="text-xs font-medium text-orange-500/70">
                {t.badge.subtitle}
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-bold tracking-tight min-h-fit text-stone-900 sm:text-5xl lg:text-5xl dark:text-white">
              {t.title.firstLine}
              <span className="mt-2 block bg-gradient-to-r min-h-14 from-orange-500 to-amber-500 bg-clip-text text-transparent">
                {t.title.highlight}
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-600 sm:text-lg dark:text-stone-300">
              {t.description}
            </p>

            {/* Feature List with Illustrations */}
            <div className="mt-10 space-y-4">
              {[
                {
                  icon: Zap,
                  label: t.features.useWhatYouHave,
                  color: "text-amber-500",
                },
                {
                  icon: Globe,
                  label: t.features.differentCultures,
                  color: "text-emerald-500",
                },
                {
                  icon: Clock,
                  label: t.features.easyInspiration,
                  color: "text-blue-500",
                },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="group flex items-center gap-4 rounded-2xl bg-white/50 p-4 backdrop-blur-sm transition-all hover:bg-white/80 hover:shadow-md dark:bg-stone-900/30 dark:hover:bg-stone-900/60"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 transition-all group-hover:scale-110">
                    <Icon size={18} className={color} />
                  </span>
                  <span className="text-sm font-medium text-stone-700 dark:text-stone-200">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2 rtl:flex-row-reverse">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-orange-400 to-amber-400 dark:border-stone-900"
                      style={{
                        backgroundImage: `url(https://i.pravatar.cc/40?img=${i + 20})`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
                  <span className="font-bold text-stone-900 dark:text-white">
                    2.4k+
                  </span>{" "}
                  {t.stats.savedToday}
                </span>
              </div>
              <div className="text-sm text-stone-400">•</div>
              <div className="flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400">
                <Flame size={14} className="text-orange-400" />
                <span>{t.stats.trendingNow}</span>
              </div>
            </div>
          </div>

          {/* Ingredient Finder Card */}
          <div className="relative">
            {/* Decorative Glow */}
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-orange-400/20 via-amber-400/20 to-transparent blur-3xl" />

            {/* Main Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-stone-200/80 bg-white/80 p-8 shadow-2xl shadow-stone-200/50 backdrop-blur-xl transition-all hover:shadow-orange-200/30 sm:p-10 dark:border-stone-700/80 dark:bg-stone-900/80 dark:shadow-stone-900/50 dark:hover:shadow-orange-900/20">
              {/* Card Gradient Overlay */}
              <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-orange-400/5 to-amber-400/5 blur-2xl" />
              <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-tr from-orange-400/5 to-amber-400/5 blur-2xl" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-stone-900 dark:text-white">
                      {t.finder.title}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                      {t.finder.description}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10">
                    <ShoppingBag size={20} className="text-orange-500" />
                  </div>
                </div>

                {/* Input Area */}
                <div className="mt-6">
                  <div className="relative flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <label htmlFor="ingredient-input" className="sr-only">
                        {t.finder.inputLabel}
                      </label>
                      <div className="relative">
                        <input
                          id="ingredient-input"
                          type="text"
                          value={input}
                          onChange={(event) => setInput(event.target.value)}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleSubmit();
                            }
                          }}
                          placeholder={t.finder.placeholder}
                          className="h-14 w-full rounded-2xl border-2 border-stone-200 bg-white/90 px-5 pl-12 text-sm text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 dark:border-stone-700 dark:bg-stone-900/90 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-orange-500"
                        />
                        <Plus
                          size={18}
                          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                            isFocused ? "text-orange-500" : "text-stone-400"
                          }`}
                        />
                        {/* Input Glow */}
                        <div
                          className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                            isFocused ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-400/20 to-amber-400/20 blur-xl" />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="group relative h-14 min-w-[100px] overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40 active:scale-95"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Plus size={17} />
                        {t.finder.add}
                      </span>
                      <span className="group-hover:animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </button>
                  </div>
                </div>

                {/* Selected Ingredients */}
                <div className="mt-6 min-h-[52px]">
                  {ingredients.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {ingredients.map((ingredient) => (
                        <span
                          key={ingredient}
                          className="animate-scale-in group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 px-4 py-2 text-sm font-medium text-orange-700 shadow-sm backdrop-blur-sm transition-all hover:shadow-md dark:from-orange-400/10 dark:to-amber-400/10 dark:text-orange-300"
                        >
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
                          {
                            t.suggestedIngredients[
                              ingredient.toLowerCase() as keyof typeof t.suggestedIngredients
                            ]
                          }
                          <button
                            type="button"
                            onClick={() => removeIngredient(ingredient)}
                            aria-label={`{${t.finder.removeIngredient} ${
                              t.suggestedIngredients[
                                ingredient.toLowerCase() as keyof typeof t.suggestedIngredients
                              ]
                            }`}
                            className="rounded-full p-0.5 transition-all hover:scale-110 hover:bg-orange-500/20"
                          >
                            <X size={14} className="text-orange-500" />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-12 items-center rounded-2xl border-2 border-dashed border-stone-200 px-4 dark:border-stone-700">
                      <p className="text-sm text-stone-400 dark:text-stone-500">
                        {t.finder.ingredientsPlaceholder}
                      </p>
                    </div>
                  )}
                </div>

                {/* Suggestions with Icons */}
                <div className="mt-7">
                  <div className="mb-3 flex items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                      {t.finder.popularIngredients}
                    </p>
                    <span className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestedIngredients.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => addIngredient(name)}
                        className="group inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-sm font-medium text-stone-600 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50/80 hover:text-orange-600 hover:shadow-md dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-300 dark:hover:border-orange-700 dark:hover:bg-orange-950/30 dark:hover:text-orange-400"
                      >
                        {t.suggestedIngredients[name as keyof typeof t.suggestedIngredients]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Find Recipes Button */}
                <button
                  type="button"
                  disabled={ingredients.length === 0}
                  className="group relative mt-8 inline-flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Flame size={18} />
                    <span>{t.finder.findRecipes}</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    />
                  </span>
                  {ingredients.length > 0 && (
                    <span className="group-hover:animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  )}
                  {ingredients.length > 0 && (
                    <span className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-white/10 blur-xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.05); }
          66% { transform: translate(-10px, 10px) scale(0.95); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-20px, 20px) scale(0.95); }
          66% { transform: translate(15px, -15px) scale(1.05); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default CookWithWhatYouHave;
