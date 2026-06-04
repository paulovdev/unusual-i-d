import { create } from "zustand";

export const useWorkStore = create((set) => ({
  // modal work
  activeWork: null,
  setActiveWork: (work) => set({ activeWork: work }),
  clearActiveWork: () => set({ activeWork: null }),

  activeCategory: "todos",
  activeYear: "todos",
  activeStatus: "todos",
  activeStyles: [],
  activeArea: "todos",
  activeLocation: "todos",

  setActiveCategory: (v) => set({ activeCategory: v }),
  setActiveYear: (v) => set({ activeYear: v }),
  setActiveStatus: (v) => set({ activeStatus: v }),
  setActiveArea: (v) => set({ activeArea: v }),
  setActiveLocation: (v) => set({ activeLocation: v }),
  setActiveStyles: (value) =>
    set((state) => {
      const exists = state.activeStyles.includes(value);

      return {
        activeStyles: exists
          ? state.activeStyles.filter((v) => v !== value)
          : [...state.activeStyles, value],
      };
    }),

  resetStyles: () => set({ activeStyles: [] }),

  // search
  query: "",
  setQuery: (q) => set({ query: q }),

  // UI modals
  isFiltersOpen: false,
  isSearchOpen: false,

  openFilters: () => set({ isFiltersOpen: true }),
  closeFilters: () => set({ isFiltersOpen: false }),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
}));
