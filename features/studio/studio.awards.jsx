import TextAnimated from "@/components/ui/text-animated";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { awards } from "@/data/data";

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
const mediaOverlap = {
  initial: {
    y: "100%",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },

  animate: {
    y: "0%",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },

  exit: {
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};
const scale = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.25,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const StudioAwards = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { x, y } = useMousePosition();
  const [hovered, setHovered] = useState(null);
  const activeAward = hovered !== null ? awards[hovered] : null;

  const [mediaTick, setMediaTick] = useState(0);

  const bumpMedia = useCallback(() => {
    setMediaTick((t) => t + 1);
  }, []);

  return (
    <section
      id="about"
      className="relative mb-30 px-15 flex flex-col items-start justify-between max-md:px-5"
      ref={ref}
    >
      {/* LEFT TITLE */}
      <div className="flex-1 size-fit flex items-center gap-2">
        <span className="size-2 bg-p " />
        <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
          Reconhecimentos
        </p>
      </div>

      {/* LIST */}
      <div className="relative mt-25 w-full">
        <div className="flex items-center justify-between">
          <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
            categoria
          </p>

          <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
            ano
          </p>
        </div>

        <div className="mt-5 mb-10 w-full h-px bg-p/10"></div>

        <div className="flex flex-col">
          {awards.map((item, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => {
                setHovered(i);
                bumpMedia();
              }}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center justify-between cursor-default py-3 border-b border-p/5"
              animate={{
                opacity: hovered === null || hovered === i ? 1 : 0.25,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                animate={{
                  scale: hovered === i ? 1.02 : 1,
                  filter: hovered === i ? "blur(0px)" : "blur(0.3px)",
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <TextAnimated
                  phrases={[item.title]}
                  variants={textSlide}
                  animate={inView}
                  as="p"
                  className="flex flex-col"
                  lineClassName="font-neue font-normal 
      text-p text-[64px] tracking-[-0.07em] leading-none
      max-md:text-[38px]"
                  wordClassName="mr-2"
                  wordDelay={0.015}
                  lineDelay={0.1}
                />
              </motion.div>

              <motion.div
                animate={{
                  scale: hovered === i ? 1.02 : 1,
                  opacity: hovered === i || hovered === null ? 1 : 0.4,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <TextAnimated
                  phrases={[item.year]}
                  variants={textSlide}
                  animate={inView}
                  as="p"
                  className="flex flex-col"
                  lineClassName="font-neue font-normal 
      text-p text-[64px] tracking-[-0.07em] leading-none
      max-md:text-[38px]"
                  wordClassName="mr-2"
                  wordDelay={0.015}
                  lineDelay={0.1}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeAward && (
            <motion.div
              style={{ x, y }}
              className="pointer-events-none rounded-sm fixed top-0 left-0 w-100 h-60 z-30 overflow-hidden will-change-transform -translate-x-1/2 -translate-y-1/2"
              {...scale}
            >
              <AnimatePresence mode="sync" initial={false}>
                {activeAward && (
                  <motion.div
                    key={`${activeAward.image}-${mediaTick}`}
                    variants={mediaOverlap}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 rounded-sm will-change-transform"
                  >
                    <Image
                      src={activeAward.image}
                      alt={activeAward.title}
                      fill
                      placeholder="blur"
                      className="object-cover rounded-sm"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StudioAwards;
