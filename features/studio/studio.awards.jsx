import { useInView } from "react-intersection-observer";

import { motion } from "motion/react";
import { useState } from "react";

import { awards } from "@/data/data";
import { AiOutlinePlus } from "react-icons/ai";

const textSlide = {
  initial: { y: "100%" },
  animate: (custom) => ({
    y: "0%",
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
      delay: custom,
    },
  }),
};

const StudioAwards = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const [opened, setOpened] = useState(0);

  const handleToggle = (index) => {
    setOpened(opened === index ? null : index);
  };

  return (
    <section
      id="about"
      className="relative  p-15 bg-bg-p flex flex-col items-start justify-between max-lg:px-5"
      ref={ref}
    >
      <div className="my-15 w-full h-px bg-s/10" />

      <div className="flex-1 size-fit flex items-center gap-4">
        <span className="relative -top-px size-2.5 bg-s rotate-45" />
        <p className="text-chivo-s-14 text-end">prêmios e reconhecimentos</p>
      </div>
      <div className="relative mt-25 w-full">
        <div className="flex flex-col">
          {awards.map((item, i) => (
            <motion.div key={i} className="border-b border-p/5">
              <button
                onClick={() => handleToggle(i)}
                className="w-full flex items-center justify-between py-5 cursor-pointer max-lg:items-start"
              >
                <div className="flex items-center gap-10 max-lg:flex-col max-lg:items-start">
                  <div className="min-w-10 h-fit overflow-hidden">
                    <motion.p
                      variants={textSlide}
                      initial="initial"
                      animate={inView && "animate"}
                      custom={0.25 + 0.15 * i}
                      className="text-chivo-s-14 text-start"
                    >
                      {item.year}
                    </motion.p>
                  </div>
                  <div className="h-fit overflow-hidden">
                    <motion.h3
                      variants={textSlide}
                      initial="initial"
                      animate={inView && "animate"}
                      custom={0.5 + 0.15 * i}
                      className="font-neue font-bold
      text-s text-[clamp(40px,6vw,72px)] text-start tracking-[-0.05em]
           leading-none uppercase"
                    >
                      {item.title}
                    </motion.h3>
                  </div>
                </div>

                <motion.div
                  animate={{
                    rotate: opened === i ? 45 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <div className="relative h-fit overflow-hidden max-lg:-top-2">
                    <motion.div
                      variants={textSlide}
                      initial="initial"
                      animate={inView && "animate"}
                      custom={0.15 * i}
                    >
                      <AiOutlinePlus className="text-[42px] text-s max-lg:text-[32px]" />
                    </motion.div>
                  </div>
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: opened === i ? "auto" : 0,
                  opacity: opened === i ? 1 : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="overflow-hidden"
              >
                <div className="pt-5 pb-15 pl-20 max-w-[900px] max-lg:pl-0">
                  <div className="grid grid-cols-3 gap-10 mb-15">
                    <div>
                      <p className="text-chivo-n-14 text-s/50 mb-2">
                        Organização
                      </p>

                      <p className="text-chivo-s-14">{item.organization}</p>
                    </div>

                    <div>
                      <p className="text-chivo-n-14 text-s/50 mb-2">
                        Categoria
                      </p>

                      <p className="text-chivo-s-14">{item.category}</p>
                    </div>

                    <div>
                      <p className="text-chivo-n-14 text-s/50 mb-2">
                        Resultado
                      </p>

                      <p className="text-chivo-s-14">{item.result}</p>
                    </div>
                  </div>
                  <div className="my-10 w-full h-px bg-p/10"></div>
                  <p className="max-w-125 paragraph-n text-s/75 max-lg:max-w-full">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioAwards;
