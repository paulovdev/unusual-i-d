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
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section id="what-we-do" className="bg-bg-p" ref={ref}>
      <div className="p-15 max-md:px-5">
        <div className="mb-10 size-fit flex items-center gap-2">
          <span className="size-2 bg-s rounded-[1px]" />

          <p className="max-w-125 font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
            o que fazemos?
          </p>
        </div>

        <div className="pt-50 flex flex-col items-start gap-10">
          <TextAnimated
            phrases={[
              `Criamos identidades, experiências e sistemas visuais para marcas contemporâneas.`,
            ]}
            variants={textSlide}
            animate={inView}
            as="h2"
            className="flex flex-col"
            lineClassName="font-neue font-normal 
        text-s text-[64px] tracking-[-0.07em] leading-none
        max-md:text-[38px]"
            wordClassName="mr-2"
            wordDelay={0.015}
            lineDelay={0.2}
          />

          <span className="w-full h-px bg-s/25" />

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
            className="w-full h-fit grid grid-cols-4 grid-rows-2 max-md:grid-cols-2"
          >
            {/* 01 */}
            <div
              className="min-h-75 flex flex-col items-start gap-5 
              max-md:col-span-2 max-md:min-h-40 max-md:items-center"
            >
              <div className="mb-2 p-4 rounded-sm border-1 border-s bg-[#ffffff] backdrop-blur-md">
                <PiShapesBold className="text-p text-[24px]" />
              </div>

              <span className="font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
                identidade visual
              </span>

              <TextAnimated
                phrases={[
                  `Criamos sistemas visuais, tipografia, grids e direções criativas para marcas digitais e físicas.`,
                ]}
                variants={textSlide}
                animate={inView}
                as="span"
                className="flex flex-col"
                lineClassName="max-w-100 mb-5 font-neue font-medium text-s/50 text-[16px] tracking-[-.02em] leading-[1.4]"
                wordClassName="mr-2"
                wordDelay={0.015}
                lineDelay={0.4}
              />
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
              className="row-start-2 col-start-2 min-h-75 flex flex-col items-start gap-5 
              max-md:row-start-3 max-md:col-start-1 max-md:col-span-2 max-md:min-h-60 max-md:items-center"
            >
              <div className="mb-2 flex items-center gap-5 text-p">
                <div className="p-4 rounded-sm border-1 border-s bg-[#ffffff] backdrop-blur-md">
                  <TbBrandFigma className="text-[24px]" />
                </div>

                <span className="font-azeret text-[24px] text-s">+</span>

                <div className="p-4 rounded-sm border-1 border-s bg-[#ffffff] backdrop-blur-md">
                  <RiSparkling2Line className="text-[24px]" />
                </div>
              </div>

              <span className="font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
                direção criativa
              </span>

              <TextAnimated
                phrases={[
                  `Construímos narrativas visuais, campanhas, conceitos e linguagens para produtos e experiências.`,
                ]}
                variants={textSlide}
                animate={inView}
                as="span"
                className="flex flex-col"
                lineClassName="max-w-100 mb-5 font-neue font-medium text-s/50 text-[16px] tracking-[-.02em] leading-[1.4]"
                wordClassName="mr-2"
                wordDelay={0.015}
                lineDelay={0.4}
              />
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
              className="col-start-3 min-h-75 flex flex-col items-start gap-5 
              max-md:col-span-2 max-md:min-h-60 max-md:items-center"
            >
              <div className="mb-2 flex items-center gap-5 text-p">
                <div className="p-4 rounded-sm border-1 border-s bg-[#ffffff] backdrop-blur-md">
                  <MdOutlineAnimation className="text-[24px]" />
                </div>

                <span className="font-azeret text-[24px] text-s">+</span>

                <div className="p-4 rounded-sm border-1 border-s bg-[#ffffff] backdrop-blur-md">
                  <PiShapesBold className="text-[24px]" />
                </div>
              </div>

              <span className="font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
                motion & experiências
              </span>

              <TextAnimated
                phrases={[
                  `Exploramos movimento, ritmo e interação para transformar interfaces em experiências visuais imersivas.`,
                ]}
                variants={textSlide}
                animate={inView}
                as="span"
                className="flex flex-col"
                lineClassName="max-w-100 mb-5 font-neue font-medium text-s/50 text-[16px] tracking-[-.02em] leading-[1.4]"
                wordClassName="mr-2"
                wordDelay={0.015}
                lineDelay={0.4}
              />
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
              className="min-h-75 flex flex-col items-start gap-5 
              max-md:col-span-2 max-md:min-h-40 max-md:items-center"
            >
              <div className="mb-2 p-4 rounded-sm border-1 border-s bg-[#ffffff] backdrop-blur-md">
                <HiOutlineCodeBracketSquare className="text-p text-[24px]" />
              </div>

              <p className="max-w-125 font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
                experiências digitais
              </p>

              <TextAnimated
                phrases={[
                  `Desenvolvemos websites e experiências interativas com foco em performance, narrativa e presença visual.`,
                ]}
                variants={textSlide}
                animate={inView}
                as="span"
                className="flex flex-col"
                lineClassName="max-w-100 mb-5 font-neue font-medium text-s/50 text-[16px] tracking-[-.02em] leading-[1.4]"
                wordClassName="mr-2"
                wordDelay={0.015}
                lineDelay={0.4}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudioWhatWeDo;
