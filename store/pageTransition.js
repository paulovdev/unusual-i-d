import { create } from "zustand";

export const usePageTransition = create((set) => ({
  isReady: true,
  setReady: (v) => set({ isReady: v }),
}));

export const usePreLoader = create((set) => ({
  isReadyPreLoader: false,
  hasPlayedPreloader: false,

  setReadyPreLoader: (v) => set({ isReadyPreLoader: v }),

  setHasPlayedPreloader: (v) => set({ hasPlayedPreloader: v }),
}));
