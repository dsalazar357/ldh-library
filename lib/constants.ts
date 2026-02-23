export const DEGREES = Array.from({ length: 33 }, (_, i) => {
  const n = i + 1;
  const suffix =
    n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
  return { value: n, label: `${n}${suffix}` };
});

export const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "Other",
] as const;
