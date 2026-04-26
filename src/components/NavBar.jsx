"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { parseDurationWeeks } from "../utils/programUtils";

const staticPages = [
  { label: "Financement", href: "/financement" },
  { label: "Vos besoins", href: "/vos-besoins" },
  { label: "Blog", href: "/blog" },
  { label: "Qui sommes nous", href: "/qui-sommes-nous" },
  { label: "Nos Anciens", href: "/nos-anciens" },
];
const MOBILE_BREAKPOINT = 1200;

export default function NavBar({ programs = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef(null);
  const mobileNavBaseHeightRef = useRef(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  const featuredLongProgram = useMemo(() => {
    return [...programs]
      .sort((a, b) => parseDurationWeeks(b.duration) - parseDurationWeeks(a.duration))
      .at(0);
  }, [programs]);

  const isProgramsArea = pathname === "/formations" || pathname.startsWith("/formations/");

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProgramsOpen(false);
  };

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setIsMobileMenuOpen(false);
        setIsProgramsOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const updateNavHeight = () => {
      const navElement = navRef.current;
      if (!navElement) return;

      const isMobileNav = window.innerWidth <= MOBILE_BREAKPOINT;
      const isMenuOpen = navElement.classList.contains("mobile-open");
      let navHeight = navElement.offsetHeight;

      if (isMobileNav && isMenuOpen && mobileNavBaseHeightRef.current > 0) {
        navHeight = mobileNavBaseHeightRef.current;
      } else if (isMobileNav) {
        mobileNavBaseHeightRef.current = navHeight;
      }

      document.documentElement.style.setProperty("--nav-height", `${navHeight}px`);
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    if (document.fonts?.ready) document.fonts.ready.then(updateNavHeight);
    const resizeObserver =
      typeof ResizeObserver !== "undefined" && navRef.current
        ? new ResizeObserver(updateNavHeight)
        : null;
    if (resizeObserver && navRef.current) resizeObserver.observe(navRef.current);

    return () => {
      window.removeEventListener("resize", updateNavHeight);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return (
    <nav
      className={`nav ${isMobileMenuOpen ? "mobile-open" : ""}`}
      ref={navRef}
      aria-label="Navigation principale"
    >
      <div className="nav-top-row">
        <Link href="/" className="logo logo-btn" onClick={closeMenus}>
          <img className="logo-mark" src="/symbole_bleu.svg" alt="Alyra symbole" />
          <span>Alyra, l'ecole Blockchain et IA</span>
        </Link>

        <div className="nav-top-actions">
          <Link
            href="/rendez-vous"
            className={`nav-cta ${pathname === "/rendez-vous" ? "active" : ""}`}
            onClick={closeMenus}
            aria-current={pathname === "/rendez-vous" ? "page" : undefined}
          >
            Rendez-vous
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={isMobileMenuOpen}
            aria-controls="nav-content"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            <span className="nav-toggle-label">Menu</span>
            <span className="nav-toggle-icon" aria-hidden="true">
              ☰
            </span>
          </button>
        </div>
      </div>

      <div id="nav-content" className="nav-content">
        <div className="nav-links">
          <div className={`nav-programs ${isProgramsOpen ? "open" : ""}`}>
            <button
              type="button"
              className={`nav-link nav-trigger ${isProgramsArea ? "active" : ""}`}
              aria-haspopup="true"
              aria-expanded={isProgramsOpen}
              onClick={() => {
                if (window.innerWidth <= MOBILE_BREAKPOINT) {
                  setIsProgramsOpen((current) => !current);
                  return;
                }
                closeMenus();
                router.push("/formations");
              }}
            >
              Nos formations
            </button>

            <div className="nav-dropdown">
              <Link
                href="/formations"
                className="nav-dropdown-item"
                onClick={closeMenus}
              >
                <span>Toutes nos formations</span>
              </Link>
              <Link
                href="/formations?track=blockchain"
                className="nav-dropdown-item"
                onClick={closeMenus}
              >
                <span>Nos Formations Blockchain</span>
              </Link>
              <Link
                href="/formations?track=ia"
                className="nav-dropdown-item"
                onClick={closeMenus}
              >
                <span>Nos Formations IA</span>
              </Link>
              {featuredLongProgram ? (
                <Link
                  href={`/formations/${featuredLongProgram.slug}`}
                  className="nav-dropdown-item"
                  onClick={closeMenus}
                >
                  <span>{featuredLongProgram.title}</span>
                  <small>Notre formation pour vous</small>
                </Link>
              ) : (
                <span className="nav-dropdown-item">
                  <span>Programme long</span>
                  <small>Notre formation pour vous</small>
                </span>
              )}
            </div>
          </div>

          {staticPages.map((item) => (
            <Link
              key={item.href}
              className={`nav-link ${item.href === "/qui-sommes-nous" ? "nav-link-compact-break" : ""} ${
                pathname === item.href ? "active" : ""
              }`}
              href={item.href}
              onClick={closeMenus}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <label className="sr-only" htmlFor="site-search">
            Rechercher une formation
          </label>
          <input
            id="site-search"
            type="search"
            className="nav-search"
            placeholder="Rechercher une formation..."
            aria-label="Rechercher une formation"
          />
          <Link
            href="/rendez-vous"
            className={`nav-cta ${pathname === "/rendez-vous" ? "active" : ""}`}
            onClick={closeMenus}
            aria-current={pathname === "/rendez-vous" ? "page" : undefined}
          >
            Rendez-vous
          </Link>
        </div>
      </div>
    </nav>
  );
}
