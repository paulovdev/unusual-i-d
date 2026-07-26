import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import bg1 from "@/public/assets/images/price.jpg";
import bg2 from "@/public/assets/images/reel.jpg";
import bg3 from "@/public/assets/images/studio.jpg";
import bg4 from "@/public/assets/images/circle.png";
import { LuLampCeiling, LuSofa, LuPanelTop, LuRuler } from "react-icons/lu";
import { ClipText } from "@/components/ui/clip-text";
import TransitionLink from "@/components/ui/link";
import Button from "@/components/ui/button";
import Image from "next/image";

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
    img: bg1,
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
    bg: "bg-[#151515]",
    img: bg2,
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
    bg: "bg-[#202020]",
    img: bg3,
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
    bg: "bg-[#252525]",
    img: bg4,
    top: "top-15",
    delay: 0.95,
    darkButton: true,
  },
];

const ServiceCard = ({
  index,
  title,
  description,
  button,
  href,
  icon: Icon,
  bg,
  img,

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
      className={`sticky top-0 h-[90vh] bg-bg-s ${index === 0 && "border-t border-p/5"} ${index === 3 && "border-b border-p/5"}
     overflow-hidden
      max-lg:min-h-100`}
    >
      <div className="size-full flex items-start justify-between gap-5">
        <div className="w-[75vw] h-full">
          <Image
            src={img}
            width={2000}
            height={2000}
            alt=""
            placeholder="blur"
            className="size-full object-cover"
          />
        </div>

        <div className="py-10 px-5 w-[38vw] h-full flex flex-col items-start justify-between">
          <div className="w-full flex items-center justify-between">
            <div className="p-4 border border-s bg-bg-p backdrop-blur-md">
              <Icon className="text-s text-[24px]" />
            </div>
          </div>

          <div className="max-w-139 flex flex-col items-start">
            <p className="mb-15 text-chivo-p-14">{title}</p>

            <ClipText
              text={description}
              animate={inView && "animate"}
              delay={delay}
              tag="h2"
              className="paragraph-n text-p/75 font-normal"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StudioWhatWeDo = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section id="what-we-do" className=" " ref={ref}>
      {/*  <div className="flex flex-col items-center justify-center">
       
        <div className="size-fit flex items-center gap-4">
          <span className="triangle-p" />
          <p className="text-chivo-p-14 text-end">o que fazemos?</p>
        </div>
      </div> */}

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
        className="h-fit grid grid-cols-1 p-5"
      >
        {services.map((service, i) => (
          <ServiceCard key={service.id} {...service} index={i} />
        ))}
      </motion.div>
    </section>
  );
};

export default StudioWhatWeDo;
