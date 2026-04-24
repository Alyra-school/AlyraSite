import { useEffect, useRef } from "react";

export function useCarouselAutoplay({
  enabled,
  delay = 4000,
  onTick,
  trackRef,
  pauseOnHover = true,
  pauseOnPointer = true,
}) {
  const pausedRef = useRef(false);

  useEffect(() => {
    const container = trackRef?.current;
    if (!enabled || !container) return undefined;

    const handlePointerDown = () => {
      if (pauseOnPointer) pausedRef.current = true;
    };

    const handlePointerUp = () => {
      pausedRef.current = false;
    };

    const handleMouseEnter = () => {
      if (pauseOnHover) pausedRef.current = true;
    };

    const handleMouseLeave = () => {
      pausedRef.current = false;
    };

    if (pauseOnPointer) {
      container.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("pointerup", handlePointerUp);
    }

    if (pauseOnHover) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (pauseOnPointer) {
        container.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("pointerup", handlePointerUp);
      }
      if (pauseOnHover) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [enabled, pauseOnHover, pauseOnPointer, trackRef]);

  useEffect(() => {
    if (!enabled) return undefined;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      onTick();
    }, delay);

    return () => window.clearInterval(id);
  }, [delay, enabled, onTick]);

  return { pausedRef };
}
