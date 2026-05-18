"use client";

import { useMemo } from "react";
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

  const durationMode = initialFilters.durationMode;
  const dateMode = initialFilters.dateMode;
  const selectedTags = initialFilters.selectedTags;
  const priceParam = Number(searchParams.get("price"));
  const priceMode = showPriceFilter && [1, 2, 3].includes(priceParam) ? priceParam : 0;

  const updateParams = (mutator) => {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const nextQuery = params.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  };

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

  const toggleTag = (value) => {
    updateParams((params) => {
      const currentTags = selectedTags.includes(value)
        ? selectedTags.filter((item) => item !== value)
        : [...selectedTags, value];
      params.delete("track");
      if (currentTags.length === 0) params.delete("tags");
      else params.set("tags", currentTags.join(","));
    });
  };

  const resetFilters = () => {
    updateParams((params) => {
      params.delete("duration");
      params.delete("date");
      params.delete("tags");
      params.delete("track");
      params.delete("price");
    });
  };

  return {
    tagOptions,
    filteredPrograms,
    durationMode,
    dateMode,
    selectedTags,
    priceMode,
    setDurationMode: (value) =>
      updateParams((params) => {
        params.delete("track");
        if (!value || value === "any") params.delete("duration");
        else params.set("duration", value);
      }),
    setDateMode: (value) =>
      updateParams((params) => {
        if (value === 1) params.set("date", "now");
        else if (value === 2) params.set("date", "later");
        else params.delete("date");
      }),
    setPriceMode: (value) =>
      updateParams((params) => {
        if (!showPriceFilter || value === 0) params.delete("price");
        else params.set("price", String(value));
      }),
    toggleTag,
    resetFilters,
  };
}
