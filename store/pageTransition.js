import { create } from "zustand";

export const usePageTransition = create((set) => ({
  isReady: true,
  setReady: (v) => set({ isReady: v }),
}));
