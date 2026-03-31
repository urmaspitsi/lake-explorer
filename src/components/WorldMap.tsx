import { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ExternalLink, X } from "lucide-react";
import { continents } from "@/data/lakes";
import type { Lake } from "@/data/lakes";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CONTINENT_COLORS: Record<string, string> = {
  Africa: "hsl(30 70% 50%)",
  Asia: "hsl(0 70% 55%)",
  Europe: "hsl(210 70% 50%)",
  "North America": "hsl(150 50% 45%)",
  "South America": "hsl(45 80% 50%)",
  Oceania: "hsl(280 50% 55%)",
  Antarctica: "hsl(195 60% 70%)",
};

const WorldMap = () => {
  const [selectedLake, setSelectedLake] = useState<(Lake & { continent: string }) | null>(null);

  const allLakes = useMemo(() => {
    return continents.flatMap((c) =>
      c.lakes.map((lake) => ({ ...lake, continent: c.name }))
    );
  }, []);

  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-4xl mb-3 block">🗺️</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Interaktiivne kaart
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Kliki markeritel, et näha infot iga järve kohta
          </p>
          <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-lake-mid" />
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {continents.map((c) => (
            <div key={c.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: CONTINENT_COLORS[c.name] }}
              />
              {c.nameEt}
            </div>
          ))}
        </div>

        <div className="relative rounded-xl overflow-hidden bg-card shadow-card border border-border">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 130, center: [10, 20] }}
            className="w-full"
            style={{ aspectRatio: "2 / 1" }}
          >
            <ZoomableGroup>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rpiProperties?.name || geo.id}
                      geography={geo}
                      fill="hsl(200 15% 88%)"
                      stroke="hsl(200 15% 80%)"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "hsl(200 15% 82%)", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {allLakes.map((lake) => (
                <Marker
                  key={lake.name}
                  coordinates={[lake.lng, lake.lat]}
                  onClick={() => setSelectedLake(lake)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    r={4}
                    fill={CONTINENT_COLORS[lake.continent]}
                    stroke="white"
                    strokeWidth={1.5}
                    className="transition-all duration-200"
                    onMouseEnter={(e) => {
                      (e.target as SVGCircleElement).setAttribute("r", "6");
                    }}
                    onMouseLeave={(e) => {
                      (e.target as SVGCircleElement).setAttribute("r", "4");
                    }}
                  />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>

          {/* Info popup */}
          <AnimatePresence>
            {selectedLake && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-card/95 backdrop-blur-md rounded-xl shadow-lg border border-border p-4"
              >
                <button
                  onClick={() => setSelectedLake(null)}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>

                <div className="flex gap-3">
                  <img
                    src={selectedLake.imageUrl}
                    alt={selectedLake.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-foreground text-lg leading-tight">
                      {selectedLake.name}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {selectedLake.country}
                    </p>
                    <div className="flex gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span>{selectedLake.area}</span>
                      <span>↕ {selectedLake.maxDepth}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-foreground mt-3 leading-relaxed line-clamp-2">
                  {selectedLake.significance}
                </p>

                <div className="flex gap-2 mt-3">
                  <a
                    href={selectedLake.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <MapPin className="w-3 h-3" /> Google Maps
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={selectedLake.wikipediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    📖 Wikipedia
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default WorldMap;
