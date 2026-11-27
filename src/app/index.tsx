import { useClerk } from "@clerk/expo";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { signOut } = useClerk();

  return (
    <View className="flex-1 items-center justify-center bg-yellow">
      <Text className="h1 mt-20 text-center color-lingua-purple">
        Course coming soon!
      </Text>
      <Text>The link to join the waitlist is down.</Text>
      <Pressable accessibilityRole="button" onPress={() => signOut()}>
        <Text className="h4 mt-6 text-lingua-deep-purple underline">
          Sign out
        </Text>
      </Pressable>
    </View>
  );
}
