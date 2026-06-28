import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

import { TbBrandFigma } from "react-icons/tb";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { PiShapesBold } from "react-icons/pi";
import { RiSparkling2Line } from "react-icons/ri";
import { MdOutlineAnimation } from "react-icons/md";

import { LuLampCeiling, LuRuler, LuSofa, LuPanelTop } from "react-icons/lu";

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
    <section id="what-we-do" className="bg-bg-p" ref={ref}>
      <div className="p-15 flex flex-col items-center justify-center max-lg:px-5">
        <div className="mb-10 size-fit flex items-center gap-4">
          <span className="triangle-s" />
          <p className="text-chivo-s-14 text-end">o que fazemos?</p>
        </div>

        <div className="pt-10 flex flex-col items-center justify-center gap-10">
          {[`NOSSAS ESPECIALIDADES`].map((phrases, i) => (
            <div className="mb-4 h-fit overflow-hidden" key={i}>
              <motion.h2
                variants={textSlide}
                initial="initial"
                animate={inView && "animate"}
                custom={0.5 + 0.15 * i}
                className="big-text-1-n text-s"
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
            className="w-full h-fit grid grid-cols-4 gap-5 max-lg:grid-cols-1"
          >
            {/* 01 */}
            <div
              className="min-h-125 p-5 pt-10 bg-bg-p-2 rounded-sm flex flex-col items-start justify-between gap-5 
  max-lg:min-h-100"
            >
              <div className="mb-2 p-4 rounded-sm border border-s bg-bg-s backdrop-blur-md">
                <LuRuler className="text-p text-[24px]" />
              </div>

              <div className="flex flex-col items-start">
                <p className="mb-15 text-chivo-s-14 text-end">
                  arquitetura de interiores
                </p>

                <div className="mb-4 h-fit overflow-hidden">
                  <motion.h2
                    variants={textSlide}
                    initial="initial"
                    animate={inView && "animate"}
                    custom={0.5}
                    className="paragraph-n text-s/75 font-normal"
                  >
                    Desenvolvemos layouts, fluxos espaciais e detalhes
                    arquitetônicos que definem como cada ambiente funciona e é
                    vivido.
                  </motion.h2>
                </div>
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
              className="min-h-125 p-5 pt-10 bg-bg-p-2 rounded-sm flex flex-col items-start justify-between gap-5 
  max-lg:min-h-100"
            >
              <div className="mb-2 p-4 rounded-sm border border-s bg-bg-s backdrop-blur-md">
                <LuPanelTop className="text-p text-[24px]" />
              </div>

              <div className="flex flex-col items-start">
                <p className="mb-15 text-chivo-s-14 text-end">
                  design de interiores
                </p>

                <div className="mb-4 h-fit overflow-hidden">
                  <motion.h2
                    variants={textSlide}
                    initial="initial"
                    animate={inView && "animate"}
                    custom={0.6}
                    className="paragraph-n text-s/75 font-normal"
                  >
                    Criamos interiores completos com equilíbrio entre materiais,
                    iluminação, proporção e uma linguagem estética atemporal.
                  </motion.h2>
                </div>
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
              className="min-h-125 p-5 pt-10 bg-bg-p-2 rounded-sm 
  flex flex-col items-start justify-between gap-5 max-lg:min-h-100"
            >
              <div className="mb-2 p-4 rounded-sm border border-s bg-bg-s backdrop-blur-md">
                <LuSofa className="text-p text-[24px]" />
              </div>

              <div className="flex flex-col items-start">
                <p className="mb-15 text-chivo-s-14 text-end">
                  mobiliário & curadoria
                </p>

                <div className="mb-4 h-fit overflow-hidden">
                  <motion.h2
                    variants={textSlide}
                    initial="initial"
                    animate={inView && "animate"}
                    custom={0.7}
                    className="paragraph-n text-s/75 font-normal"
                  >
                    Selecionamos móveis, obras de arte, objetos e materiais que
                    reforçam a identidade e atmosfera de cada residência.
                  </motion.h2>
                </div>
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
              className="min-h-125 p-5 pt-10 bg-bg-p-2 rounded-sm flex flex-col items-start justify-between gap-5 
  max-lg:min-h-100"
            >
              <div className="mb-2 p-4 rounded-sm border border-s bg-bg-s backdrop-blur-md">
                <LuLampCeiling className="text-p text-[24px]" />
              </div>

              <div className="flex flex-col items-start">
                <p className="mb-15 text-chivo-s-14 text-end">
                  iluminação & atmosfera
                </p>

                <div className="mb-4 h-fit overflow-hidden">
                  <motion.h2
                    variants={textSlide}
                    initial="initial"
                    animate={inView && "animate"}
                    custom={0.8}
                    className="paragraph-n text-s/75 font-normal"
                  >
                    Criamos ambientes onde luz, textura e materiais trabalham
                    juntos para construir experiências sensoriais e acolhedoras.
                  </motion.h2>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudioWhatWeDo;
