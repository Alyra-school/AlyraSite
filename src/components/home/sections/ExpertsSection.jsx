"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import styles from "./ExpertsSection.module.css";
import SectionShell from "../shared/SectionShell";
import CarouselControls from "../carousel/CarouselControls";
import CarouselFade from "../carousel/CarouselFade";
import CarouselTrack from "../carousel/CarouselTrack";
import { useDragScroll } from "../../../hooks/home/useDragScroll";
import { useInfiniteLoopCarousel } from "../../../hooks/home/useInfiniteLoopCarousel";
import { useCarouselAutoplay } from "../../../hooks/home/useCarouselAutoplay";
import { useCarouselFadeAndProgress } from "../../../hooks/home/useCarouselFadeAndProgress";
import { expertsData } from "../../../data/home";

export default function ExpertsSection() {
  const trackRef = useRef(null);
  const expertsTrackItems = useMemo(
    () => (expertsData.experts.length > 1 ? [...expertsData.experts, ...expertsData.experts, ...expertsData.experts] : expertsData.experts),
    [],
  );

  const { getLogicalOffset, normalizeLoop, setInitialPosition, scrollByStep } = useInfiniteLoopCarousel({
    trackRef,
    itemSelector: ".expert-card",
    itemCount: expertsData.experts.length,
    enabled: expertsData.experts.length > 1,
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
    if (expertsData.experts.length <= 1) return undefined;
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
    enabled: expertsData.experts.length > 1,
    delay: 4000,
    onTick: () => scrollByStep(1),
    trackRef,
    pauseOnHover: true,
    pauseOnPointer: true,
  });

  return (
    <SectionShell className={`${styles.root} experts-section`} variant="full">
      <div className="experts-surface">
        <div className="section-head experts-head">
          <h2 className="experts-title">
            {expertsData.titleTop}
            <br />
            <span className="hero-accent">{expertsData.titleAccent}</span>
          </h2>
          <p>{expertsData.subtitle}</p>
        </div>

        <CarouselControls
          className="experts-controls"
          ariaLabel="Navigation du carrousel experts"
          prevLabel="Expert precedent"
          nextLabel="Expert suivant"
          onPrev={() => scrollByStep(-1)}
          onNext={() => scrollByStep(1)}
        />

        <CarouselFade className="experts-track-shell" left={fadeState.left} right={fadeState.right}>
          <CarouselTrack className="experts-track" trackRef={trackRef}>
            {expertsTrackItems.map((expert, index) => (
              <article key={`${expert.name}-${index}`} className="expert-card">
                <img src={expert.image} alt={expert.name} width="720" height="520" loading="lazy" decoding="async" />
                <div className="expert-card-body">
                  <div className="expert-card-head">
                    <h3>{expert.name}</h3>
                    <a href={expert.linkedin} target="_blank" rel="noreferrer" aria-label={`Profil LinkedIn de ${expert.name}`}>
                      in
                    </a>
                  </div>
                  <p className="expert-role">{expert.role}</p>
                  <p>{expert.bio}</p>
                </div>
              </article>
            ))}
          </CarouselTrack>
        </CarouselFade>

        <div className="experts-cta">
          <Link href={expertsData.cta.href} className="primary">
            {expertsData.cta.label}
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
