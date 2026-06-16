"use client";
import bgCover from "@/public/assets/images/price.jpg";
import { motion } from "motion/react";
import Image from "next/image";
import Nav from "@/components/layout/nav";
import String from "@/components/ui/string";
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
        <main className="relative overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 1.5 }}
          >
            <Image
              src={bgCover}
              alt=""
              fill
              priority
              className="object-cover size-full brightness-75 blur-xl"
              placeholder="blur"
            />
          </motion.div>

          <PricingIntro />
          <PricingPrices />

          <div className="relative bg-bg-s h-screen w-screen flex items-center justify-center z-10">
            <String />
          </div>
        </main>
      )}
    </>
  );
}
