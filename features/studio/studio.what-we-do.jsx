import TextAnimated from "@/components/ui/text-animated";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

import { TbBrandFigma } from "react-icons/tb";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { PiShapesBold } from "react-icons/pi";
import { RiSparkling2Line } from "react-icons/ri";
import { MdOutlineAnimation } from "react-icons/md";

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

const StudioWhatWeDo = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section id="what-we-do" className="bg-bg-p " ref={ref}>
      <div className="p-15 flex flex-col items-center justify-center max-md:px-5">
        <div className="mb-10 size-fit flex items-center gap-4">
          <span className="relative -top-px size-2.5 bg-s rotate-45" />
          <p className="text-chivo-s-14 text-end">o que fazemos?</p>
        </div>

        <div className="pt-10 flex flex-col items-center justify-center gap-10">
          {[`NOSSOS SERVIÇOS`].map((phrases, i) => (
            <div className="mb-4 h-fit overflow-hidden">
              <motion.h2
                variants={textSlide}
                initial="initial"
                animate={inView && "animate"}
                custom={0.5 + 0.15 * i}
                className="font-neue font-bold
          text-s text-[clamp(40px,6vw,90px)] text-center tracking-[-0.05em]
          leading-normal uppercase will-change-transform"
              >
                {phrases}
              </motion.h2>
            </div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{
              opacity: inView ? 1 : 0,
              y: inView ? 0 : 25,
            }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1,
            }}
            className="w-full h-fit grid grid-cols-4 gap-5 max-md:grid-cols-1"
          >
            {/* 01 */}
            <div
              className="min-h-125 p-5 pt-10 bg-[#202020] rounded-sm flex flex-col items-start justify-between gap-5 
              max-md:min-h-100"
            >
              <div className="mb-2 p-4 rounded-sm border border-s bg-[#ffffff] backdrop-blur-md">
                <PiShapesBold className="text-p text-[24px]" />
              </div>
              <div className="flex flex-col items-start">
                <p className="mb-15 text-chivo-s-14 text-end">
                  identidade visual
                </p>

                {[
                  `Criamos sistemas visuais, tipografia, grids e direções criativas para marcas digitais e físicas.`,
                ].map((phrases, i) => (
                  <div className="mb-4 h-fit overflow-hidden">
                    <motion.h2
                      variants={textSlide}
                      initial="initial"
                      animate={inView && "animate"}
                      custom={0.5 + 0.15 * i}
                      className="paragraph-n text-s/75 font-normal"
                    >
                      {phrases}
                    </motion.h2>
                  </div>
                ))}
              </div>
            </div>

            {/* 02 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 25,
              }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.2,
              }}
              className="min-h-125 p-5 pt-10 bg-[#202020] rounded-sm flex flex-col items-start justify-between gap-5 
              max-md:min-h-100"
            >
              <div className="mb-2 flex items-center gap-5 text-p">
                <div className="p-4 rounded-sm border border-s bg-[#ffffff] backdrop-blur-md">
                  <TbBrandFigma className="text-[24px]" />
                </div>

                <span className="font-azeret text-[24px] text-s">+</span>

                <div className="p-4 rounded-sm border border-s bg-[#ffffff] backdrop-blur-md">
                  <RiSparkling2Line className="text-[24px]" />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <p className="mb-15 text-chivo-s-14 text-end">
                  direção criativa
                </p>
                {[
                  `Construímos narrativas visuais, campanhas, conceitos e linguagens para produtos e experiências.`,
                ].map((phrases, i) => (
                  <div className="mb-4 h-fit overflow-hidden">
                    <motion.h2
                      variants={textSlide}
                      initial="initial"
                      animate={inView && "animate"}
                      custom={0.5 + 0.15 * i}
                      className="paragraph-n text-s/75 font-normal"
                    >
                      {phrases}
                    </motion.h2>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 03 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 25,
              }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.3,
              }}
              className="min-h-125 p-5 pt-10 bg-[#202020] rounded-sm 
              flex flex-col itemsmax-md:min-h-100-start justify-between gap-5 max-md:min-h-100
              "
            >
              <div className="mb-2 flex items-center gap-5 text-p">
                <div className="p-4 rounded-sm border border-s bg-[#ffffff] backdrop-blur-md">
                  <MdOutlineAnimation className="text-[24px]" />
                </div>

                <span className="font-azeret text-[24px] text-s">+</span>

                <div className="p-4 rounded-sm border border-s bg-[#ffffff] backdrop-blur-md">
                  <PiShapesBold className="text-[24px]" />
                </div>
              </div>

              <div className="flex flex-col items-start">
                <p className="mb-15 text-chivo-s-14 text-end">
                  motion & experiências
                </p>
                {[
                  `Exploramos movimento, ritmo e interação para transformar interfaces em experiências visuais imersivas.`,
                ].map((phrases, i) => (
                  <div className="mb-4 h-fit overflow-hidden">
                    <motion.h2
                      variants={textSlide}
                      initial="initial"
                      animate={inView && "animate"}
                      custom={0.5 + 0.15 * i}
                      className="paragraph-n text-s/75 font-normal"
                    >
                      {phrases}
                    </motion.h2>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 04 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 25,
              }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.4,
              }}
              className="min-h-125 p-5 pt-10 bg-[#202020] rounded-sm flex flex-col items-start justify-between gap-5 
              max-md:min-h-100"
            >
              <div className="mb-2 p-4 rounded-sm border border-s bg-[#ffffff] backdrop-blur-md">
                <HiOutlineCodeBracketSquare className="text-p text-[24px]" />
              </div>

              <div className="flex flex-col items-start">
                <p className="mb-15 text-chivo-s-14 text-end">
                  experiências digitais
                </p>

                {[
                  `Desenvolvemos websites e experiências interativas com foco em performance, narrativa e presença visual.`,
                ].map((phrases, i) => (
                  <div className="mb-4 h-fit overflow-hidden">
                    <motion.h2
                      variants={textSlide}
                      initial="initial"
                      animate={inView && "animate"}
                      custom={0.5 + 0.15 * i}
                      className="paragraph-n text-s/75 font-normal"
                    >
                      {phrases}
                    </motion.h2>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudioWhatWeDo;
