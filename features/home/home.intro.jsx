import { useRef, useEffect, useState } from "react";
import bgCover from "@/public/assets/images/home/bg.jpg";
import bgCover2 from "@/public/assets/images/home/bg1.jpg";
import Image from "next/image";

import {
  motion,
  useAnimate,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";

import { MdOutlineArrowDownward } from "react-icons/md";
import { usePreLoader } from "@/store/pageTransition";
import { ClipText } from "@/components/ui/clip-text";

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

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const HomeIntro = () => {
  const container = useRef(null);
  const {
    isReadyPreLoader,
    hasPlayedPreloader,
    setHasPlayedPreloader,
    setReadyPreLoader,
  } = usePreLoader();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (hasPlayedPreloader) {
      usePreLoader.getState().setReadyPreLoader(true);
      return;
    }

    const run = async () => {
      document.body.style.cursor = "wait";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      await wait(600);
      await Promise.all([
        animate(
          ".loader-reveal-2",
          {
            clipPath: "inset(0% 0% 0% 0%)",
          },
          {
            duration: 1.5,
            ease: [0.87, 0, 0.13, 1],
          },
        ),

        animate(
          ".loader-text",
          {
            y: 0,
          },
          {
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1],
          },
        ),
      ]);

      (await animate(
        ".loader-reveal",
        {
          clipPath: "inset(0% 0% 0% 0%)",
        },
        {
          duration: 1.5,
          ease: [0.87, 0, 0.13, 1],
        },
      ),
        await wait(600));

      await Promise.all([
        animate(
          ".loader-container",
          {
            padding: "0px",
          },
          {
            duration: 1.5,
            ease: [0.87, 0, 0.13, 1],
          },
        ),
        animate(
          ".loader-image",
          {
            filter: "brightness(75%)",
            width: "100vw",
            height: "100vh",
          },
          {
            duration: 1.5,
            ease: [0.87, 0, 0.13, 1],
          },
        ),

        animate(
          ".loader-image",
          {
            borderRadius: "0rem",
          },
          {
            duration: 1.5,
            ease: [0.87, 0, 0.13, 1],
          },
        ),

        animate(
          ".loader-text",
          {
            y: -20,
          },
          {
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1],
          },
        ),
        await wait(600),
        setReadyPreLoader(true),
      ]);

      document.body.style.cursor = "auto";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      setHasPlayedPreloader(true);
    };

    run();
  }, [animate, hasPlayedPreloader]);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const brightness = useTransform(scrollYProgress, [0, 0.8], ["100%", "0%"]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  return (
    <section
      id="intro"
      className="relative w-full h-dvh overflow-hidden z-20"
      ref={container}
    >
      <motion.div
        className="relative p-10 w-screen h-screen overflow-hidden transform-gpu"
        style={{ y, filter }}
      >
        <div
          ref={scope}
          className="fixed inset-0 bg-[#EBEBEB] overflow-hidden pointer-events-none select-none
      "
          style={
            hasPlayedPreloader
              ? {
                  background: "transparent",
                }
              : undefined
          }
        >
          <div
            className="loader-container absolute p-5 inset-0 
          flex items-center justify-center"
            style={
              hasPlayedPreloader
                ? {
                    padding: "0rem",
                  }
                : undefined
            }
          >
            <div
              className="loader-image relative w-100 h-100 rounded-sm overflow-hidden
              max-md:h-75
          "
              style={
                hasPlayedPreloader
                  ? {
                      width: "100vw",
                      height: "100vh",
                      borderRadius: 0,
                      filter: "brightness(75%)",
                    }
                  : undefined
              }
            >
              <motion.div
                className="
              loader-reveal-2
              absolute
              inset-0 transform-gpu
            "
                initial={{
                  clipPath: hasPlayedPreloader
                    ? undefined
                    : "inset(100% 0% 0% 0%)",
                }}
              >
                <Image
                  src={bgCover2}
                  alt=""
                  fill
                  priority
                  className="object-cover size-full"
                  placeholder="blur"
                />
              </motion.div>

              <motion.div
                className="
              loader-reveal
              absolute
              inset-0 transform-gpu
            "
                initial={{
                  clipPath: hasPlayedPreloader
                    ? undefined
                    : "inset(100% 0% 0% 0%)",
                }}
              >
                <Image
                  src={bgCover}
                  alt=""
                  fill
                  priority
                  className="object-cover size-full"
                  placeholder="blur"
                />
              </motion.div>
            </div>
          </div>

          <div className="absolute left-1/2 bottom-24 -translate-x-1/2 max-md:bottom-5">
            <div className="w-[calc(100%+15px)] h-fit overflow-hidden ">
              <motion.p
                initial={{ y: 20 }}
                className="loader-text text-chivo-p-14 text-start flex items-center gap-6"
              >
                <span className="relative left-2 -top-px size-2.5 bg-p rotate-45" />
                carregando
                <div className="relative -left-4 -top-1 flex items-center">
                  {[0, 1, 2].map((item) => (
                    <motion.span
                      key={item}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: item * 0.2,
                        ease: "easeInOut",
                      }}
                      className="text-[24px]"
                    >
                      .
                    </motion.span>
                  ))}
                </div>
              </motion.p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 p-15 size-full flex items-center justify-center">
          <div className="relative flex flex-col items-start">
            <div className="mb-2 relative flex items-center">
              <div className="overflow-hidden h-[125px] max-lg:h-fit">
                <motion.h2
                  initial="initial"
                  animate={isReadyPreLoader && "animate"}
                  variants={textSlide}
                  className="big-text-intro-p text-s"
                >
                  incomum
                  <span className="relative top-3.5 left-2 align-top text-[28px] tracking-[0.4em] max-lg:top-1.5">
                    ®
                  </span>
                </motion.h2>
              </div>
            </div>
            <div className="mt-2 w-[calc(100%-15px)] h-fit overflow-hidden">
              <motion.p
                initial="initial"
                animate={isReadyPreLoader && "animate"}
                variants={textSlide}
                className="relative left-1 text-chivo-s-14 text-start"
              >
                estúdio criativo
              </motion.p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 p-15 size-full flex items-end justify-end gap-2 
        max-lg:items-end max-lg:justify-center "
        >
          <div className="relative h-fit overflow-hidden max-lg:-top-15">
            <motion.p
              initial="initial"
              animate={isReadyPreLoader && "animate"}
              variants={textSlide}
              className="relative left-1 text-chivo-s-14 text-start
          flex items-center gap-2"
            >
              role para baixo
              <span>
                <MdOutlineArrowDownward className="relative -top-px text-s text-[18px]" />
              </span>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeIntro;
