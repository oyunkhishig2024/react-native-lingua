import type { Language, LanguageId } from "@/types/learning";

// To add a language: add its id to `LanguageId`, then add an entry here.
export const languages: Language[] = [
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    greeting: "Hola",
    flagUrl: "https://flagcdn.com/w160/es.png",
    learners: "28.4M learners",
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    greeting: "Bonjour",
    flagUrl: "https://flagcdn.com/w160/fr.png",
    learners: "19.4M learners",
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語",
    greeting: "こんにちは",
    flagUrl: "https://flagcdn.com/w160/jp.png",
    learners: "12.7M learners",
  },
  {
    id: "ko",
    name: "Korean",
    nativeName: "한국어",
    greeting: "안녕하세요",
    flagUrl: "https://flagcdn.com/w160/kr.png",
    learners: "9.3M learners",
  },
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    greeting: "Hallo",
    flagUrl: "https://flagcdn.com/w160/de.png",
    learners: "8.1M learners",
  },
  {
    id: "zh",
    name: "Chinese",
    nativeName: "中文",
    greeting: "你好",
    flagUrl: "https://flagcdn.com/w160/cn.png",
    learners: "7.4M learners",
  },
];

export function getLanguageById(id: LanguageId) {
  return languages.find((language) => language.id === id);
}
