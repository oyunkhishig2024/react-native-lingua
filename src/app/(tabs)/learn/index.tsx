import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LessonCard } from "@/components/LessonCard";
import { LessonHero } from "@/components/LessonHero";
import { getLessonsByLanguage } from "@/data/lessons";
import { progress } from "@/data/progress";
import { getUnitsByLanguage } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";
import { colors } from "@/theme";
import type { LessonStatus } from "@/types/learning";

const tabs = [
  { id: "lessons", label: "Lessons" },
  { id: "practice", label: "Practice" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Learn() {
  const languageId = useLanguageStore((state) => state.selectedLanguageId);
  const [activeTab, setActiveTab] = useState<TabId>("lessons");
  const [pickedLessonId, setPickedLessonId] = useState<string>();

  // The tab layout only opens once a language is selected
  if (!languageId) {
    return null;
  }

  const lessons = getLessonsByLanguage(languageId);
  const currentLessonId = progress.currentLessonIds[languageId];
  const currentIndex = lessons.findIndex((item) => item.id === currentLessonId);
  // Until the user taps one, or after a language change, show the current lesson
  const selectedLesson =
    lessons.find((item) => item.id === pickedLessonId) ??
    lessons[currentIndex] ??
    lessons[0];

  if (!selectedLesson) {
    return null;
  }

  const unit = getUnitsByLanguage(languageId).find(
    (item) => item.id === selectedLesson.unitId,
  );
  const position = lessons.indexOf(selectedLesson) + 1;

  const getStatus = (lessonId: string, index: number): LessonStatus => {
    if (lessonId === currentLessonId) return "in-progress";
    const isDone =
      index < currentIndex || progress.completedLessonIds.includes(lessonId);
    return isDone ? "completed" : "not-started";
  };

  const openLesson = (lessonId: string) => {
    // Keep it highlighted for when the learner comes back
    setPickedLessonId(lessonId);
    router.push({ pathname: "/learn/[lessonId]", params: { lessonId } });
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LessonHero
          title={selectedLesson.title}
          subtitle={`Unit ${unit?.order} • ${position} / ${lessons.length} lessons`}
          imageUrl={selectedLesson.imageUrl}
          onBack={() => router.navigate("/")}
        />

        <View className="w-full max-w-[480px] self-center">
          <View accessibilityRole="tablist" className="segmented mx-[13px]">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <Pressable
                  key={tab.id}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  onPress={() => setActiveTab(tab.id)}
                  className={`segmented__item ${
                    isActive ? "segmented__item--active" : ""
                  }`}
                >
                  <Text
                    className={`segmented__label ${
                      isActive ? "segmented__label--active" : ""
                    }`}
                  >
                    {tab.label}
                  </Text>
                  {isActive && <View className="segmented__indicator" />}
                </Pressable>
              );
            })}
          </View>

          <View className="mt-[21px] gap-[7px] px-5">
            {activeTab === "lessons" ? (
              lessons.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  number={index + 1}
                  status={getStatus(lesson.id, index)}
                  isSelected={lesson.id === selectedLesson.id}
                  onPress={() => openLesson(lesson.id)}
                />
              ))
            ) : (
              <View className="items-center rounded-2xl bg-surface px-5 py-6">
                <Text className="plan__title">Practice is coming soon</Text>
                <Text className="plan__subtitle text-center">
                  You’ll be able to review your lessons here.
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 16 },
});
