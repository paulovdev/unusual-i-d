import TextAnimated from "@/components/ui/text-animated";
import Image from "next/image";

import { useInView } from "react-intersection-observer";

import reel from "@/public/assets/images/home/bggg.jpg";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

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

const StudioIntro = () => {
  const container = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section id="about" className="relative max-md:px-5" ref={ref}>
      <div
        className="h-screen px-15 flex flex-col items-center justify-center 
        max-lg:p-10 max-lg:py-30 max-md:py-30 max-md:p-5"
      >
        <div className="mb-8 size-fit flex items-center gap-2">
          <span className="size-2  bg-p rounded-[1px]" />
          <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
            Londres, Reino Unido
          </p>
        </div>
        <TextAnimated
          phrases={[`Tornando o incomum inevitável.`]}
          variants={textSlide}
          as="h2"
          className="flex flex-col"
          lineClassName="font-neue font-normal 
              text-center text-p text-[96px]
               tracking-[-0.07em] leading-[1.1]
              max-lg:text-[62px] max-md:text-[42px] 
        "
          wordClassName="mr-2"
          wordDelay={0.015}
          lineDelay={0.2}
        />
      </div>
      <motion.div className="size-full h-screen" ref={container}>
        <motion.figure style={{ scale }}>
          <Image
            src={reel}
            width={2000}
            height={2000}
            alt="creative studio preview"
            className="relative -top-40 brightness-75 object-cover size-full rounded-sm 
                       "
            placeholder="blur"
          />
        </motion.figure>
      </motion.div>
    </section>
  );
};

export default StudioIntro;
