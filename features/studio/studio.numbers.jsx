import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
  useScroll,
} from "motion/react";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import numberBg from "@/public/assets/images/about/numbers.jpg";
import { useInView } from "react-intersection-observer";
import { ClipText } from "@/components/ui/clip-text";

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
  const container = useRef(null);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end start"],
  });

  return (
    <section id="what-we-do" className="relative h-screen p-5 py-15" ref={ref}>
      <div className="absolute inset-0 w-screen h-screen" ref={container}>
        <Image
          src={numberBg}
          width={2000}
          height={2000}
          alt=""
          placeholder="blur"
          className="size-full object-cover brightness-40"
        />
      </div>
      <div className="size-full flex flex-col justify-between items-center">
        <div className="mb-25 size-fit flex items-center gap-4 max-lg:mb-15">
          <span className="triangle-s" />
          <p className="text-chivo-s-14 text-end">MÉTRICAS</p>
        </div>

        <div className="w-full h-full flex items-start justify-between gap-2.5">
          {numbers.map((item, i) => {
            const cardY = useTransform(
              scrollYProgress,
              [0, 0.75],
              [`${76 * i}%`, "0%"],
            );
            return (
              <motion.div
                key={i}
                style={{ y: cardY }}
                className={`min-h-100 p-10 rounded-md 
                flex flex-col justify-center items-center`}
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
                    text-s text-[clamp(48px,6vw,100px)]
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
                {[item.label].map((phrases, i) => (
                  <div key={i} className="max-w-75">
                    <ClipText
                      text={phrases}
                      animate={inView && "animate"}
                      delay={0.15 * i}
                      tag="h2"
                      className="mt-5 text-chivo-n-14 text-s/50 text-center"
                    />
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StudioNumbers;
