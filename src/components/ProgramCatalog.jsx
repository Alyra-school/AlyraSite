"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Breadcrumbs from "./Breadcrumbs";
import CatalogFilters from "./program-catalog/CatalogFilters";
import ProgramResults from "./program-catalog/ProgramResults";
import { useProgramHydration } from "../hooks/useProgramHydration";
import { useProgramFilters } from "../hooks/useProgramFilters";

const SHOW_PRICE_FILTER = false;

export default function ProgramCatalog({ programsList, isLoading = false, error = null }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { hydratedPrograms, clientLoading, clientError } = useProgramHydration(programsList);
  const {
    tagOptions,
    filteredPrograms,
    durationMode,
    dateMode,
    selectedTags,
    priceMode,
    setDurationMode,
    setDateMode,
    setPriceMode,
    toggleTag,
    resetFilters,
  } = useProgramFilters({
    programs: hydratedPrograms,
    searchParams,
    pathname,
    router,
    showPriceFilter: SHOW_PRICE_FILTER,
  });

  return (
    <main className="main-content" id="main-content" tabIndex="-1">
      <section className="hero programs-hero">
        <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Nos formations" }]} />
        <div className="section-head">
          <h1>Catalogue des formations</h1>
          <p>
            Formations blockchain et intelligence artificielle, avec formats
            varies et admissions tout au long de l'annee.
          </p>
        </div>
      </section>

      <section className="catalog-layout">
        <CatalogFilters
          tagOptions={tagOptions}
          durationMode={durationMode}
          dateMode={dateMode}
          selectedTags={selectedTags}
          priceMode={priceMode}
          showPriceFilter={SHOW_PRICE_FILTER}
          onDurationChange={setDurationMode}
          onDateChange={setDateMode}
          onTagToggle={toggleTag}
          onPriceChange={setPriceMode}
          onReset={resetFilters}
        />

        <div>
          <ProgramResults
            programs={filteredPrograms}
            isLoading={isLoading || clientLoading}
            error={(error || clientError) && (clientError ?? "Le catalogue est temporairement indisponible.")}
          />
        </div>
      </section>
    </main>
  );
}
