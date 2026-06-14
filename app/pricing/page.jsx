"use client";

import Nav from "@/components/layout/nav";
import PricingIntro from "@/features/pricing/pricing.intro";
import PricingPrices from "@/features/pricing/pricing.prices";
import { usePageTransition } from "@/store/pageTransition";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

export default function Pricing({ work }) {
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
        <main className="relative bg-[#EBEBEB]">
          <PricingIntro />
          <PricingPrices />

          <div className="bg-bg-s h-screen w-screen flex items-center justify-center">
            <String />
            {/*    <div className="w-40 h-40 border-2 border-neutral-800 rounded-full scale-x-[3]"></div> */}
          </div>
        </main>
      )}
    </>
  );
}
