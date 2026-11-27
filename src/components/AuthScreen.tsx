import { useSignIn, useSignUp, useSSO } from "@clerk/expo";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Image } from "@/components/Image";
import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { showAuthError, showAuthMessage } from "@/lib/clerk";
import { colors, fontFamily } from "@/theme";

// Clerk checks this too: keep its "minimum length" setting at the same number
const MIN_PASSWORD_LENGTH = 8;

const content = {
  "sign-up": {
    title: "Create your account",
    subtitle: "Start your language journey today ✨",
    button: "Sign Up",
    footer: "Already have an account?",
    footerLink: "Log in",
    footerHref: "/sign-in",
  },
  "sign-in": {
    title: "Welcome back",
    subtitle: "Continue your language journey ✨",
    button: "Sign In",
    footer: "Don't have an account?",
    footerLink: "Sign up",
    footerHref: "/sign-up",
  },
} as const;

const socialProviders = [
  { name: "Google", icon: images.google, strategy: "oauth_google" },
  { name: "Facebook", icon: images.facebook, strategy: "oauth_facebook" },
  { name: "Apple", icon: images.apple, strategy: "oauth_apple" },
] as const;

type SocialStrategy = (typeof socialProviders)[number]["strategy"];

type AuthScreenProps = {
  mode: keyof typeof content;
};

// Sign up uses email + password, sign in uses email only.
// Both are confirmed with a code that Clerk emails to the user.
export function AuthScreen({ mode }: AuthScreenProps) {
  const copy = content[mode];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { startSSOFlow } = useSSO();

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/onboarding");
    }
  };

  const sendSignUpCode = async (emailAddress: string) => {
    const result = await signUp.password({ emailAddress, password });
    if (result.error) return { ...result, step: "create sign-up" };

    const sent = await signUp.verifications.sendEmailCode();
    return { ...sent, step: "send sign-up code" };
  };

  const submit = async () => {
    const emailAddress = email.trim();

    if (isBusy) return;
    if (!emailAddress) return showAuthMessage("Enter your email address.");
    if (mode === "sign-up" && password.length < MIN_PASSWORD_LENGTH) {
      return showAuthMessage(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      );
    }

    setIsBusy(true);
    const { error, step } =
      mode === "sign-up"
        ? await sendSignUpCode(emailAddress)
        : {
            ...(await signIn.emailCode.sendCode({ emailAddress })),
            step: "send sign-in code",
          };
    setIsBusy(false);

    if (error) {
      showAuthError(step, error);
    } else {
      setIsVerifying(true);
    }
  };

  const verifyCode = async (code: string) => {
    const attempt = mode === "sign-up" ? signUp : signIn;
    const { error } =
      mode === "sign-up"
        ? await signUp.verifications.verifyEmailCode({ code })
        : await signIn.emailCode.verifyCode({ code });

    if (error) {
      showAuthError("verify code", error);
      return false;
    }

    if (attempt.status !== "complete") {
      showAuthMessage("Your account needs another step we don't support yet.");
      return false;
    }

    setIsVerifying(false);

    // Activates the session; the root layout then shows the home route
    const { error: finalizeError } = await attempt.finalize();
    if (finalizeError) showAuthError("start session", finalizeError);

    return true;
  };

  const continueWith = async (strategy: SocialStrategy) => {
    if (isBusy) return;
    setIsBusy(true);

    try {
      const { createdSessionId, setActive, authSessionResult } =
        await startSSOFlow({ strategy });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      } else if (authSessionResult?.type === "success") {
        // Not a cancel: Clerk still needs something before signing in
        showAuthMessage(
          "Your account needs another step we don't support yet.",
        );
      }
    } catch (error) {
      showAuthError(strategy, error);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior="padding" style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full max-w-[480px] flex-1 self-center px-[26px] pb-4">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={12}
              onPress={goBack}
              className="h-10 w-10 justify-center"
            >
              <Image source={images.chevronLeft} className="h-[24px] w-[24px]" />
            </Pressable>

            <Text className="auth__title mt-3">{copy.title}</Text>
            <Text className="auth__subtitle mt-1.5">{copy.subtitle}</Text>

            {/* Mascot + sparkles */}
            <View className="mt-2 h-[132px] w-[280px] self-center">
              <View className="absolute -top-[34px] left-10">
                <RNImage
                  source={images.mascotAuth}
                  // Mirrored so the fox waves on the left, as in the design
                  className="h-[200px]! w-[200px]! -scale-x-100"
                  resizeMode="contain"
                />
              </View>
              <Image
                source={images.sparkle}
                tintColor="#F5A623"
                className="absolute left-[28px] top-[26px] h-[16px] w-[14px]"
              />
              <Image
                source={images.sparkle}
                tintColor="#6FA8FF"
                className="absolute right-[32px] top-[33px] h-[15px] w-[13px]"
              />
              <Image
                source={images.sparkle}
                tintColor="#FFD43B"
                className="absolute right-[44px] top-[65px] h-[15px] w-[13px]"
              />
            </View>

            <View className="auth__field">
              <View className="flex-1">
                <Text className="auth__field-label">Email</Text>
                <TextInput
                  accessibilityLabel="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="alex@gmail.com"
                  placeholderTextColor="#A3A9B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  style={styles.input}
                />
              </View>
            </View>

            {mode === "sign-up" && (
              <View className="auth__field mt-3">
                <View className="flex-1">
                  <Text className="auth__field-label">Password</Text>
                  <TextInput
                    accessibilityLabel="Password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder="•••••••••"
                    placeholderTextColor="#A3A9B8"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="new-password"
                    autoCorrect={false}
                    style={styles.input}
                  />
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword ? "Hide password" : "Show password"
                  }
                  hitSlop={12}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Image
                    source={showPassword ? images.eyeOff : images.eye}
                    className="h-[24px] w-[24px]"
                  />
                </Pressable>
              </View>
            )}

            <Pressable
              accessibilityRole="button"
              onPress={submit}
              className="auth__button auth__button--gradient mt-4"
            >
              <Text className="auth__button-text">{copy.button}</Text>
            </Pressable>

            {/* Divider */}
            <View className="my-5 flex-row items-center gap-4">
              <View className="h-px flex-1 bg-border" />
              <Text className="auth__subtitle">or continue with</Text>
              <View className="h-px flex-1 bg-border" />
            </View>

            <View className="gap-2">
              {socialProviders.map((provider) => (
                <Pressable
                  key={provider.name}
                  accessibilityRole="button"
                  onPress={() => continueWith(provider.strategy)}
                  className="auth__social"
                >
                  <Image source={provider.icon} className="h-[24px] w-[24px]" />
                  <Text className="auth__social-text">
                    Continue with {provider.name}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Clerk's bot protection mounts here on web */}
            <View nativeID="clerk-captcha" />

            {/* Switch between sign up and sign in */}
            <View className="mt-auto flex-row flex-wrap items-center justify-center gap-1 pt-5">
              <Text className="auth__subtitle">{copy.footer}</Text>
              <Link href={copy.footerHref} replace className="auth__link">
                {copy.footerLink}
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Mounted only while open, so the code resets every time */}
      {isVerifying && (
        <VerificationModal
          email={email.trim()}
          onClose={() => setIsVerifying(false)}
          onComplete={verifyCode}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  input: {
    height: 28,
    padding: 0,
    fontFamily: fontFamily.medium,
    fontSize: 16,
    color: colors.textPrimary,
  },
});
