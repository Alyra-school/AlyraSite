"use client";

import { useCallback, useMemo, useRef } from "react";
import styles from "./PedagogySection.module.css";
import SectionShell from "../shared/SectionShell";
import IconRenderer from "../shared/IconRenderer";
import CarouselControls from "../carousel/CarouselControls";
import CarouselFade from "../carousel/CarouselFade";
import CarouselProgress from "../carousel/CarouselProgress";
import CarouselTrack from "../carousel/CarouselTrack";
import { useDragScroll } from "../../../hooks/home/useDragScroll";
import { useCarouselFadeAndProgress } from "../../../hooks/home/useCarouselFadeAndProgress";
import { pedagogyData } from "../../../data/home";

export default function PedagogySection() {
  const trackRef = useRef(null);

  const splitTitle = useCallback((title) => {
    const words = title.trim().split(/\s+/);
    if (words.length < 2) return [title, ""];
    const splitIndex = Math.ceil(words.length / 2);
    return [words.slice(0, splitIndex).join(" "), words.slice(splitIndex).join(" ")];
  }, []);

  const scrollByCard = useCallback((direction) => {
    const container = trackRef.current;
    if (!container) return;
    container.scrollBy({ left: direction * Math.max(280, container.clientWidth * 0.9), behavior: "smooth" });
  }, []);

  const { fadeState, meter, update } = useCarouselFadeAndProgress({
    trackRef,
    mode: "plain",
    showProgress: true,
  });

  const dragScrollOptions = useMemo(
    () => ({
      onScroll: update,
      itemSelector: ".pedagogy-column",
      enableSwipeSnap: true,
      swipeThreshold: 18,
      mobileOnlySnap: true,
    }),
    [update],
  );

  useDragScroll(trackRef, dragScrollOptions);

  const columns = useMemo(() => pedagogyData.columns, []);

  return (
    <SectionShell className={`${styles.root} pedagogy-section`} variant="full">
      <div className="section-head pedagogy-head">
        <h2>
          <span className="hero-accent">{pedagogyData.titleAccent}</span> {pedagogyData.titleRest}
        </h2>
      </div>

      <CarouselControls
        className="pedagogy-controls"
        ariaLabel="Navigation du carrousel pedagogique"
        prevLabel="Categorie precedente"
        nextLabel="Categorie suivante"
        buttonClassName="pedagogy-arrow"
        onPrev={() => scrollByCard(-1)}
        onNext={() => scrollByCard(1)}
      />

      <CarouselFade className="pedagogy-track-shell" left={fadeState.left} right={fadeState.right}>
        <CarouselTrack className="pedagogy-track" trackRef={trackRef}>
          {columns.map((column) => {
            const [lineOne, lineTwo] = splitTitle(column.title);
            return (
              <article key={column.key} className="pedagogy-column">
                <h3 className="pedagogy-column-title" aria-label={column.title}>
                  <span>{lineOne}</span>
                  <span>{lineTwo}</span>
                </h3>
                {column.items.map((item) => (
                  <article key={item.title} className="pedagogy-card">
                    <span className="pedagogy-icon" aria-hidden="true">
                      <IconRenderer name={item.icon} />
                    </span>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </article>
                ))}
              </article>
            );
          })}
        </CarouselTrack>
      </CarouselFade>

      <CarouselProgress className="pedagogy-progress" meter={meter} />
    </SectionShell>
  );
}
