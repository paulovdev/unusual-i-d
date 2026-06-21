import Image from "next/image";
import element from "@/public/assets/images/circle.jpg";
import { useInView } from "react-intersection-observer";
import TextAnimated from "@/components/ui/text-animated";
import { motion } from "motion/react";
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

const HomeStatement = () => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  return (
    <section
      id="statement"
      className="h-fit px-15 pt-50 flex items-center justify-center max-lg:px-5"
      ref={ref}
    >
      <div className="relative w-full flex flex-col items-center">
        <div className="mb-15 flex items-center gap-4">
          <span className="triangle-p" />
          <p className="text-chivo-p-14 text-end">Design com intenção.</p>
        </div>
        <div className="mb-10 h-fit overflow-hidden">
          <motion.h2
            variants={textSlide}
            initial="initial"
            animate={inView && "animate"}
            className="big-text-1-n text-p
        "
          >
            FEITO PARA DURAR
          </motion.h2>
        </div>
        {[
          "Cada projeto nasce da combinação de conceito, narrativa e execução — transformando ideias em sistemas visuais vivos e reconhecíveis.",
        ].map((phrases, i, arr) => (
          <div
            className="max-w-125 h-fit overflow-hidden"
            style={{ marginBottom: arr.length - 1 === i && "40px" }}
            key={i}
          >
            <ClipText
              text={phrases}
              animate={inView && "animate"}
              delay={0.5 + 0.15 * i}
              tag="h2"
              className="max-w-125 paragraph-p text-center"
            />
          </div>
        ))}

        <div className="mt-10 size-full flex items-center justify-between max-lg:flex-col">
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
            className="relative w-full h-screen rounded-sm 
            max-lg:w-full max-md:h-[60vh] max-lg:mb-5 will-change-auto"
          >
            <Image
              src={element}
              fill
              alt="creative element"
              className="object-cover w-275 h-150 rounded-sm max-lg:w-full"
            />
          </motion.figure>
        </div>

        <span className="my-15 w-full h-px bg-p/10 max-md:my-10" />
      </div>
    </section>
  );
};

export default HomeStatement;
