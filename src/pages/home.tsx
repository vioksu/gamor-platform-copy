import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import TrendingCategories from "../components/TrendingCategories"
import { CategoryStore } from "../store/categoryStore";

export default function Home() {
  const trendingCategories = CategoryStore.useState(c => c.trendingCategories)

  return (
    <div className="home">
      <Navigation></Navigation>
      <Hero />
      <TrendingCategories trendingCategories={trendingCategories} />
    </div>
  );
}
