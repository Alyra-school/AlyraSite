import { useEffect, useRef } from "react";

export function useCarouselAutoplay({
  enabled,
  delay = 4000,
  onTick,
  trackRef,
  pauseOnHover = true,
  pauseOnPointer = true,
  pauseOnFocus = true,
  isPaused = false,
  reducedMotionAware = true,
}) {
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);

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

    const handleFocusIn = () => {
      if (pauseOnFocus) pausedRef.current = true;
    };

    const handleFocusOut = () => {
      if (!pauseOnFocus) return;
      const active = document.activeElement;
      if (active && container.contains(active)) return;
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

    if (pauseOnFocus) {
      container.addEventListener("focusin", handleFocusIn);
      container.addEventListener("focusout", handleFocusOut);
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
      if (pauseOnFocus) {
        container.removeEventListener("focusin", handleFocusIn);
        container.removeEventListener("focusout", handleFocusOut);
      }
    };
  }, [enabled, pauseOnHover, pauseOnPointer, pauseOnFocus, trackRef]);

  useEffect(() => {
    if (!reducedMotionAware || typeof window === "undefined" || !window.matchMedia) {
      reducedMotionRef.current = false;
      return undefined;
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      reducedMotionRef.current = media.matches;
    };
    applyPreference();
    media.addEventListener("change", applyPreference);
    return () => media.removeEventListener("change", applyPreference);
  }, [reducedMotionAware]);

  useEffect(() => {
    if (!enabled) return undefined;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      if (isPaused) return;
      if (reducedMotionRef.current) return;
      if (document.visibilityState === "hidden") return;
      onTick();
    }, delay);

    return () => window.clearInterval(id);
  }, [delay, enabled, onTick, isPaused]);

  return { pausedRef };
}
