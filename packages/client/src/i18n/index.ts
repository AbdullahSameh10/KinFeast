import { hero as enHero } from "./en/hero";
import { hero as arHero } from "./ar/hero";

import { cookWithWhatYouHave as enCookWithWhatYouHave } from "./en/cookWithWhatYouHave";
import { cookWithWhatYouHave as arCookWithWhatYouHave } from "./ar/cookWithWhatYouHave";

import { categories as enCategories } from "./en/categories";
import { categories as arCategories } from "./ar/categories";

import { navbar as enNavbar } from "./en/navbar";
import { navbar as arNavbar } from "./ar/navbar";

import { trendingRecipes as enTrendingRecipes } from "./en/trendingRecipes";
import { trendingRecipes as arTrendingRecipes } from "./ar/trendingRecipes";

import { whoWeAre as enWhoWeAre } from "./en/whoWeAre";
import { whoWeAre as arWhoWeAre } from "./ar/whoWeAre";

import { footer as enFooter } from "./en/footer";
import { footer as arFooter } from "./ar/footer";

import { auth as enAuth } from "./en/auth";
import { auth as arAuth } from "./ar/auth";

export const translations = {
  en: {
    navbar: enNavbar,
    hero: enHero,
    cookWithWhatYouHave: enCookWithWhatYouHave,
    categories: enCategories,
    trendingRecipes: enTrendingRecipes,
    whoWeAre: enWhoWeAre,
    footer: enFooter,
    auth: enAuth,
  },
  ar: {
    navbar: arNavbar,
    hero: arHero,
    cookWithWhatYouHave: arCookWithWhatYouHave,
    categories: arCategories,
    trendingRecipes: arTrendingRecipes,
    whoWeAre: arWhoWeAre,
    footer: arFooter,
    auth: arAuth,
  },
} as const;
