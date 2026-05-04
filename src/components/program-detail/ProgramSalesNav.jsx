"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ProgramSalesNav({ programTitle }) {
  const [isSalesNavStuck, setIsSalesNavStuck] = useState(false);
  const [isSalesMenuOpen, setIsSalesMenuOpen] = useState(false);
  const [salesNavRect, setSalesNavRect] = useState(null);
  const salesNavSlotRef = useRef(null);
  const salesMenuRef = useRef(null);

  useEffect(() => {
    if (!isSalesMenuOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsSalesMenuOpen(false);
    };

    const handleClickOutside = (event) => {
      if (!salesMenuRef.current) return;
      if (!salesMenuRef.current.contains(event.target)) {
        setIsSalesMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("pointerdown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isSalesMenuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 761px)");
    const handleDesktop = () => {
      if (media.matches) setIsSalesMenuOpen(false);
    };
    media.addEventListener("change", handleDesktop);
    return () => media.removeEventListener("change", handleDesktop);
  }, []);

  useEffect(() => {
    const slot = salesNavSlotRef.current;
    if (!slot) return undefined;

    const mediaQuery = window.matchMedia("(max-width: 760px)");
    let slotTop = 0;
    let rafId = 0;

    const getStickyOffset = () => {
      const mainNav = document.querySelector(".nav");
      return (mainNav?.getBoundingClientRect().height ?? 80) + 18;
    };

    const updateState = () => {
      if (!mediaQuery.matches) {
        setIsSalesNavStuck(false);
        return;
      }

      setIsSalesNavStuck(window.scrollY + getStickyOffset() >= slotTop);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateState);
    };

    const measure = () => {
      const currentScroll = window.scrollY;
      const rect = slot.getBoundingClientRect();
      slotTop = rect.top + currentScroll;
      setSalesNavRect((previousRect) => {
        const nextRect = {
          left: rect.left,
          width: rect.width,
          height: slot.offsetHeight,
        };

        if (
          previousRect &&
          Math.abs(previousRect.left - nextRect.left) < 0.5 &&
          Math.abs(previousRect.width - nextRect.width) < 0.5 &&
          Math.abs(previousRect.height - nextRect.height) < 0.5
        ) {
          return previousRect;
        }

        return nextRect;
      });
      scheduleUpdate();
    };

    measure();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure);
    mediaQuery.addEventListener("change", measure);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measure);
      mediaQuery.removeEventListener("change", measure);
    };
  }, []);

  return (
    <div
      ref={salesNavSlotRef}
      className={`program-sales-nav-slot ${isSalesNavStuck ? "is-stuck" : ""}`}
      style={isSalesNavStuck && salesNavRect ? { minHeight: `${salesNavRect.height}px` } : undefined}
    >
      <section
        className={`program-sales-nav ${isSalesNavStuck ? "is-stuck" : ""}`}
        aria-label="Navigation rapide de la formation"
        style={
          isSalesNavStuck && salesNavRect
            ? { left: `${salesNavRect.left}px`, width: `${salesNavRect.width}px` }
            : undefined
        }
      >
        <div className="program-sales-nav-inner">
          <div className="program-sales-nav-left">
            <div className="program-sales-nav-top">
              <h2>Formation {programTitle}</h2>
              <p>
                <strong>Excellent</strong>
                <span>4.9 sur 5</span>
                <span className="program-rating-brand trustpilot">Trustpilot</span>
              </p>
              <div className={`program-sales-mobile-menu ${isSalesMenuOpen ? "is-open" : ""}`} ref={salesMenuRef}>
                <button
                  type="button"
                  aria-label={isSalesMenuOpen ? "Fermer le menu de navigation de la formation" : "Ouvrir le menu de navigation de la formation"}
                  aria-expanded={isSalesMenuOpen}
                  aria-controls="program-sales-mobile-panel"
                  onClick={() => setIsSalesMenuOpen((value) => !value)}
                >
                  <span aria-hidden="true">◧</span>
                </button>
                <div className="program-sales-mobile-panel" id="program-sales-mobile-panel" hidden={!isSalesMenuOpen}>
                  <nav className="program-sales-links program-sales-links-mobile" aria-label="Ancres de la page">
                    <a href="#resume" className="program-sales-link" onClick={() => setIsSalesMenuOpen(false)}>Résumé</a>
                    <a href="#programme" className="program-sales-link" onClick={() => setIsSalesMenuOpen(false)}>Programme</a>
                    <a href="#tarifs" className="program-sales-link" onClick={() => setIsSalesMenuOpen(false)}>Tarifs</a>
                    <Link href="/financement" className="program-sales-link" onClick={() => setIsSalesMenuOpen(false)}>Financements</Link>
                    <a href="#experts" className="program-sales-link" onClick={() => setIsSalesMenuOpen(false)}>Experts</a>
                    <a href="#certification" className="program-sales-link" onClick={() => setIsSalesMenuOpen(false)}>Certification</a>
                  </nav>
                  <div className="program-sales-cta program-sales-cta-mobile">
                    <a href="#programme-brochure" className="program-cta-secondary" onClick={() => setIsSalesMenuOpen(false)}>Télécharger le programme</a>
                    <Link href="/rendez-vous" className="primary" onClick={() => setIsSalesMenuOpen(false)}>Prendre rendez-vous</Link>
                  </div>
                </div>
              </div>
            </div>
            <nav className="program-sales-links" aria-label="Ancres de la page">
              <a href="#resume" className="program-sales-link">Résumé</a>
              <a href="#programme" className="program-sales-link">Programme</a>
              <a href="#tarifs" className="program-sales-link">Tarifs</a>
              <Link href="/financement" className="program-sales-link">Financements</Link>
              <a href="#experts" className="program-sales-link">Experts</a>
              <a href="#certification" className="program-sales-link">Certification</a>
            </nav>
          </div>
          <div className="program-sales-cta">
            <a href="#programme-brochure" className="program-cta-secondary">Télécharger le programme</a>
            <Link href="/rendez-vous" className="primary">Prendre rendez-vous</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
