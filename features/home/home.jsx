"use client";

import HomeIntro from "@/features/home/home.intro";
import { usePageTransition, usePreLoader } from "@/store/pageTransition";
import Lenis from "lenis";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

import Nav from "@/components/layout/nav";
import HomeAbout from "./home.about";
import HomeWorks from "./home.works";
import HomeStatement from "./home.statement";
import HomeClients from "./home.clients";

import Footer from "@/components/layout/footer";

const HomeHero = ({ work }) => {
  const { isReady } = usePageTransition();
  const { isReadyPreLoader } = usePreLoader();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!isReady) return;

    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, [isReady]);

  return (
    <>
      {isReadyPreLoader && <Nav />}
      {isReady && (
        <>
          <motion.main className="relative bg-bg-s">
            <HomeIntro />
            <HomeAbout work={work} />

            <HomeWorks work={work} lenis={lenisRef} />
            <HomeStatement />
            <HomeClients />

            {/*   <HomeCTA lenis={lenisRef} /> */}
          </motion.main>
          <Footer />
        </>
      )}
    </>
  );
};

export default HomeHero;
