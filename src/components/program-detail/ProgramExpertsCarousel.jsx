import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCarouselAutoplay } from "../../hooks/home/useCarouselAutoplay";
import { useDragScroll } from "../../hooks/home/useDragScroll";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export default function ProgramExpertsCarousel({ items }) {
  const trackRef = useRef(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackItems = useMemo(() => (items.length > 1 ? [...items, ...items, ...items] : items), [items]);

  const getLoopMetrics = useCallback((container = trackRef.current) => {
    if (!container || items.length <= 1) return null;
    const cards = container.querySelectorAll(".program-expert-carousel-card");
    if (cards.length < items.length * 3) return null;

    const style = window.getComputedStyle(container);
    const paddingLeft = Number.parseFloat(style.paddingLeft || "0") || 0;
    const getOffset = (index) => cards[index].offsetLeft - paddingLeft;

    const copyStart0 = getOffset(0);
    const copyStart1 = getOffset(items.length);
    const copyStart2 = getOffset(items.length * 2);
    const step = Math.max(1, getOffset(items.length + 1) - copyStart1);
    const segmentWidth = Math.max(1, copyStart2 - copyStart1);

    return { copyStart0, copyStart1, copyStart2, step, segmentWidth };
  }, [items.length]);

  const normalizeLoop = useCallback((container = trackRef.current) => {
    const metrics = getLoopMetrics(container);
    if (!metrics || !container) return;
    const min = (metrics.copyStart0 + metrics.copyStart1) / 2;
    const max = (metrics.copyStart1 + metrics.copyStart2) / 2;

    if (container.scrollLeft < min) container.scrollLeft += metrics.segmentWidth;
    else if (container.scrollLeft >= max) container.scrollLeft -= metrics.segmentWidth;
  }, [getLoopMetrics]);

  const setInitialPosition = useCallback((container = trackRef.current) => {
    const metrics = getLoopMetrics(container);
    if (!metrics || !container) return;
    container.scrollLeft = metrics.copyStart1;
  }, [getLoopMetrics]);

  const scrollByStep = useCallback((direction) => {
    const container = trackRef.current;
    const metrics = getLoopMetrics(container);
    if (!container || !metrics) return;
    normalizeLoop(container);
    container.scrollBy({ left: direction * metrics.step, behavior: "smooth" });
    window.setTimeout(() => normalizeLoop(container), 520);
  }, [getLoopMetrics, normalizeLoop]);

  const handleTrackScroll = useCallback((container) => {
    normalizeLoop(container);
  }, [normalizeLoop]);

  const dragScrollOptions = useMemo(
    () => ({
      onScroll: handleTrackScroll,
      itemSelector: ".program-expert-carousel-card",
      enableSwipeSnap: true,
      swipeThreshold: 22,
      mobileOnlySnap: true,
    }),
    [handleTrackScroll],
  );

  useDragScroll(trackRef, dragScrollOptions);

  useEffect(() => {
    if (items.length <= 1) return undefined;
    const container = trackRef.current;
    if (!container) return undefined;

    const init = () => setInitialPosition(container);
    const raf1 = window.requestAnimationFrame(() => window.requestAnimationFrame(init));
    const timeoutId = window.setTimeout(init, 600);
    const handleResize = () => init();

    window.addEventListener("resize", handleResize);
    return () => {
      window.cancelAnimationFrame(raf1);
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [items.length, setInitialPosition]);

  useCarouselAutoplay({
    enabled: items.length > 1 && !prefersReducedMotion,
    delay: 4200,
    onTick: () => scrollByStep(1),
    trackRef,
    pauseOnHover: true,
    pauseOnPointer: true,
    isPaused: isAutoplayPaused,
  });

  if (items.length === 0) return null;

  return (
    <section className="section program-section program-experts-carousel-section">
      <div className="program-experts-carousel-head">
        <h2>Nos <span>experts</span></h2>
      </div>

      <div className="program-experts-carousel-controls" aria-label="Navigation du carrousel experts">
        <button type="button" aria-label="Expert precedent" onClick={() => scrollByStep(-1)}>←</button>
        <span aria-hidden="true" />
        <button type="button" aria-label="Expert suivant" onClick={() => scrollByStep(1)}>→</button>
        <span aria-hidden="true" />
        <button
          type="button"
          aria-label={isAutoplayPaused ? "Relancer le défilement automatique" : "Mettre en pause le défilement automatique"}
          onClick={() => setIsAutoplayPaused((value) => !value)}
        >
          {isAutoplayPaused ? "▶" : "⏸"}
        </button>
      </div>

      <div className="program-experts-carousel-track-shell">
        <div className="program-experts-carousel-track" ref={trackRef}>
          {trackItems.map((expert, index) => (
            <article
              key={`${expert.id ?? expert.name}-${index}`}
              className="program-expert-carousel-card"
              aria-hidden={items.length > 1 ? index < items.length || index >= items.length * 2 : false}
            >
              <div className="program-expert-carousel-photo-wrap">
                <span aria-hidden="true" />
                {expert.imageUrl ? <img src={expert.imageUrl} alt={expert.name ?? "Expert"} loading="lazy" decoding="async" /> : null}
              </div>
              <div className="program-expert-carousel-name">{expert.name}</div>
              <p className="program-expert-carousel-role">{expert.role}</p>
              {expert.linkedinUrl ? (
                <a
                  href={expert.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Profil LinkedIn de ${expert.name}`}
                  tabIndex={items.length > 1 && (index < items.length || index >= items.length * 2) ? -1 : 0}
                >
                  in
                </a>
              ) : (
                <span className="program-expert-carousel-link-placeholder" aria-hidden="true"> </span>
              )}
              <p className="program-expert-carousel-bio">{expert.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
