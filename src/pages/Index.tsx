import HeroSection from "@/components/HeroSection";
import WorldMap from "@/components/WorldMap";
import ContinentSection from "@/components/ContinentSection";
import AncientLakesSection from "@/components/AncientLakesSection";
import SiteFooter from "@/components/SiteFooter";
import { continents } from "@/data/lakes";

const Index = () => (
  <div className="min-h-screen">
    <HeroSection />
    <WorldMap />
    {continents.map((continent, index) => (
      <ContinentSection key={continent.name} continent={continent} index={index} />
    ))}
    <AncientLakesSection />
    <SiteFooter />
  </div>
);

export default Index;
