import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mountain, Waves, Clock, ExternalLink, ChevronDown, BookOpen, Dna, Globe } from "lucide-react";
import { ancientLakes, ancientLakesDefinition } from "@/data/ancientLakes";

const AncientLakesSection = () => {
  const scrollToHero = () => {
    const hero = document.getElementById("hero");

    if (!hero) {
      return;
    }

    hero.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="urgjarved" className="py-16 md:py-24 bg-gradient-to-b from-muted/40 to-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-4xl mb-3 block">🏛️</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {ancientLakesDefinition.title}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-6">
            {ancientLakesDefinition.subtitle}
          </p>
          <div className="mt-2 h-1 w-16 mx-auto rounded-full bg-lake-mid mb-8" />
        </motion.div>

        {/* Definition & History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-16 space-y-6"
        >
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-card">
            <div className="flex items-start gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-lake-mid shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Mis on ürgjärv?</h3>
                <p className="text-foreground/80 leading-relaxed">{ancientLakesDefinition.definition}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-card">
            <div className="flex items-start gap-3 mb-4">
              <Globe className="w-6 h-6 text-lake-mid shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Miks on ürgjärved olulised?</h3>
                <p className="text-foreground/80 leading-relaxed">{ancientLakesDefinition.importance}</p>
              </div>
            </div>
          </div>

          {/* Sources */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-card">
            <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-lake-mid" />
              Algallikad ja viited
            </h3>
            <ul className="space-y-2">
              {ancientLakesDefinition.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Lakes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ancientLakes.map((lake, index) => (
            <AncientLakeCard key={lake.name} lake={lake} index={index} />
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

interface AncientLakeCardProps {
  lake: (typeof ancientLakes)[0];
  index: number;
}

const AncientLakeCard = ({ lake, index }: AncientLakeCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-card-hover transition-shadow duration-500 border border-border"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={lake.imageUrl}
          alt={lake.nameEt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-display text-lg font-bold text-primary-foreground drop-shadow-lg">{lake.nameEt}</h3>
          <p className="text-primary-foreground/80 text-xs flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" />
            {lake.country}
          </p>
        </div>
        <span className="absolute top-2 right-2 text-[10px] text-primary-foreground/80 bg-foreground/40 px-2 py-0.5 rounded-full font-medium backdrop-blur-sm">
          <Clock className="w-3 h-3 inline mr-1" />
          {lake.age}
        </span>
      </div>

      {/* Quick Stats */}
      <div className="p-4 grid grid-cols-3 gap-3 border-b border-border">
        <div className="text-center">
          <Waves className="w-4 h-4 mx-auto text-lake-mid mb-1" />
          <p className="text-xs text-muted-foreground">Pindala</p>
          <p className="text-sm font-semibold text-foreground">{lake.area}</p>
        </div>
        <div className="text-center">
          <Mountain className="w-4 h-4 mx-auto text-lake-mid mb-1" />
          <p className="text-xs text-muted-foreground">Sügavus</p>
          <p className="text-sm font-semibold text-foreground">{lake.maxDepth}</p>
        </div>
        <div className="text-center">
          <Globe className="w-4 h-4 mx-auto text-lake-mid mb-1" />
          <p className="text-xs text-muted-foreground">Kõrgus</p>
          <p className="text-sm font-semibold text-foreground">{lake.elevation}</p>
        </div>
      </div>

      {/* Significance */}
      <div className="p-4">
        <p className="text-sm text-foreground leading-relaxed">{lake.significance}</p>
      </div>

      {/* Expand */}
      <div className="px-4 pb-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 text-sm font-medium text-lake-mid hover:text-primary transition-colors py-2"
        >
          {expanded ? "Peida detailid" : "Ajalugu ja liigid"}
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5" /> Lühiajalugu
                </p>
                <p className="text-sm text-foreground leading-relaxed">{lake.history}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5 mb-1">
                  <Dna className="w-3.5 h-3.5" /> Endeemilised liigid
                </p>
                <p className="text-sm text-foreground leading-relaxed">{lake.endemicSpecies}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={lake.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <MapPin className="w-3 h-3" /> Google Maps
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={lake.wikipediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                >
                  📖 Wikipedia
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default AncientLakesSection;
