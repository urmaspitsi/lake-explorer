import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ExternalLink, X, Minus, Plus } from "lucide-react";
import { continents } from "@/data/lakes";
import type { Lake } from "@/data/lakes";

const TILE_SIZE = 256;
const MIN_ZOOM = 2;
const MAX_ZOOM = 9;
const WHEEL_ZOOM_STEP = 0.25;
const INITIAL_CENTER = { lat: 20, lng: 10 };
const INITIAL_ZOOM = 2;

const CONTINENT_COLORS: Record<string, string> = {
  Africa: "hsl(30 70% 50%)",
  Asia: "hsl(0 70% 55%)",
  Europe: "hsl(210 70% 50%)",
  Estonia: "hsl(210 80% 60%)",
  "North America": "hsl(150 50% 45%)",
  "South America": "hsl(45 80% 50%)",
  Oceania: "hsl(280 50% 55%)",
  Antarctica: "hsl(195 60% 70%)",
};

type MapLake = Lake & { continent: string };

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const lngToWorldX = (lng: number, zoom: number) => {
  const scale = TILE_SIZE * 2 ** zoom;
  return ((lng + 180) / 360) * scale;
};

const latToWorldY = (lat: number, zoom: number) => {
  const scale = TILE_SIZE * 2 ** zoom;
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const y =
    0.5 -
    Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI);

  return clamp(y * scale, 0, scale);
};

const worldXToLng = (worldX: number, zoom: number) => {
  const scale = TILE_SIZE * 2 ** zoom;
  return (worldX / scale) * 360 - 180;
};

const worldYToLat = (worldY: number, zoom: number) => {
  const scale = TILE_SIZE * 2 ** zoom;
  const y = 0.5 - worldY / scale;
  return (90 - (360 * Math.atan(Math.exp(-y * 2 * Math.PI))) / Math.PI);
};

const getTileUrl = (x: number, y: number, zoom: number) =>
  `https://basemaps.cartocdn.com/rastertiles/voyager/${zoom}/${x}/${y}.png`;

const WorldMap = () => {
  const [selectedLake, setSelectedLake] = useState<MapLake | null>(null);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [viewport, setViewport] = useState({ width: 1200, height: 600 });
  const mapRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startCenterWorldX: number;
    startCenterWorldY: number;
  } | null>(null);

  const allLakes = useMemo(() => {
    return continents.flatMap((c) =>
      c.lakes.map((lake) => ({ ...lake, continent: c.name }))
    );
  }, []);

  useEffect(() => {
    const element = mapRef.current;

    if (!element) {
      return;
    }

    const updateViewport = () => {
      const rect = element.getBoundingClientRect();
      setViewport({ width: rect.width, height: rect.height });
    };

    updateViewport();

    const observer = new ResizeObserver(updateViewport);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = mapRef.current;

    if (!element) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      setFixedCenterZoom(zoom + (event.deltaY < 0 ? WHEEL_ZOOM_STEP : -WHEEL_ZOOM_STEP));
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [zoom, center]);

  const centerWorldX = lngToWorldX(center.lng, zoom);
  const centerWorldY = latToWorldY(center.lat, zoom);
  const halfWidth = viewport.width / 2;
  const halfHeight = viewport.height / 2;
  const tileZoom = Math.floor(zoom);
  const tileScale = 2 ** (zoom - tileZoom);
  const tileCenterWorldX = lngToWorldX(center.lng, tileZoom);
  const tileCenterWorldY = latToWorldY(center.lat, tileZoom);

  const tileBounds = {
    minX: Math.floor((tileCenterWorldX - halfWidth / tileScale) / TILE_SIZE) - 1,
    maxX: Math.floor((tileCenterWorldX + halfWidth / tileScale) / TILE_SIZE) + 1,
    minY: Math.floor((tileCenterWorldY - halfHeight / tileScale) / TILE_SIZE) - 1,
    maxY: Math.floor((tileCenterWorldY + halfHeight / tileScale) / TILE_SIZE) + 1,
  };

  const tiles = [];
  for (let tileX = tileBounds.minX; tileX <= tileBounds.maxX; tileX += 1) {
    for (let tileY = tileBounds.minY; tileY <= tileBounds.maxY; tileY += 1) {
      const wrappedX = ((tileX % (2 ** tileZoom)) + 2 ** tileZoom) % (2 ** tileZoom);
      if (tileY < 0 || tileY >= 2 ** tileZoom) {
        continue;
      }

      tiles.push({
        key: `${tileZoom}-${tileX}-${tileY}`,
        src: getTileUrl(wrappedX, tileY, tileZoom),
        left: (tileX * TILE_SIZE - tileCenterWorldX) * tileScale + halfWidth,
        top: (tileY * TILE_SIZE - tileCenterWorldY) * tileScale + halfHeight,
      });
    }
  }

  const visibleMarkers = allLakes
    .map((lake) => {
      const markerWorldX = lngToWorldX(lake.lng, zoom);
      const markerWorldY = latToWorldY(lake.lat, zoom);
      const x = markerWorldX - centerWorldX + halfWidth;
      const y = markerWorldY - centerWorldY + halfHeight;

      return {
        ...lake,
        x,
        y,
      };
    })
    .filter(
      (lake) =>
        lake.x >= -120 &&
        lake.x <= viewport.width + 120 &&
        lake.y >= -80 &&
        lake.y <= viewport.height + 80,
    );

  const markerRadius = clamp(7.5 - (zoom - 2) * 0.45, 4, 7.5);
  const labelFontSize = clamp(10 + (zoom - 2) * 0.55, 10, 14.5);
  const labelOffsetY = markerRadius + 3;

  const setFixedCenterZoom = (nextZoom: number) => {
    const targetZoom = clamp(Math.round(nextZoom * 100) / 100, MIN_ZOOM, MAX_ZOOM);

    if (targetZoom === zoom) {
      return;
    }

    setZoom(targetZoom);
  };

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
            Tõetruu kaart päris taustakaardiga. Suumi sügavale sisse, lohista kaarti ja kliki järvedel.
          </p>
          <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-lake-mid" />
        </motion.div>

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
          <div
            ref={mapRef}
            className="relative w-full overflow-hidden bg-[#dbeafe] touch-none select-none"
            style={{ aspectRatio: "2 / 1", cursor: dragStateRef.current ? "grabbing" : "grab" }}
            onPointerDown={(event) => {
              event.preventDefault();
              const element = mapRef.current;

              if (!element) {
                return;
              }

              dragStateRef.current = {
                pointerId: event.pointerId,
                startX: event.clientX,
                startY: event.clientY,
                startCenterWorldX: centerWorldX,
                startCenterWorldY: centerWorldY,
              };

              element.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) {
                return;
              }

              const deltaX = event.clientX - dragStateRef.current.startX;
              const deltaY = event.clientY - dragStateRef.current.startY;
              const nextCenterWorldX = dragStateRef.current.startCenterWorldX - deltaX;
              const nextCenterWorldY = dragStateRef.current.startCenterWorldY - deltaY;

              setCenter({
                lng: worldXToLng(nextCenterWorldX, zoom),
                lat: clamp(worldYToLat(nextCenterWorldY, zoom), -85, 85),
              });
            }}
            onPointerUp={(event) => {
              if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) {
                return;
              }

              mapRef.current?.releasePointerCapture(event.pointerId);
              dragStateRef.current = null;
            }}
            onPointerLeave={(event) => {
              if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) {
                return;
              }

              mapRef.current?.releasePointerCapture(event.pointerId);
              dragStateRef.current = null;
            }}
          >
            <div className="absolute right-3 top-3 z-30 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setFixedCenterZoom(zoom + 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-sm backdrop-blur hover:bg-card"
                aria-label="Suurenda"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setFixedCenterZoom(zoom - 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-sm backdrop-blur hover:bg-card"
                aria-label="Vähenda"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute left-3 top-3 z-30 rounded-full border border-border bg-card/95 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              Suum {zoom.toFixed(2)}x
            </div>

            <div className="absolute bottom-2 right-2 z-30 rounded-md bg-card/90 px-2 py-1 text-[10px] text-muted-foreground shadow-sm backdrop-blur">
              Map tiles © OpenStreetMap contributors, CARTO
            </div>

            <div className="absolute inset-0">
              {tiles.map((tile) => (
                <img
                  key={tile.key}
                  src={tile.src}
                  alt=""
                  draggable={false}
                  className="absolute max-w-none"
                  style={{
                    left: tile.left,
                    top: tile.top,
                    width: TILE_SIZE * tileScale,
                    height: TILE_SIZE * tileScale,
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 z-20">
              {visibleMarkers.map((lake) => (
                <button
                  key={`${lake.continent}-${lake.name}`}
                  type="button"
                  onClick={() => setSelectedLake(lake)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 bg-transparent text-left"
                  style={{ left: lake.x, top: lake.y }}
                >
                  <div className="relative">
                    <div
                      className="rounded-full border-2 border-white shadow-lg transition-transform group-hover:scale-110"
                      style={{
                        width: markerRadius * 2,
                        height: markerRadius * 2,
                        backgroundColor: CONTINENT_COLORS[lake.continent],
                        boxShadow:
                          selectedLake?.name === lake.name
                            ? `0 0 0 6px color-mix(in srgb, ${CONTINENT_COLORS[lake.continent]} 22%, transparent)`
                            : undefined,
                      }}
                    />
                    <div
                      className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 font-semibold text-slate-900"
                      style={{
                        bottom: labelOffsetY,
                        fontSize: labelFontSize,
                        lineHeight: 1.1,
                      }}
                    >
                      {lake.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <AnimatePresence>
              {selectedLake && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-4 right-4 z-40 bg-card/95 backdrop-blur-md rounded-xl shadow-lg border border-border p-4 md:left-auto md:right-4 md:w-96"
                >
                  <button
                    type="button"
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

                  <div className="flex flex-wrap gap-2 mt-3">
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
      </div>
    </section>
  );
};

export default WorldMap;
