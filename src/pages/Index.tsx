import HeroSection from "@/components/HeroSection";
import WorldMap from "@/components/WorldMap";
import ContinentSection from "@/components/ContinentSection";
import AncientLakesSection from "@/components/AncientLakesSection";
import SaltWaterLakesSection from "@/components/SaltWaterLakesSection";
import SiteFooter from "@/components/SiteFooter";
import { continents } from "@/data/lakes";

const trailingSectionNames = ["Estonia", "Tuva"];
const regularContinents = continents.filter(
  (continent) => !trailingSectionNames.includes(continent.name),
);
const trailingSections = trailingSectionNames
  .map((name) => continents.find((continent) => continent.name === name))
  .filter((continent): continent is (typeof continents)[number] => Boolean(continent));

const Index = () => (
  <div className="min-h-screen">
    <HeroSection />
    <WorldMap />
    {regularContinents.map((continent, index) => (
      <ContinentSection key={continent.name} continent={continent} index={index} />
    ))}
    <AncientLakesSection />
    <SaltWaterLakesSection />
    {trailingSections.map((continent, index) => (
      <ContinentSection
        key={continent.name}
        continent={continent}
        index={regularContinents.length + index}
      />
    ))}
    <SiteFooter />
  </div>
);

export default Index;
