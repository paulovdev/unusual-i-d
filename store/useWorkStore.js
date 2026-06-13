import { create } from "zustand";

export const useWorkStore = create((set) => ({
  // modal work
  activeWork: null,
  setActiveWork: (work) =>
    set({
      activeWork: work,
    }),

  clearActiveWork: () =>
    set({
      activeWork: null,
    }),

  // FILTERS

  activeYear: "all",
  activeCategory: "all",
  activeServices: [],
  activeFeatured: false,
  setActiveYear: (v) =>
    set({
      activeYear: v,
    }),
  setActiveCategory: (v) =>
    set({
      activeCategory: v,
    }),
  setActiveServices: (value) =>
    set((state) => {
      const exists = state.activeServices.includes(value);

      return {
        activeServices: exists
          ? state.activeServices.filter((v) => v !== value)
          : [...state.activeServices, value],
      };
    }),

  setActiveFeatured: (v) =>
    set({
      activeFeatured: v,
    }),
  resetFilters: () =>
    set({
      activeYear: "all",
      activeCategory: "all",
      activeServices: [],
      activeFeatured: false,
    }),

  // search

  query: "",
  setQuery: (q) =>
    set({
      query: q,
    }),

  // modals

  isFiltersOpen: false,
  isSearchOpen: false,
  openFilters: () =>
    set({
      isFiltersOpen: true,
    }),
  closeFilters: () =>
    set({
      isFiltersOpen: false,
    }),
  openSearch: () =>
    set({
      isSearchOpen: true,
    }),
  closeSearch: () =>
    set({
      isSearchOpen: false,
    }),
}));
