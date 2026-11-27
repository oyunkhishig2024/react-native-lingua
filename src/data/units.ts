import type { LanguageId, Unit } from "@/types/learning";

// Sample content for every language.
export const units: Unit[] = [
  {
    id: "es-unit-1",
    languageId: "es",
    order: 1,
    title: "First Steps",
    description: "Say hello and talk about your day.",
    level: "A1",
  },
  {
    id: "es-unit-2",
    languageId: "es",
    order: 2,
    title: "Out and About",
    description: "Order food and drinks in town.",
    level: "A1",
  },
  {
    id: "fr-unit-1",
    languageId: "fr",
    order: 1,
    title: "First Steps",
    description: "Say hello and order at a café.",
    level: "A1",
  },
  {
    id: "ja-unit-1",
    languageId: "ja",
    order: 1,
    title: "First Steps",
    description: "Say hello and order at a café.",
    level: "A1",
  },
  {
    id: "ko-unit-1",
    languageId: "ko",
    order: 1,
    title: "First Steps",
    description: "Everyday basics, from hello to family.",
    level: "A1",
  },
  {
    id: "de-unit-1",
    languageId: "de",
    order: 1,
    title: "First Steps",
    description: "Everyday basics, from hello to family.",
    level: "A1",
  },
  {
    id: "zh-unit-1",
    languageId: "zh",
    order: 1,
    title: "First Steps",
    description: "Everyday basics, from hello to family.",
    level: "A1",
  },
];

export function getUnitsByLanguage(languageId: LanguageId) {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}
