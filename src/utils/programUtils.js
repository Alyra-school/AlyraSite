export function parseDurationWeeks(duration) {
  const match = duration.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

const monthIndex = {
  janvier: 1,
  fevrier: 2,
  mars: 3,
  avril: 4,
  mai: 5,
  juin: 6,
  juillet: 7,
  aout: 8,
  septembre: 9,
  octobre: 10,
  novembre: 11,
  decembre: 12,
};

export function parseDateValue(date) {
  const [monthRaw, yearRaw] = date.toLowerCase().split(" ");
  const month = monthIndex[monthRaw] ?? 0;
  const year = Number(yearRaw) || 0;
  return year * 100 + month;
}

export function getDurationCategory(duration, durationValues) {
  const weeks = parseDurationWeeks(duration);
  if (durationValues.length === 0) return "long";
  const sorted = [...durationValues].sort((a, b) => a - b);
  const chunk = Math.ceil(sorted.length / 3);
  const firstLimit = sorted[Math.min(chunk - 1, sorted.length - 1)];
  const secondLimit = sorted[Math.min(chunk * 2 - 1, sorted.length - 1)];

  if (weeks <= firstLimit) return "court";
  if (weeks <= secondLimit) return "long";
  return "rythme";
}

export function getDateCategory(date, dateValues) {
  const value = parseDateValue(date);
  if (dateValues.length === 0) return "later";
  const sorted = [...dateValues].sort((a, b) => a - b);
  const middleLimit = sorted[Math.floor((sorted.length - 1) / 2)];
  return value <= middleLimit ? "now" : "later";
}
