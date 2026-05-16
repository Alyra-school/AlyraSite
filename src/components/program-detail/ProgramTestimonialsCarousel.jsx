import { useCallback, useEffect, useId, useMemo, useRef } from "react";
import Link from "next/link";
import { useCarouselAutoplay } from "../../hooks/home/useCarouselAutoplay";
import { useDragScroll } from "../../hooks/home/useDragScroll";
import { useInfiniteLoopCarousel } from "../../hooks/home/useInfiniteLoopCarousel";
import { useCarouselFadeAndProgress } from "../../hooks/home/useCarouselFadeAndProgress";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import styles from "./ProgramCarousels.module.css";

export default function ProgramTestimonialsCarousel({ items }) {
  const trackId = useId();
  const trackRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackItems = useMemo(() => (items.length > 1 ? [...items, ...items, ...items] : items), [items]);

  const { getLogicalOffset, normalizeLoop, setInitialPosition, scrollByStep } = useInfiniteLoopCarousel({
    trackRef,
    itemSelector: `.${styles.testimonialCard}`,
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
      itemSelector: `.${styles.testimonialCard}`,
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

  const handleKeyNav = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByStep(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByStep(1);
    }
  };

  return (
    <section className={`section program-section ${styles.testimonialsSection}`}>
      <div className={styles.testimonialsHead}>
        <h2>Les retours de <span>nos apprenants</span></h2>
        <div className={styles.trustpilot} aria-label="Notation Trustpilot">
          <strong>★ Trustpilot</strong>
          <div className={styles.trustpilotStars}>
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p>TrustScore <b>4.9</b> | <u>273 avis</u></p>
        </div>
      </div>

      <nav className={styles.testimonialsControls} aria-label="Navigation du carrousel des avis">
        <button type="button" aria-label="Avis precedent" aria-controls={trackId} onClick={() => scrollByStep(-1)}>←</button>
        <span aria-hidden="true" />
        <button type="button" aria-label="Avis suivant" aria-controls={trackId} onClick={() => scrollByStep(1)}>→</button>
      </nav>

      <div
        className={`${styles.testimonialsTrackShell} ${fadeState.left ? styles.hasLeftFade : ""} ${fadeState.right ? styles.hasRightFade : ""}`.trim()}
        role="group"
        aria-label="Carrousel des avis apprenants"
        tabIndex={0}
        onKeyDown={handleKeyNav}
      >
        <div className={styles.testimonialsTrack} ref={trackRef} id={trackId} aria-live="off">
          {trackItems.map((item, index) => (
            <article
              key={`${item.key ?? item.author}-${index}`}
              className={styles.testimonialCard}
              aria-hidden={items.length > 1 ? index < items.length || index >= items.length * 2 : false}
            >
              <div className={styles.testimonialRating}>
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
              <p className={styles.testimonialAuthor}>{item.author}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.testimonialsCta}>
        <a href="#programme-brochure" className="program-cta-secondary">Télécharger le programme</a>
        <Link href="/rendez-vous" className="primary">Prendre rendez-vous</Link>
      </div>
    </section>
  );
}
