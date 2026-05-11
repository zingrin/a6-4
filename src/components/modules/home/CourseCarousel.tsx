"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseCarousel({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector("div")?.offsetWidth ?? 320;
    trackRef.current.scrollBy({ left: dir === "right" ? cardWidth + 32 : -(cardWidth + 32), behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Prev */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("left")}
        className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md bg-background hover:bg-muted border hidden md:flex"
        aria-label="Previous"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-8 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      {/* Next */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("right")}
        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md bg-background hover:bg-muted border hidden md:flex"
        aria-label="Next"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
