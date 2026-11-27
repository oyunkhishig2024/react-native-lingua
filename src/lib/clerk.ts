import { isClerkAPIResponseError } from "@clerk/expo";
import { Alert, Platform } from "react-native";

// The auth design has no place for errors, so they show as a system popup
export function showAuthMessage(message: string) {
  if (Platform.OS === "web") {
    window.alert(message); // `Alert` does nothing on web
  } else {
    Alert.alert("Lingua", message);
  }
}

export function showAuthError(step: string, error: unknown) {
  // Shows in the Expo terminal which request failed and why
  if (__DEV__) {
    const details = isClerkAPIResponseError(error)
      ? {
          status: error.status,
          codes: error.errors.map((item) => item.code),
          traceId: error.clerkTraceId,
        }
      : {};
    console.log(`[auth] "${step}" failed:`, String(error), details);
  }

  let message = "Something went wrong. Please try again.";

  if (isClerkAPIResponseError(error) && error.errors[0]) {
    message = error.errors[0].longMessage ?? error.errors[0].message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  showAuthMessage(message);
}
