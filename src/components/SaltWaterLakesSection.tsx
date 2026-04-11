import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronDown, Droplets, ExternalLink, Globe, MapPin, Mountain, Waves } from "lucide-react";
import { saltWaterLakes, saltWaterLakesDefinition } from "@/data/saltWaterLakes";
import BackToTopButton from "./BackToTopButton";

const SaltWaterLakesSection = () => {
  return (
    <section id="salt-water-lakes" className="bg-gradient-to-b from-background to-muted/40 py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center">
            <div className="mb-6 flex justify-start">
              <BackToTopButton />
            </div>
            <span className="mb-3 block text-4xl">ðŸ§‚</span>
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {saltWaterLakesDefinition.title}
            </h2>
            <p className="mx-auto mb-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {saltWaterLakesDefinition.subtitle}
            </p>
            <div className="mx-auto mb-8 mt-2 h-1 w-16 rounded-full bg-lake-mid" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-16 max-w-4xl space-y-6"
        >
          <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
            <div className="mb-4 flex items-start gap-3">
              <BookOpen className="mt-0.5 h-6 w-6 shrink-0 text-lake-mid" />
              <div>
                <h3 className="mb-2 font-display text-xl font-bold text-foreground">Mis on soolajÃ¤rv?</h3>
                <p className="leading-relaxed text-foreground/80">{saltWaterLakesDefinition.definition}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
            <div className="mb-4 flex items-start gap-3">
              <Globe className="mt-0.5 h-6 w-6 shrink-0 text-lake-mid" />
              <div>
                <h3 className="mb-2 font-display text-xl font-bold text-foreground">Miks need jÃ¤rved huvitavad on?</h3>
                <p className="leading-relaxed text-foreground/80">{saltWaterLakesDefinition.importance}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {saltWaterLakes.map((lake, index) => (
            <SaltWaterLakeCard key={lake.name} lake={lake} index={index} />
          ))}
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
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow duration-500 hover:shadow-card-hover"
    >
      <div className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_left,hsl(var(--lake-light)/0.35),transparent_45%),linear-gradient(135deg,hsl(var(--lake-deep))_0%,hsl(var(--lake-mid))_100%)] px-5 py-6">
        <div className="absolute right-3 top-3 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-primary-foreground/85 backdrop-blur-xs">
          {lake.continent}
        </div>
        <div className="max-w-[85%]">
          <h3 className="font-display text-xl font-bold text-primary-foreground">{lake.nameEt}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-primary-foreground/80">
            <MapPin className="h-3.5 w-3.5" />
            {lake.country}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 border-b border-border p-4">
        <div className="text-center">
          <Droplets className="mx-auto mb-1 h-4 w-4 text-lake-mid" />
          <p className="text-xs text-muted-foreground">Soolsus</p>
          <p className="text-sm font-semibold text-foreground">{lake.salinity}</p>
        </div>
        <div className="text-center">
          <Waves className="mx-auto mb-1 h-4 w-4 text-lake-mid" />
          <p className="text-xs text-muted-foreground">Pindala</p>
          <p className="text-sm font-semibold text-foreground">{lake.area}</p>
        </div>
        <div className="text-center">
          <Mountain className="mx-auto mb-1 h-4 w-4 text-lake-mid" />
          <p className="text-xs text-muted-foreground">SÃ¼gavus</p>
          <p className="text-sm font-semibold text-foreground">{lake.maxDepth}</p>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm leading-relaxed text-foreground">{lake.significance}</p>
      </div>

      <div className="px-4 pb-2">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-center gap-1 py-2 text-sm font-medium text-lake-mid transition-colors hover:text-primary"
        >
          {expanded ? "Peida detailid" : "Keemia ja elustik"}
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
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
            <div className="space-y-4 px-4 pb-5">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Keemia</p>
                <p className="text-sm leading-relaxed text-foreground">{lake.chemistry}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ã–koloogia</p>
                <p className="text-sm leading-relaxed text-foreground">{lake.ecology}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">KÃµrgus</p>
                <p className="text-sm leading-relaxed text-foreground">{lake.elevation}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={lake.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  <MapPin className="h-3 w-3" /> Google Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href={lake.wikipediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  Wikipedia
                  <ExternalLink className="h-3 w-3" />
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
