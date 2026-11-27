import { Text, View } from "react-native";

// Sample ratings until the AI teacher can score the learner
const ratings = [
  {
    label: "Speaking",
    value: "Excellent",
    valueClassName: "text-[#4cb82c]",
    columnClassName: "flex-1",
  },
  {
    label: "Pronunciation",
    value: "Great",
    valueClassName: "text-[#2f74f0]",
    columnClassName: "flex-[1.25] border-l border-r border-[#eceef3]",
  },
  {
    label: "Grammar",
    value: "Good",
    valueClassName: "text-lingua-deep-purple",
    columnClassName: "flex-1",
  },
];

export function FeedbackCard() {
  return (
    <View className="feedback-card">
      {ratings.map((rating) => (
        <View
          key={rating.label}
          accessible
          accessibilityLabel={`${rating.label}: ${rating.value}`}
          className={`items-center ${rating.columnClassName}`}
        >
          {/* Text lines up on the left, and the pair sits in the middle */}
          <View>
            <Text numberOfLines={1} className="feedback-card__label">
              {rating.label}
            </Text>
            <Text className={`feedback-card__value ${rating.valueClassName}`}>
              {rating.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
