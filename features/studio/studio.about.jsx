import Button from "@/components/ui/button";
import TextAnimated from "@/components/ui/text-animated";

import React from "react";
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

const StudioAbout = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section id="about" className="relative mb-30 px-15 max-md:px-5" ref={ref}>
      <div className="my-15 w-full h-px bg-p/15" />

      <div className="mb-25 flex items-start gap-10 select-none" ref={ref}>
        <div className="flex-1 size-fit flex items-center gap-4">
          <span className="size-2  bg-p rounded-[1px]" />
          <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
            sobre o estúdio
          </p>
        </div>
        <div className="flex-3">
          <TextAnimated
            phrases={[
              `Desenvolvemos identidades, experiências e sistemas visuais que combinam direção criativa, estratégia e linguagem contemporânea.`,
            ]}
            variants={textSlide}
            animate={inView}
            as="p"
            className="flex flex-col"
            lineClassName="mb-10 font-neue font-normal 
        text-p text-[64px] tracking-[-0.07em] leading-none
        max-md:text-[38px]
        "
            wordClassName="mr-2"
            wordDelay={0.015}
            lineDelay={0.2}
          />
        </div>
      </div>
      <div className="flex items-start gap-10 select-none" ref={ref}>
        <div className="flex-1 size-fit flex items-center gap-4">
          <span className="size-2  bg-p rounded-[1px]" />
          <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
            manifesto
          </p>
        </div>
        <div className="flex-3">
          <TextAnimated
            phrases={[
              `INCOMUM® é um estúdio criativo focado em branding, direção visual, motion design e experiências digitais com uma identidade forte e linguagem autoral.`,
              `Criamos projetos que transitam entre cultura, estética e tecnologia — transformando conceitos em sistemas visuais vivos, expressivos e reconhecíveis.`,
            ]}
            variants={textSlide}
            animate={inView}
            as="p"
            className="flex flex-col"
            lineClassName="mb-10 font-neue font-normal 
        text-p text-[64px] tracking-[-0.07em] leading-none
        max-md:text-[38px]
        "
            wordClassName="mr-2"
            wordDelay={0.015}
            lineDelay={0.2}
          />
          <Button
            text="quem somos?"
            bg="bg-p"
            textColor="text-s"
            iconColor="text-s"
            hoverBg="bg-s"
            hoverTextColor="text-p"
            hoverIconColor="text-p"
          />
        </div>
      </div>
    </section>
  );
};

export default StudioAbout;
