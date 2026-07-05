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
  },
  {
    number: 180,
    prefix: "£",
    suffix: "M+",
    label: "em projetos residenciais realizados",
  },
  {
    number: 300,
    suffix: "+",
    label: "móveis, objetos e obras selecionados",
  },
  {
    number: 25,
    suffix: "+",
    label: "ambientes residenciais transformados",
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
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section id="what-we-do" className="px-15 max-lg:px-5" ref={ref}>
      <div className="mb-5 w-full h-px bg-s/15" />

      <div className="w-full flex max-lg:flex-col max-lg:px-5">
        <div className="flex-1 size-fit flex items-center gap-4 max-lg:mb-15">
          <span className="triangle-p" />
          <p className="text-chivo-p-14 text-end">MÉTRICAS</p>
        </div>

        <div className="flex-1 flex flex-col">
          {numbers.map((item, i) => (
            <div
              key={i}
              className="border-b border-p/10 flex flex-col items-start"
            >
              <div className="my-4 h-fit overflow-hidden">
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
                    text-p text-[clamp(68px,6vw,142px)]
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

              <p className="mb-15 text-chivo-p-14 text-start">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioNumbers;
