import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { LanguageId } from "@/types/learning";

type LanguageState = {
  selectedLanguageId: LanguageId | null;
  /** True once the saved value has been read from AsyncStorage. */
  hasHydrated: boolean;
  setLanguage: (id: LanguageId) => void;
  resetLanguage: () => void;
  setHasHydrated: () => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguageId: null,
      hasHydrated: false,
      setLanguage: (id) => set({ selectedLanguageId: id }),
      resetLanguage: () => set({ selectedLanguageId: null }),
      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: "language",
      storage: createJSONStorage(() => AsyncStorage),
      // Only the selected language is saved
      partialize: ({ selectedLanguageId }) => ({ selectedLanguageId }),
      // Also runs when reading fails, so the app never stays on the splash screen
      onRehydrateStorage: (state) => () => state.setHasHydrated(),
      // Web pages are first rendered on the server, which has no storage and
      // would crash. `window` only exists in the browser and on phones.
      skipHydration: typeof window === "undefined",
    },
  ),
);
