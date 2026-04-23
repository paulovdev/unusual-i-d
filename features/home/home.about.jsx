import Button from "@/components/ui/button";
import TextAnimated from "@/components/ui/text-animated";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import reel from "@/public/assets/images/reel.jpg";
import { IoMdPlay } from "react-icons/io";

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

const HomeAbout = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section id="about" className="relative h-fit p-15 max-md:px-5" ref={ref}>
      <div className="mb-20 size-fit flex items-center gap-2">
        <span className="size-2 bg-p rounded-[1px]" />
        <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-widest leading-none uppercase">
          Approach
        </p>
      </div>

      <TextAnimated
        phrases={[
          `Space is not decoration. It is structure, tension and balance.`,
          `Defined by light, material and proportion — creating environments that feel calm, precise and intentional.`,
        ]}
        variants={textSlide}
        animate={inView}
        as="h2"
        className="flex flex-col max-w-400"
        lineClassName="mb-10 font-i-sans font-normal 
        text-p text-[68px] tracking-[-0.07em] leading-none
        max-md:text-[38px]
        "
        wordClassName="mr-2"
        wordDelay={0.035}
        lineDelay={0.04}
      />

      <div className="mt-15 w-full h-px bg-p/15" />

      <div
        className="mt-10 w-full flex items-start justify-end gap-5
        max-md:justify-between max-md:gap-2"
      >
        <Button
          text="The studio"
          bg="bg-p"
          textColor="text-s"
          iconColor="text-s"
          hoverBg="bg-s"
          hoverTextColor="text-p"
          hoverIconColor="text-p"
        />

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
          className="relative w-125 h-75 overflow-hidden rounded-md group
          max-md:w-74 max-md:h-50"
        >
          <Image
            src={reel}
            width={2000}
            height={2000}
            alt="spaces preview"
            className="object-cover size-full rounded-md brightness-75
            transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
            group-hover:scale-110"
            placeholder="blur"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition">
              <IoMdPlay className="text-s text-[14px]" />
              <p className="font-azeret text-[12px] tracking-[0.2em] uppercase text-s">
                Enter spaces
              </p>
            </div>
          </div>
        </motion.figure>
      </div>
    </section>
  );
};

export default HomeAbout;
