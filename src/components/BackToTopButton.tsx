import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackToTopButtonProps {
  className?: string;
}

const BackToTopButton = ({ className }: BackToTopButtonProps) => {
  const scrollToHero = () => {
    const hero = document.getElementById("hero");

    if (!hero) {
      return;
    }

    hero.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      onClick={scrollToHero}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-lake-mid/30 bg-lake-mid/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-lake-mid/20",
        className,
      )}
    >
      <ArrowUp className="h-4 w-4" />
      Tagasi üles
    </button>
  );
};

export default BackToTopButton;
