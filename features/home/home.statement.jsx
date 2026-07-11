import { useInView } from "react-intersection-observer";
import bgCover from "@/public/assets/images/price.jpg";
import { motion } from "motion/react";
import { ClipText } from "@/components/ui/clip-text";

import {
  LuFilter,
  LuGlobe,
  LuLampCeiling,
  LuPanelTop,
  LuRuler,
  LuSofa,
} from "react-icons/lu";

import Image from "next/image";

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

const services = [
  {
    id: "01",
    title: "arquitetura de interiores",
    description:
      "Desenvolvemos layouts, fluxos espaciais e detalhes arquitetônicos que definem como cada ambiente funciona e é vivido.",
    button: "projetos arquitetônicos",
    href: "/studio",
    icon: LuRuler,
    bg: "bg-[#101010]",
    top: "top-0",
    delay: 0.5,
  },
  {
    id: "02",
    title: "design de interiores",
    description:
      "Criamos interiores completos com equilíbrio entre materiais, iluminação, proporção e uma linguagem estética atemporal.",
    button: "interiores exclusivos",
    href: "/studio",
    icon: LuPanelTop,
    bg: "bg-[#202020]",
    top: "top-5",
    delay: 0.65,
  },
  {
    id: "03",
    title: "mobiliário & curadoria",
    description:
      "Selecionamos móveis, obras de arte, objetos e materiais que reforçam a identidade e atmosfera de cada residência.",
    button: "mobiliário sob medida",
    href: "/studio",
    icon: LuSofa,
    icon2: LuFilter,
    bg: "bg-[#303030]",
    top: "top-10",
    delay: 0.8,
    darkButton: true,
  },
  {
    id: "04",
    title: "iluminação & atmosfera",
    description:
      "Criamos ambientes onde luz, textura e materiais trabalham juntos para construir experiências sensoriais e acolhedoras.",
    button: "projeto luminotécnico",
    href: "/studio",
    icon: LuLampCeiling,
    icon2: LuGlobe,
    bg: "bg-[#404040]",
    top: "top-15",
    delay: 0.95,
    darkButton: true,
  },
];

const HomeStatement = () => {
  const { ref, inView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  return (
    <section
      id="statement"
      className="h-fit px-5 pt-50 flex items-center justify-center"
      ref={ref}
    >
      <div className="relative w-full flex flex-col items-center">
        <div className="mb-15 flex items-center gap-4">
          <span className="triangle-p" />
          <p className="text-chivo-p-14 text-end">NOSSOS PRINCIPAIS SERVIÇOS</p>
        </div>
        <div className="mb-10 h-fit overflow-hidden">
          <motion.h2
            variants={textSlide}
            initial="initial"
            animate={inView && "animate"}
            className="big-text-1-n text-p
        "
          >
            O que oferecemos
          </motion.h2>
        </div>

        <div className="mt-20 flex items-center justify-between gap-2.5">
          {services.map((service, i) => (
            <div className="p-5 h-150 size-full border border-p/3 flex flex-col items-start justify-end">
              <div className="h-full flex flex-col items-start justify-between">
                <div className="w-full flex items-center justify-between">
                  {service.icon2 ? (
                    <div className="flex items-center gap-2">
                      <div className="p-4 border border-s bg-bg-p-2 backdrop-blur-md">
                        <service.icon className="text-s text-[24px]" />
                      </div>
                      +
                      <div className="p-4 border border-s bg-bg-p-2 backdrop-blur-md">
                        <service.icon2 className="text-s text-[24px]" />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border border-s bg-bg-p-2 backdrop-blur-md">
                      <service.icon className="text-s text-[24px]" />
                    </div>
                  )}
                </div>

                <div className="max-w-139 flex flex-col items-start">
                  <p className="mb-15 text-chivo-p-14">{service.title}</p>

                  <ClipText
                    text={service.description}
                    animate={inView && "animate"}
                    delay={service.delay}
                    tag="h2"
                    className="min-h-40 text-[22px] font-neue font-medium text-p/75 tracking-[-0.03em] leading-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 size-full flex items-center justify-between max-lg:flex-col">
          <motion.figure
            initial={{ clipPath: "inset(50% 0% 0% 0%)" }}
            animate={{
              clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(50% 0% 0% 0%)",
              transition: {
                duration: 0.8,
                delay: 0.25,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            className="relative w-full h-screen 
            max-lg:w-full max-md:h-[60vh] max-lg:mb-5 will-change-auto"
          >
            <Image
              src={bgCover}
              fill
              alt="creative element"
              className="object-cover w-275 h-150 max-lg:w-full"
              placeholder="blur"
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
};

export default HomeStatement;
