import Button from "@/components/ui/button";
import reelCover from "@/public/assets/images/reel.jpg";
import { useInView } from "react-intersection-observer";

import TransitionLink from "@/components/ui/link";
import { motion } from "motion/react";
import { IoMdPlay } from "react-icons/io";
import { useRef, useState } from "react";

import { ClipText } from "@/components/ui/clip-text";
import Image from "next/image";

const textSlide = {
  initial: { y: "100%" },
  animate: (custom) => ({
    y: "0%",
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: custom },
  }),
};

const HomeAbout = () => {
  const container = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section
      id="about"
      className="w-full h-fit flex flex-col items-start px-15 py-15 max-lg:px-5"
      ref={container}
    >
      <div className="relative w-full max-h-125 flex items-end justify-end">
        <figure
          className="relative w-200 h-125 overflow-hidden rounded-sm 
          max-md:h-75 max-xsm:h-65"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();

            const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.15;

            setMouse({ x, y });
          }}
          onMouseLeave={() => {
            setMouse({ x: 0, y: 0 });
          }}
        >
          <Image
            src={reelCover}
            alt=""
            fill
            priority
            className="object-cover size-full brightness-75 rounded-sm"
            placeholder="blur"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              animate={{
                x: mouse.x,
                y: mouse.y,
                scale: 1.1,
              }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
              }}
              className="size-15 bg-p/25 border border-s/25 
              rounded-full flex items-center justify-center backdrop-blur-md"
            >
              <IoMdPlay className="relative left-0.5 text-s text-[24px]" />
            </motion.span>
          </div>
          <div className="absolute inset-8 flex items-end justify-between max-md:inset-5">
            <p className="text-chivo-s-14 text-end">assistir reel</p>
            <p className="text-chivo-s-14 text-end">00:56</p>
          </div>
        </figure>
      </div>
      <div className="my-15 w-full h-px bg-p/10"></div>
      <div className="mb-25 flex flex-col items-start ">
        <div className="mb-15 flex items-center gap-4">
          <span className="relative -top-px size-2.5 bg-p rotate-45" />
          <p className="text-chivo-p-14">NOSSA FILOSOFIA</p>
        </div>
        {[
          "Atuamos na intersecção entre arquitetura e design de interiores, com foco na longevidade em vez de tendências.",
        ].map((phrases, i) => (
          <ClipText
            key={i}
            text={phrases}
            animate={inView && "animate"}
            delay={0.15 * i}
            className="
      font-neue font-bold
      text-p text-[clamp(40px,6vw,90px)] text-start tracking-[-0.05em]
           leading-none uppercase
    "
          />
        ))}
      </div>
      <div className="relative w-full flex flex-col items-end" ref={ref}>
        <div className="max-w-150">
          <div className="mb-10 flex items-center gap-4">
            <span className="relative -top-px size-2.5 bg-p rounded-full" />
            <p className="text-chivo-p-14">
              design atemporal e o artesanato de qualidade.
            </p>
          </div>
          {[
            "Cada decisão é baseada no contexto, na integridade dos materiais e em como um espaço é efetivamente vivido, e não apenas em como ele é visto.",
          ].map((phrases, i, arr) => (
            <div
              key={i}
              style={{
                marginBottom: arr.length - 1 === i ? "80px" : undefined,
              }}
            >
              <ClipText
                text={phrases}
                animate={inView && "animate"}
                delay={0.5 + 0.15 * i}
                tag="h2"
                className="paragraph-p"
              />
            </div>
          ))}
          <div className="flex items-end justify-between">
            <TransitionLink href="/studio">
              <Button
                text="estúdio"
                bg="bg-p"
                textColor="text-s"
                iconColor="text-s"
                hoverBg="bg-bg-s-2"
                hoverTextColor="text-p"
                hoverIconColor="text-p"
              />
            </TransitionLink>
            <p className="text-chivo-p-14">incomum</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
