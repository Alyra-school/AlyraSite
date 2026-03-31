"use client";

import { useEffect, useMemo, useState } from "react";
import { priceBuckets } from "../data/catalogFilters";
import {
  getDateCategory,
  getDurationCategory,
  parseDateValue,
  parseDurationWeeks,
} from "../utils/programUtils";

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

export function useProgramFilters({
  programs,
  searchParams,
  pathname,
  router,
  showPriceFilter,
}) {
  const durationValues = useMemo(
    () => programs.map((item) => parseDurationWeeks(item.duration)),
    [programs]
  );
  const dateValues = useMemo(() => programs.map((item) => parseDateValue(item.date)), [programs]);
  const tagOptions = useMemo(
    () => [...new Set(programs.flatMap((item) => item.tags))].sort(),
    [programs]
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

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
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
        !showPriceFilter ||
        priceMode === 0 ||
        (priceMode === 1 && priceBuckets[0].test(program.price)) ||
        (priceMode === 2 && priceBuckets[1].test(program.price)) ||
        (priceMode === 3 && priceBuckets[2].test(program.price));

      return durationMatch && dateMatch && tagMatch && priceMatch;
    });
  }, [
    programs,
    durationValues,
    dateValues,
    durationMode,
    dateMode,
    selectedTags,
    priceMode,
    showPriceFilter,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("track");
    params.delete("duration");
    params.delete("date");
    params.delete("tags");
    params.delete("price");

    if (durationMode !== "any") params.set("duration", durationMode);
    if (dateMode === 1) params.set("date", "now");
    if (dateMode === 2) params.set("date", "later");
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    if (showPriceFilter && priceMode !== 0) params.set("price", String(priceMode));

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();
    if (nextQuery !== currentQuery) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    }
  }, [
    durationMode,
    dateMode,
    selectedTags,
    priceMode,
    showPriceFilter,
    searchParams,
    router,
    pathname,
  ]);

  const toggleTag = (value) => {
    setSelectedTags((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const resetFilters = () => {
    setDurationMode("any");
    setDateMode(0);
    setSelectedTags([]);
    setPriceMode(0);
  };

  return {
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
  };
}
