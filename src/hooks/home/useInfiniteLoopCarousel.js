import { useCallback } from "react";

export function useInfiniteLoopCarousel({ trackRef, itemSelector, itemCount, enabled = true }) {
  const getMetrics = useCallback((container) => {
    if (!enabled || !container || itemCount <= 1) return null;
    const cards = container.querySelectorAll(itemSelector);
    if (cards.length < itemCount * 3) return null;

    const style = window.getComputedStyle(container);
    const paddingLeft = Number.parseFloat(style.paddingLeft || "0") || 0;
    const getPos = (index) => cards[index].offsetLeft - paddingLeft;

    const copyStart0 = getPos(0);
    const copyStart1 = getPos(itemCount);
    const copyStart2 = getPos(itemCount * 2);
    const step = Math.max(1, getPos(1) - copyStart0);
    const segmentWidth = Math.max(1, copyStart1 - copyStart0);

    return { copyStart0, copyStart1, copyStart2, step, segmentWidth };
  }, [enabled, itemCount, itemSelector]);

  const normalizeLoop = useCallback((container = trackRef.current) => {
    if (!enabled || !container || itemCount <= 1) return;
    const metrics = getMetrics(container);
    if (!metrics) return;

    const current = container.scrollLeft;
    const headBoundary = (metrics.copyStart0 + metrics.copyStart1) / 2;
    const tailBoundary = (metrics.copyStart1 + metrics.copyStart2) / 2;

    if (current < headBoundary) {
      container.scrollLeft = current + metrics.segmentWidth;
    } else if (current > tailBoundary) {
      container.scrollLeft = current - metrics.segmentWidth;
    }
  }, [enabled, getMetrics, itemCount, trackRef]);

  const setInitialPosition = useCallback((container = trackRef.current) => {
    if (!enabled || !container || itemCount <= 1) return;
    const metrics = getMetrics(container);
    if (!metrics) return;
    container.scrollLeft = metrics.copyStart1;
  }, [enabled, getMetrics, itemCount, trackRef]);

  const scrollByStep = useCallback((direction) => {
    const container = trackRef.current;
    if (!container) return;
    const metrics = getMetrics(container);
    if (!metrics) return;
    container.scrollBy({ left: direction * metrics.step, behavior: "smooth" });
  }, [getMetrics, trackRef]);

  const getLogicalOffset = useCallback((container = trackRef.current) => {
    const metrics = getMetrics(container);
    if (!metrics || !container) return null;
    let logical = container.scrollLeft - metrics.copyStart1;
    while (logical < 0) logical += metrics.segmentWidth;
    while (logical >= metrics.segmentWidth) logical -= metrics.segmentWidth;
    return { logical, metrics };
  }, [getMetrics, trackRef]);

  return { getMetrics, normalizeLoop, setInitialPosition, scrollByStep, getLogicalOffset };
}
