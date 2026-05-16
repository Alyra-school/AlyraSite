import { useCallback, useEffect, useId, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCarouselAutoplay } from "../../hooks/home/useCarouselAutoplay";
import { useDragScroll } from "../../hooks/home/useDragScroll";
import { useInfiniteLoopCarousel } from "../../hooks/home/useInfiniteLoopCarousel";
import { useCarouselFadeAndProgress } from "../../hooks/home/useCarouselFadeAndProgress";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import styles from "./ProgramCarousels.module.css";

export default function ProgramAlumniCarousel({ items }) {
  const trackId = useId();
  const trackRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackItems = useMemo(() => (items.length > 1 ? [...items, ...items, ...items] : items), [items]);

  const { getLogicalOffset, normalizeLoop, setInitialPosition, scrollByStep } = useInfiniteLoopCarousel({
    trackRef,
    itemSelector: `.${styles.alumniCard}`,
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
      itemSelector: `.${styles.alumniCard}`,
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

  const handleKeyNav = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollAlumniByStep(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollAlumniByStep(1);
    }
  };

  return (
    <section className={`section program-section ${styles.alumniSpotlight}`}>
      <div className={styles.alumniSurface}>
        <div className={styles.alumniHead}>
          <h2>De passionné à professionnel</h2>
          <p>L’impact de l’expérience Alyra</p>
        </div>

        <nav className={styles.alumniControls} aria-label="Navigation du carrousel alumni">
          <button type="button" aria-label="Alumni précédent" aria-controls={trackId} onClick={() => scrollAlumniByStep(-1)}>
            ←
          </button>
          <span aria-hidden="true" />
          <button type="button" aria-label="Alumni suivant" aria-controls={trackId} onClick={() => scrollAlumniByStep(1)}>
            →
          </button>
        </nav>

        <div
          className={`${styles.alumniTrackShell} ${fadeState.left ? styles.hasLeftFade : ""} ${fadeState.right ? styles.hasRightFade : ""}`.trim()}
          role="group"
          aria-label="Carrousel des alumni mis en avant"
          tabIndex={0}
          onKeyDown={handleKeyNav}
        >
          <div className={styles.alumniTrack} ref={trackRef} id={trackId} aria-live="off">
            {trackItems.map((alumni, index) => (
              <article
                key={`${alumni.key}-${index}`}
                className={styles.alumniCard}
                aria-hidden={items.length > 1 ? index < items.length || index >= items.length * 2 : false}
              >
                <div className={styles.alumniImageWrap}>
                  <Image
                    src={alumni.imageUrl}
                    alt={alumni.name}
                    width={480}
                    height={480}
                    sizes="(max-width: 760px) 78vw, (max-width: 1280px) 38vw, 28vw"
                    unoptimized
                  />
                </div>
                <div className={styles.alumniBody}>
                  <div className={styles.alumniTransition} aria-label={`Parcours de ${alumni.name}`}>
                    <span className={`${styles.alumniPill} ${styles.alumniPillAlyra}`}>
                      <Image src="/symbole_bleu.svg" alt="" aria-hidden="true" width={24} height={24} />
                      {alumni.beforeLabel}
                    </span>
                    <span className={styles.alumniArrow} aria-hidden="true">↷</span>
                    <span className={styles.alumniPill}>
                      {alumni.afterLogoUrl ? (
                        <Image src={alumni.afterLogoUrl} alt="" aria-hidden="true" width={72} height={36} unoptimized />
                      ) : null}
                      {alumni.afterLabel}
                    </span>
                  </div>
                  <h3>
                    {alumni.name}
                    {alumni.linkedinUrl ? (
                      <a
                        href={alumni.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label={`Profil LinkedIn de ${alumni.name}`}
                        tabIndex={items.length > 1 && (index < items.length || index >= items.length * 2) ? -1 : 0}
                      >
                        in
                      </a>
                    ) : null}
                  </h3>
                  <p className={styles.alumniRole}>{alumni.title || "Alumni Alyra"}</p>
                  <p>{alumni.body || "Parcours de reconversion et montée en compétences dans l’écosystème Web3."}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.alumniCta}>
          <Link href="/rendez-vous" className="primary">
            Prendre rendez-vous
          </Link>
        </div>
      </div>
    </section>
  );
}
