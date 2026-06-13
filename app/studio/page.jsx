"use client";

import Nav from "@/components/layout/nav";
import String from "@/components/ui/string";
import StudioAbout from "@/features/studio/studio.about";
import StudioAwards from "@/features/studio/studio.awards";
import StudioIntro from "@/features/studio/studio.intro";
import StudioNumbers from "@/features/studio/studio.numbers";
import StudioTeam from "@/features/studio/studio.team";
import StudioTestimonials from "@/features/studio/studio.testimonials";
import StudioWhatWeDo from "@/features/studio/studio.what-we-do";
import { usePageTransition } from "@/store/pageTransition";

import Lenis from "lenis";

import { useEffect, useRef } from "react";

export default function StudioHero({ work }) {
  const lenisRef = useRef(null);
  const { isReady } = usePageTransition();

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
          <StudioIntro />
          <StudioAbout />
          <StudioWhatWeDo />
          <StudioNumbers />
          <StudioTeam lenis={lenisRef} />
          <StudioAwards />
          <StudioTestimonials />
          <div className="bg-bg-p h-screen w-screen flex items-center  justify-center">
            <String />
            {/*    <div className="w-40 h-40 border-2 border-neutral-800 rounded-full scale-x-[3]"></div> */}
          </div>
        </main>
      )}
    </>
  );
}
