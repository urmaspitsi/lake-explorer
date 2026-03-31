import { Waves } from "lucide-react";

const SiteFooter = () => (
  <footer className="bg-foreground py-12">
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-center">
      <Waves className="w-8 h-8 mx-auto text-lake-light mb-4" />
      <h3 className="font-display text-xl text-primary-foreground mb-2">Maakera Järved</h3>
      <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
        Kõik andmed pärinevad avalikest allikatest. Fotode autorid on märgitud iga pildi juures.
        Viited: Wikipedia, NASA Earth Observatory, Wikimedia Commons.
      </p>
      <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
        <a href="https://en.wikipedia.org/wiki/List_of_lakes_by_area" target="_blank" rel="noopener noreferrer" className="hover:text-lake-light transition-colors">
          Wikipedia: Järvede loend
        </a>
        <span>•</span>
        <a href="https://earthobservatory.nasa.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-lake-light transition-colors">
          NASA Earth Observatory
        </a>
        <span>•</span>
        <a href="https://www.worldlakes.org/" target="_blank" rel="noopener noreferrer" className="hover:text-lake-light transition-colors">
          World Lakes Database
        </a>
      </div>
      <p className="text-muted-foreground/50 text-xs mt-8">© 2026 Maakera Järved. Loodud hariduslikel eesmärkidel.</p>
    </div>
  </footer>
);

export default SiteFooter;
