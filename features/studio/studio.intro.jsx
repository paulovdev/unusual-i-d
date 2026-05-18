import TextAnimated from "@/components/ui/text-animated";
import Image from "next/image";

import { useInView } from "react-intersection-observer";

import reel from "@/public/assets/images/reel.jpg";

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
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <section id="about" className="relative px-15 max-md:px-5" ref={ref}>
      <div
        className="h-screen flex flex-col items-center justify-center 
        max-lg:p-10 max-lg:py-30 max-md:py-30 max-md:p-5"
      >
        <div className="mb-8 size-fit flex items-center gap-2">
          <span className="size-2 bg-p rounded-[1px]" />
          <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
            Sobre o estúdio
          </p>
        </div>
        <TextAnimated
          phrases={[
            `Criamos interiores com intenção`,
            `Definidos por layout, materiais e luz`,
          ]}
          variants={textSlide}
          as="h2"
          className="flex flex-col"
          lineClassName="font-neue font-normal 
              text-center text-p text-[96px] tracking-[-0.07em] leading-[1.1]
              max-lg:text-[62px] max-md:text-[42px] 
        "
          wordClassName="mr-2"
          wordDelay={0.015}
          lineDelay={0.2}
        />
      </div>
      <Image
        src={reel}
        width={2000}
        height={2000}
        alt="spaces preview"
        className="relative -top-15 object-cover size-full rounded-md brightness-75
                  transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
                  group-hover:scale-110"
        placeholder="blur"
      />
    </section>
  );
};

export default StudioIntro;
