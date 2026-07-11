import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  animate,
} from "motion/react";
import { useEffect, useState } from "react";

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
    number: 75,
    suffix: "+",
    label: "planejamentos espaciais desenvolvidos para residências",
    bg: "bg-[#101010]",
  },
  {
    number: 180,
    prefix: "£",
    suffix: "M+",
    label: "em projetos residenciais realizados",
    bg: "bg-[#202020]",
  },
  {
    number: 300,
    suffix: "+",
    label: "móveis, objetos e obras selecionados",
    bg: "bg-[#303030]",
  },
  {
    number: 25,
    suffix: "+",
    label: "ambientes residenciais transformados",
    bg: "bg-[#404040]",
  },
];

function CounterNumber({ value, prefix = "", suffix = "", start }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(count, "change", (latest) => {
    setDisplay(Math.floor(latest));
  });

  useEffect(() => {
    if (!start) return;

    const controls = animate(count, value, {
      duration: 1.8,
      ease: [0.33, 1, 0.68, 1],
    });

    return controls.stop;
  }, [start, value]);

  return (
    <>
      {prefix}
      {display}
      {suffix}
    </>
  );
}

const StudioNumbers = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section id="what-we-do" className="p-5 py-15 bg-bg-p" ref={ref}>
      <div className="w-full flex flex-col justify-center  items-center">
        <div className="mb-25 size-fit flex items-center gap-4 max-lg:mb-15">
          <span className="triangle-s" />
          <p className="text-chivo-s-14 text-end">MÉTRICAS</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {numbers.map((item, i) => (
            <div
              key={i}
              className={`h-125 border border-s/10 ${item.bg} rounded-md flex flex-col justify-center items-center`}
            >
              <div className="h-fit overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }}
                  animate={inView ? { y: "0%" } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + i * 0.15,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="
                    font-neue font-bold
                    text-s text-[clamp(68px,6vw,142px)]
                    tracking-[-0.05em]
                    leading-none uppercase
                    will-change-transform
                  "
                >
                  <CounterNumber
                    value={item.number}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    start={inView}
                  />
                </motion.h2>
              </div>

              <p className="mt-5 text-chivo-n-14 text-s/75 text-center">
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
