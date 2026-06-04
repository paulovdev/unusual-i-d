import Button from "@/components/ui/button";
import TextAnimated from "@/components/ui/text-animated";
import Image from "next/image";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "motion/react";
import reel from "@/public/assets/images/reel.jpg";

import Link from "next/link";
import { LuDoorClosed, LuDoorOpen } from "react-icons/lu";
import { useRouter } from "next/navigation";
import TransitionLink from "@/components/ui/link";
import ImageComponent from "@/components/ui/image";

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

const HomeAbout = ({ work }) => {
  const router = useRouter();
  const [hover, setHover] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section id="about" className="relative h-fit p-15 max-md:px-5" ref={ref}>
      <div className="mb-20 size-fit flex items-center gap-2">
        <span className="size-2  bg-p rounded-[1px]" />
        <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
          Estúdio
        </p>
      </div>

      <TextAnimated
        phrases={[
          `Cada projeto nasce da combinação de conceito, movimento e narrativa — criando linguagens contemporâneas, expressivas e memoráveis.`,
        ]}
        variants={textSlide}
        animate={inView}
        as="h2"
        className="flex flex-col max-w-425"
        lineClassName="mb-10 font-neue font-normal 
        text-p text-[64px] tracking-[-0.07em] leading-none
        max-md:text-[38px]
        "
        wordClassName="mr-2"
        wordDelay={0.015}
        lineDelay={0.4}
      />

      <div className="mt-15 w-full h-px bg-p/15" />

      <div
        className="mt-10 w-full flex items-start justify-end gap-5
        max-md:justify-between max-md:gap-2"
      >
        <TransitionLink href="/studio">
          <Button
            text="estúdio"
            bg="bg-p"
            textColor="text-s"
            iconColor="text-s"
            hoverBg="bg-s"
            hoverTextColor="text-p"
            hoverIconColor="text-p"
          />
        </TransitionLink>
        <TransitionLink href="/projects">
          <motion.figure
            initial={{ scale: 0 }}
            animate={{
              scale: inView ? 1 : 0,
              transition: {
                duration: 0.8,
                delay: 0.25,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            className="relative w-125 h-75 overflow-hidden rounded-sm group
          max-md:w-74 max-md:h-50"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(null)}
            onClick={() => router.push("/projects")}
          >
            {work.slice(11, 12).map((item, i) => (
              <ImageComponent
                key={i}
                image={item.heroMedia.image}
                width={2000}
                height={2000}
                alt="projects preview"
                className="object-cover size-full rounded-sm brightness-75
            transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
            group-hover:scale-110"
                placeholder="blur"
              />
            ))}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  <div className="" key={hover}>
                    {hover ? (
                      <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0.5 }}
                        transition={{
                          duration: 0.1,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                      >
                        <LuDoorOpen className="text-s text-[20px]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0.5 }}
                        transition={{
                          duration: 0.1,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                      >
                        <LuDoorClosed className="text-s text-[20px]" />
                      </motion.div>
                    )}
                  </div>
                </AnimatePresence>

                <p className="font-azeret text-[12px] tracking-[0.2em] uppercase text-s">
                  ver projetos
                </p>
              </div>
            </div>
          </motion.figure>
        </TransitionLink>
      </div>
    </section>
  );
};

export default HomeAbout;
