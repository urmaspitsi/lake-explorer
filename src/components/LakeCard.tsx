import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Waves, Thermometer, Fish, Leaf, Droplets, Mountain, ExternalLink, ChevronDown, Navigation } from "lucide-react";
import type { Lake } from "@/data/lakes";

interface LakeCardProps {
  lake: Lake;
  index: number;
}

const LakeCard = ({ lake, index }: LakeCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-card-hover transition-shadow duration-500"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={lake.imageUrl}
          alt={lake.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-display text-xl font-bold text-primary-foreground drop-shadow-lg">{lake.name}</h3>
          <p className="text-primary-foreground/80 text-sm flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
            {lake.country}
          </p>
        </div>
        {lake.imageCredit && (
          <span className="absolute top-2 right-2 text-[10px] text-primary-foreground/50 bg-foreground/30 px-1.5 py-0.5 rounded">
            📷 {lake.imageCredit}
          </span>
        )}
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
          <Thermometer className="w-4 h-4 mx-auto text-lake-mid mb-1" />
          <p className="text-xs text-muted-foreground">Temp.</p>
          <p className="text-sm font-semibold text-foreground">{lake.temperature.split(",")[0].replace("Pinnavee temp. ", "").replace("Õhutemp. ", "").replace("Vee temp. ", "")}</p>
        </div>
      </div>

      {/* Significance */}
      <div className="p-4">
        <p className="text-sm text-foreground leading-relaxed">{lake.significance}</p>
      </div>

      {/* Expandable Details */}
      <div className="px-4 pb-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 text-sm font-medium text-lake-mid hover:text-primary transition-colors py-2"
        >
          {expanded ? "Peida detailid" : "Vaata detaile"}
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
            <div className="px-4 pb-5 space-y-3">
              {lake.elevation && (
                <DetailRow icon={<Mountain className="w-4 h-4" />} label="Kõrgus merepinnast" value={lake.elevation} />
              )}
              {lake.avgDepth && (
                <DetailRow icon={<Waves className="w-4 h-4" />} label="Keskmine sügavus" value={lake.avgDepth} />
              )}
              <DetailRow icon={<Droplets className="w-4 h-4" />} label="Vee kvaliteet" value={lake.waterQuality} />
              <DetailRow icon={<Fish className="w-4 h-4" />} label="Fauna" value={lake.fauna} />
              <DetailRow icon={<Leaf className="w-4 h-4" />} label="Taimestik" value={lake.flora} />
              <DetailRow icon={<Navigation className="w-4 h-4" />} label="Ligipääs" value={lake.access} />

              {/* Links */}
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

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex gap-2.5">
    <span className="text-lake-mid mt-0.5 shrink-0">{icon}</span>
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-sm text-foreground leading-relaxed">{value}</p>
    </div>
  </div>
);

export default LakeCard;
