import HeroSection from "../../components/home/HeroSection";
import CookWithWhatYouHave from "../../components/home/CookWithWhatYouHave";
import CategoriesSection from "../../components/home/CategoriesSection";
import TrendingRecipesSection from "../../components/home/TrendingRecipesSection";
import WhoWeAreSection from "../../components/home/WhoWeAreSection";
import SectionDivider from "../../components/layout/SectionDivider";

function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-stone-50 via-orange-50/30 to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      {/* Hero Section */}
      <HeroSection />

      <SectionDivider />

      {/* Cook With What You Have Section */}
      <CookWithWhatYouHave />

      <SectionDivider />

      {/* Categories Section */}
      <CategoriesSection />

      <SectionDivider />

      {/* Trending Recipes Section */}
      <TrendingRecipesSection />

      <SectionDivider />
      
      {/* Who We Are Section */}
      <WhoWeAreSection />
    </div>
  );
}
export default HomePage;
