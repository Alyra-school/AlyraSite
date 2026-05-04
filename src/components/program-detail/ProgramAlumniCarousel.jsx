import { useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useCarouselAutoplay } from "../../hooks/home/useCarouselAutoplay";
import { useDragScroll } from "../../hooks/home/useDragScroll";
import { useInfiniteLoopCarousel } from "../../hooks/home/useInfiniteLoopCarousel";
import { useCarouselFadeAndProgress } from "../../hooks/home/useCarouselFadeAndProgress";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export default function ProgramAlumniCarousel({ items }) {
  const trackRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackItems = useMemo(() => (items.length > 1 ? [...items, ...items, ...items] : items), [items]);

  const { getLogicalOffset, normalizeLoop, setInitialPosition, scrollByStep } = useInfiniteLoopCarousel({
    trackRef,
    itemSelector: ".program-alumni-card",
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

  const scrollAlumniByStep = useCallback((direction) => {
    const container = trackRef.current;
    if (!container) return;

    // Keep the viewport in the middle copy before moving to avoid visible loop jumps.
    normalizeLoop(container);
    scrollByStep(direction);

    // Re-normalize after smooth scroll settles.
    window.setTimeout(() => {
      normalizeLoop(container);
      update(container);
    }, 420);
  }, [normalizeLoop, scrollByStep, update]);

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
    delay: 4000,
    onTick: () => scrollAlumniByStep(1),
    trackRef,
    pauseOnHover: true,
    pauseOnPointer: true,
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
        </div>

        <div
          className={`program-alumni-track-shell ${fadeState.left ? "has-left-fade" : ""} ${fadeState.right ? "has-right-fade" : ""}`.trim()}
        >
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
                  <p className="program-alumni-role">{alumni.title || "Alumni Alyra"}</p>
                  <p>{alumni.body || "Parcours de reconversion et montée en compétences dans l’écosystème Web3."}</p>
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
