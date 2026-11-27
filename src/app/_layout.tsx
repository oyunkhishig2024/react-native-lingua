import "../../global.css";

import { ClerkProvider, useAuth, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import { PostHogProvider } from "posthog-react-native";

import { posthog } from "@/lib/posthog";
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
      {posthog ? (
        <PostHogProvider
          client={posthog}
          autocapture={{ captureScreens: false, captureTouches: true }}
        >
          <RootNavigator />
        </PostHogProvider>
      ) : (
        <RootNavigator />
      )}
    </ClerkProvider>
  );
}

function RootNavigator() {
  const { isLoaded, isSignedIn = false } = useAuth();
  const { isLoaded: isUserLoaded, user } = useUser();
  const pathname = usePathname();
  const previousPathname = useRef<string | undefined>(undefined);
  const identifiedUserId = useRef<string | undefined>(undefined);
  const hasResolvedIdentity = useRef(false);
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

  useEffect(() => {
    if (posthog && previousPathname.current !== pathname) {
      posthog.screen(pathname, {
        previous_screen: previousPathname.current ?? null,
      });
      previousPathname.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    if (!posthog || !isLoaded || !isUserLoaded) return;

    if (isSignedIn && user?.id) {
      if (identifiedUserId.current !== user.id) {
        if (identifiedUserId.current) posthog.reset();

        posthog.identify(user.id, {
          $set: {
            ...(user.primaryEmailAddress?.emailAddress
              ? { email: user.primaryEmailAddress.emailAddress }
              : {}),
            ...(user.fullName ? { name: user.fullName } : {}),
            ...(user.username ? { username: user.username } : {}),
          },
        });
        identifiedUserId.current = user.id;
      }
      hasResolvedIdentity.current = true;
    } else {
      if (identifiedUserId.current || !hasResolvedIdentity.current) {
        posthog.reset();
        identifiedUserId.current = undefined;
      }
      hasResolvedIdentity.current = true;
    }
  }, [isLoaded, isSignedIn, isUserLoaded, user]);

  if (!isReady) {
    return null;
  }

  // Expo Router moves the user automatically when a guard changes
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* The tabs need a signed-in user who has picked a language */}
      <Stack.Protected
        guard={isSignedIn && hasLanguage}
        redirectTo={isSignedIn ? "/language-selection" : "/onboarding"}
      >
        <Stack.Screen name="(tabs)" />
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
