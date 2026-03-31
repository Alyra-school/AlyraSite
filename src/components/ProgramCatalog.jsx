import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { priceBuckets } from "../data/catalogFilters";
import {
  getDateCategory,
  getDurationCategory,
  parseDateValue,
  parseDurationWeeks,
} from "../utils/programUtils";

const SHOW_PRICE_FILTER = false;

function getInitialFilters(params, tagOptions) {
  const durationParam = params.get("duration");
  const dateParam = params.get("date");
  const tagsParam = params.get("tags");
  const trackParam = params.get("track");

  const durationMode = ["any", "court", "long", "rythme"].includes(durationParam)
    ? durationParam
    : "any";

  const dateModeMap = { any: 0, now: 1, later: 2 };
  const dateMode = dateModeMap[dateParam] ?? 0;

  let selectedTags = [];
  if (trackParam === "blockchain") selectedTags = ["Blockchain"];
  if (trackParam === "ia") selectedTags = ["IA"];

  if (tagsParam) {
    selectedTags = tagsParam
      .split(",")
      .map((item) => item.trim())
      .filter((item) => tagOptions.includes(item));
  }

  return { durationMode, dateMode, selectedTags };
}

export default function ProgramCatalog({
  programsList,
  onOpenProgram,
  onHome,
  isLoading = false,
  error = null,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const durationValues = useMemo(
    () => programsList.map((item) => parseDurationWeeks(item.duration)),
    [programsList]
  );
  const dateValues = useMemo(
    () => programsList.map((item) => parseDateValue(item.date)),
    [programsList]
  );
  const tagOptions = useMemo(
    () => [...new Set(programsList.flatMap((item) => item.tags))].sort(),
    [programsList]
  );
  const initialFilters = useMemo(
    () => getInitialFilters(searchParams, tagOptions),
    [searchParams, tagOptions]
  );

  const [durationMode, setDurationMode] = useState(initialFilters.durationMode);
  const [dateMode, setDateMode] = useState(initialFilters.dateMode);
  const [selectedTags, setSelectedTags] = useState(initialFilters.selectedTags);
  const [priceMode, setPriceMode] = useState(0);

  useEffect(() => {
    setDurationMode(initialFilters.durationMode);
    setDateMode(initialFilters.dateMode);
    setSelectedTags(initialFilters.selectedTags);
  }, [initialFilters]);

  const toggle = (value, setFn) => {
    setFn((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const filteredPrograms = useMemo(() => {
    return programsList.filter((program) => {
      const durationCategory = getDurationCategory(program.duration, durationValues);
      const dateCategory = getDateCategory(program.date, dateValues);
      const durationMatch =
        durationMode === "any" ||
        (durationMode === "court" && durationCategory === "court") ||
        (durationMode === "long" && durationCategory === "long") ||
        (durationMode === "rythme" && durationCategory === "rythme");
      const dateMatch =
        dateMode === 0 ||
        (dateMode === 1 && dateCategory === "now") ||
        (dateMode === 2 && dateCategory === "later");
      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => program.tags.includes(tag));
      const priceMatch =
        !SHOW_PRICE_FILTER ||
        priceMode === 0 ||
        (priceMode === 1 && priceBuckets[0].test(program.price)) ||
        (priceMode === 2 && priceBuckets[1].test(program.price)) ||
        (priceMode === 3 && priceBuckets[2].test(program.price));

      return durationMatch && dateMatch && tagMatch && priceMatch;
    });
  }, [
    programsList,
    durationValues,
    dateValues,
    durationMode,
    dateMode,
    selectedTags,
    priceMode,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("track");
    params.delete("duration");
    params.delete("date");
    params.delete("tags");
    params.delete("price");

    if (durationMode !== "any") params.set("duration", durationMode);
    if (dateMode === 1) params.set("date", "now");
    if (dateMode === 2) params.set("date", "later");
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    if (SHOW_PRICE_FILTER && priceMode !== 0) params.set("price", String(priceMode));

    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [durationMode, dateMode, selectedTags, priceMode, searchParams, setSearchParams]);

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <section className="hero programs-hero">
        <nav className="breadcrumbs" aria-label="Fil d'Ariane">
          <button type="button" className="breadcrumb-link" onClick={onHome}>
            Accueil
          </button>
          <span className="breadcrumb-sep">/</span>
          <span aria-current="page">Programmes</span>
        </nav>
        <div className="section-head">
          <h1>Catalogue des programmes</h1>
          <p>
            20 formations blockchain et intelligence artificielle, avec formats
            varies et admissions tout au long de l'annee.
          </p>
        </div>
      </section>

      <section className="catalog-layout">
        <div className="filters-panel" role="region" aria-label="Filtres du catalogue">
          <div className="filters-title-row">
            <h2>Filtres</h2>
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setDurationMode("any");
                setDateMode(0);
                setSelectedTags([]);
                setPriceMode(0);
              }}
            >
              Reinitialiser
            </button>
          </div>

          <div className="filter-block">
            <h3>Duree</h3>
            <label className="sr-only" htmlFor="duration-filter">
              Filtrer par duree
            </label>
            <select
              id="duration-filter"
              className="filter-select"
              value={durationMode}
              onChange={(event) => setDurationMode(event.target.value)}
            >
              <option value="any">Indifferent</option>
              <option value="court">Court</option>
              <option value="long">Long</option>
              <option value="rythme">A mon rythme</option>
            </select>
          </div>

          <div className="filter-block">
            <h3>Date</h3>
            <label className="sr-only" htmlFor="date-filter">
              Filtrer par periode de date
            </label>
            <input
              id="date-filter"
              aria-label="Filtrer par periode de date"
              className="segment-slider"
              type="range"
              min="0"
              max="2"
              step="1"
              value={dateMode}
              onChange={(event) => setDateMode(Number(event.target.value))}
            />
            <div className="segment-labels">
              <span className={dateMode === 0 ? "active" : ""}>Indifferent</span>
              <span className={dateMode === 1 ? "active" : ""}>Tout de suite</span>
              <span className={dateMode === 2 ? "active" : ""}>Plus tard</span>
            </div>
          </div>

          {SHOW_PRICE_FILTER && (
            <div className="filter-block">
              <h3>Prix</h3>
              <input
                className="segment-slider"
                type="range"
                min="0"
                max="3"
                step="1"
                value={priceMode}
                onChange={(event) => setPriceMode(Number(event.target.value))}
              />
              <div className="segment-labels">
                <span className={priceMode === 0 ? "active" : ""}>Indifferent</span>
                <span className={priceMode === 1 ? "active" : ""}>Budget</span>
                <span className={priceMode === 2 ? "active" : ""}>Intermediaire</span>
                <span className={priceMode === 3 ? "active" : ""}>Premium</span>
              </div>
            </div>
          )}

          <div className="filter-block">
            <h3>Tags</h3>
            <div className="tag-list">
              {tagOptions.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={`tag-chip ${selectedTags.includes(tag) ? "active" : ""}`}
                  aria-pressed={selectedTags.includes(tag)}
                  onClick={() => toggle(tag, setSelectedTags)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          {isLoading ? (
            <p className="results-count" aria-live="polite">
              Chargement des programmes...
            </p>
          ) : (
            <>
              {error && (
                <p className="results-count" aria-live="polite">
                  Le catalogue est affiche en mode local (connexion Supabase indisponible).
                </p>
              )}
              <p className="results-count" aria-live="polite">
                {filteredPrograms.length} programmes trouves
              </p>
              <div className="catalog-grid">
                {filteredPrograms.map((program) => (
                  <button
                    key={program.id}
                    type="button"
                    className="catalog-card catalog-card-button"
                    onClick={() => onOpenProgram(program.slug)}
                    aria-label={`Ouvrir la formation ${program.title}`}
                  >
                    <img src={program.image} alt={program.title} className="catalog-image" />
                    <div className="catalog-content">
                      <div className="catalog-tags">
                        {program.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <h3>{program.title}</h3>
                      <p>{program.subtitle}</p>
                      <div className="catalog-meta">
                        <span>Date: {program.date}</span>
                        <span>Duree: {program.duration}</span>
                        <span>Prix: {program.price.toLocaleString("fr-FR")} EUR</span>
                      </div>
                      <span className="catalog-cta">Voir la fiche complete</span>
                    </div>
                  </button>
                ))}
              </div>
              {filteredPrograms.length === 0 && (
                <p className="results-count">Aucun programme ne correspond a ces filtres.</p>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
