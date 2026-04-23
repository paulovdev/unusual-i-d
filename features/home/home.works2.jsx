"use client";

import TextAnimated from "@/components/ui/text-animated";
import Button from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { IoClose } from "react-icons/io5";
import { RiArrowLeftLongLine, RiArrowRightLongLine } from "react-icons/ri";
import Lenis from "lenis";
import ImageComponent from "@/components/ui/image";
import bgCover from "@/public/assets/images/home/bg.jpg";
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

const menuAnim = {
  initial: { clipPath: "inset(0% 100% 0% 0%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    clipPath: "inset(0% 100% 0% 0%)",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const overlayAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
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
            lineClassName="font-i-sans font-normal 
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

  return (
    <>
      <section id="works" className="relative h-fit pointer-events-none">
        <div className="mb-10 p-15 max-md:px-5 size-fit flex items-center gap-2 z-10">
          <span className="size-2 bg-p rounded-[1px]" />
          <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-widest leading-[1.1] uppercase">
            Selected spaces
          </p>
        </div>

        <div className="flex flex-col items-center justify-center select-none">
          {work.map((item, i) => (
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
            lenis={lenis}
            work={activeWork}
            onClose={() => {
              setHover(null);
              setActiveWork(null);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const WorkModal = ({ work, lenis, onClose }) => {
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);
  useEffect(() => {
    // para o global
    lenis?.current?.stop();

    // cria lenis só pro modal
    modalLenis.current = new Lenis({
      wrapper: scrollRef.current,
      content: scrollRef.current,
      smoothWheel: true,
      syncTouch: true,
    });

    function raf(time) {
      modalLenis.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // destrói lenis do modal
      modalLenis.current?.destroy();

      // volta global
      lenis?.current?.start();
    };
  }, [lenis]);
  return (
    <>
      <motion.div
        className="fixed left-0 top-0 m-4 p-15 w-[45vw] h-[calc(100vh-32px)] bg-s/10 backdrop-blur-3xl rounded-sm z-[1000] max-ds:w-[70vw] max-lg:w-full max-md:p-5 max-md:w-[calc(100vw-32px)]"
        variants={menuAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.button
          type="button"
          onClick={onClose}
          initial={{ scale: 0, rotate: -90 }}
          animate={{
            scale: 1,
            rotate: 0,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2,
            },
          }}
          exit={{
            scale: 0,
            rotate: 90,
            transition: {
              duration: 0.4,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="absolute top-5 right-5 z-30 group"
        >
          <div className="p-3 bg-s backdrop-blur-2xl rounded-sm max-md:p-2">
            <IoClose className="text-p text-[24px]" />
          </div>
        </motion.button>

        <div className="size-full overflow-y-scroll" ref={scrollRef}>
          <div className="size-full flex flex-col items-end justify-between max-md:justify-start max-md:gap-5">
            <div className="w-full flex flex-col gap-15 max-md:mb-10">
              <div className="flex items-center">
                <span className="font-azeret font-medium text-s text-[14px] tracking-[0.01em] leading-[1.1] uppercase truncate max-md:text-[12px]">
                  {work.category}
                </span>
                <span className="mx-5 text-s">/</span>
                <span className="font-azeret font-medium text-s text-[14px] tracking-[0.01em] leading-[1.1] uppercase max-md:text-[12px]">
                  {work.year}
                </span>
              </div>
              <TextAnimated
                phrases={[work.title]}
                variants={textSlide}
                as="h2"
                className="flex flex-col"
                lineClassName="font-i-sans font-normal text-s text-[72px] tracking-[-0.07em]
               leading-none max-md:text-[42px]"
                wordClassName="mr-2"
                wordDelay={0.065}
                lineDelay={0.025}
              />
            </div>
            <div className="w-full flex flex-col items-end">
              <div className="w-full flex flex-col">
                {work.sections?.map((block, i) => {
                  switch (block._type) {
                    case "workImage":
                      return <WorkImageBlock key={i} block={block} />;

                    case "workText":
                      return <WorkTextBlock key={i} block={block} />;

                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fixed left-0 top-0 w-screen h-dvh backdrop-blur-lg bg-p/75 z-[900]"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
      />
    </>
  );
};

const WorkImageBlock = ({ block }) => {
  const imageUrl = block?.image?.asset?.url;

  if (!imageUrl) return null;

  return (
    <figure className="relative mt-15 w-full h-[40vh] overflow-hidden select-none rounded-sm">
      <ImageComponent
        image={block.image}
        className="object-cover brightness-75"
      />
      {block.overlayText && (
        <p className="absolute bottom-5 right-5 font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-[1.2] uppercase max-md:text-[12px]">
          {block.overlayText}
        </p>
      )}
    </figure>
  );
};

const WorkTextBlock = ({ block }) => {
  return (
    <div className="my-10 w-full flex items-start max-md:flex-col max-md:gap-5">
      <div className="flex-1">
        <div className="size-fit flex items-center gap-2">
          <span className="size-2 bg-s rounded-[1px]" />{" "}
          {block.label && (
            <p className="font-azeret font-medium text-s text-[14px] tracking-widest leading-none uppercase max-md:text-[12px]">
              {block.label}
            </p>
          )}
        </div>
      </div>
      <div className="flex-2 flex flex-col gap-15">
        <TextAnimated
          phrases={Array.isArray(block.text) ? block.text : [block.text]}
          variants={textSlide}
          as="span"
          className="flex flex-col"
          lineClassName="max-w-150 mb-5 font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-[1.2] uppercase max-md:text-[12px]"
          wordClassName="mr-2"
          wordDelay={0.035}
          lineDelay={0.035}
        />
      </div>
    </div>
  );
};

export default HomeWorks2;
