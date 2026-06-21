"use client";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useRef, useState } from "react";
import { clients } from "@/data/data";

const HomeClients = () => {
  const container = useRef(null);
  const [hover, setHover] = useState(null);

  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  const clients2 = [...clients, ...clients];
  return (
    <section
      id="clients"
      className="relative mt-15 px-15 overflow-hidden max-lg:px-5 max-md:mt-0"
    >
      <div className="mb-10 h-4 flex items-center gap-4">
        <span className="triangle-p" />
        <p className="text-chivo-p-14">Aprovado por visionários</p>
      </div>

      <div className="relative pt-10 pb-20 w-full">
        <motion.div
          ref={container}
          className="flex w-max items-center gap-25 max-lg:gap-15 max-lg:gap-10"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: clients.length * 2.5,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {clients2.map((client, i) => {
            const Icon = client.icon;
            const active = hover === i;

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="relative flex items-center justify-center h-50"
              >
                <div className="w-30 flex items-center justify-center">
                  <div className="flex flex-row">
                    <Icon
                      className={`ml-30 text-[62px] text-p ${
                        active ? "scale-90" : "scale-100"
                      } transition-all duration-500`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeClients;
