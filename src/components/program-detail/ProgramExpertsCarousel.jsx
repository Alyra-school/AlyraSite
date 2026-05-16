import { useCallback, useEffect, useId, useMemo, useRef } from "react";
import Image from "next/image";
import { useCarouselAutoplay } from "../../hooks/home/useCarouselAutoplay";
import { useDragScroll } from "../../hooks/home/useDragScroll";
import { useInfiniteLoopCarousel } from "../../hooks/home/useInfiniteLoopCarousel";
import { useCarouselFadeAndProgress } from "../../hooks/home/useCarouselFadeAndProgress";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import styles from "./ProgramCarousels.module.css";

export default function ProgramExpertsCarousel({ items }) {
  const trackId = useId();
  const trackRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackItems = useMemo(() => (items.length > 1 ? [...items, ...items, ...items] : items), [items]);

  const { getLogicalOffset, normalizeLoop, setInitialPosition, scrollByStep } = useInfiniteLoopCarousel({
    trackRef,
    itemSelector: `.${styles.expertCard}`,
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
      itemSelector: `.${styles.expertCard}`,
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
    <section className={`section program-section ${styles.expertsSection}`}>
      <div className={styles.expertsHead}>
        <h2>Nos <span>experts</span></h2>
      </div>

      <nav className={styles.expertsControls} aria-label="Navigation du carrousel experts">
        <button type="button" aria-label="Expert precedent" aria-controls={trackId} onClick={() => scrollByStep(-1)}>←</button>
        <span aria-hidden="true" />
        <button type="button" aria-label="Expert suivant" aria-controls={trackId} onClick={() => scrollByStep(1)}>→</button>
      </nav>

      <div
        className={`${styles.expertsTrackShell} ${fadeState.left ? styles.hasLeftFade : ""} ${fadeState.right ? styles.hasRightFade : ""}`.trim()}
        role="group"
        aria-label="Carrousel des experts"
        tabIndex={0}
        onKeyDown={handleKeyNav}
      >
        <div className={styles.expertsTrack} ref={trackRef} id={trackId} aria-live="off">
          {trackItems.map((expert, index) => (
            <article
              key={`${expert.id ?? expert.name}-${index}`}
              className={styles.expertCard}
              aria-hidden={items.length > 1 ? index < items.length || index >= items.length * 2 : false}
            >
              <div className={styles.expertPhotoWrap}>
                <span aria-hidden="true" />
                {expert.imageUrl ? (
                  <Image
                    src={expert.imageUrl}
                    alt={expert.name ?? "Expert"}
                    width={420}
                    height={420}
                    sizes="(max-width: 760px) 72vw, (max-width: 1280px) 30vw, 22vw"
                    unoptimized
                  />
                ) : null}
              </div>
              <div className={styles.expertName}>{expert.name}</div>
              <p className={styles.expertRole}>{expert.role}</p>
              {expert.linkedinUrl ? (
                  <a
                    href={expert.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label={`Profil LinkedIn de ${expert.name}`}
                    tabIndex={items.length > 1 && (index < items.length || index >= items.length * 2) ? -1 : 0}
                  >
                  in
                </a>
              ) : (
                <span className={styles.expertLinkPlaceholder} aria-hidden="true"> </span>
              )}
              <p className={styles.expertBio}>{expert.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
