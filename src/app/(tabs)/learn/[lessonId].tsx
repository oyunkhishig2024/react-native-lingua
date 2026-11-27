import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CallControls } from "@/components/CallControls";
import { FeedbackCard } from "@/components/FeedbackCard";
import { Image } from "@/components/Image";
import { LessonDetails } from "@/components/LessonDetails";
import { images } from "@/constants/images";
import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { progress } from "@/data/progress";
import { units } from "@/data/units";
import { colors } from "@/theme";
import type { Language, Lesson } from "@/types/learning";

// Below this the fox gets squashed, so short screens scroll instead
const MIN_STAGE_HEIGHT = 560;

const goBack = () => router.dismissTo("/learn");

export default function AudioLesson() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const lesson = getLessonById(lessonId);
  const unit = units.find((item) => item.id === lesson?.unitId);
  const language = unit ? getLanguageById(unit.languageId) : undefined;

  if (!lesson || !language) {
    return (
      <SafeAreaView style={styles.screen}>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="plan__title">Lesson not found</Text>
          <Pressable
            accessibilityRole="button"
            hitSlop={12}
            onPress={goBack}
            className="mt-3"
          >
            <Text className="plan__link">Back to lessons</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // The key resets the call controls when a different lesson is opened
  return <LessonCall key={lesson.id} lesson={lesson} language={language} />;
}

type LessonCallProps = {
  lesson: Lesson;
  language: Language;
};

// UI only for now: no audio is recorded or played yet
function LessonCall({ lesson, language }: LessonCallProps) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [notice, setNotice] = useState<string>();
  const [viewportHeight, setViewportHeight] = useState(0);

  // The teacher greets the learner first, then goes through the phrases
  const messages = [
    {
      id: "opening",
      // Only Spanish opens with an upside-down exclamation mark
      text: `${language.id === "es" ? "¡" : ""}${language.greeting}!`,
      translation: lesson.aiTeacherPrompt.openingLine,
    },
    ...lesson.phrases,
  ];
  const message = messages[messageIndex] ?? messages[0];

  const showMessage = (index: number) => {
    setNotice(undefined);
    setMessageIndex(index);
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />

      <View className="w-full max-w-[480px] flex-row items-center self-center pb-3 pl-3 pr-4 pt-2">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={12}
          onPress={goBack}
        >
          <Image source={images.chevronLeft} className="h-[24px] w-[24px]" />
        </Pressable>
        <View className="ml-5 mr-2 flex-1">
          <Text numberOfLines={1} className="audio-lesson__title">
            AI Teacher
          </Text>
          <View
            accessibilityLiveRegion="polite"
            className="flex-row items-center"
          >
            <View
              className={`mr-[6px] h-[10px] w-[10px] rounded-full ${
                isMicOn ? "bg-[#5ccb2f]" : "bg-warning"
              }`}
            />
            <Text numberOfLines={1} className="audio-lesson__status">
              {notice ?? (isMicOn ? "Online" : "Online • Mic off")}
            </Text>
          </View>
        </View>

        <View className="flex-row gap-2">
          <View
            accessible
            accessibilityLabel="Audio lesson"
            className="audio-lesson__badge"
          >
            <Image source={images.video} className="h-[19px] w-[19px]" />
          </View>
          <View
            accessible
            accessibilityLabel={`${progress.streakDays} day streak`}
            className="audio-lesson__badge"
          >
            <Text className="audio-lesson__badge-text">
              {progress.streakDays}
            </Text>
          </View>
          <View
            accessible
            accessibilityLabel="Notifications"
            className="audio-lesson__badge"
          >
            <Image source={images.bell} className="h-[20px] w-[20px]" />
          </View>
        </View>
      </View>

      <ScrollView
        onLayout={(event) => setViewportHeight(event.nativeEvent.layout.height)}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-[480px] self-center">
          {/* The call fills the screen; lesson details are a scroll away */}
          <View
            className="audio-lesson__stage mx-1"
            style={{ height: Math.max(viewportHeight - 8, MIN_STAGE_HEIGHT) }}
          >
            <Image
              source={images.teacherRoom}
              contentFit="cover"
              contentPosition="top"
              className="absolute inset-0"
            />
            <View className="audio-lesson__fade absolute bottom-0 left-0 right-0" />

            {/* Teacher: the empty space under the fox hides behind the bubble */}
            <View className="flex-1">
              <Image
                accessibilityLabel="Your AI teacher, a waving fox"
                source={images.mascotAuth}
                contentFit="contain"
                contentPosition="bottom"
                className="absolute bottom-[-96px] left-[-12px] right-[12px] top-0"
              />
            </View>

            <View className="audio-lesson__bubble mx-[48px]">
              <Pressable
                accessibilityRole="button"
                accessibilityHint="Shows the next phrase"
                onPress={() =>
                  showMessage((messageIndex + 1) % messages.length)
                }
                className="mr-3 flex-1"
              >
                <Text className="audio-lesson__bubble-text">
                  {message.text}
                </Text>
                {showSubtitles && (
                  <Text className="audio-lesson__bubble-text">
                    {message.translation}
                  </Text>
                )}
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Play audio"
                hitSlop={12}
                onPress={() => setNotice("Audio coming soon")}
              >
                <Image source={images.volume} className="h-[28px] w-[28px]" />
              </Pressable>
              <View style={styles.bubbleTail} />
            </View>

            <View className="mt-[30px]">
              <CallControls
                isMicOn={isMicOn}
                showSubtitles={showSubtitles}
                onCameraPress={() => setNotice("Audio-only lesson")}
                onToggleMic={() => {
                  setNotice(undefined);
                  setIsMicOn(!isMicOn);
                }}
                onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
                onEndCall={goBack}
              />
            </View>

            <View className="mx-[14px] mb-5 mt-5">
              <FeedbackCard />
            </View>

            {/* Which lesson this is, in the space left of the preview */}
            <View className="audio-lesson__pill absolute left-3 top-3">
              <Text numberOfLines={2} className="audio-lesson__pill-text">
                {language.name} • {lesson.title}
              </Text>
            </View>

            {/* A still picture of the learner: there is no camera */}
            <View className="audio-lesson__preview absolute right-[14px] top-[15px]">
              <Image
                accessibilityLabel="Your preview"
                source={images.studentPreview}
                contentFit="cover"
                className="h-full w-full"
              />
            </View>
          </View>

          <LessonDetails
            languageName={language.name}
            lesson={lesson}
            onSelectPhrase={(phraseId) =>
              showMessage(messages.findIndex((item) => item.id === phraseId))
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 16 },
  // A triangle under the speech bubble, made from borders
  bubbleTail: {
    position: "absolute",
    right: 28,
    bottom: -13,
    width: 0,
    height: 0,
    borderTopWidth: 14,
    borderTopColor: colors.background,
    borderLeftWidth: 16,
    borderLeftColor: "transparent",
  },
});
