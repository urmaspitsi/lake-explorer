import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Map, MapPin, Minus, Plus, X } from "lucide-react";
import { continents } from "@/data/lakes";
import type { Lake } from "@/data/lakes";
import BackToTopButton from "./BackToTopButton";

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
  Tuva: "hsl(18 80% 52%)",
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
  const y = 0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI);

  return clamp(y * scale, 0, scale);
};

const worldXToLng = (worldX: number, zoom: number) => {
  const scale = TILE_SIZE * 2 ** zoom;
  return (worldX / scale) * 360 - 180;
};

const worldYToLat = (worldY: number, zoom: number) => {
  const scale = TILE_SIZE * 2 ** zoom;
  const y = 0.5 - worldY / scale;
  return 90 - (360 * Math.atan(Math.exp(-y * 2 * Math.PI))) / Math.PI;
};

const getTileUrl = (x: number, y: number, zoom: number) =>
  `https://basemaps.cartocdn.com/rastertiles/voyager/${zoom}/${x}/${y}.png`;

const WorldMap = () => {
  const [selectedLake, setSelectedLake] = useState<MapLake | null>(null);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [viewport, setViewport] = useState({ width: 1200, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startCenterWorldX: number;
    startCenterWorldY: number;
  } | null>(null);

  const allLakes = useMemo(() => {
    return continents.flatMap((continent) =>
      continent.lakes.map((lake) => ({ ...lake, continent: continent.name })),
    );
  }, []);

  const setFixedCenterZoom = useCallback((nextZoom: number) => {
    setZoom((currentZoom) => {
      const targetZoom = clamp(Math.round(nextZoom * 100) / 100, MIN_ZOOM, MAX_ZOOM);
      return targetZoom === currentZoom ? currentZoom : targetZoom;
    });
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
  }, [setFixedCenterZoom, zoom]);

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

  return (
    <section className="bg-muted/40 py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="text-center">
            <div className="mb-6 flex justify-start">
              <BackToTopButton />
            </div>
            <Map className="mx-auto mb-3 h-10 w-10 text-foreground" aria-hidden="true" />
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Interaktiivne kaart
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Tõetruu kaart päris taustakaardiga. Suumi sügavale sisse, lohista kaarti ja kliki järvedel.
            </p>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-lake-mid" />
          </div>
        </motion.div>

        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {continents.map((continent) => (
            <div key={continent.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: CONTINENT_COLORS[continent.name] }}
              />
              {continent.nameEt}
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-card">
          <div
            ref={mapRef}
            className="relative w-full touch-none select-none overflow-hidden bg-[#dbeafe]"
            style={{ aspectRatio: "2 / 1", cursor: isDragging ? "grabbing" : "grab" }}
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

              setIsDragging(true);
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
              setIsDragging(false);
            }}
            onPointerLeave={(event) => {
              if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) {
                return;
              }

              mapRef.current?.releasePointerCapture(event.pointerId);
              dragStateRef.current = null;
              setIsDragging(false);
            }}
            onPointerCancel={(event) => {
              if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) {
                return;
              }

              mapRef.current?.releasePointerCapture(event.pointerId);
              dragStateRef.current = null;
              setIsDragging(false);
            }}
          >
            <div className="absolute right-3 top-3 z-30 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setFixedCenterZoom(zoom + 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-xs backdrop-blur-sm hover:bg-card"
                aria-label="Suurenda"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setFixedCenterZoom(zoom - 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-xs backdrop-blur-sm hover:bg-card"
                aria-label="Vähenda"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute left-3 top-3 z-30 rounded-full border border-border bg-card/95 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur-sm">
              Suum {zoom.toFixed(2)}x
            </div>

            <div className="absolute bottom-2 right-2 z-30 rounded-md bg-card/90 px-2 py-1 text-[10px] text-muted-foreground shadow-xs backdrop-blur-sm">
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
                  className="absolute bottom-4 left-4 right-4 z-40 rounded-xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur-md md:left-auto md:right-4 md:w-96"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedLake(null)}
                    className="absolute right-2 top-2 rounded-full p-1 transition-colors hover:bg-muted"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>

                  <div className="flex gap-3">
                    <img
                      src={selectedLake.imageUrl}
                      alt={selectedLake.name}
                      className="h-20 w-20 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-bold leading-tight text-foreground">
                        {selectedLake.name}
                      </h3>
                      <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {selectedLake.country}
                      </p>
                      <div className="mt-1.5 flex gap-3 text-xs text-muted-foreground">
                        <span>{selectedLake.area}</span>
                        <span>↕ {selectedLake.maxDepth}</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-foreground">
                    {selectedLake.significance}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={selectedLake.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                    >
                      <MapPin className="h-3 w-3" /> Google Maps
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href={selectedLake.wikipediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                    >
                      Wikipedia
                      <ExternalLink className="h-3 w-3" />
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
