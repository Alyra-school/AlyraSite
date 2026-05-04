import { useCallback, useEffect, useMemo, useRef } from "react";
import { useCarouselAutoplay } from "../../hooks/home/useCarouselAutoplay";
import { useDragScroll } from "../../hooks/home/useDragScroll";
import { useInfiniteLoopCarousel } from "../../hooks/home/useInfiniteLoopCarousel";
import { useCarouselFadeAndProgress } from "../../hooks/home/useCarouselFadeAndProgress";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export default function ProgramExpertsCarousel({ items }) {
  const trackRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackItems = useMemo(() => (items.length > 1 ? [...items, ...items, ...items] : items), [items]);

  const { getLogicalOffset, normalizeLoop, setInitialPosition, scrollByStep } = useInfiniteLoopCarousel({
    trackRef,
    itemSelector: ".program-expert-carousel-card",
    itemCount: items.length,
    enabled: items.length > 1,
  });

  const { fadeState, update } = useCarouselFadeAndProgress({
    trackRef,
    mode: "loop",
    getLogicalOffset,
  });

  const handleTrackScroll = useCallback((container) => {
    normalizeLoop(container);
    update(container);
  }, [normalizeLoop, update]);

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

    requestAnimationFrame(() => setInitialPosition(container));
    const handleScroll = () => normalizeLoop(container);
    const handleResize = () => normalizeLoop(container);
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [items.length, normalizeLoop, setInitialPosition]);

  useCarouselAutoplay({
    enabled: items.length > 1 && !prefersReducedMotion,
    delay: 4200,
    onTick: () => scrollByStep(1),
    trackRef,
    pauseOnHover: true,
    pauseOnPointer: true,
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
      </div>

      <div
        className={`program-experts-carousel-track-shell ${fadeState.left ? "has-left-fade" : ""} ${fadeState.right ? "has-right-fade" : ""}`.trim()}
      >
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
