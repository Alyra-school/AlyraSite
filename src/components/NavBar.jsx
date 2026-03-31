import { useEffect, useState } from "react";

export default function NavBar({
  navRef,
  isProgramsArea,
  isFinancement,
  isVosBesoins,
  isBlog,
  isQuiSommesNous,
  isNosAnciens,
  isRendezVous,
  onHome,
  onCatalogAll,
  onCatalogBlockchain,
  onCatalogIA,
  onFeaturedLong,
  featuredLongTitle,
  onFinancement,
  onVosBesoins,
  onBlog,
  onQuiSommesNous,
  onNosAnciens,
  onRendezVous,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1180) {
        setIsMobileMenuOpen(false);
        setIsProgramsOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const runAction = (callback) => () => {
    callback();
    setIsMobileMenuOpen(false);
    setIsProgramsOpen(false);
  };

  return (
    <nav
      className={`nav ${isMobileMenuOpen ? "mobile-open" : ""}`}
      ref={navRef}
      aria-label="Navigation principale"
    >
      <div className="nav-top-row">
        <button type="button" className="logo logo-btn" onClick={runAction(onHome)}>
          <img className="logo-mark" src="/symbole_bleu.svg" alt="Alyra symbole" />
          <span>Alyra, l'ecole Blockchain et IA</span>
        </button>

        <div className="nav-top-actions">
          <button
            type="button"
            className={`nav-cta ${isRendezVous ? "active" : ""}`}
            onClick={runAction(onRendezVous)}
            aria-current={isRendezVous ? "page" : undefined}
          >
            Rendez-vous
          </button>
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
              onClick={() => setIsProgramsOpen((current) => !current)}
            >
              Programmes
            </button>

            <div className="nav-dropdown">
              <button type="button" className="nav-dropdown-item" onClick={runAction(onCatalogAll)}>
                <span>Toutes nos formations</span>
              </button>
              <button
                type="button"
                className="nav-dropdown-item"
                onClick={runAction(onCatalogBlockchain)}
              >
                <span>Nos Formations Blockchain</span>
              </button>
              <button type="button" className="nav-dropdown-item" onClick={runAction(onCatalogIA)}>
                <span>Nos Formations IA</span>
              </button>
              <button type="button" className="nav-dropdown-item" onClick={runAction(onFeaturedLong)}>
                <span>{featuredLongTitle}</span>
                <small>Notre formation pour vous</small>
              </button>
            </div>
          </div>

          <button
            type="button"
            className={`nav-link ${isFinancement ? "active" : ""}`}
            onClick={runAction(onFinancement)}
            aria-current={isFinancement ? "page" : undefined}
          >
            Financement
          </button>
          <button
            type="button"
            className={`nav-link ${isVosBesoins ? "active" : ""}`}
            onClick={runAction(onVosBesoins)}
            aria-current={isVosBesoins ? "page" : undefined}
          >
            Vos besoins
          </button>
          <button
            type="button"
            className={`nav-link ${isBlog ? "active" : ""}`}
            onClick={runAction(onBlog)}
            aria-current={isBlog ? "page" : undefined}
          >
            Blog
          </button>
          <button
            type="button"
            className={`nav-link nav-link-compact-break ${isQuiSommesNous ? "active" : ""}`}
            onClick={runAction(onQuiSommesNous)}
            aria-current={isQuiSommesNous ? "page" : undefined}
          >
            Qui sommes nous
          </button>
          <button
            type="button"
            className={`nav-link ${isNosAnciens ? "active" : ""}`}
            onClick={runAction(onNosAnciens)}
            aria-current={isNosAnciens ? "page" : undefined}
          >
            Nos Anciens
          </button>
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
          <button
            type="button"
            className={`nav-cta ${isRendezVous ? "active" : ""}`}
            onClick={runAction(onRendezVous)}
            aria-current={isRendezVous ? "page" : undefined}
          >
            Rendez-vous
          </button>
        </div>
      </div>
    </nav>
  );
}
