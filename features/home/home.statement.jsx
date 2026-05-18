import Image from "next/image";
import element from "@/public/assets/images/circle.jpg";
import { useInView } from "react-intersection-observer";
import TextAnimated from "@/components/ui/text-animated";
import { motion } from "framer-motion";

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

const HomeStatement = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <section
      id="statement"
      className="relative px-15 h-[160vh] flex items-end justify-start max-md:px-5"
      ref={ref}
    >
      <div className="w-full h-screen flex flex-col items-start justify-end gap-25">
        <TextAnimated
          phrases={[
            `Cada decisão nasce da relação entre luz, proporção e materialidade.`,
            `Buscamos equilíbrio entre precisão e sensibilidade para criar espaços silenciosos, claros e intencionais.`,
          ]}
          variants={textSlide}
          animate={inView}
          as="h2"
          className="flex flex-col"
          lineClassName="mb-10 font-neue font-normal 
        text-p text-[64px] tracking-[-0.07em] leading-none
        max-md:text-[38px]
        "
          wordClassName="mr-2"
          wordDelay={0.015}
          lineDelay={0.4}
        />

        <div className="size-full flex items-center justify-between max-md:flex-col">
          <motion.figure
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{
              clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
              transition: {
                duration: 0.8,
                delay: 0.25,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            className="relative w-275 h-150 rounded-md max-md:w-full max-md:mb-5"
          >
            <Image
              src={element}
              fill
              sizes=""
              alt="saq"
              className="object-cover w-275 h-150 rounded-md max-md:w-full"
            />
          </motion.figure>
          <TextAnimated
            phrases={[
              `Cada elemento — da luz ao material, da proporção ao detalhe — é pensado para construir ambientes calmos, precisos e profundamente intencionais.`,
            ]}
            variants={textSlide}
            animate={inView}
            as="p"
            className="flex flex-col"
            lineClassName="max-w-150 mb-5 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-[1.2] uppercase
        "
            wordClassName="mr-2"
            wordDelay={0.015}
            lineDelay={0.4}
          />
        </div>
        <span className="w-full h-px bg-s/10" />
      </div>
    </section>
  );
};

export default HomeStatement;
