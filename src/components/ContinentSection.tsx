import { motion } from "framer-motion";
import type { Continent } from "@/data/lakes";
import LakeCard from "./LakeCard";

interface ContinentSectionProps {
  continent: Continent;
  index: number;
}

const ContinentSection = ({ continent, index }: ContinentSectionProps) => {
  const isEven = index % 2 === 0;
  const scrollToHero = () => {
    const hero = document.getElementById("hero");

    if (!hero) {
      return;
    }

    hero.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id={continent.name.toLowerCase().replace(/\s/g, "-")} className={`py-16 md:py-24 ${isEven ? "bg-background" : "bg-muted/40"}`}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-4xl mb-3 block">{continent.emoji}</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {continent.nameEt}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {continent.description}
          </p>
          <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-lake-mid" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {continent.lakes.map((lake, lakeIndex) => (
            <LakeCard key={lake.name} lake={lake} index={lakeIndex} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={scrollToHero}
            className="inline-flex items-center gap-2 rounded-full border border-lake-mid/30 bg-lake-mid/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-lake-mid/20"
          >
            ↑ Tagasi üles
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContinentSection;
