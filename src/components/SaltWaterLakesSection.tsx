import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronDown, Droplets, ExternalLink, Globe, MapPin, Mountain, Waves } from "lucide-react";
import { saltWaterLakes, saltWaterLakesDefinition } from "@/data/saltWaterLakes";

const SaltWaterLakesSection = () => {
  const scrollToHero = () => {
    const hero = document.getElementById("hero");

    if (!hero) {
      return;
    }

    hero.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="salt-water-lakes" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/40">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-4xl mb-3 block">🧂</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {saltWaterLakesDefinition.title}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-6">
            {saltWaterLakesDefinition.subtitle}
          </p>
          <div className="mt-2 h-1 w-16 mx-auto rounded-full bg-lake-mid mb-8" />
        </motion.div>

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
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Mis on soolajärv?</h3>
                <p className="text-foreground/80 leading-relaxed">{saltWaterLakesDefinition.definition}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-card">
            <div className="flex items-start gap-3 mb-4">
              <Globe className="w-6 h-6 text-lake-mid shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Miks need järved huvitavad on?</h3>
                <p className="text-foreground/80 leading-relaxed">{saltWaterLakesDefinition.importance}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saltWaterLakes.map((lake, index) => (
            <SaltWaterLakeCard key={lake.name} lake={lake} index={index} />
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

interface SaltWaterLakeCardProps {
  lake: (typeof saltWaterLakes)[0];
  index: number;
}

const SaltWaterLakeCard = ({ lake, index }: SaltWaterLakeCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-card-hover transition-shadow duration-500 border border-border"
    >
      <div className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_left,hsl(var(--lake-light)/0.35),transparent_45%),linear-gradient(135deg,hsl(var(--lake-deep))_0%,hsl(var(--lake-mid))_100%)] px-5 py-6">
        <div className="absolute right-3 top-3 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-primary-foreground/85 backdrop-blur-sm">
          {lake.continent}
        </div>
        <div className="max-w-[85%]">
          <h3 className="font-display text-xl font-bold text-primary-foreground">{lake.nameEt}</h3>
          <p className="mt-1 text-sm text-primary-foreground/80 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {lake.country}
          </p>
        </div>
      </div>

      <div className="p-4 grid grid-cols-3 gap-3 border-b border-border">
        <div className="text-center">
          <Droplets className="w-4 h-4 mx-auto text-lake-mid mb-1" />
          <p className="text-xs text-muted-foreground">Soolsus</p>
          <p className="text-sm font-semibold text-foreground">{lake.salinity}</p>
        </div>
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
      </div>

      <div className="p-4">
        <p className="text-sm text-foreground leading-relaxed">{lake.significance}</p>
      </div>

      <div className="px-4 pb-2">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 text-sm font-medium text-lake-mid hover:text-primary transition-colors py-2"
        >
          {expanded ? "Peida detailid" : "Keemia ja elustik"}
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
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Keemia</p>
                <p className="text-sm text-foreground leading-relaxed">{lake.chemistry}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Ökoloogia</p>
                <p className="text-sm text-foreground leading-relaxed">{lake.ecology}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Kõrgus</p>
                <p className="text-sm text-foreground leading-relaxed">{lake.elevation}</p>
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
                  Wikipedia
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

export default SaltWaterLakesSection;
