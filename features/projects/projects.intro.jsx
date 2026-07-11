import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

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

const ProjectsIntro = ({ work }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section id="about" className="relative h-fit max-lg:h-75" ref={ref}>
      <div
        className="pt-40 mb-10 px-5 h-fit w-full flex flex-col items-start justify-center 
        max-lg:px-5 max-lg:justify-start max-lg:pt-40
       "
      >
        <div className="relative flex flex-col items-start">
          <div className="mb-4 relative flex items-center">
            <div className="overflow-hidden h-[125px] max-lg:h-fit">
              <motion.h2
                initial="initial"
                animate="animate"
                variants={textSlide}
                className="font-neue font-bold 
                         text-p text-[clamp(68px,8vw,142px)] text-center tracking-[-0.05em]
                          leading-none uppercase will-change-transform "
              >
                projetos
                <span className="relative top-0 text-[18px] tracking-[0.5em]">
                  .
                </span>
              </motion.h2>
            </div>
          </div>
          <div className="w-[calc(100%-15px)] h-fit overflow-hidden">
            <motion.p
              initial="initial"
              animate="animate"
              variants={textSlide}
              custom={0.25}
              className="relative left-1 text-chivo-p-14 text-start"
            >
              Todo projeto é uma prova de conceito.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsIntro;
