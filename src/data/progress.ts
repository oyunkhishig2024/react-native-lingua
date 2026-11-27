import type { LearningProgress } from "@/types/learning";

// Sample progress for the home and lesson screens. Replace with a store once lessons can be completed.
export const progress: LearningProgress = {
  streakDays: 12,
  dailyGoalXp: 20,
  currentLessonIds: {
    es: "es-cafe",
    fr: "fr-cafe",
    ja: "ja-cafe",
    ko: "ko-cafe",
    de: "de-cafe",
    zh: "zh-cafe",
  },
  completedLessonIds: [
    "es-cafe",
    "fr-cafe",
    "ja-cafe",
    "ko-cafe",
    "de-cafe",
    "zh-cafe",
  ],
};
