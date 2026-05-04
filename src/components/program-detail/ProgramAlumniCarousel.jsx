import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useCarouselAutoplay } from "../../hooks/home/useCarouselAutoplay";
import { useDragScroll } from "../../hooks/home/useDragScroll";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export default function ProgramAlumniCarousel({ items }) {
  const trackRef = useRef(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackItems = useMemo(() => (items.length > 1 ? [...items, ...items, ...items] : items), [items]);

  const getLoopMetrics = useCallback((container = trackRef.current) => {
    if (!container || items.length <= 1) return 0;
    const cards = container.querySelectorAll(".program-alumni-card");
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
    if (!container || items.length <= 1) return;
    const metrics = getLoopMetrics(container);
    if (!metrics) return;

    const min = (metrics.copyStart0 + metrics.copyStart1) / 2;
    const max = (metrics.copyStart1 + metrics.copyStart2) / 2;

    if (container.scrollLeft < min) {
      container.scrollLeft += metrics.segmentWidth;
    } else if (container.scrollLeft >= max) {
      container.scrollLeft -= metrics.segmentWidth;
    }
  }, [getLoopMetrics, items.length]);

  const setInitialPosition = useCallback((container = trackRef.current) => {
    if (!container || items.length <= 1) return;
    const metrics = getLoopMetrics(container);
    if (!metrics) return;
    container.scrollLeft = metrics.copyStart1;
  }, [getLoopMetrics, items.length]);

  const getScrollStep = useCallback((container = trackRef.current) => {
    const metrics = getLoopMetrics(container);
    if (metrics) return metrics.step;
    return Math.max(1, container.clientWidth * 0.85);
  }, [getLoopMetrics]);

  const handleTrackScroll = useCallback((container) => {
    normalizeLoop(container);
  }, [normalizeLoop]);

  const scrollAlumniByStep = useCallback((direction) => {
    const container = trackRef.current;
    if (!container) return;
    normalizeLoop();
    container.scrollBy({ left: direction * getScrollStep(container), behavior: "smooth" });
    window.setTimeout(() => {
      normalizeLoop();
    }, 520);
  }, [getScrollStep, normalizeLoop]);

  const dragScrollOptions = useMemo(
    () => ({
      onScroll: handleTrackScroll,
      itemSelector: ".program-alumni-card",
      enableSwipeSnap: true,
      swipeThreshold: 20,
      mobileOnlySnap: true,
    }),
    [handleTrackScroll],
  );

  useDragScroll(trackRef, dragScrollOptions);

  useEffect(() => {
    if (items.length <= 1) return undefined;
    const container = trackRef.current;
    if (!container) return undefined;

    let timeoutId = 0;
    let rafId = 0;

    const initialize = () => {
      setInitialPosition(container);
    };

    rafId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(initialize);
    });
    timeoutId = window.setTimeout(initialize, 650);

    const handleImageLoad = () => {
      initialize();
    };
    container.querySelectorAll("img").forEach((image) => {
      if (!image.complete) image.addEventListener("load", handleImageLoad, { once: true });
    });

    const handleResize = () => {
      initialize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      container.querySelectorAll("img").forEach((image) => {
        image.removeEventListener("load", handleImageLoad);
      });
      window.removeEventListener("resize", handleResize);
    };
  }, [items.length, setInitialPosition]);

  useCarouselAutoplay({
    enabled: items.length > 1 && !prefersReducedMotion,
    delay: 4000,
    onTick: () => scrollAlumniByStep(1),
    trackRef,
    pauseOnHover: true,
    pauseOnPointer: true,
    isPaused: isAutoplayPaused,
  });

  if (items.length === 0) return null;

  return (
    <section className="section program-section program-alumni-spotlight">
      <div className="program-alumni-surface">
        <div className="program-alumni-head">
          <h2>De passionné à professionnel</h2>
          <p>L’impact de l’expérience Alyra</p>
        </div>

        <div className="program-alumni-controls" aria-label="Navigation du carrousel alumni">
          <button type="button" aria-label="Alumni précédent" onClick={() => scrollAlumniByStep(-1)}>
            ←
          </button>
          <span aria-hidden="true" />
          <button type="button" aria-label="Alumni suivant" onClick={() => scrollAlumniByStep(1)}>
            →
          </button>
          <span aria-hidden="true" />
          <button
            type="button"
            aria-label={isAutoplayPaused ? "Relancer le défilement automatique" : "Mettre en pause le défilement automatique"}
            onClick={() => setIsAutoplayPaused((value) => !value)}
          >
            {isAutoplayPaused ? "▶" : "⏸"}
          </button>
        </div>

        <div className={`program-alumni-track-shell ${items.length > 1 ? "has-left-fade has-right-fade" : ""}`}>
          <div className="program-alumni-track" ref={trackRef}>
            {trackItems.map((alumni, index) => (
              <article
                key={`${alumni.key}-${index}`}
                className="program-alumni-card"
                aria-hidden={items.length > 1 ? index < items.length || index >= items.length * 2 : false}
              >
                <div className="program-alumni-image-wrap">
                  <img src={alumni.imageUrl} alt={alumni.name} loading="lazy" decoding="async" />
                </div>
                <div className="program-alumni-body">
                  <div className="program-alumni-transition" aria-label={`Parcours de ${alumni.name}`}>
                    <span className="program-alumni-pill program-alumni-pill-alyra">
                      <img src="/symbole_bleu.svg" alt="" aria-hidden="true" />
                      {alumni.beforeLabel}
                    </span>
                    <span className="program-alumni-arrow" aria-hidden="true">↷</span>
                    <span className="program-alumni-pill">
                      {alumni.afterLogoUrl ? <img src={alumni.afterLogoUrl} alt="" aria-hidden="true" /> : null}
                      {alumni.afterLabel}
                    </span>
                  </div>
                  <h3>
                    {alumni.name}
                    {alumni.linkedinUrl ? (
                      <a
                        href={alumni.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Profil LinkedIn de ${alumni.name}`}
                        tabIndex={items.length > 1 && (index < items.length || index >= items.length * 2) ? -1 : 0}
                      >
                        in
                      </a>
                    ) : null}
                  </h3>
                  <p className="program-alumni-role">{alumni.title}</p>
                  <p>{alumni.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="program-alumni-cta">
          <Link href="/rendez-vous" className="primary">
            Prendre rendez-vous
          </Link>
        </div>
      </div>
    </section>
  );
}
