"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 40;

export type CarouselImage = {
  src: string;
  alt: string;
};

export default function ImageCarousel({
  images,
  variant = "hero",
  aspectClassName = "aspect-[4/3]",
}: {
  images: CarouselImage[];
  variant?: "card" | "hero";
  aspectClassName?: string;
}) {
  const [index, setIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const showControls = images.length > 1;

  useEffect(() => {
    if (variant !== "hero" || !showControls) return;

    function handlePointerDown(event: PointerEvent) {
      setIsActive(!!wrapperRef.current?.contains(event.target as Node));
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [variant, showControls]);

  useEffect(() => {
    if (variant !== "hero" || !showControls) return;

    function handleKeyDown(event: KeyboardEvent) {
      const hasFocus = !!wrapperRef.current?.contains(document.activeElement);
      if (!hasFocus && !isActive) return;

      if (event.key === "ArrowLeft") {
        setIndex((current) => (current - 1 + images.length) % images.length);
      } else if (event.key === "ArrowRight") {
        setIndex((current) => (current + 1) % images.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [variant, showControls, images.length, isActive]);

  if (images.length === 0) return null;

  function goTo(delta: number) {
    setIndex((current) => (current + delta + images.length) % images.length);
  }

  function go(delta: number, event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    goTo(delta);
  }

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null || !showControls) return;
    const deltaX = touchStartX.current - event.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    goTo(deltaX > 0 ? 1 : -1);
  }

  const arrowTextSize = variant === "card" ? "text-sm" : "text-xl";

  return (
    <div ref={wrapperRef}>
      <div
        ref={containerRef}
        role={variant === "hero" ? "group" : undefined}
        aria-roledescription={variant === "hero" ? "carousel" : undefined}
        onTouchStart={showControls ? handleTouchStart : undefined}
        onTouchEnd={showControls ? handleTouchEnd : undefined}
        className={`group/carousel relative w-full touch-pan-y overflow-hidden bg-background ${
          variant === "hero" ? "h-[45vh] sm:h-[55vh] lg:h-[65vh]" : aspectClassName
        }`}
      >
        {images.map((image, i) => (
          <Image
            key={i}
            src={image.src}
            alt={image.alt}
            fill
            priority={i === 0}
            sizes={variant === "hero" ? "(min-width: 1024px) 1100px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
            className={`transition-all duration-700 ease-out ${variant === "hero" ? "object-contain" : "object-cover"} ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            } ${variant === "card" ? "group-hover:scale-[1.05]" : ""}`}
          />
        ))}

        {showControls && variant === "card" ? (
          <>
            <button
              type="button"
              aria-label="Image précédente"
              onClick={(event) => go(-1, event)}
              className={`absolute left-0 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center px-2 py-3 font-mono ${arrowTextSize} text-white mix-blend-difference transition duration-300 opacity-100 pointer-fine:opacity-0 pointer-fine:group-hover/carousel:opacity-100`}
            >
              &lt;
            </button>
            <button
              type="button"
              aria-label="Image suivante"
              onClick={(event) => go(1, event)}
              className={`absolute right-0 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center px-2 py-3 font-mono ${arrowTextSize} text-white mix-blend-difference transition duration-300 opacity-100 pointer-fine:opacity-0 pointer-fine:group-hover/carousel:opacity-100`}
            >
              &gt;
            </button>
          </>
        ) : null}
      </div>

      {showControls && variant === "hero" ? (
        <div className="mt-4 flex items-center justify-center gap-6 font-mono text-[11px] tracking-[0.15em] text-foreground">
          <button
            type="button"
            aria-label="Image précédente"
            onClick={(event) => go(-1, event)}
            className="flex cursor-pointer items-center justify-center p-1 transition hover:text-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <span role="status" aria-live="polite">
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            aria-label="Image suivante"
            onClick={(event) => go(1, event)}
            className="flex cursor-pointer items-center justify-center p-1 transition hover:text-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
