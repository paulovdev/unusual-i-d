import TextAnimated from "@/components/ui/text-animated";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { PiLampPendantBold } from "react-icons/pi";
import { TbLayoutGrid } from "react-icons/tb";
import { HiOutlineCubeTransparent, HiOutlinePaintBrush } from "react-icons/hi2";
import { PiArmchairBold } from "react-icons/pi";

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
    <section id="what-we-do" className="bg-[#121212]" ref={ref}>
      <div className="p-15 max-md:px-5">
        <div className="mb-10 size-fit flex items-center gap-2">
          <span className="size-2 bg-s rounded-[1px]" />
          <p className="max-w-125 font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
            O QUE FAZEMOS?
          </p>
        </div>
        <div className="pt-50 flex flex-col items-start gap-10">
          <TextAnimated
            phrases={[
              `Desenvolvimento completo de ambientes residenciais e comerciais`,
              `Do layout à finalização do projeto.`,
            ]}
            variants={textSlide}
            animate={inView}
            as="h2"
            className="flex flex-col"
            lineClassName="font-neue font-normal 
        text-s text-[64px] tracking-[-0.07em] leading-none
        max-md:text-[38px]
        "
            wordClassName="mr-2"
            wordDelay={0.015}
            lineDelay={0.2}
          />

          <span className="w-full h-px bg-s/25" />
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1,
            }}
            className="w-full h-fit grid grid-cols-4 grid-rows-2 max-md:grid-cols-2"
          >
            <div
              className="min-h-75 flex flex-col items-start gap-5 
            max-md:col-span-2 max-md:min-h-40 max-md:items-center"
            >
              <div className="mb-2 p-4 rounded-sm border-1 border-s bg-[#fefcf5] backdrop-blur-md">
                <TbLayoutGrid className="text-p text-[24px]" />
              </div>
              <span className="font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
                Concepção de ambientes
              </span>
              <TextAnimated
                phrases={[
                  `Definição de layout, organização dos ambientes e criação da atmosfera interna de cada projeto.`,
                ]}
                variants={textSlide}
                animate={inView}
                as="span"
                className="flex flex-col"
                lineClassName="max-w-100 mb-5 font-azeret font-medium
                text-s/50 text-[14px] tracking-[0.05em] leading-[1.2] uppercase
                max-md:text-center"
                wordClassName="mr-2"
                wordDelay={0.015}
                lineDelay={0.4}
              />
            </div>
            {/*  */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.2,
              }}
              className="row-start-2 col-start-2 min-h-75 flex flex-col items-start gap-5 
            max-md:row-start-3 max-md:col-start-1 max-md:col-span-2 max-md:min-h-60 max-md:items-center"
            >
              <div className="mb-2 flex items-center gap-5 text-p">
                <div className="p-4 rounded-sm border-1 border-s bg-[#fefcf5] backdrop-blur-md">
                  <HiOutlinePaintBrush className="text-[24px]" />
                </div>
                <span className="font-azeret text-[24px] text-s">+</span>
                <div className="p-4 rounded-sm border-1 border-s bg-[#fefcf5] backdrop-blur-md">
                  <HiOutlineCubeTransparent className="text-[24px]" />
                </div>
              </div>
              <span className="font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
                Materiais e acabamentos
              </span>
              <TextAnimated
                phrases={[
                  `Seleção de materiais, revestimentos e texturas — equilibrando estética, durabilidade e uso no ambiente.`,
                ]}
                variants={textSlide}
                animate={inView}
                as="span"
                className="flex flex-col"
                lineClassName="max-w-100 mb-5 font-azeret font-medium 
                text-s/50 text-[14px] tracking-[0.05em] leading-[1.2] uppercase
                max-md:text-center"
                wordClassName="mr-2"
                wordDelay={0.015}
                lineDelay={0.4}
              />{" "}
            </motion.div>
            {/*  */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.3,
              }}
              className="col-start-3 min-h-75 flex flex-col items-start gap-5 
max-md:col-span-2 max-md:min-h-60 max-md:items-center"
            >
              <div className="mb-2 flex items-center gap-5 text-p">
                <div className="p-4 rounded-sm border-1 border-s bg-[#fefcf5] backdrop-blur-md">
                  <PiLampPendantBold className="text-[24px]" />
                </div>
                <span className="font-azeret text-[24px] text-s">+</span>
                <div className="p-4 rounded-sm border-1 border-s bg-[#fefcf5] backdrop-blur-md">
                  <PiArmchairBold className="text-[24px]" />
                </div>
              </div>

              <span className="font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
                Iluminação de interiores
              </span>

              <TextAnimated
                phrases={[
                  `Iluminação natural e artificial aplicada aos ambientes internos — criando conforto, função e atmosfera.`,
                ]}
                variants={textSlide}
                animate={inView}
                as="span"
                className="flex flex-col"
                lineClassName="max-w-100 mb-5 font-azeret font-medium 
                text-s/50 text-[14px] tracking-[0.05em] leading-[1.2] uppercase
                max-md:text-center"
                wordClassName="mr-2"
                wordDelay={0.015}
                lineDelay={0.4}
              />
            </motion.div>
            {/*  */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.4,
              }}
              className="min-h-75 flex flex-col items-start gap-5 
            max-md:col-span-2 max-md:min-h-40 max-md:items-center"
            >
              <div className="mb-2 p-4 rounded-sm border-1 border-s bg-[#fefcf5] backdrop-blur-md">
                <PiArmchairBold className="text-p text-[24px]" />
              </div>
              <p className="max-w-125 font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
                Design de interiores
              </p>
              <TextAnimated
                phrases={[
                  `Projetamos interiores do conceito à execução — organizando ambientes através de layout, materiais e iluminação.`,
                ]}
                variants={textSlide}
                animate={inView}
                as="span"
                className="flex flex-col"
                lineClassName="max-w-100 mb-5 font-azeret font-medium 
                text-s/50 text-[14px] tracking-[0.05em] leading-[1.2] uppercase
                max-md:text-center"
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
