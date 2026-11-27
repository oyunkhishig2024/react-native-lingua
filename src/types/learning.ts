// Types for the hardcoded learning content in `src/data/`.
// Language -> Units -> Lessons -> Activities

export type LanguageId = "es" | "fr" | "ja" | "ko" | "de" | "zh";

export type Language = {
  id: LanguageId;
  name: string;
  nativeName: string;
  /** "Hello" in this language, shown on the home screen. */
  greeting: string;
  flagUrl: string;
  /** Display text, e.g. "28.4M learners". */
  learners: string;
};

export type Unit = {
  id: string;
  languageId: LanguageId;
  /** Position within the language, starting at 1. */
  order: number;
  title: string;
  description: string;
  /** CEFR level, e.g. "A1" for beginners. */
  level: "A1" | "A2";
};

export type VocabularyItem = {
  id: string;
  /** The word in the language being learned. */
  term: string;
  translation: string;
  /** How to say it, written for English speakers. */
  pronunciation: string;
};

export type Phrase = {
  id: string;
  text: string;
  translation: string;
  pronunciation: string;
};

type BaseActivity = {
  id: string;
  title: string;
};

// `type` tells TypeScript which extra fields an activity has.
export type Activity =
  /** Review the lesson's `vocabulary`. */
  | (BaseActivity & { type: "vocabulary" })
  /** Repeat the lesson's `phrases` out loud. */
  | (BaseActivity & { type: "phrases" })
  | (BaseActivity & {
      type: "multiple-choice";
      question: string;
      options: string[];
      /** Must match one of `options`. */
      correctAnswer: string;
    })
  /** Role-play with the AI teacher. */
  | (BaseActivity & { type: "conversation"; scenario: string });

/** What a Vision Agent needs to teach a lesson by voice. */
export type AITeacherPrompt = {
  systemPrompt: string;
  /** The first thing the teacher says. */
  openingLine: string;
};

export type Lesson = {
  id: string;
  unitId: string;
  /** Position within the unit, starting at 1. */
  order: number;
  title: string;
  description: string;
  /** Photo shown when the lesson is selected. */
  imageUrl: string;
  xpReward: number;
  goals: string[];
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacherPrompt: AITeacherPrompt;
};

export type LessonStatus = "completed" | "in-progress" | "not-started";

/** Mock progress until XP and completed lessons are tracked for real. */
export type LearningProgress = {
  streakDays: number;
  dailyGoalXp: number;
  /** The lesson the learner is on, for each language that has content. */
  currentLessonIds: Partial<Record<LanguageId, string>>;
  /** Lessons finished today. Their `xpReward` counts toward the daily goal. */
  completedLessonIds: string[];
};
