"use client";

import { useEffect, useState } from "react";

export function useProgramHydration(programsList) {
  const [hydratedPrograms, setHydratedPrograms] = useState(programsList);
  const [clientLoading, setClientLoading] = useState(false);
  const [clientError, setClientError] = useState(null);

  useEffect(() => {
    setHydratedPrograms(programsList);
  }, [programsList]);

  useEffect(() => {
    if (programsList.length > 0) return;
    let isMounted = true;

    async function loadFromApi() {
      setClientLoading(true);
      try {
        const response = await fetch("/api/programs", { cache: "no-store" });
        const payload = await response.json();
        if (!isMounted) return;
        setHydratedPrograms(payload.programs ?? []);
      } catch {
        if (!isMounted) return;
        setClientError("Impossible de recuperer les programmes pour le moment.");
      } finally {
        if (isMounted) setClientLoading(false);
      }
    }

    loadFromApi();
    return () => {
      isMounted = false;
    };
  }, [programsList]);

  return { hydratedPrograms, clientLoading, clientError };
}
