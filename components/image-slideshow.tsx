"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 40;

export type SlideshowSlide = {
  src: string;
  alt: string;
  title: string;
  href: string;
};

export default function ImageSlideshow({
  slides,
  intervalMs = 20000,
}: {
  slides: SlideshowSlide[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const showControls = slides.length > 1;

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  useEffect(() => {
    if (!showControls) return;

    function handlePointerDown(event: PointerEvent) {
      setIsActive(!!wrapperRef.current?.contains(event.target as Node));
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [showControls]);

  useEffect(() => {
    if (!showControls) return;

    function handleKeyDown(event: KeyboardEvent) {
      const hasFocus = !!wrapperRef.current?.contains(document.activeElement);
      if (!hasFocus && !isActive) return;

      if (event.key === "ArrowLeft") {
        setIndex((current) => (current - 1 + slides.length) % slides.length);
      } else if (event.key === "ArrowRight") {
        setIndex((current) => (current + 1) % slides.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showControls, slides.length, isActive]);

  if (slides.length === 0) return null;

  const current = slides[index];

  function goTo(delta: number) {
    setIndex((current) => (current + delta + slides.length) % slides.length);
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

  return (
    <div ref={wrapperRef} className="flex flex-1 flex-col width:100%">
      <div
        ref={containerRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Diaporama d'accueil"
        onTouchStart={showControls ? handleTouchStart : undefined}
        onTouchEnd={showControls ? handleTouchEnd : undefined}
        className="group/carousel relative aspect-[4/5] w-full touch-pan-y overflow-hidden bg-background lg:aspect-[16/9]"
      >
        {slides.map((slide, i) => (
          <Image
            key={i}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

      </div>

      {showControls ? (
        <div className="mt-4 flex items-center justify-center gap-6 font-mono text-[11px] tracking-[0.15em] text-foreground">
          <button
            type="button"
            aria-label="Image précédente"
            onClick={() => goTo(-1)}
            className="flex cursor-pointer items-center justify-center p-1 transition hover:text-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <span role="status" aria-live="polite">
            {index + 1} / {slides.length}
          </span>
          <button
            type="button"
            aria-label="Image suivante"
            onClick={() => goTo(1)}
            className="flex cursor-pointer items-center justify-center p-1 transition hover:text-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      ) : null}

      <Link
        href={current.href}
        className="group mt-6 inline-flex items-center gap-2 self-center font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition hover:text-accent"
      >
        {current.title}
        <span className="transition group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}
