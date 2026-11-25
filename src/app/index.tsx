import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-yellow">
      <Text className="h1 mt-20 text-center color-lingua-purple">
        Course coming soon!
      </Text>
      <Text>The link to join the waitlist is down.</Text>
      <Link
        href="/onboarding"
        className="h4 mt-6 text-lingua-deep-purple underline"
      >
        Open onboarding
      </Link>
    </View>
  );
}
