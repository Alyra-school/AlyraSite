export default function CatalogFilters({
  tagOptions,
  durationMode,
  dateMode,
  selectedTags,
  priceMode,
  showPriceFilter,
  onDurationChange,
  onDateChange,
  onTagToggle,
  onPriceChange,
  onReset,
}) {
  return (
    <div className="filters-panel" role="region" aria-label="Filtres du catalogue">
      <div className="filters-title-row">
        <h2>Filtres</h2>
        <button type="button" className="text-button" onClick={onReset}>
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
          onChange={(event) => onDurationChange(event.target.value)}
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
          onChange={(event) => onDateChange(Number(event.target.value))}
        />
        <div className="segment-labels">
          <span className={dateMode === 0 ? "active" : ""}>Indifferent</span>
          <span className={dateMode === 1 ? "active" : ""}>Tout de suite</span>
          <span className={dateMode === 2 ? "active" : ""}>Plus tard</span>
        </div>
      </div>

      {showPriceFilter && (
        <div className="filter-block">
          <h3>Prix</h3>
          <input
            className="segment-slider"
            type="range"
            min="0"
            max="3"
            step="1"
            value={priceMode}
            onChange={(event) => onPriceChange(Number(event.target.value))}
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
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
