import TextAnimated from "@/components/ui/text-animated";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import String from "@/components/ui/stringcopy";
import Button from "@/components/ui/button";
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
const HomeWhatWeDo = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <section id="what-we-do" className="bg-[#151515]" ref={ref}>
      <div className="p-15 max-md:px-5">
        <div className="mb-10 size-fit flex items-center gap-2">
          <span className="size-2 bg-s rounded-[1px]" />
          <p className="max-w-125 font-azeret font-medium text-s text-[14px] tracking-widest leading-none uppercase">
            WHAT WE DO
          </p>
        </div>
        <div className="pt-50 flex flex-col items-start gap-10">
          <p className="max-w-125 font-azeret font-medium text-s/75 text-[14px] tracking-widest leading-[1.1] uppercase">
            Spatial capabilities
          </p>
          <TextAnimated
            phrases={[
              `We design spaces from concept to completion — shaping environments through light, material and spatial balance.`,
            ]}
            variants={textSlide}
            animate={inView}
            as="h2"
            className="flex flex-col"
            lineClassName="max-w-225 font-i-sans font-normal 
            text-s text-[48px] tracking-[-0.07em] leading-none
            max-md:text-[38px]
        "
            wordClassName="mr-2"
            wordDelay={0.035}
            lineDelay={0.035}
          />

          <span className="w-full h-px bg-s/25" />
          <div className="w-full h-fit grid grid-cols-4 grid-rows-2 max-md:grid-cols-2">
            <div className="min-h-75 flex flex-col items-start gap-5 max-md:col-span-2 max-md:min-h-40">
              <span className="font-azeret font-medium text-s text-[14px] tracking-widest leading-[1.1] uppercase">
                Interior design
              </span>
              <TextAnimated
                phrases={[
                  `Complete design of residential and commercial spaces — from layout to final composition.`,
                ]}
                variants={textSlide}
                animate={inView}
                as="span"
                className="flex flex-col"
                lineClassName="max-w-100 mb-5 font-azeret font-medium text-s/50 text-[12px] tracking-[0.05em] leading-[1.2] uppercase"
                wordClassName="mr-2"
                wordDelay={0.035}
                lineDelay={0.035}
              />
            </div>
            {/*  */}
            <div
              className="row-start-2 col-start-2 min-h-75 flex flex-col items-start gap-5 
            max-md:row-start-3 max-md:col-start-1 max-md:col-span-2 max-md:min-h-60"
            >
              <span className="font-azeret font-medium text-s text-[14px] tracking-widest leading-[1.1] uppercase">
                Spatial direction
              </span>
              <TextAnimated
                phrases={[
                  `Concept development, spatial logic and atmosphere definition for each environment.`,
                ]}
                variants={textSlide}
                animate={inView}
                as="span"
                className="flex flex-col"
                lineClassName="max-w-100 mb-5 font-azeret font-medium text-s/50 text-[12px] tracking-[0.05em] leading-[1.2] uppercase"
                wordClassName="mr-2"
                wordDelay={0.035}
                lineDelay={0.035}
              />{" "}
              <Button
                text="start a project"
                bg="bg-s"
                textColor="text-p"
                iconColor="text-p"
                hoverBg="bg-p"
                hoverTextColor="text-s"
                hoverIconColor="text-s"
              />
            </div>
            {/*  */}
            <div
              className="col-start-3 min-h-75 flex flex-col items-start gap-5 
            max-md:col-span-2 max-md:min-h-40"
            >
              <span className="font-azeret font-medium text-s text-[14px] tracking-widest leading-[1.1] uppercase">
                Material & finishes
              </span>
              <TextAnimated
                phrases={[
                  `Selection of materials, textures and surfaces — balancing contrast, tone and tactility.`,
                ]}
                variants={textSlide}
                animate={inView}
                as="span"
                className="flex flex-col"
                lineClassName="max-w-100 mb-5 font-azeret font-medium text-s/50 text-[12px] tracking-[0.05em] leading-[1.2] uppercase"
                wordClassName="mr-2"
                wordDelay={0.035}
                lineDelay={0.035}
              />
            </div>
            {/*  */}
            <div
              className="min-h-75 flex flex-col items-start gap-5 
            max-md:col-span-2 max-md:min-h-40"
            >
              <span className="font-azeret font-medium text-s text-[14px] tracking-widest leading-[1.1] uppercase">
                Lighting design
              </span>
              <TextAnimated
                phrases={[
                  `Natural and artificial light shaping perception, rhythm and atmosphere.`,
                ]}
                variants={textSlide}
                animate={inView}
                as="span"
                className="flex flex-col"
                lineClassName="max-w-100 mb-5 font-azeret font-medium text-s/50 text-[12px] tracking-[0.05em] leading-[1.2] uppercase"
                wordClassName="mr-2"
                wordDelay={0.035}
                lineDelay={0.035}
              />
            </div>
          </div>
        </div>
        <div className="absolute -mt-75 right-0 w-200 h-screen mix-blend-exclusion max-md:w-75 max-md:h-[50vh] max-md:mt-0">
          <motion.figure
            initial={{ opacity: 0, y: 250 }}
            animate={{
              opacity: inView ? 1 : 0,
              y: inView ? -50 : 250,
              transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.25,
              },
            }}
            className="w-200 h-screen max-md:hidden max-md:h-[50vh]"
          >
            {/*  <Image
              src="/assets/images/rings/rings-2.svg"
              fill
              alt="ring-1"
              className="relative w-150 h-screen max-md:w-75 max-md:h-[50vh]"
            /> */}
            <String inView={inView} />
          </motion.figure>
        </div>
      </div>
    </section>
  );
};

export default HomeWhatWeDo;
