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
    title: "(01) Contexto antes da estética",
    description1: "Tudo começa com a recusa do óbvio.",
    description: [
      "ㅤ",
      "Cada interior responde primeiramente à sua arquitetura, ao seu entorno e à forma como será vivido.",
    ],
  },
  {
    title: "(02) Restrição em relação ao excesso",
    description1: "Cada detalhe tem uma função.",
    description: [
      "ㅤ",
      "O estúdio valoriza o equilíbrio, a proporção e a clareza dos materiais em detrimento de gestos decorativos ou designs ditados por tendências.",
    ],
  },
  {
    title: "(03) Espaços projetados para evoluir",
    description1: "Tendências passam.",
    description: [
      "ㅤ",
      "Os interiores são criados pensando na longevidade, permitindo que os materiais, a luz e o uso diário moldem a atmosfera ao longo do tempo.",
    ],
  },
  {
    title: "(04) Colaboração em todas as etapas",
    description1: "Tendências passam.",
    description: [
      "ㅤ",
      "Os projetos mais impactantes surgem do diálogo próximo entre clientes, designers, arquitetos e artesãos.",
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
    <section id="about" className="relative mb-30 px-15 max-lg:px-5">
      <div className="my-15 w-full h-px bg-p/15" />

      <div
        ref={aboutRef}
        className="mb-25 flex items-start gap-10 select-none max-lg:flex-col"
      >
        <div className="flex-2 flex items-center gap-4">
          <span className="triangle-p" />
          <p className="text-chivo-p-14 text-end will-change-transform">
            sobre nós
          </p>
        </div>

        <div className="flex-4">
          {["Fundado em Londres em 2023, "].map((phrases, i) => (
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
            <div className="w-full max-w-150 max-lg:w-full max-lg:max-w-full">
              {[
                "INCOMUM® é um estúdio de arquitetura e design de interiores que cria ambientes residenciais sofisticados no Reino Unido, na Europa e na América do Norte.",
                " ",
                "",
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
        className="mb-25 flex items-start gap-10 select-none max-lg:flex-col"
        ref={manifestoRef}
      >
        <div className="sticky top-15 flex-2 flex items-center gap-4 max-lg:relative max-lg:mb-25">
          <span className="triangle-p" />
          <p className="text-chivo-p-14 text-end will-change-transform">
            Nossos Princípios
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
                  <div className="w-full max-w-150 max-lg:w-full max-lg:min-w-full!">
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
