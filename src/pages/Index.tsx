import HeroSection from "@/components/HeroSection";
import WorldMap from "@/components/WorldMap";
import ContinentSection from "@/components/ContinentSection";
import AncientLakesSection from "@/components/AncientLakesSection";
import SaltWaterLakesSection from "@/components/SaltWaterLakesSection";
import SiteFooter from "@/components/SiteFooter";
import { continents } from "@/data/lakes";

const regularContinents = continents.filter((continent) => continent.name !== "Estonia");
const estoniaSection = continents.find((continent) => continent.name === "Estonia");

const Index = () => (
  <div className="min-h-screen">
    <HeroSection />
    <WorldMap />
    {regularContinents.map((continent, index) => (
      <ContinentSection key={continent.name} continent={continent} index={index} />
    ))}
    <AncientLakesSection />
    <SaltWaterLakesSection />
    {estoniaSection ? (
      <ContinentSection
        key={estoniaSection.name}
        continent={estoniaSection}
        index={regularContinents.length}
      />
    ) : null}
    <SiteFooter />
  </div>
);

export default Index;
