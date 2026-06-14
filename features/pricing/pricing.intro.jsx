import { ClipText } from "@/components/ui/clip-text";
import { motion } from "motion/react";

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

const PricingIntro = () => {
  return (
    <section
      id="about"
      className="relative px-15 pt-40 h-[70vh] flex flex-col items-center justify-center max-md:px-5"
    >
      <div className="relative flex flex-col items-start">
        <div className="mb-4 relative flex items-center">
          <div className="h-fit overflow-hidden">
            <motion.h2
              {...textSlide}
              custom={0}
              className="font-neue font-bold 
                     text-p text-[clamp(68px,8vw,142px)] text-center tracking-[-0.05em]
                      leading-none uppercase will-change-transform max-md:text-[68px]"
            >
              preços
              <span
                className="relative top-3.5 left-2 align-top
                        text-[28px] tracking-[0.4em]"
              >
                .
              </span>
            </motion.h2>
          </div>
        </div>
        <div className="w-[calc(100%+15px)] h-fit overflow-hidden">
          <motion.p
            {...textSlide}
            custom={0.25}
            className="relative left-1 font-chivo font-semibold 
               text-p text-[14px] text-start tracking-widest
               leading-normal uppercase will-change-transform"
          >
            VEJA A NOSSA TABELA
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default PricingIntro;
