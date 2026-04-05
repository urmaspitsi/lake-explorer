import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { continents } from "@/data/lakes";

const regularContinents = continents.filter((continent) => continent.name !== "Estonia");
const estoniaSection = continents.find((continent) => continent.name === "Estonia");

const HeroSection = () => {
  const totalLakes = continents.reduce((sum, c) => sum + c.lakes.length, 0);
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Animated water layers */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-lake-deep/40 to-transparent" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-24 opacity-20"
          style={{
            background: "repeating-linear-gradient(90deg, transparent, transparent 40px, hsl(195 55% 70% / 0.3) 40px, hsl(195 55% 70% / 0.3) 80px)",
          }}
          animate={{ x: [0, 80] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lake-light/80 font-body text-sm md:text-base uppercase tracking-[0.3em] mb-6">
            Maailma vete entsüklopeedia
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-[1.1] mb-6">
            Maakera <br />
            <span className="italic text-lake-light">Järved</span>
          </h1>
          <p className="text-lake-surface/80 font-body text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Avasta {totalLakes} märkimisväärset järve kogu maailmast ja Eestist – nende sügavused,
            ökosüsteemid ja saladused.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {regularContinents.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => scrollToSection(c.name.toLowerCase().replace(/\s/g, "-"))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-primary-foreground/10 text-primary-foreground/90 hover:bg-primary-foreground/20 backdrop-blur-sm transition-colors border border-primary-foreground/10"
            >
              {c.emoji} {c.nameEt}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollToSection("urgjarved")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-primary-foreground/10 text-primary-foreground/90 hover:bg-primary-foreground/20 backdrop-blur-sm transition-colors border border-primary-foreground/10"
          >
            🏛️ Ürgjärved
          </button>
          {estoniaSection ? (
            <button
              type="button"
              onClick={() => scrollToSection(estoniaSection.name.toLowerCase().replace(/\s/g, "-"))}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-primary-foreground/10 text-primary-foreground/90 hover:bg-primary-foreground/20 backdrop-blur-sm transition-colors border border-primary-foreground/10"
            >
              {estoniaSection.emoji} {estoniaSection.nameEt}
            </button>
          ) : null}
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button
            type="button"
            onClick={() => scrollToSection("africa")}
            className="inline-block"
          >
            <ChevronDown className="w-8 h-8 text-lake-light/60" />
          </button>
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;
