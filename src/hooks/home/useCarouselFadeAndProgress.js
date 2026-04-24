import { useCallback, useEffect, useState } from "react";

export function useCarouselFadeAndProgress({ trackRef, mode = "plain", getLogicalOffset, showProgress = false }) {
  const [fadeState, setFadeState] = useState({ left: false, right: true });
  const [meter, setMeter] = useState({ width: 1, left: 0 });

  const update = useCallback((container = trackRef.current) => {
    if (!container) return;

    if (mode === "loop" && getLogicalOffset) {
      const loopState = getLogicalOffset(container);
      if (!loopState) {
        setFadeState((prev) => (prev.left || prev.right ? { left: false, right: false } : prev));
        return;
      }
      const { logical, metrics } = loopState;
      const nextLeft = logical > 2;
      const nextRight = logical < metrics.segmentWidth - 2;
      setFadeState((prev) => (prev.left === nextLeft && prev.right === nextRight ? prev : { left: nextLeft, right: nextRight }));
      return;
    }

    const maxScroll = Math.max(1, container.scrollWidth - container.clientWidth);
    const thumbWidth = Math.min(1, container.clientWidth / Math.max(container.scrollWidth, 1));
    const leftRatio = container.scrollLeft / maxScroll;
    const canScroll = container.scrollWidth - container.clientWidth > 2;
    const hasLeft = canScroll && container.scrollLeft > 2;
    const hasRight = canScroll && container.scrollLeft < maxScroll - 2;

    setFadeState((prev) => (prev.left === hasLeft && prev.right === hasRight ? prev : { left: hasLeft, right: hasRight }));

    if (showProgress) {
      const nextMeter = { width: thumbWidth, left: leftRatio * (1 - thumbWidth) };
      setMeter((prev) => {
        if (Math.abs(prev.width - nextMeter.width) < 0.0005 && Math.abs(prev.left - nextMeter.left) < 0.0005) {
          return prev;
        }
        return nextMeter;
      });
    }
  }, [getLogicalOffset, mode, showProgress, trackRef]);

  useEffect(() => {
    update();
    const onResize = () => update();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [update]);

  return { fadeState, meter, update };
}
