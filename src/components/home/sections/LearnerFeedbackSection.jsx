"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import styles from "./LearnerFeedbackSection.module.css";
import SectionShell from "../shared/SectionShell";
import CarouselControls from "../carousel/CarouselControls";
import CarouselFade from "../carousel/CarouselFade";
import CarouselTrack from "../carousel/CarouselTrack";
import { useDragScroll } from "../../../hooks/home/useDragScroll";
import { useInfiniteLoopCarousel } from "../../../hooks/home/useInfiniteLoopCarousel";
import { useCarouselAutoplay } from "../../../hooks/home/useCarouselAutoplay";
import { useCarouselFadeAndProgress } from "../../../hooks/home/useCarouselFadeAndProgress";
import { feedbackData } from "../../../data/home";

export default function LearnerFeedbackSection() {
  const trackRef = useRef(null);
  const feedbackTrackItems = useMemo(
    () =>
      feedbackData.reviews.length > 1
        ? [...feedbackData.reviews, ...feedbackData.reviews, ...feedbackData.reviews]
        : feedbackData.reviews,
    [],
  );

  const { getLogicalOffset, normalizeLoop, setInitialPosition, scrollByStep } = useInfiniteLoopCarousel({
    trackRef,
    itemSelector: ".feedback-card",
    itemCount: feedbackData.reviews.length,
    enabled: feedbackData.reviews.length > 1,
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

  useDragScroll(trackRef, handleTrackScroll);

  useEffect(() => {
    if (feedbackData.reviews.length <= 1) return undefined;
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
  }, [normalizeLoop, setInitialPosition]);

  useCarouselAutoplay({
    enabled: feedbackData.reviews.length > 1,
    delay: 4000,
    onTick: () => scrollByStep(1),
    trackRef,
    pauseOnHover: true,
    pauseOnPointer: true,
  });

  return (
    <SectionShell className={`${styles.root} feedback-section`} variant="full">
      <div className="feedback-surface">
        <div className="section-head feedback-head">
          <h2>{feedbackData.title}</h2>
          <div className="feedback-trustpilot">
            <p className="feedback-trustpilot-brand">{feedbackData.trustpilot.brand}</p>
            <p className="feedback-trustpilot-stars">{feedbackData.trustpilot.stars}</p>
            <p className="feedback-trustpilot-meta">
              TrustScore <strong>{feedbackData.trustpilot.score}</strong> | <u>{feedbackData.trustpilot.reviewsLabel}</u>
            </p>
          </div>
        </div>

        <CarouselControls
          className="feedback-controls"
          ariaLabel="Navigation du carrousel retours apprenants"
          prevLabel="Retour precedent"
          nextLabel="Retour suivant"
          onPrev={() => scrollByStep(-1)}
          onNext={() => scrollByStep(1)}
        />

        <CarouselFade className="feedback-track-shell" left={fadeState.left} right={fadeState.right}>
          <CarouselTrack className="feedback-track" trackRef={trackRef}>
            {feedbackTrackItems.map((review, index) => (
              <article key={`${review.author}-${index}`} className="feedback-card">
                <p className="feedback-rating">
                  <strong>{review.rating}.0</strong>
                  <span>★★★★★</span>
                </p>
                <h3>{review.title}</h3>
                <p>{review.text}</p>
                <button type="button" className="text-button">
                  Lire la suite
                </button>
                <footer>{review.author}</footer>
              </article>
            ))}
          </CarouselTrack>
        </CarouselFade>

        <div className="feedback-cta">
          <Link href={feedbackData.cta.href} className="ghost feedback-cta-btn">
            {feedbackData.cta.label}
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
