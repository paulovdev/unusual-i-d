"use client";

import String from "@/components/ui/string";
import HomeAbout from "@/features/home/home.about";
import HomeClients from "@/features/home/home.clients";
import HomeCTA from "@/features/home/home.cta";
import HomeIntro from "@/features/home/home.intro";
import HomeStatement from "@/features/home/home.statement";
import HomeWorks2 from "@/features/home/home.works2";
import { usePageTransition } from "@/store/pageTransition";
import Lenis from "lenis";

import { useEffect, useRef } from "react";

const HomeHero = ({ work }) => {
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
      {isReady && (
        <main className="relative bg-[#fefcf5]">
          <HomeIntro />
          <HomeAbout />
          <HomeWorks2 work={work} lenis={lenisRef} />
          {/*    <HomeWorks />   */}

          <HomeStatement />
          <HomeClients />

          <HomeCTA lenis={lenisRef} />
          <div className=" h-screen w-screen flex items-center  justify-center">
            <String />
            {/*    <div className="w-40 h-40 border-2 border-neutral-800 rounded-full scale-x-[3]"></div> */}
          </div>
        </main>
      )}
    </>
  );
};

export default HomeHero;
