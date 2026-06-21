import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";

const JoinUs = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end start"],
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.3],
    ["100%", "0%", "-150%"],
  );

  const imageOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const imageClip = useTransform(
    scrollYProgress,
    [0.35, 0.68],
    ["circle(0% at 50% 50%)", "circle(100.0% at 50% 50%)"],
  );

  const globe = useTransform(scrollYProgress, [0.4, 0.6], [0, 4]);
  const globeRotate = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const manifest = useTransform(scrollYProgress, [0.5, 0.6], ["100%", "0%"]);
  const itemOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section ref={container} className="relative h-[400vh]  select-none">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="sticky top-0 p-10 w-full h-screen 
        flex flex-col items-center justify-center gap-5 overflow-hidden z-30 
        max-lg:p-5"
        >
          <div className="overflow-hidden h-[125px] max-lg:h-fit">
            <motion.h1
              style={{ y: titleY }}
              className="font-neue font-bold 
                text-s text-[clamp(68px,8vw,142px)] text-center tracking-[-0.05em]
                 leading-none uppercase will-change-transform "
            >
              vamos criar algo?
            </motion.h1>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <motion.div
            style={{
              opacity: imageOpacity,
              clipPath: imageClip,
            }}
            className="relative size-full bg-[#EBEBEB] pointer-events-auto"
          >
            <motion.div
              className="absolute inset-0 size-full 
            flex items-center justify-center z-10 max-lg:p-5"
            >
              <motion.div
                style={{
                  scale: globe,
                  opacity: itemOpacity,
                  rotateY: globeRotate,
                }}
              >
                <p className="font-chivo text-p text-[142px] max-lg:text-[60px]">
                  +
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: itemOpacity }}
                className="absolute p-10 size-full
               text-chivo-p-14 text-start
                flex flex-col items-start justify-center 
                 max-lg:p-5
           "
              >
                <div className="overflow-hidden h-fit">
                  <motion.h2 style={{ y: manifest }}>SAO PAULO</motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>RIO DE JANEIRO</motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>NEW YORK</motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>ORLANDO</motion.h2>
                </div>
              </motion.div>

              <motion.div
                style={{ opacity: itemOpacity }}
                className="absolute p-10 size-full 
                 text-chivo-p-14 text-start 
                flex flex-col items-end justify-center  max-lg:p-5"
              >
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>TOKYO</motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>JAPAN</motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>BERLIN</motion.h2>
                </div>
                <div className="h-fit overflow-hidden">
                  <motion.h2 style={{ y: manifest }}>ROMA</motion.h2>
                </div>
              </motion.div>

              <motion.div
                style={{ opacity: itemOpacity }}
                className="absolute p-10 size-full flex flex-col items-start justify-start
                  font-neue font-bold
      text-p text-[clamp(40px,6vw,90px)] text-start tracking-[-0.05em]
           leading-none uppercase max-lg:p-5"
              >
                <div className="overflow-hidden h-fit">
                  <motion.h2 style={{ y: manifest }}>
                    incomum{" "}
                    <span className="relative top-2 align-top text-[28px] tracking-[0.4em] max-lg:top-1.5">
                      ®
                    </span>
                  </motion.h2>
                </div>
              </motion.div>

              <motion.div
                style={{ opacity: itemOpacity }}
                className="absolute p-10 size-full flex flex-col items-end justify-start
                  font-neue font-bold
      text-p text-[clamp(40px,6vw,90px)] text-start tracking-[-0.05em]
           leading-none uppercase max-lg:p-5"
              >
                <div className="overflow-hidden h-fit">
                  <motion.h2 style={{ y: manifest }}>
                    56
                    <span className="relative top-2 left-3 align-top text-[28px] tracking-[0.4em] max-lg:top-1.5">
                      ®
                    </span>
                  </motion.h2>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="relative size-full bg-bg-p will-change-transform" />
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
