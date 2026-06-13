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

const numbers = [
  {
    number: "08+",
    label: "anos criando experiências digitais",
  },
  {
    number: "50+",
    label: "projetos entregues globalmente",
  },
  {
    number: "12",
    label: "prêmios e menções internacionais",
  },
];

const StudioNumbers = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section id="what-we-do" className="p-15 bg-bg-p max-md:px-5" ref={ref}>
      <div className="mb-15 w-full h-px bg-s/15"></div>
      <div className="w-full flex max-md:flex-col max-md:px-5">
        <div className="flex-1 size-fit flex items-center gap-4 max-md:mb-15">
          <span className="relative -top-px size-2.5 bg-s rotate-45" />
          <p
            className="font-chivo font-semibold 
          text-s text-[14px] text-end tracking-widest 
          leading-none uppercase will-change-transform"
          >
            nossos números
          </p>
        </div>
        <div className="flex-1 flex flex-col ">
          {numbers.map((item, i) => (
            <div
              key={i}
              className="border-b border-s/15 flex flex-col items-start"
            >
              <div className="mb-4 h-fit overflow-hidden">
                <motion.h2
                  variants={textSlide}
                  initial="initial"
                  animate={inView && "animate"}
                  custom={0.15 + i * 0.15}
                  className="
        font-neue font-bold
        text-s text-[142px]
        tracking-[-0.05em]
        leading-none uppercase
        will-change-transform"
                >
                  {item.number}
                </motion.h2>
              </div>

              <p
                className="
      mb-15 font-chivo font-semibold
      text-s/75 text-[14px]
      tracking-widest
      leading-none uppercase"
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioNumbers;
