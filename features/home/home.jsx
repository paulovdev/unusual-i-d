"use client";

import String from "@/components/ui/string";
import HomeAbout from "@/features/home/home.about";
import HomeClients from "@/features/home/home.clients";
import HomeCTA from "@/features/home/home.cta";
import HomeIntro from "@/features/home/home.intro";
import HomeStatement from "@/features/home/home.statement";
import HomeWhatWeDo from "@/features/home/home.what-we-do";
import HomeWorks2 from "@/features/home/home.works2";
import Lenis from "lenis";

import { useEffect, useRef } from "react";

const Index = ({ work }) => {
  const lenisRef = useRef(null);

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
    <main className="relative bg-[#F5F4F0]">
      <HomeIntro />
      <HomeAbout />
      <HomeWorks2 work={work} lenis={lenisRef} />
      {/*    <HomeWorks />   */}
      <HomeWhatWeDo />
      <HomeStatement />
      <HomeClients />

      <HomeCTA />
      <div className=" h-screen w-screen flex items-center  justify-center">
        <String />
        {/*    <div className="w-40 h-40 border-2 border-neutral-800 rounded-full scale-x-[3]"></div> */}
      </div>
    </main>
  );
};

export default Index;
