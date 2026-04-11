import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronDown, Clock, Dna, ExternalLink, Globe, Landmark, MapPin, Mountain, Waves } from "lucide-react";
import { ancientLakes, ancientLakesDefinition } from "@/data/ancientLakes";
import BackToTopButton from "./BackToTopButton";

const AncientLakesSection = () => {
  return (
    <section id="urgjarved" className="bg-gradient-to-b from-muted/40 to-background py-16 md:py-24">
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
            <Landmark className="mx-auto mb-3 h-10 w-10 text-foreground" aria-hidden="true" />
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {ancientLakesDefinition.title}
            </h2>
            <p className="mx-auto mb-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {ancientLakesDefinition.subtitle}
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
                <h3 className="mb-2 font-display text-xl font-bold text-foreground">Mis on {"\u00FCrgj\u00E4rv"}?</h3>
                <p className="leading-relaxed text-foreground/80">{ancientLakesDefinition.definition}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
            <div className="mb-4 flex items-start gap-3">
              <Globe className="mt-0.5 h-6 w-6 shrink-0 text-lake-mid" />
              <div>
                <h3 className="mb-2 font-display text-xl font-bold text-foreground">Miks on {"\u00FCrgj\u00E4rved"} olulised?</h3>
                <p className="leading-relaxed text-foreground/80">{ancientLakesDefinition.importance}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-foreground">
              <BookOpen className="h-5 w-5 text-lake-mid" />
              Algallikad ja viited
            </h3>
            <ul className="space-y-2">
              {ancientLakesDefinition.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ancientLakes.map((lake, index) => (
            <AncientLakeCard key={lake.name} lake={lake} index={index} />
          ))}
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
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow duration-500 hover:shadow-card-hover"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={lake.imageUrl}
          alt={lake.nameEt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-display text-lg font-bold text-primary-foreground drop-shadow-lg">{lake.nameEt}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-primary-foreground/80">
            <MapPin className="h-3 w-3" />
            {lake.country}
          </p>
        </div>
        <span className="absolute right-2 top-2 rounded-full bg-foreground/40 px-2 py-0.5 text-[10px] font-medium text-primary-foreground/80 backdrop-blur-xs">
          <Clock className="mr-1 inline h-3 w-3" />
          {lake.age}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 border-b border-border p-4">
        <div className="text-center">
          <Waves className="mx-auto mb-1 h-4 w-4 text-lake-mid" />
          <p className="text-xs text-muted-foreground">Pindala</p>
          <p className="text-sm font-semibold text-foreground">{lake.area}</p>
        </div>
        <div className="text-center">
          <Mountain className="mx-auto mb-1 h-4 w-4 text-lake-mid" />
          <p className="text-xs text-muted-foreground">Sügavus</p>
          <p className="text-sm font-semibold text-foreground">{lake.maxDepth}</p>
        </div>
        <div className="text-center">
          <Globe className="mx-auto mb-1 h-4 w-4 text-lake-mid" />
          <p className="text-xs text-muted-foreground">Kõrgus</p>
          <p className="text-sm font-semibold text-foreground">{lake.elevation}</p>
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
          {expanded ? "Peida detailid" : "Ajalugu ja liigid"}
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
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> Lühiajalugu
                </p>
                <p className="text-sm leading-relaxed text-foreground">{lake.history}</p>
              </div>
              <div>
                <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Dna className="h-3.5 w-3.5" /> Endeemilised liigid
                </p>
                <p className="text-sm leading-relaxed text-foreground">{lake.endemicSpecies}</p>
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

export default AncientLakesSection;
