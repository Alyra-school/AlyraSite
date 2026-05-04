import { useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useCarouselAutoplay } from "../../hooks/home/useCarouselAutoplay";
import { useDragScroll } from "../../hooks/home/useDragScroll";
import { useInfiniteLoopCarousel } from "../../hooks/home/useInfiniteLoopCarousel";
import { useCarouselFadeAndProgress } from "../../hooks/home/useCarouselFadeAndProgress";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export default function ProgramTestimonialsCarousel({ items }) {
  const trackRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackItems = useMemo(() => (items.length > 1 ? [...items, ...items, ...items] : items), [items]);

  const { getLogicalOffset, normalizeLoop, setInitialPosition, scrollByStep } = useInfiniteLoopCarousel({
    trackRef,
    itemSelector: ".program-testimonial-carousel-card",
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
      itemSelector: ".program-testimonial-carousel-card",
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
    delay: 4300,
    onTick: () => scrollByStep(1),
    trackRef,
    pauseOnHover: true,
    pauseOnPointer: true,
  });

  if (items.length === 0) return null;

  return (
    <section className="section program-section program-testimonials-carousel-section">
      <div className="program-testimonials-carousel-head">
        <h2>Les retours de <span>nos apprenants</span></h2>
        <div className="program-testimonials-trustpilot" aria-label="Notation Trustpilot">
          <strong>★ Trustpilot</strong>
          <div>
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p>TrustScore <b>4.9</b> | <u>273 avis</u></p>
        </div>
      </div>

      <div className="program-testimonials-carousel-controls" aria-label="Navigation du carrousel des avis">
        <button type="button" aria-label="Avis precedent" onClick={() => scrollByStep(-1)}>←</button>
        <span aria-hidden="true" />
        <button type="button" aria-label="Avis suivant" onClick={() => scrollByStep(1)}>→</button>
      </div>

      <div
        className={`program-testimonials-carousel-track-shell ${fadeState.left ? "has-left-fade" : ""} ${fadeState.right ? "has-right-fade" : ""}`.trim()}
      >
        <div className="program-testimonials-carousel-track" ref={trackRef}>
          {trackItems.map((item, index) => (
            <article
              key={`${item.key ?? item.author}-${index}`}
              className="program-testimonial-carousel-card"
              aria-hidden={items.length > 1 ? index < items.length || index >= items.length * 2 : false}
            >
              <div className="program-testimonial-carousel-rating">
                <b>{item.rating ?? "5.0"}</b>
                <span>★★★★★</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Link
                href="/nos-anciens"
                tabIndex={items.length > 1 && (index < items.length || index >= items.length * 2) ? -1 : 0}
              >
                Lire la suite
              </Link>
              <p className="program-testimonial-carousel-author">{item.author}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="program-testimonials-carousel-cta">
        <a href="#programme-brochure" className="program-cta-secondary">Télécharger le programme</a>
        <Link href="/rendez-vous" className="primary">Prendre rendez-vous</Link>
      </div>
    </section>
  );
}
