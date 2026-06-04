import { useRef } from "react";
import bgCover from "@/public/assets/images/home/bgg.jpg";
import Image from "next/image";

import TextAnimated from "@/components/ui/text-animated";
import { useInView } from "react-intersection-observer";
import { motion, useScroll, useTransform } from "motion/react";

import { HiOutlineSparkles } from "react-icons/hi2";
import { TbLayoutGrid } from "react-icons/tb";
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

const HomeIntro = () => {
  const container = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const yP = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section id="intro" className="relative h-[175vh]" ref={container}>
      <div className="relative w-screen h-[175vh] overflow-hidden ">
        <div className="absolute inset-0 size-full ">
          <Image
            src={bgCover}
            width={2000}
            height={2000}
            alt="home-hero-image"
            className="object-cover size-full brightness-75"
            placeholder="blur"
            priority
          />
          {/*   <video
            src="/assets/videos/bg.mp4"
            autoPlay
            muted
            loop
            className="object-cover size-full brightness-75 noise"
          /> */}
        </div>
        <div className="absolute top-0 left-0 px-15 py-10 w-full max-lg:px-10 max-md:px-5">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-start gap-5">
              <HiOutlineSparkles className="text-s text-[20px]" />

              <div className="flex flex-col items-start">
                <p className="font-azeret font-medium text-s text-[12px] leading-[1.1] uppercase">
                  ESTÚDIO CRIATIVO — 2026
                </p>

                <p className="font-azeret font-medium text-s text-[12px] leading-[1.1] uppercase">
                  MARCA — SISTEMAS VISUAIS
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <TbLayoutGrid className="text-s text-[20px]" />

              <div className="flex flex-col items-start">
                <p className="font-azeret font-medium text-s text-[12px] leading-[1.1] uppercase">
                  DIREÇÃO CRIATIVA — DIGITAL
                </p>

                <p className="font-azeret font-medium text-s text-[12px] leading-[1.1] uppercase">
                  MOTION — EXPERIÊNCIAS INTERATIVAS
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 px-15 py-30 h-screen flex items-end justify-center 
        max-lg:p-10 max-lg:py-30 max-md:py-30 max-md:p-5"
        >
          <TextAnimated
            phrases={[`Um estúdio criativo que dá forma a projetos distintos.`]}
            variants={textSlide}
            as="h2"
            className="flex flex-col"
            lineClassName="font-neue font-normal 
              text-center text-s text-[96px] tracking-[-0.07em] leading-[1.1]
              max-lg:text-[62px] max-md:text-[42px] 
        "
            wordClassName="mr-2"
            wordDelay={0.015}
            lineDelay={0.1}
          />
        </div>
        <motion.div
          className="absolute inset-0 p-15 w-full h-full flex items-end justify-end max-lg:p-10 max-md:p-5"
          style={{ y: yP }}
        >
          <div
            className="flex flex-col items-start gap-10 select-none"
            ref={ref}
          >
            <div className="size-fit flex items-center gap-2">
              <span className="size-2 bg-s rounded-[1px]" />
              <p className="max-w-125 font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
                Design não é apenas estética.
              </p>
            </div>

            <TextAnimated
              phrases={[
                `É ritmo, narrativa e construção visual.`,
                `Desenvolvemos identidades, movimentos, interfaces e sistemas digitais através de direção criativa, experimentação e precisão visual.`,
              ]}
              variants={textSlide}
              animate={inView}
              as="p"
              className="flex flex-col"
              lineClassName="max-w-125 mb-4 font-azeret font-medium 
              text-s/75 text-[14px] tracking-none leading-[1.1] uppercase
        "
              wordClassName="mr-2"
              wordDelay={0.015}
              lineDelay={0.1}
            />
            {/*    <Button
              text="view work"
              bg="bg-s"
              textColor="text-p"
              iconColor="text-p"
            /> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeIntro;
