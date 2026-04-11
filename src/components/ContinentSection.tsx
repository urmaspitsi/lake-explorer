import { motion } from "framer-motion";
import type { Continent } from "@/data/lakes";
import BackToTopButton from "./BackToTopButton";
import LakeCard from "./LakeCard";

interface ContinentSectionProps {
  continent: Continent;
  index: number;
}

const ContinentSection = ({ continent, index }: ContinentSectionProps) => {
  const isEven = index % 2 === 0;

  return (
    <section id={continent.name.toLowerCase().replace(/\s/g, "-")} className={`py-16 md:py-24 ${isEven ? "bg-background" : "bg-muted/40"}`}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="text-center">
            <div className="mb-6 flex justify-start">
              <BackToTopButton />
            </div>
            <span className="mb-3 block text-4xl">{continent.emoji}</span>
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {continent.nameEt}
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {continent.description}
            </p>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-lake-mid" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {continent.lakes.map((lake, lakeIndex) => (
            <LakeCard key={lake.name} lake={lake} index={lakeIndex} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContinentSection;
