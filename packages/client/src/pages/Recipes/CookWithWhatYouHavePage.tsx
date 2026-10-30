import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChefHat,
  Clock,
  Filter,
  Flame,
  LoaderCircle,
  Plus,
  Search,
  Utensils,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  searchRecipesByIngredients,
  getRecipeCategories,
  getCuisines,
  type RecipeCategory,
  type Cuisine,
  type IngredientSearchRecipe,
  type IngredientSearchResponse,
} from "../../api/recipes.api";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../i18n";
import IngredientSearchFilters from "../../components/recipes/ingredient-search/IngredientSearchFilters";
import { useIngredientSearchFilters } from "../../hooks/useIngredientSearchFilters";
import type { IngredientSearchFilterLabels } from "../../types/ingredientSearchFilters.types";


function CookWithWhatYouHavePage() {
  const { language } = useLanguage();
  const t = translations[language].cookWithWhatYouHavePage;
  const isArabic = language === "ar";
  const filterLabels: IngredientSearchFilterLabels = t.filters;
  const [result, setResult] = useState<IngredientSearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<RecipeCategory[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);

  const {
    filters,
    filteredRecipes,
    activeFilterCount,
    setCategoryId,
    setCuisineId,
    setCookingTime,
    setMaxMissingIngredients,
    setDifficulty,
    setSortBy,
    clearFilters,
  } = useIngredientSearchFilters(result?.recipes ?? []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getRecipeCategories(), getCuisines()])
      .then(([categoryData, cuisineData]) => {
        if (!cancelled) {
          setCategories(categoryData);
          setCuisines(cuisineData);
        }
      })
      .catch((loadError) => {
        console.error("Unable to load recipe filter options:", loadError);
      });
    return () => { cancelled = true; };
  }, []);

  useDocumentTitle("Cook With What You Have");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = searchParams.toString();

  const ingredients = useMemo(
    () =>
      new URLSearchParams(queryString)
        .getAll("ingredients")
        .flatMap((value) => value.split(","))
        .map((value) => value.trim())
        .filter(Boolean),
    [queryString],
  );

  const [draftIngredients, setDraftIngredients] = useState(ingredients);
  const [ingredientInput, setIngredientInput] = useState("");

  // Keep the ingredient values in English for the API.
  // Only their displayed labels change with the selected language.
  const suggestedIngredients = [
    "tomatoes",
    "eggs",
    "garlic",
    "onions",
    "rice",
    "chicken",
  ] as const;

  const addIngredient = (value: string) => {
    const ingredient = value.trim();

    if (!ingredient) return;

    setDraftIngredients((current) => {
      const alreadyExists = current.some(
        (item) => item.toLowerCase() === ingredient.toLowerCase(),
      );

      return alreadyExists ? current : [...current, ingredient];
    });

    setIngredientInput("");
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setDraftIngredients((current) =>
      current.filter(
        (ingredient) =>
          ingredient.toLowerCase() !== ingredientToRemove.toLowerCase(),
      ),
    );
  };

  const handleIngredientSearch = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("ingredients");

    if (draftIngredients.length > 0) {
      params.set("ingredients", draftIngredients.join(","));
    }

    setSearchParams(params);
  };

  useEffect(() => {
    const nextIngredients = searchParams
      .getAll("ingredients")
      .flatMap((value) => value.split(","))
      .map((value) => value.trim())
      .filter(Boolean);

    const timeoutID = window.setTimeout(() => {
      setDraftIngredients(nextIngredients);
    }, 0);

    return () => window.clearTimeout(timeoutID);
  }, [queryString, searchParams]);

  useEffect(() => {
    let cancelled = false;

    async function loadRecipes() {
      if (ingredients.length === 0) {
        setResult(null);
        setError("");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const data = await searchRecipesByIngredients(ingredients);

        if (!cancelled) {
          setResult(data);
        }
      } catch {
        if (!cancelled) {
          setError(t.error.description);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadRecipes();

    return () => {
      cancelled = true;
    };
  }, [ingredients, t.error.description]);

  const availableIngredients = [...new Set(ingredients)];

  const getRecipeUrl = (recipe: IngredientSearchRecipe) => {
    const params = new URLSearchParams();

    availableIngredients.forEach((ingredient) => {
      params.append("have", ingredient);
    });

    return `/recipes/${recipe.slug}?${params.toString()}`;
  };

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-stone-50 pb-20 pt-10 dark:bg-stone-950"
    >
      <div className="page-container">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-200/70 hover:text-orange-600 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-orange-400"
        >
          {isArabic ? (
            <ArrowRight size={17} />
          ) : (
            <ArrowLeft size={17} />
          )}
          {t.backHome}
        </Link>

        <section className="relative overflow-hidden rounded-[2rem] border border-orange-200/70 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6 shadow-sm sm:p-10 dark:border-stone-800 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950">
          <div
            className={`pointer-events-none absolute -top-20 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl ${
              isArabic ? "-left-16" : "-right-16"
            }`}
          />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-700 dark:bg-orange-400/10 dark:text-orange-300">
              <Flame size={14} />
              {t.hero.eyebrow}
            </div>

            <h1 className="max-w-3xl text-3xl font-black tracking-tight text-stone-900 sm:text-5xl dark:text-white">
                {t.hero.title}{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                {t.hero.titleEyebrow}
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg dark:text-stone-300">
              {t.hero.description}
            </p>

            <div className="mt-8 max-w-3xl">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  addIngredient(ingredientInput);
                }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-500/10 dark:border-stone-700 dark:bg-stone-950">
                  <Search
                    size={20}
                    className="shrink-0 text-orange-500"
                  />

                  <input
                    type="text"
                    value={ingredientInput}
                    onChange={(event) =>
                      setIngredientInput(event.target.value)
                    }
                    placeholder={t.search.placeholder}
                    aria-label={t.search.inputLabel}
                    className="min-w-0 flex-1 bg-transparent py-1 text-sm text-stone-900 outline-none placeholder:text-stone-400 dark:text-white"
                  />

                  <button
                    type="submit"
                    disabled={!ingredientInput.trim()}
                    aria-label={t.search.addButton}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700 transition hover:bg-orange-200 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-orange-400/10 dark:text-orange-300 dark:hover:bg-orange-400/20"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleIngredientSearch}
                  disabled={draftIngredients.length === 0}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-orange-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <Search size={17} />
                  {t.search.findRecipes}
                  {isArabic ? (
                    <ArrowLeft size={17} />
                  ) : (
                    <ArrowRight size={17} />
                  )}
                </button>
              </form>

              <div className="mt-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  {t.search.quickAdd}
                </p>

                <div className="flex flex-wrap gap-2">
                  {suggestedIngredients.map((ingredient) => {
                    const alreadyAdded = draftIngredients.some(
                      (item) =>
                        item.toLowerCase() === ingredient.toLowerCase(),
                    );

                    return (
                      <button
                        key={ingredient}
                        type="button"
                        disabled={alreadyAdded}
                        onClick={() => addIngredient(ingredient)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/80 px-3 py-2 text-sm font-medium capitalize text-stone-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 disabled:cursor-default disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-orange-800 dark:hover:bg-orange-400/10"
                      >
                        <Plus size={14} />
                        {t.search.suggestions[ingredient]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold text-stone-800 dark:text-stone-200">
                    {t.search.yourIngredients} ({draftIngredients.length})
                  </p>

                  {draftIngredients.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setDraftIngredients([])}
                      className="text-xs font-semibold text-stone-500 transition hover:text-red-500"
                    >
                      {t.search.clearAll}
                    </button>
                  )}
                </div>

                {draftIngredients.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {draftIngredients.map((ingredient) => (
                      <span
                        key={ingredient.toLowerCase()}
                        className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-2 text-sm font-semibold capitalize text-orange-800 shadow-sm dark:border-orange-900/60 dark:bg-stone-900 dark:text-orange-200"
                      >
                        <span className="h-2 w-2 rounded-full bg-orange-500" />
                        {ingredient}

                        <button
                          type="button"
                          onClick={() => removeIngredient(ingredient)}
                          aria-label={t.search.removeIngredient.replace(
                            "{{ingredient}}",
                            ingredient,
                          )}
                          className="rounded-full p-0.5 transition hover:bg-orange-100 hover:text-red-600 dark:hover:bg-stone-800"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-6 text-stone-500 dark:text-stone-400">
                    {t.search.emptyIngredients}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {isLoading ? (
          <section
            aria-live="polite"
            className="flex min-h-72 flex-col items-center justify-center text-center"
          >
            <LoaderCircle
              size={38}
              className="animate-spin text-orange-500"
            />
            <h2 className="mt-5 text-xl font-bold text-stone-900 dark:text-white">
              {t.loading.title}
            </h2>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              {t.loading.description}
            </p>
          </section>
        ) : error ? (
          <section
            role="alert"
            className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20"
          >
            <X size={32} className="mx-auto text-red-500" />
            <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-white">
              {t.error.title}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-stone-600 dark:text-stone-300">
              {error}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              {t.error.retry}
            </button>
          </section>
        ) : ingredients.length === 0 ? (
          <section className="mt-10 rounded-3xl border border-dashed border-stone-300 bg-white/70 p-8 text-center sm:p-12 dark:border-stone-700 dark:bg-stone-900/50">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-400/10 dark:text-orange-300">
              <Utensils size={30} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-stone-900 dark:text-white">
              {t.empty.title}
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-stone-600 dark:text-stone-300">
              {t.empty.description}
            </p>
          </section>
        ) : result?.mode === "no_matches" ? (
          <section className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 text-center sm:p-12 dark:border-stone-800 dark:bg-stone-900">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-400/10 dark:text-orange-300">
              <Utensils size={30} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-stone-900 dark:text-white">
              {t.noMatches.title}
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-stone-600 dark:text-stone-300">
              {t.noMatches.description}
            </p>

            <button
              type="button"
              onClick={() => {
                document
                  .querySelector("input[aria-label]")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5"
            >
              {t.noMatches.chooseIngredients}
              {isArabic ? (
                <ArrowLeft size={17} />
              ) : (
                <ArrowRight size={17} />
              )}
            </button>
          </section>
        ) : (
          <>
            <section className="mb-7 mt-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  {result?.mode === "fallback"
                    ? t.results.alternative
                    : t.results.matchesLabel}
                </p>

                <h2 className="mt-2 text-2xl font-black text-stone-900 sm:text-3xl dark:text-white">
                  {result?.mode === "fallback"
                    ? t.results.alternativeTitle
                    : t.results.title}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600 dark:text-stone-400">
                  {result?.mode === "fallback"
                    ? t.results.alternativeDescription
                    : t.results.description}
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-bold text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200">
                <ChefHat size={18} className="text-orange-500" />
                {filteredRecipes.length}{" "}
                {result?.recipes.length === 1
                  ? t.results.recipe
                  : t.results.recipes}
              </div>
            </section>
            
            <div className={`grid items-start gap-6 lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] ${isArabic ? "lg:[direction:rtl]" : ""}`}>
              <IngredientSearchFilters
                labels={filterLabels}
                filters={filters}
                categories={categories}
                cuisines={cuisines}
                activeFilterCount={activeFilterCount}
                onCategoryChange={setCategoryId}
                onCuisineChange={setCuisineId}
                onCookingTimeChange={setCookingTime}
                onMaxMissingIngredientsChange={setMaxMissingIngredients}
                onDifficultyChange={setDifficulty}
                onSortChange={setSortBy}
                onClear={clearFilters}
              />

              <div className="min-w-0" dir={isArabic ? "rtl" : "ltr"}>
              {result?.mode === "fallback" && (
                <div className="mb-8 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200">
                  <Search size={20} className="mt-0.5 shrink-0" />
                  <p>
                    <strong>{t.results.widenedTitle}</strong>{" "}
                    {t.results.widenedDescription}
                  </p>
                </div>
              )}

              {filteredRecipes.length === 0 ? (
              <section className="rounded-3xl border border-dashed border-stone-300 bg-white p-8 text-center sm:p-12 dark:border-stone-700 dark:bg-stone-900">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-400/10 dark:text-orange-300">
                  <Filter size={26} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-stone-900 dark:text-white">
                  {t.filters.noResultsTitle}
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-600 dark:text-stone-300">
                  {t.filters.noResultsDescription}
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                >
                  {t.filters.showAll}
                </button>
              </section>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

              {filteredRecipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/10 dark:border-stone-800 dark:bg-stone-900 dark:hover:shadow-black/30"
                >
                  <Link
                    to={getRecipeUrl(recipe)}
                    className="relative block aspect-[5/3] overflow-hidden bg-stone-100 dark:bg-stone-800"
                  >
                    {recipe.recipe_image ? (
                      <img
                        src={recipe.recipe_image}
                        alt={recipe.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-stone-400">
                        <Utensils size={42} />
                      </div>
                    )}

                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm dark:bg-stone-950/90 dark:text-emerald-300">
                      <Check size={13} />
                      {recipe.matched_ingredient_count}{" "}
                      {recipe.matched_ingredient_count === 1
                        ? t.results.ingredientMatch
                        : t.results.ingredientMatches}
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <Link to={getRecipeUrl(recipe)}>
                      <h3 className="text-xl font-bold text-stone-900 transition group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                        {recipe.title}
                      </h3>
                    </Link>

                    {recipe.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
                        {recipe.description}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-stone-500 dark:text-stone-400">
                      {recipe.cooking_time != null && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={14} />
                          {t.results.cookingTime.replace(
                            "{{time}}",
                            String(recipe.cooking_time),
                          )}
                        </span>
                      )}

                      <span className="rounded-full bg-stone-100 px-2.5 py-1 dark:bg-stone-800">
                        {recipe.difficulty}
                      </span>

                      <span className="rounded-full bg-orange-50 px-2.5 py-1 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300">
                        {recipe.missing_ingredient_count}{" "}
                        {t.results.missing}
                      </span>
                    </div>

                    <div className="mt-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        {t.results.youHave}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {recipe.matched_ingredients.map((ingredient) => (
                          <span
                            key={ingredient.id}
                            className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300"
                          >
                            {ingredient.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400">
                        {t.results.stillNeeded}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {recipe.missing_ingredients.length > 0 ? (
                          recipe.missing_ingredients.map((ingredient) => (
                            <span
                              key={ingredient.id}
                              className="rounded-lg bg-orange-50 px-2.5 py-1.5 text-xs font-semibold text-orange-800 dark:bg-orange-400/10 dark:text-orange-300"
                            >
                              {ingredient.name}
                            </span>
                          ))
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
                            <Check size={13} />
                            {t.results.everything}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      to={getRecipeUrl(recipe)}
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      {t.results.viewRecipe}
                      {isArabic ? (
                        <ArrowLeft size={16} />
                      ) : (
                        <ArrowRight size={16} />
                      )}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default CookWithWhatYouHavePage;
