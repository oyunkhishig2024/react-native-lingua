import { Pressable, Text, View } from "react-native";

import { Image } from "@/components/Image";
import { images } from "@/constants/images";
import type { Lesson, LessonStatus } from "@/types/learning";

const statusLabels: Record<LessonStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  "not-started": "Not started",
};

type LessonCardProps = {
  lesson: Lesson;
  /** Position in the course, starting at 1. */
  number: number;
  status: LessonStatus;
  isSelected: boolean;
  onPress: () => void;
};

export function LessonCard({
  lesson,
  number,
  status,
  isSelected,
  onPress,
}: LessonCardProps) {
  // These cards show the lesson's photo instead of a status icon
  const showsThumbnail = isSelected || status === "in-progress";
  const accent = isSelected ? "lesson-card__text--accent" : "";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={`Lesson ${number}, ${lesson.title}, ${statusLabels[status]}`}
      onPress={onPress}
      className={`lesson-card ${
        isSelected ? "lesson-card--selected" : "lesson-card--idle"
      } ${!showsThumbnail && status === "not-started" ? "lesson-card--upcoming" : ""}`}
    >
      <View className="mr-3 flex-1">
        <Text className={`lesson-card__number ${accent}`}>Lesson {number}</Text>
        <Text
          className={`lesson-card__title ${
            showsThumbnail || status === "completed" ? "mt-2" : "mt-1"
          }`}
        >
          {lesson.title}
        </Text>
        {showsThumbnail ? (
          <Text className={`lesson-card__status mt-1 ${accent}`}>
            {statusLabels[status]}
          </Text>
        ) : status === "not-started" ? (
          <Text className="lesson-card__status mt-1.5">
            0 / {lesson.activities.length} activities
          </Text>
        ) : null}
      </View>

      {showsThumbnail ? (
        <View className="lesson-card__thumbnail">
          <Image
            source={lesson.imageUrl}
            contentFit="cover"
            className="h-full w-full"
          />
        </View>
      ) : (
        // The lock only means "not started": every lesson can be opened
        <Image
          source={
            status === "completed" ? images.checkCircleGreen : images.lock
          }
          className="mr-[3px] h-[22px] w-[22px]"
        />
      )}
    </Pressable>
  );
}
