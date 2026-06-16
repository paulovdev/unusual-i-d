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
    <section id="about" className="relative h-[65vh]" ref={ref}>
      <div
        className="pb-20 px-15 h-screen w-full flex flex-col items-start justify-center 
        max-md:px-5
       "
      >
        <div className="relative flex flex-col items-start">
          <div className="mb-4 relative flex items-center">
            <div className="overflow-hidden h-[125px] max-md:h-fit">
              <motion.h2
                initial="initial"
                animate="animate"
                variants={textSlide}
                className="font-neue font-bold 
                         text-p text-[clamp(68px,8vw,142px)] text-center tracking-[-0.05em]
                          leading-none uppercase will-change-transform "
              >
                projetos
                <span className="relative top-3.5 left-2 align-top text-[18px] tracking-[0.5em] max-md:top-1.5">
                  .{work.length}
                </span>
              </motion.h2>
            </div>
          </div>
          <div className="w-[calc(100%-15px)] h-fit overflow-hidden">
            <motion.p
              initial="initial"
              animate="animate"
              variants={textSlide}
              className="relative left-1 text-chivo-p-14 text-start"
            >
              de 2023 a 2026
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsIntro;
