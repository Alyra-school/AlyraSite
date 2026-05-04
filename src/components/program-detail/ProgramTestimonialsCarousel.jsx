import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useCarouselAutoplay } from "../../hooks/home/useCarouselAutoplay";
import { useDragScroll } from "../../hooks/home/useDragScroll";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export default function ProgramTestimonialsCarousel({ items }) {
  const trackRef = useRef(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackItems = useMemo(() => (items.length > 1 ? [...items, ...items, ...items] : items), [items]);

  const getLoopMetrics = useCallback((container = trackRef.current) => {
    if (!container || items.length <= 1) return null;
    const cards = container.querySelectorAll(".program-testimonial-carousel-card");
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
    delay: 4300,
    onTick: () => scrollByStep(1),
    trackRef,
    pauseOnHover: true,
    pauseOnPointer: true,
    isPaused: isAutoplayPaused,
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
        <span aria-hidden="true" />
        <button
          type="button"
          aria-label={isAutoplayPaused ? "Relancer le défilement automatique" : "Mettre en pause le défilement automatique"}
          onClick={() => setIsAutoplayPaused((value) => !value)}
        >
          {isAutoplayPaused ? "▶" : "⏸"}
        </button>
      </div>

      <div className="program-testimonials-carousel-track-shell">
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
