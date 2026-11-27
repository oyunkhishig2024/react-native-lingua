import { router } from "expo-router";
import { useEffect } from "react";

// Social sign-in redirects back to this URL. Android also opens it as a route,
// so return to the screen that started the flow.
export default function SSOCallback() {
  useEffect(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }, []);

  return null;
}
