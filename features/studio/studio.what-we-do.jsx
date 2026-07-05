import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

import { LuLampCeiling, LuSofa, LuPanelTop, LuRuler } from "react-icons/lu";
import { ClipText } from "@/components/ui/clip-text";
import TransitionLink from "@/components/ui/link";
import Button from "@/components/ui/button";

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
    top: "top-10",
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
    bg: "bg-[#303030]",
    top: "top-20",
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
    bg: "bg-[#404040]",
    top: "top-30",
    delay: 0.95,
    darkButton: true,
  },
];

const ServiceCard = ({
  id,
  title,
  description,
  button,
  href,
  icon: Icon,
  bg,
  top,
  delay,
  darkButton = false,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={`sticky ${top} h-[80vh] p-5 pt-10 ${bg} rounded-sm
      flex flex-col justify-between gap-5 overflow-hidden
      max-lg:min-h-100`}
    >
      <div className="absolute top-0 right-0 flex items-center justify-center">
        <p className="absolute -top-1/2 right-5 text-[25vw] font-neue tracking-[-0.05em] text-s">
          {id}
        </p>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="p-4 rounded-sm border border-s bg-bg-s backdrop-blur-md">
          <Icon className="text-p text-[24px]" />
        </div>
      </div>

      <div className="max-w-125 flex flex-col items-start">
        <p className="mb-15 text-chivo-s-14">{title}</p>

        <ClipText
          text={description}
          animate={inView && "animate"}
          delay={delay}
          tag="h2"
          className="paragraph-n text-s/75 font-normal"
        />
      </div>

      <TransitionLink href={href}>
        <Button
          text={button}
          bg={darkButton ? "bg-p" : "bg-s"}
          textColor={darkButton ? "text-s" : "text-p"}
          iconColor={darkButton ? "text-s" : "text-p"}
          hoverBg={darkButton ? "bg-bg-s-2" : "bg-bg-p-2"}
          hoverTextColor={darkButton ? "text-p" : "text-s"}
          hoverIconColor={darkButton ? "text-p" : "text-s"}
        />
      </TransitionLink>
    </motion.div>
  );
};

const StudioWhatWeDo = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section id="what-we-do" className="p-15 max-lg:px-5" ref={ref}>
      <div className="flex flex-col items-center justify-center">
        <div className="my-15 w-full h-px bg-p/15" />
        <div className="size-fit flex items-center gap-4">
          <span className="triangle-p" />
          <p className="text-chivo-p-14 text-end">o que fazemos?</p>
        </div>
      </div>
      <div className="mt-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 25,
          }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.1,
          }}
          className="h-fit grid grid-cols-1 gap-5 "
        >
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StudioWhatWeDo;
