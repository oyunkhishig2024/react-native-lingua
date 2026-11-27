import type { AITeacherPrompt, Lesson } from "@/types/learning";

// Every teacher follows the same rules, so only the lesson details change.
function createTeacherPrompt(
  language: string,
  focus: string,
  openingLine: string,
): AITeacherPrompt {
  return {
    systemPrompt: [
      `You are a friendly, patient ${language} teacher for a complete beginner.`,
      `Always speak English and teach ${language} through English.`,
      "This is a voice lesson: keep each turn to one or two short sentences.",
      "Teach one word or phrase at a time and ask the learner to repeat it.",
      "Praise effort and gently correct mistakes.",
      `Lesson focus: ${focus}`,
    ].join("\n"),
    openingLine,
  };
}

export const lessons: Lesson[] = [
  // ---------- Spanish ----------
  {
    id: "es-greetings",
    unitId: "es-unit-1",
    order: 1,
    title: "Greetings & Introductions",
    description: "Say hello and tell people your name.",
    xpReward: 10,
    goals: ["Greet someone", "Introduce yourself", "Say goodbye"],
    vocabulary: [
      { id: "hola", term: "hola", translation: "hello", pronunciation: "OH-lah" },
      { id: "adios", term: "adiós", translation: "goodbye", pronunciation: "ah-DYOHS" },
      { id: "gracias", term: "gracias", translation: "thank you", pronunciation: "GRAH-syahs" },
    ],
    phrases: [
      { id: "me-llamo", text: "Me llamo Alex.", translation: "My name is Alex.", pronunciation: "meh YAH-moh AH-lehks" },
      { id: "como-estas", text: "¿Cómo estás?", translation: "How are you?", pronunciation: "KOH-moh ehs-TAHS" },
    ],
    activities: [
      { id: "words", type: "vocabulary", title: "New words" },
      { id: "speak", type: "phrases", title: "Say it out loud" },
      {
        id: "quiz",
        type: "multiple-choice",
        title: "Quick check",
        question: "How do you say “hello”?",
        options: ["adiós", "hola", "gracias"],
        correctAnswer: "hola",
      },
      { id: "talk", type: "conversation", title: "Meet someone", scenario: "You meet a new neighbor." },
    ],
    aiTeacherPrompt: createTeacherPrompt(
      "Spanish",
      "greetings and introductions: hola, adiós, gracias, Me llamo..., ¿Cómo estás?",
      "Hi! Today we'll learn to say hello in Spanish. Repeat after me: hola.",
    ),
  },
  {
    id: "es-daily-life",
    unitId: "es-unit-1",
    order: 2,
    title: "Daily Life",
    description: "Talk about your day.",
    xpReward: 10,
    goals: ["Name parts of the day", "Say what you do each day"],
    vocabulary: [
      { id: "manana", term: "la mañana", translation: "the morning", pronunciation: "lah mah-NYAH-nah" },
      { id: "noche", term: "la noche", translation: "the night", pronunciation: "lah NOH-cheh" },
      { id: "trabajo", term: "el trabajo", translation: "work", pronunciation: "ehl trah-BAH-hoh" },
    ],
    phrases: [
      { id: "me-despierto", text: "Me despierto temprano.", translation: "I wake up early.", pronunciation: "meh dehs-PYEHR-toh tehm-PRAH-noh" },
      { id: "voy-trabajo", text: "Voy al trabajo.", translation: "I go to work.", pronunciation: "boy ahl trah-BAH-hoh" },
    ],
    activities: [
      { id: "words", type: "vocabulary", title: "New words" },
      { id: "speak", type: "phrases", title: "Say it out loud" },
      {
        id: "quiz",
        type: "multiple-choice",
        title: "Quick check",
        question: "What does “la noche” mean?",
        options: ["the morning", "the night", "work"],
        correctAnswer: "the night",
      },
      { id: "talk", type: "conversation", title: "Your day", scenario: "A friend asks about your day." },
    ],
    aiTeacherPrompt: createTeacherPrompt(
      "Spanish",
      "daily routine: la mañana, la noche, el trabajo, Me despierto temprano, Voy al trabajo.",
      "Welcome back! Let's talk about your day in Spanish. Are you ready?",
    ),
  },
  {
    id: "es-cafe",
    unitId: "es-unit-2",
    order: 1,
    title: "At the Café",
    description: "Order a drink and ask for the bill.",
    xpReward: 15,
    goals: ["Order a drink politely", "Ask for the bill"],
    vocabulary: [
      { id: "cafe", term: "el café", translation: "coffee", pronunciation: "ehl kah-FEH" },
      { id: "agua", term: "el agua", translation: "water", pronunciation: "ehl AH-gwah" },
      { id: "cuenta", term: "la cuenta", translation: "the bill", pronunciation: "lah KWEHN-tah" },
    ],
    phrases: [
      { id: "quisiera", text: "Quisiera un café, por favor.", translation: "I would like a coffee, please.", pronunciation: "kee-SYEH-rah oon kah-FEH por fah-BOR" },
      { id: "la-cuenta", text: "La cuenta, por favor.", translation: "The bill, please.", pronunciation: "lah KWEHN-tah por fah-BOR" },
    ],
    activities: [
      { id: "words", type: "vocabulary", title: "New words" },
      { id: "speak", type: "phrases", title: "Say it out loud" },
      {
        id: "quiz",
        type: "multiple-choice",
        title: "Quick check",
        question: "How do you ask for the bill?",
        options: ["La cuenta, por favor.", "Un café, por favor.", "Muchas gracias."],
        correctAnswer: "La cuenta, por favor.",
      },
      { id: "talk", type: "conversation", title: "Order a coffee", scenario: "You are a customer and the teacher is the waiter." },
    ],
    aiTeacherPrompt: createTeacherPrompt(
      "Spanish",
      "ordering at a café: el café, el agua, la cuenta, Quisiera..., por favor. End with a short role-play as the waiter.",
      "Hi there! Imagine we're in a café in Spain. Let's learn how to order a coffee.",
    ),
  },

  // ---------- French ----------
  {
    id: "fr-greetings",
    unitId: "fr-unit-1",
    order: 1,
    title: "Greetings & Introductions",
    description: "Say hello and tell people your name.",
    xpReward: 10,
    goals: ["Greet someone", "Introduce yourself", "Say goodbye"],
    vocabulary: [
      { id: "bonjour", term: "bonjour", translation: "hello", pronunciation: "bohn-ZHOOR" },
      { id: "au-revoir", term: "au revoir", translation: "goodbye", pronunciation: "oh ruh-VWAHR" },
      { id: "merci", term: "merci", translation: "thank you", pronunciation: "mehr-SEE" },
    ],
    phrases: [
      { id: "je-mappelle", text: "Je m'appelle Alex.", translation: "My name is Alex.", pronunciation: "zhuh mah-PEHL ah-LEHKS" },
      { id: "ca-va", text: "Comment ça va ?", translation: "How are you?", pronunciation: "koh-MAHN sah VAH" },
    ],
    activities: [
      { id: "words", type: "vocabulary", title: "New words" },
      { id: "speak", type: "phrases", title: "Say it out loud" },
      {
        id: "quiz",
        type: "multiple-choice",
        title: "Quick check",
        question: "How do you say “thank you”?",
        options: ["bonjour", "merci", "au revoir"],
        correctAnswer: "merci",
      },
      { id: "talk", type: "conversation", title: "Meet someone", scenario: "You meet a new classmate." },
    ],
    aiTeacherPrompt: createTeacherPrompt(
      "French",
      "greetings and introductions: bonjour, au revoir, merci, Je m'appelle..., Comment ça va ?",
      "Hi! Today we'll learn to say hello in French. Repeat after me: bonjour.",
    ),
  },
  {
    id: "fr-cafe",
    unitId: "fr-unit-1",
    order: 2,
    title: "At the Café",
    description: "Order a drink and ask for the bill.",
    xpReward: 15,
    goals: ["Order a drink politely", "Ask for the bill"],
    vocabulary: [
      { id: "cafe", term: "le café", translation: "coffee", pronunciation: "luh kah-FEH" },
      { id: "eau", term: "l'eau", translation: "water", pronunciation: "LOH" },
      { id: "addition", term: "l'addition", translation: "the bill", pronunciation: "lah-dee-SYOHN" },
    ],
    phrases: [
      { id: "je-voudrais", text: "Je voudrais un café, s'il vous plaît.", translation: "I would like a coffee, please.", pronunciation: "zhuh voo-DREH uhn kah-FEH seel voo PLEH" },
      { id: "laddition", text: "L'addition, s'il vous plaît.", translation: "The bill, please.", pronunciation: "lah-dee-SYOHN seel voo PLEH" },
    ],
    activities: [
      { id: "words", type: "vocabulary", title: "New words" },
      { id: "speak", type: "phrases", title: "Say it out loud" },
      {
        id: "quiz",
        type: "multiple-choice",
        title: "Quick check",
        question: "What does “l'eau” mean?",
        options: ["coffee", "water", "the bill"],
        correctAnswer: "water",
      },
      { id: "talk", type: "conversation", title: "Order a coffee", scenario: "You are a customer and the teacher is the waiter." },
    ],
    aiTeacherPrompt: createTeacherPrompt(
      "French",
      "ordering at a café: le café, l'eau, l'addition, Je voudrais..., s'il vous plaît. End with a short role-play as the waiter.",
      "Hi there! Imagine we're in a café in Paris. Let's learn how to order a coffee.",
    ),
  },

  // ---------- Japanese ----------
  {
    id: "ja-greetings",
    unitId: "ja-unit-1",
    order: 1,
    title: "Greetings & Introductions",
    description: "Say hello and tell people your name.",
    xpReward: 10,
    goals: ["Greet someone", "Introduce yourself", "Say goodbye"],
    vocabulary: [
      { id: "konnichiwa", term: "こんにちは", translation: "hello", pronunciation: "kohn-nee-chee-wah" },
      { id: "sayounara", term: "さようなら", translation: "goodbye", pronunciation: "sah-yoh-nah-rah" },
      { id: "arigatou", term: "ありがとう", translation: "thank you", pronunciation: "ah-ree-gah-toh" },
    ],
    phrases: [
      { id: "watashi-wa", text: "わたしはアレックスです。", translation: "I am Alex.", pronunciation: "wah-tah-shee wah ah-rehk-koo-soo dehs" },
      { id: "hajimemashite", text: "はじめまして。", translation: "Nice to meet you.", pronunciation: "hah-jee-meh-mahsh-teh" },
    ],
    activities: [
      { id: "words", type: "vocabulary", title: "New words" },
      { id: "speak", type: "phrases", title: "Say it out loud" },
      {
        id: "quiz",
        type: "multiple-choice",
        title: "Quick check",
        question: "How do you say “hello”?",
        options: ["さようなら", "こんにちは", "ありがとう"],
        correctAnswer: "こんにちは",
      },
      { id: "talk", type: "conversation", title: "Meet someone", scenario: "You meet a new coworker." },
    ],
    aiTeacherPrompt: createTeacherPrompt(
      "Japanese",
      "greetings and introductions: konnichiwa, sayounara, arigatou, watashi wa ... desu, hajimemashite.",
      "Hi! Today we'll learn to say hello in Japanese. Repeat after me: konnichiwa.",
    ),
  },
  {
    id: "ja-cafe",
    unitId: "ja-unit-1",
    order: 2,
    title: "At the Café",
    description: "Order a drink and ask for the bill.",
    xpReward: 15,
    goals: ["Order a drink politely", "Ask for the bill"],
    vocabulary: [
      { id: "koohii", term: "コーヒー", translation: "coffee", pronunciation: "koh-hee" },
      { id: "mizu", term: "みず", translation: "water", pronunciation: "mee-zoo" },
      { id: "okaikei", term: "おかいけい", translation: "the bill", pronunciation: "oh-kai-keh" },
    ],
    phrases: [
      { id: "koohii-kudasai", text: "コーヒーをください。", translation: "Coffee, please.", pronunciation: "koh-hee oh koo-dah-sai" },
      { id: "okaikei-onegaishimasu", text: "おかいけいをおねがいします。", translation: "The bill, please.", pronunciation: "oh-kai-keh oh oh-neh-gai shee-mahs" },
    ],
    activities: [
      { id: "words", type: "vocabulary", title: "New words" },
      { id: "speak", type: "phrases", title: "Say it out loud" },
      {
        id: "quiz",
        type: "multiple-choice",
        title: "Quick check",
        question: "What does “みず” mean?",
        options: ["coffee", "water", "the bill"],
        correctAnswer: "water",
      },
      { id: "talk", type: "conversation", title: "Order a coffee", scenario: "You are a customer and the teacher is the server." },
    ],
    aiTeacherPrompt: createTeacherPrompt(
      "Japanese",
      "ordering at a café: koohii, mizu, okaikei, ... o kudasai, ... o onegaishimasu. End with a short role-play as the server.",
      "Hi there! Imagine we're in a café in Tokyo. Let's learn how to order a coffee.",
    ),
  },
];

export function getLessonsByUnit(unitId: string) {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonById(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}
