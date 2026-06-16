import { useRef } from "react";
import bgCover from "@/public/assets/images/about/bg.jpg";
import Image from "next/image";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";

import { MdOutlineArrowDownward } from "react-icons/md";
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

const StudioIntro = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const brightness = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  return (
    <section
      id="intro"
      className="relative w-full h-dvh overflow-hidden"
      ref={container}
    >
      <motion.div
        className="relative w-screen h-screen overflow-hidden transform-gpu"
        style={{ y, filter }}
      >
        <figure className="absolute inset-0 w-full overflow-hidden">
          <Image
            src={bgCover}
            width={2000}
            height={2000}
            alt="home-hero-image"
            className="object-cover size-full brightness-75"
            placeholder="blur"
            priority
          />
        </figure>
        <div className="absolute inset-0 p-15 size-full flex items-center justify-center">
          <div className="relative flex flex-col items-start">
            <div className="mb-4 relative flex items-center">
              <div className="overflow-hidden h-[125px] max-md:h-fit">
                <motion.h2
                  {...textSlide}
                  custom={0}
                  className="font-neue font-bold 
                text-s text-[clamp(68px,6vw,142px)] text-center tracking-[-0.05em]
                 leading-[1.2] uppercase will-change-transform max-md:text-[68px]"
                >
                  sobre nós
                  <span
                    className="relative top-3.5 left-2 align-top
                   text-[28px] tracking-[0.4em]"
                  >
                    .
                  </span>
                </motion.h2>
              </div>
            </div>
            <div className="relative -top-2 w-[calc(100%+15px)] h-fit overflow-hidden">
              <motion.p
                {...textSlide}
                custom={0.25}
                className="relative left-1 text-chivo-s-14 text-start"
              >
                desde 2023
              </motion.p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 p-15 size-full flex items-end justify-end gap-2 
             max-md:items-end max-md:justify-center "
        >
          <div className="relative h-fit overflow-hidden max-md:-top-15">
            <motion.p
              initial="initial"
              animate="animate"
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

export default StudioIntro;
