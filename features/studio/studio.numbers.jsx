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
    number: "05+ ",
    label: "projetos completos",
  },
  {
    number: "156% ",
    label: "CONVERSÕES ELEVADAS",
  },
  {
    number: "10+ ",
    label: "clientes ativos",
  },
  {
    number: "1M+ ",
    label: "de visitas todos os meses",
  },
];

const StudioNumbers = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section id="what-we-do" className="p-15 bg-bg-p max-lg:px-5" ref={ref}>
      <div className="mb-15 w-full h-px bg-s/15"></div>
      <div className="w-full flex max-lg:flex-col max-lg:px-5">
        <div className="flex-1 size-fit flex items-center gap-4 max-lg:mb-15">
          <span className="triangle-s" />
          <p className="text-chivo-s-14 text-end">MÉTRICAS</p>
        </div>
        <div className="flex-1 flex flex-col ">
          {numbers.map((item, i) => (
            <div
              key={i}
              className="border-b border-s/15 flex flex-col items-start"
            >
              <div className="my-4 h-fit overflow-hidden">
                <motion.h2
                  variants={textSlide}
                  initial="initial"
                  animate={inView && "animate"}
                  custom={0.15 + i * 0.15}
                  className="
        font-neue font-bold
        text-s text-[clamp(68px,6vw,142px)]
        tracking-[-0.05em]
        leading-none uppercase
        will-change-transform"
                >
                  {item.number}
                </motion.h2>
              </div>

              <p
                className="
      mb-15 text-chivo-s-14 text-start"
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
