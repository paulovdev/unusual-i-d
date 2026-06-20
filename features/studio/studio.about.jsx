import Button from "@/components/ui/button";
import TextAnimated from "@/components/ui/text-animated";

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { ClipText } from "@/components/ui/clip-text";

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

const manifesto = [
  {
    title: "(01) Questionar o comum.",
    description1: "Tudo começa com a recusa do óbvio.",
    description: [
      "ㅤ",
      "Procuramos novas perspectivas,",
      "novas formas de pensar e construir significado.",
    ],
  },
  {
    title: "(02) Projetar com intenção.",
    description1: "Cada detalhe tem uma função.",
    description: [
      "ㅤ",
      "Nada é adicionado por acaso,",
      "e nada permanece sem propósito.",
    ],
  },
  {
    title: "(03) Criar para permanecer.",
    description1: "Tendências passam.",
    description: [
      "ㅤ",
      "O que buscamos são identidades,",
      "experiências e sistemas duradouros.",
    ],
  },
];

const StudioAbout = () => {
  const { ref: aboutRef, inView: aboutInView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const { ref: manifestoRef, inView: manifestoInView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section id="about" className="relative mb-30 px-15 max-md:px-5">
      <div className="my-15 w-full h-px bg-p/15" />

      <div
        ref={aboutRef}
        className="mb-25 flex items-start gap-10 select-none max-md:flex-col"
      >
        <div className="flex-2 flex items-center gap-4">
          <span className="relative -top-px size-2.5 bg-p rotate-45" />
          <p className="text-chivo-p-14 text-end will-change-transform">
            sobre nós
          </p>
        </div>

        <div className="flex-4">
          {["INCOMUM® é um estúdio criativo focado em"].map((phrases, i) => (
            <div key={i}>
              <ClipText
                text={phrases}
                animate={aboutInView && "animate"}
                delay={0.5 + 0.15 * i}
                tag="h2"
                className="big-text-1-n text-p"
              />
            </div>
          ))}
          <div className="mt-20 w-full flex items-end justify-end">
            <div className="w-full max-w-150 max-md:w-full max-md:max-w-full">
              {[
                "Branding, direção visual, motion design e experiências digitais com uma identidade forte linguagem autoral.",
                " ",
                "Criamos projetos que transitam entre cultura, estética e tecnologia — transformando conceitos em sistemas visuais vivos, expressivos e reconhecíveis.",
              ].map((phrases, i, arr) => (
                <div
                  key={i}
                  style={{ marginBottom: arr.length - 1 === i && "80px" }}
                >
                  <ClipText
                    text={phrases}
                    animate={aboutInView && "animate"}
                    delay={0.5 + 0.15 * i}
                    tag="p"
                    className="paragraph-p"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-15 w-full h-px bg-p/15" />

      <div
        className="mb-25 flex items-start gap-10 select-none max-md:flex-col"
        ref={manifestoRef}
      >
        <div className="sticky top-15 flex-2 flex items-center gap-4 max-md:relative max-md:mb-25">
          <span className="relative -top-px size-2.5 bg-p rotate-45" />
          <p className="text-chivo-p-14 text-end will-change-transform">
            manifesto
          </p>
        </div>
        <div className="flex-4">
          {manifesto.map((item, index) => (
            <React.Fragment key={index}>
              <div className="py-20 first:pt-0">
                <div className="">
                  <ClipText
                    text={item.title}
                    animate={manifestoInView && "animate"}
                    delay={0.5 + 0.15 * index}
                    tag="h2"
                    className="big-text-2-n text-p"
                  />
                </div>

                <div className="mt-12 flex justify-end">
                  <div className="w-full max-w-150 max-md:w-full max-md:min-w-full!">
                    <div className="h-fit overflow-hidden">
                      <motion.div
                        variants={textSlide}
                        initial="initial"
                        animate={manifestoInView && "animate"}
                        custom={1.25}
                        className="flex-2 flex items-center gap-4"
                      >
                        <span className="relative -top-px size-2.5 bg-p rounded-full" />
                        <p className="text-chivo-p-14 text-start">
                          {item.description1}
                        </p>
                      </motion.div>
                    </div>
                    {item.description.map((line, i) => (
                      <div key={i}>
                        <ClipText
                          text={line}
                          animate={manifestoInView && "animate"}
                          delay={0.5 + 0.15 * i}
                          tag="h2"
                          className="paragraph-p"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {index !== manifesto.length - 1 && (
                <div className="w-full h-px bg-p/15" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioAbout;
