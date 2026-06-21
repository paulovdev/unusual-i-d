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
      id="price"
      className="
    relative h-[65vh]
    px-15 pt-40
    flex flex-col items-center justify-center
    max-lg:px-5 max-lg:pt-30 max-lg:items-start max-lg:h-75 z-10
  "
    >
      <div className="relative flex items-center justify-center">
        <div className="relative flex flex-col items-start">
          <div className="mb-4 relative flex items-center ">
            <div className="overflow-hidden h-[125px] max-lg:h-fit">
              <motion.h2
                {...textSlide}
                custom={0}
                className="big-text-intro-p text-s"
              >
                nossos
                <span
                  className="relative top-3.5 left-2 align-top
                        text-[28px] tracking-[0.4em]"
                >
                  .
                </span>
              </motion.h2>
            </div>
          </div>
          <div className="relative w-[calc(100%+15px)] h-fit overflow-hidden">
            <motion.p
              {...textSlide}
              custom={0.25}
              className="relative left-1 text-chivo-s-14 text-start"
            >
              PREÇOS
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingIntro;
