export const priceBuckets = [
  { id: "low", label: "< 3000 EUR", test: (price) => price < 3000 },
  {
    id: "mid",
    label: "3000 EUR - 5000 EUR",
    test: (price) => price >= 3000 && price <= 5000,
  },
  { id: "high", label: "> 5000 EUR", test: (price) => price > 5000 },
];
