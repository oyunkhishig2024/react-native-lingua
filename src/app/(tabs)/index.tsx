import { useUser } from "@clerk/expo";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ContinueLearningCard } from "@/components/ContinueLearningCard";
import { DailyGoalCard } from "@/components/DailyGoalCard";
import { Image } from "@/components/Image";
import { TodayPlan, type PlanItem } from "@/components/TodayPlan";
import { images } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { progress } from "@/data/progress";
import { getUnitsByLanguage } from "@/data/units";
import { posthog } from "@/lib/posthog";
import { posthogLog } from "@/lib/posthog-log";
import { useLanguageStore } from "@/store/languageStore";
import { colors } from "@/theme";
import type { Lesson } from "@/types/learning";

function getTodayPlan(lesson: Lesson, isLessonDone: boolean): PlanItem[] {
  const conversation = lesson.activities.find(
    (activity) => activity.type === "conversation",
  );

  return [
    {
      id: "lesson",
      title: "Lesson",
      subtitle: lesson.title,
      icon: images.planLesson,
      tileClassName: "bg-[#5f48ee]",
      isDone: isLessonDone,
    },
    {
      id: "conversation",
      title: "AI Conversation",
      subtitle: conversation?.title ?? lesson.description,
      icon: images.planConversation,
      tileClassName: "bg-[#5f48ee]",
      isDone: false,
    },
    {
      id: "words",
      title: "New words",
      subtitle: `${lesson.vocabulary.length} words`,
      icon: images.planWords,
      tileClassName: "bg-[#ee706b]",
      isDone: false,
    },
  ];
}

export default function Home() {
  const { user } = useUser();
  const selectedId = useLanguageStore((state) => state.selectedLanguageId);
  const language = selectedId ? getLanguageById(selectedId) : undefined;

  // The tab layout only opens once a language is selected
  if (!language) {
    return null;
  }

  const name =
    user?.firstName ??
    user?.username ??
    user?.primaryEmailAddress?.emailAddress.split("@")[0] ??
    "there";

  // Some languages have no lessons yet, so these can be undefined
  const lessonId = progress.currentLessonIds[language.id];
  const lesson = lessonId ? getLessonById(lessonId) : undefined;
  const unit = getUnitsByLanguage(language.id).find(
    (item) => item.id === lesson?.unitId,
  );
  const isLessonDone =
    lesson !== undefined && progress.completedLessonIds.includes(lesson.id);

  const openLearn = (entryPoint: "continue_card" | "today_plan") => {
    posthog?.capture("learning_entry_opened", {
      entry_point: entryPoint,
      language_id: language.id,
      ...(lesson ? { lesson_id: lesson.id } : {}),
    });
    posthogLog.info("learning_entry_opened", {
      entry_point: entryPoint,
      language_id: language.id,
      ...(lesson ? { lesson_id: lesson.id } : {}),
    });
    router.navigate("/learn");
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-[480px] self-center px-4">
          {/* Header: flag, greeting, streak, notifications */}
          <View className="mt-4 h-8 flex-row items-center">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Learning ${language.name}. Change language`}
              hitSlop={8}
              onPress={() => router.push("/language-selection")}
              className="home__flag"
            >
              <Image
                source={language.flagUrl}
                className="h-full w-full"
                // China's stars sit on the left edge, so don't crop that side
                contentPosition={language.id === "zh" ? "left" : "center"}
              />
            </Pressable>
            <Text numberOfLines={1} className="home__greeting ml-3 flex-1">
              {language.greeting}, {name}! 👋
            </Text>

            <View
              accessible
              accessibilityLabel={`${progress.streakDays} day streak`}
              className="ml-2 flex-row items-center"
            >
              {/* Crops the square campfire image down to just the flame */}
              <View className="h-[25px] w-[22px] overflow-hidden rounded-b-[11px]">
                <Image
                  source={images.streakFire}
                  className="absolute left-[-14px] top-[-9px] h-[50px] w-[50px]"
                />
              </View>
              <Text className="home__streak ml-2">{progress.streakDays}</Text>
            </View>
            <Image
              accessibilityLabel="Notifications"
              source={images.bell}
              className="ml-[22px] mr-[2px] h-[24px] w-[24px]"
            />
          </View>

          <View className="mt-7">
            <DailyGoalCard
              xp={isLessonDone ? lesson.xpReward : 0}
              goal={progress.dailyGoalXp}
            />
          </View>

          <View className="mt-5">
            <ContinueLearningCard
              languageName={language.name}
              subtitle={
                unit ? `${unit.level} • Unit ${unit.order}` : "Coming soon"
              }
              buttonLabel={lesson ? "Continue" : "Change"}
              onPress={
                lesson
                  ? () => openLearn("continue_card")
                  : () => router.push("/language-selection")
              }
            />
          </View>

          <View className="mt-6">
            {lesson ? (
              <TodayPlan
                items={getTodayPlan(lesson, isLessonDone)}
                onViewAll={() => openLearn("today_plan")}
              />
            ) : (
              <View className="items-center rounded-2xl bg-surface px-5 py-6">
                <Text className="plan__title">No plan yet</Text>
                <Text className="plan__subtitle text-center">
                  {language.name} lessons are on the way.
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
