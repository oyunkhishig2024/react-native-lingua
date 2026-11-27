import { useClerk } from "@clerk/expo";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { signOut } = useClerk();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="h2 text-lingua-purple">Lingua</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/language-selection")}
        className="mt-4 h-10 items-center justify-center rounded-[14px] bg-lingua-deep-purple px-5"
      >
        <Text className="font-montserrat-semibold text-sm text-white">
          Choose a language
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={() => signOut()}
        className="mt-2 h-10 items-center justify-center px-5"
      >
        <Text className="font-montserrat-semibold text-sm text-text-secondary">
          Sign Out
        </Text>
      </Pressable>
    </View>
  );
}
