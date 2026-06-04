"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import Lenis from "lenis";
import { IoClose } from "react-icons/io5";
import TextAnimated from "@/components/ui/text-animated";
import ImageComponent from "@/components/ui/image";

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
const menuAnim = {
  initial: { clipPath: "inset(0% 100% 0% 0%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: "inset(0% 100% 0% 0%)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};
const overlayAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

const WorkModal = ({ work, isOpen, onClose, lenis }) => {
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    lenis?.current?.stop();

    modalLenis.current = new Lenis({
      wrapper: scrollRef.current,
      content: scrollRef.current,
      smoothWheel: true,
      syncTouch: true,
    });

    function raf(time) {
      modalLenis.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      modalLenis.current?.destroy();
      lenis?.current?.start();
    };
  }, [isOpen, lenis]);

  if (!isOpen || !work) return null;

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 m-4 p-10 w-[60vw] h-[calc(100vh-32px)] bg-s backdrop-blur-3xl rounded-sm z-[1000]
        max-ds:w-[70vw] max-lg:w-full max-md:p-5 max-md:w-[calc(100vw-32px)] will-change-auto"
        variants={menuAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          onClick={onClose}
          initial={{ scale: 0, rotate: -90 }}
          animate={{
            scale: 1,
            rotate: 0,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2,
            },
          }}
          exit={{
            scale: 0,
            rotate: 90,
            transition: {
              duration: 0.4,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="absolute top-5 right-5 z-30 will-change-auto"
        >
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#fff",
            }}
            className="p-3 backdrop-blur-2xl border border-p/10 rounded-sm cursor-pointer group max-md:p-2 bg-p "
          >
            <IoClose
              className="text-s text-[24px] group-hover:text-p group-hover:rotate-90
                transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            />
          </motion.button>
        </motion.div>

        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          exit={{
            opacity: 0,
            y: 15,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="size-full overflow-y-scroll"
        >
          <WorkModalContent work={work} />
        </motion.div>
      </motion.div>

      {/* OVERLAY */}
      <motion.div
        className="fixed inset-0 bg-p/75 backdrop-blur-lg z-900 cursor-pointer"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
      />
    </>
  );
};

export default WorkModal;

const WorkModalContent = ({ work }) => {
  const serviceLabels = {
    "art-direction": "Direção de Arte",
    "brand-strategy": "Estratégia de Marca",
    "ui-ux": "Design UI/UX",
    development: "Desenvolvimento",
    "motion-design": "Motion Design",
    "3d-design": "Design 3D",
    photography: "Fotografia",
    "content-creation": "Criação de Conteúdo",
    "creative-coding": "Programação Criativa",
    "visual-identity": "Identidade Visual",
  };

  return (
    <div className="size-full select-none flex flex-col items-end justify-between max-md:gap-5">
      <div className="w-full flex flex-col gap-15 max-md:mb-10">
        <TextAnimated
          phrases={[work.title + "ㅤ"]}
          variants={textSlide}
          as="h2"
          className="mt-10 flex flex-col"
          lineClassName="font-neue font-normal text-p text-[72px] tracking-[-0.05em]
               leading-none max-md:text-[42px]"
          wordClassName="mr-2"
          wordDelay={0.015}
          lineDelay={0.1}
        />

        <div className="flex flex-col gap-3">
          <div
            className="border-b border-p/10 py-5 w-full flex items-center 
          max-md:flex-col max-md:items-start max-md:gap-5"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="relative size-2 bg-p " />

                <p
                  className="font-azeret font-medium text-p text-[14px]
          tracking-[0.05em] leading-none uppercase"
                >
                  lançado em
                </p>
              </div>
            </div>

            <div className="flex-2">
              <span className="font-neue font-medium text-p text-[24px] tracking-[-.04em] leading-none">
                {work.year}
              </span>
            </div>
          </div>
          <div
            className="border-b border-p/10 py-5 w-full flex items-center  
          max-md:flex-col max-md:items-start max-md:gap-5"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="size-2 bg-p " />

                <p
                  className="font-azeret font-medium text-p text-[14px]
          tracking-[0.05em] leading-none uppercase"
                >
                  categoria
                </p>
              </div>
            </div>

            <div className="flex-2">
              <span className="capitalize font-neue font-medium text-p text-[24px] tracking-[-.04em] leading-none">
                {work.category}
              </span>
            </div>
          </div>

          {/* SERVIÇOS */}
          <div
            className="border-b border-p/10 py-5 w-full flex items-center 
           max-md:flex-col max-md:items-start max-md:gap-5"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="size-2 bg-p " />

                <p
                  className="font-azeret font-medium text-p text-[14px]
          tracking-[0.05em] leading-none uppercase"
                >
                  serviços
                </p>
              </div>
            </div>

            <div className="flex-2">
              <p className="font-neue font-medium text-p text-[24px] tracking-[-.04em] leading-none">
                {work.services
                  ?.map((service) => serviceLabels[service] || service)
                  .join(", ")}
              </p>
            </div>
          </div>

          {/* CLIENTE */}
          <div
            className="border-b border-p/10 py-5 w-full flex items-center 
           max-md:flex-col max-md:items-start max-md:gap-5"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="size-2 bg-p " />

                <p
                  className="font-azeret font-medium text-p text-[14px]
          tracking-[0.05em] leading-none uppercase"
                >
                  cliente
                </p>
              </div>
            </div>

            <div className="flex-2">
              <p className="font-neue font-medium text-p text-[24px] tracking-[-.04em] leading-none">
                {work.client}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BLOCKS */}
      <div className="w-full flex flex-col">
        {work.sections?.map((block, i) => {
          switch (block._type) {
            case "workImage":
              return <WorkImageBlock key={i} block={block} />;

            case "workText":
              return <WorkTextBlock key={i} block={block} />;

            default:
              return null;
          }
        })}
      </div>
      <div className="mt-10 w-full border-px border-p/10 max-md:mt-0"></div>
      <div
        className="border-b border-p/10 py-5 w-full flex items-center
       max-md:flex-col max-md:items-start max-md:gap-5"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="size-2 bg-p " />
            <p
              className="font-azeret font-medium text-p text-[14px]
          tracking-[0.05em] leading-none uppercase"
            >
              tag
            </p>
          </div>
        </div>

        <div className="flex-2 flex items-center gap-2">
          <span className="font-neue font-medium text-p text-[24px] tracking-[-.04em] leading-none">
            {work.mark}
          </span>
        </div>
      </div>
      <div
        className="border-b border-p/10 py-5 w-full flex items-center
       max-md:flex-col max-md:items-start max-md:gap-5"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="size-2 bg-p " />
            <p
              className="font-azeret font-medium text-p text-[14px]
          tracking-[0.05em] leading-none uppercase"
            >
              ver ao vivo
            </p>
          </div>
        </div>

        <div className="flex-2">
          <div className="relative w-fit overflow-hidden h-fit group">
            <motion.a
              href={work.website}
              className="transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-2 font-neue font-medium text-p text-[24px] tracking-[-.04em] leading-none"
            >
              Ver projeto
            </motion.a>
            <span className="absolute left-0 -bottom-[2px] h-[4px] w-0 bg-p transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
          </div>
        </div>
      </div>
      {/* CRÉDITOS */}
      <div
        className="border-b border-p/10 py-5 w-full flex items-center
       max-md:flex-col max-md:items-start max-md:gap-5"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="size-2 bg-p " />
            <p
              className="font-azeret font-medium text-p text-[14px]
          tracking-[0.05em] leading-none uppercase"
            >
              creditos
            </p>
          </div>
        </div>

        <div className="flex-2">
          <p className="font-neue font-medium text-p text-[24px] tracking-[-.04em] leading-none">
            {Array.isArray(work.credits)
              ? work.credits.join(", ")
              : work.credits}
          </p>
        </div>
      </div>
    </div>
  );
};

const WorkImageBlock = ({ block }) => {
  if (!block?.image?.asset?.url) return null;

  return (
    <figure className="relative mt-15 w-full h-[75vh] overflow-hidden rounded-sm max-md:h-[40vh] max-md:mt-5">
      <ImageComponent
        image={block.image}
        className="object-cover brightness-75"
      />

      {block.overlayText && (
        <p className="absolute bottom-5 right-5 font-azeret font-medium text-s text-[14px] uppercase">
          {block.overlayText}
        </p>
      )}
    </figure>
  );
};

const WorkTextBlock = ({ block }) => {
  return (
    <div className="my-10 w-full flex max-md:flex-col max-md:gap-5">
      <div className="flex-1 max-md:mb-5">
        <div className="flex items-center gap-2">
          <span className="size-2 bg-p " />
          {block.label && (
            <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
              {block.label}
            </p>
          )}
        </div>
      </div>

      <div className="flex-2 flex flex-col gap-15">
        <TextAnimated
          phrases={Array.isArray(block.text) ? block.text : [block.text]}
          variants={textSlide}
          as="span"
          className="flex flex-col"
          lineClassName="max-w-150 mb-5 font-neue font-medium text-p text-[24px] tracking-[-.04em] leading-[1.2]"
          wordClassName="mr-1"
          wordDelay={0.015}
          lineDelay={0.4}
        />
      </div>
    </div>
  );
};
