"use client";

import Nav from "@/components/layout/nav";
import ProjectsIntro from "@/features/projects/projects.intro";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import ProjectsWorks from "./projects.works";
import { AnimatePresence } from "motion/react";

import { useWorkStore } from "@/store/useWorkStore";
import WorkModal from "@/components/modal/work/work-modal";
import { FiltersModal } from "@/components/modal/filters/filters-modal";
import { SearchModal } from "@/components/modal/search/search-modal";
import { usePageTransition } from "@/store/pageTransition";

const ProjectsHero = ({ work }) => {
  const lenisRef = useRef(null);
  const { isReady } = usePageTransition();

  const {
    activeWork,
    clearActiveWork,

    isFiltersOpen,
    closeFilters,

    isSearchOpen,
    closeSearch,

    activeYear,
    activeCategory,
    activeServices,
    activeFeatured,
  } = useWorkStore();

  const activeFiltersCount = [
    activeYear !== "all",
    activeCategory !== "all",
    activeServices.length > 0,
    activeFeatured,
  ].filter(Boolean).length;

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Nav />
      {isReady && (
        <main className="relative bg-[#DEDEDE]">
          <ProjectsIntro work={work} lenis={lenisRef} />
          <ProjectsWorks
            work={work}
            activeFiltersCount={activeFiltersCount}
            lenis={lenisRef}
          />

          <div className="h-screen w-screen flex items-center justify-center">
            <div className="w-40 h-40 border-2 border-neutral-800 rounded-full scale-x-[3]" />
          </div>
        </main>
      )}
      <AnimatePresence mode="wait">
        {isFiltersOpen && (
          <FiltersModal lenis={lenisRef} onClose={closeFilters} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isSearchOpen && (
          <SearchModal lenis={lenisRef} onClose={closeSearch} work={work} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeWork && (
          <WorkModal
            work={activeWork}
            isOpen={!!activeWork}
            onClose={clearActiveWork}
            lenis={lenisRef}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsHero;
