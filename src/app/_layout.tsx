import "../../global.css";

import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useLanguageStore } from "@/store/languageStore";
import { fontAssets } from "@/theme";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

if (!publishableKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add your key to .env.local.\nRun: 1) clerk auth login  2) clerk link  3) clerk env pull — then restart the dev server.",
  );
}

// Keep the splash screen visible until fonts, session and saved data are ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootNavigator />
    </ClerkProvider>
  );
}

function RootNavigator() {
  const { isLoaded, isSignedIn = false } = useAuth();
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const hasHydrated = useLanguageStore((state) => state.hasHydrated);
  const hasLanguage = useLanguageStore(
    (state) => state.selectedLanguageId !== null,
  );
  const isReady =
    isLoaded && hasHydrated && (fontsLoaded || fontError !== null);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  // Expo Router moves the user automatically when a guard changes
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Home needs a signed-in user who has picked a language */}
      <Stack.Protected
        guard={isSignedIn && hasLanguage}
        redirectTo={isSignedIn ? "/language-selection" : "/onboarding"}
      >
        <Stack.Screen name="index" />
      </Stack.Protected>

      <Stack.Protected guard={isSignedIn} redirectTo="/onboarding">
        <Stack.Screen name="language-selection" />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn} redirectTo="/">
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)/sign-up" />
        <Stack.Screen name="(auth)/sign-in" />
      </Stack.Protected>
    </Stack>
  );
}
