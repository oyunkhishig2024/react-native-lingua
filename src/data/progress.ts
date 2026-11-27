import type { LearningProgress } from "@/types/learning";

// Sample progress for the home screen. Replace with a store once lessons can be completed.
export const progress: LearningProgress = {
  streakDays: 12,
  dailyGoalXp: 20,
  currentLessonIds: { es: "es-cafe", fr: "fr-cafe", ja: "ja-cafe" },
  completedLessonIds: ["es-cafe", "fr-cafe", "ja-cafe"],
};
