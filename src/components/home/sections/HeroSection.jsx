"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./HeroSection.module.css";
import { heroData } from "../../../data/home";

export default function HeroSection() {
  const orbitRef = useRef(null);

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;

    const layeredItems = Array.from(orbit.querySelectorAll("[data-depth]"));
    const MAX_OFFSET = 11;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId = null;

    const getNumber = (value, fallback) => {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : fallback;
    };

    const updateFromPointer = (event) => {
      const rect = orbit.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-1, Math.min(1, px * 2));
      targetY = Math.max(-1, Math.min(1, py * 2));
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = (timestamp) => {
      const time = timestamp / 1000;
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      layeredItems.forEach((item, index) => {
        const depth = getNumber(item.getAttribute("data-depth"), 0);
        const xMult = getNumber(item.getAttribute("data-xmult"), index % 2 === 0 ? 1 : -1);
        const yMult = getNumber(item.getAttribute("data-ymult"), index % 3 === 0 ? -1 : 1);
        const drift = getNumber(item.getAttribute("data-drift"), 2.2);
        const speed = getNumber(item.getAttribute("data-speed"), 0.9);
        const phase = getNumber(item.getAttribute("data-phase"), index * 0.6);

        const pointerX = currentX * depth * MAX_OFFSET * xMult;
        const pointerY = currentY * depth * MAX_OFFSET * yMult;
        const idleX = Math.sin(time * speed + phase) * drift;
        const idleY = Math.cos(time * speed * 0.9 + phase) * (drift * 0.8);

        item.style.transform = `translate(${(pointerX + idleX).toFixed(2)}px, ${(pointerY + idleY).toFixed(2)}px)`;
      });

      frameId = window.requestAnimationFrame(animate);
    };

    orbit.addEventListener("pointermove", updateFromPointer);
    orbit.addEventListener("pointerleave", reset);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      orbit.removeEventListener("pointermove", updateFromPointer);
      orbit.removeEventListener("pointerleave", reset);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <header className={`${styles.root} hero`}>
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-proof">
            {heroData.proof.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          <h1>
            {heroData.titleLine1}
            <br />
            <span className="hero-accent">{heroData.titleLine2}</span>
          </h1>
          <p className="hero-sub">{heroData.subtitle}</p>
          <div className="hero-webinars">
            {heroData.webinars.map((item) => (
              <Link key={item.id} href={item.href} className="webinar-card webinar-link">
                <span className="webinar-play">▶</span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="hero-orbit" ref={orbitRef}>
          <div className="orbit-ring" />
          <div className="orbit-center" data-depth="0.1" data-drift="1.2" data-speed="0.6" data-phase="0.4">
            <img src="/symbole_blanc.svg" alt="" width="84" height="84" loading="eager" decoding="async" className="hero-orbit-logo" />
          </div>
          {heroData.orbitPills.map((pill) => (
            <Link
              key={pill.id}
              href={pill.href}
              className={pill.className}
              data-depth={pill.depth}
              data-xmult={pill.xmult}
              data-ymult={pill.ymult}
              data-drift={pill.drift}
              data-speed={pill.speed}
              data-phase={pill.phase}
            >
              {pill.label}
            </Link>
          ))}
          {heroData.orbitDots.map((dot) => (
            <span
              key={dot.id}
              className={dot.className}
              data-depth={dot.depth}
              data-xmult={dot.xmult}
              data-ymult={dot.ymult}
              data-drift={dot.drift}
              data-speed={dot.speed}
              data-phase={dot.phase}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
