"use client";

import TextAnimated from "@/components/ui/text-animated";

import React, { useState, useRef, useMemo } from "react";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

import ImageComponent from "@/components/ui/image";
import WorkModal from "@/components/modal/work/work-modal";

const textSlide = {
  initial: { y: "100%" },
  animate: (custom) => ({
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
      delay: custom,
    },
  }),
};

const Works = ({ work, setHover, setActiveWork, activeWork, i }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  return (
    <div
      key={work._id}
      ref={container}
      className="relative top-0 pointer-events-auto w-full h-screen flex items-center justify-between gap-5 group cursor-pointer"
      onMouseEnter={() => setHover(work._id)}
      onMouseLeave={() => setHover(null)}
      onClick={() => {
        setHover(null);
        setActiveWork(work);
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <motion.div
          className="h-fit overflow-hidden "
          initial={{ opacity: 1 }}
          animate={{ opacity: activeWork ? 0 : 1 }}
        >
          <TextAnimated
            phrases={[work.title]}
            variants={textSlide}
            as="h2"
            className="flex flex-col"
            lineClassName="font-neue font-normal 
              text-center text-s text-[96px] tracking-[-0.07em] leading-[1.1]
              max-lg:text-[62px] max-md:text-[42px]"
            wordClassName="mr-2"
            wordDelay={0.035 * i}
            lineDelay={1.035 * i}
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 w-screen h-screen z-10">
        <div className="relative size-full overflow-hidden">
          <motion.figure
            style={{ y, scale }}
            className="absolute inset-0 h-[130%]"
          >
            <ImageComponent
              image={work.heroMedia.image}
              className="size-full object-cover brightness-75"
            />
          </motion.figure>
        </div>
      </div>
    </div>
  );
};

const HomeWorks2 = ({ work, lenis }) => {
  const [hover, setHover] = useState(null);
  const [activeWork, setActiveWork] = useState(null);
  const workFeatureFilter = work.filter((item) => item.featured);

  return (
    <>
      <section id="works" className="relative h-fit pointer-events-none">
        <div className="sticky top-0 px-10 mix-blend-exclusion z-120">
          <div className="relative top-15 size-fit flex items-center gap-2 max-md:px-5">
            <span className="relative -top-px size-2  bg-s" />
            <p className="max-w-125 font-azeret font-normal text-s text-[14px] tracking-[0.05em] leading-[1.1] uppercase">
              Projetos selecionados ({workFeatureFilter.length})
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center select-none">
          {workFeatureFilter.map((item, i) => (
            <Works
              key={i}
              i={i}
              work={item}
              setHover={setHover}
              setActiveWork={setActiveWork}
              activeWork={activeWork}
            />
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeWork && (
          <WorkModal
            work={activeWork}
            isOpen={!!activeWork}
            onClose={() => setActiveWork(null)}
            lenis={lenis}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeWorks2;
