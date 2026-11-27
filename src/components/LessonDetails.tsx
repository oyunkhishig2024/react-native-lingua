import { Pressable, Text, View } from "react-native";

import { Image } from "@/components/Image";
import { images } from "@/constants/images";
import type { Lesson } from "@/types/learning";

type LessonDetailsProps = {
  languageName: string;
  lesson: Lesson;
  /** Shows the phrase in the teacher's speech bubble. */
  onSelectPhrase: (phraseId: string) => void;
};

// What this lesson covers, listed under the call
export function LessonDetails({
  languageName,
  lesson,
  onSelectPhrase,
}: LessonDetailsProps) {
  return (
    <View className="gap-3 px-4 pt-4">
      <View className="lesson-details">
        <Text className="lesson-details__eyebrow">{languageName}</Text>
        <Text className="lesson-details__title">{lesson.title}</Text>
        <Text className="lesson-details__text">{lesson.description}</Text>
      </View>

      <View className="lesson-details">
        <Text className="lesson-details__heading">Goal</Text>
        {lesson.goals.map((goal) => (
          <Text key={goal} className="lesson-details__text">
            • {goal}
          </Text>
        ))}
      </View>

      <View className="lesson-details">
        <Text className="lesson-details__heading">Phrases</Text>
        {lesson.phrases.map((phrase) => (
          <Pressable
            key={phrase.id}
            accessibilityRole="button"
            accessibilityHint="Shows this phrase in the speech bubble"
            onPress={() => onSelectPhrase(phrase.id)}
            className="mt-3 flex-row items-center"
          >
            <View className="mr-3 flex-1">
              <Text className="lesson-details__phrase">{phrase.text}</Text>
              <Text className="lesson-details__text">{phrase.translation}</Text>
              <Text className="lesson-details__hint">
                {phrase.pronunciation}
              </Text>
            </View>
            <Image source={images.volume} className="h-[22px] w-[22px]" />
          </Pressable>
        ))}
      </View>

      <View className="lesson-details">
        <Text className="lesson-details__heading">Your AI teacher</Text>
        <Text className="lesson-details__phrase">
          “{lesson.aiTeacherPrompt.openingLine}”
        </Text>
        <Text className="lesson-details__text">
          {lesson.aiTeacherPrompt.systemPrompt}
        </Text>
      </View>
    </View>
  );
}
