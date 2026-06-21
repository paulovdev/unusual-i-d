"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Lenis from "lenis";
import { IoClose } from "react-icons/io5";
import TextAnimated from "@/components/ui/text-animated";
import ImageComponent from "@/components/ui/image";
import { FaStarOfLife } from "react-icons/fa";
import TextLink from "@/components/ui/text-link";

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
  const container = useRef(null);
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 500,
    damping: 50,
    restDelta: 0.001,
  });
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
        className="fixed left-0 top-0 m-4 px-5 pt-1 w-full max-w-200 h-[calc(100vh-32px)] 
        bg-[#EBEBEB] backdrop-blur-3xl rounded-sm z-9999
        max-lg:h-dvh max-lg:p-5 max-lg:w-screen max-lg:m-0 max-lg:rounded-none 
        will-change-auto"
        ref={container}
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
            className="group size-15 rounded-sm 
            border border-p/10 backdrop-blur-2xl 
            flex items-center justify-center
            cursor-pointer bg-p"
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

        <div className="fixed right-0 top-0 w-full h-2 rounded-t-sm z-30">
          <motion.div
            className="absolute left-0 top-0 origin-left w-full h-2 bg-p rounded-tl-sm z-20"
            style={{ scaleX }}
          />
          <div className="absolute left-0 top-0 w-full h-2 bg-[#cdcdcd] rounded-t-sm z-10" />
        </div>
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
    <div className="size-full  flex flex-col items-end justify-between max-lg:gap-5">
      <div className="w-full flex flex-col max-lg:mb-5">
        <div className="mt-25 h-fit overflow-hidden max-lg:mb-5">
          <div className="mb-4 items-center gap-4 max-lg:flex hidden">
            <p className="text-chivo-p-14">{work.category}</p>
            <span className="relative -top-px text-chivo-p-14">/</span>
            <p className="text-chivo-p-14">{work.year}</p>
          </div>
          <motion.h2
            variants={textSlide}
            initial="initial"
            animate="animate"
            className="font-neue font-bold
                   text-[clamp(52px,6vw,74px)] text-start tracking-[-0.05em]
                  leading-none uppercase"
          >
            {work.title}
          </motion.h2>
        </div>

        <div className="mt-10 w-full h-px bg-p/15 max-lg:mt-0"></div>
        <div className="mt-5 w-full min-h-5 flex items-start justify-between max-lg:mt-5 max-lg:min-h-5">
          <p className="flex-1 text-chivo-p-14 max-lg:hidden">{work.year}</p>
          {/*  */}
          <p className="flex-1 text-chivo-p-14 max-lg:hidden">
            {work.category}
          </p>
          {/*  */}
          <div className="flex-1 flex flex-col items-start justify-center gap-4">
            {work.services.map((item, i) => (
              <div className="flex items-center gap-4 max-lg:gap-5" key={i}>
                <span className="relative -top-px size-2.5 bg-p rotate-45 max-lg:left-1" />
                <p className="text-chivo-p-14 truncate">
                  {serviceLabels[item]}
                </p>
              </div>
            ))}
          </div>
          {/*  */}
          <TextLink bgColor="bg-p" className="relative -top-2.5 ">
            <a
              target="_blank"
              href={"https://instagram.com/" + work.client}
              className="text-end text-chivo-n-14 text-p group-hover:text-s
              transition-colors duration-150 ease-[cubic-bezier(0.76,0,0.24,1)]"
            >
              {work.client}
            </a>
          </TextLink>

          {/*  */}
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
        <div className="mt-15 w-full h-px bg-p/15"></div>
      </div>

      <div className="mt-4 w-full min-h-20 flex items-start justify-between">
        <TextLink bgColor="bg-p">
          <a
            target="_blank"
            href={work.website}
            className="text-chivo-n-14 text-p group-hover:text-s
              transition-colors duration-150 ease-[cubic-bezier(0.76,0,0.24,1)]"
          >
            ver ao vivo
          </a>
        </TextLink>

        <div className="flex-1 pb-5 flex flex-col items-end justify-center">
          {work.credits.map((item, i) => (
            <div className="flex items-center" key={i}>
              <TextLink bgColor="bg-p">
                <a
                  target="_blank"
                  href={`https://unsplash.com/${item}`}
                  className="text-chivo-n-14 text-p text-end group-hover:text-s
              transition-colors duration-150 ease-[cubic-bezier(0.76,0,0.24,1)]"
                >
                  {item}
                </a>
              </TextLink>
            </div>
          ))}
        </div>

        <div className="flex-1 mt-2 flex items-end justify-end max-md:hidden">
          <FaStarOfLife className=" text-[14px]" />
        </div>
      </div>
    </div>
  );
};

const WorkImageBlock = ({ block }) => {
  if (!block?.image?.asset?.url) return null;

  return (
    <figure className="relative mt-15 w-full h-[75vh] overflow-hidden rounded-sm max-lg:h-[40vh] max-lg:mt-5">
      <ImageComponent
        image={block.image}
        className="object-cover brightness-75"
      />

      {block.overlayText && (
        <p className="absolute bottom-5 right-5 text-chivo-s-14">
          {block.overlayText}
        </p>
      )}
    </figure>
  );
};

const WorkTextBlock = ({ block }) => {
  return (
    <div className="my-10 w-full flex max-lg:flex-col max-lg:gap-5">
      <div className="flex-1 max-lg:mb-5">
        <div className="flex items-center gap-5">
          <span className="triangle-p left-1" />

          {block.label && <p className="text-chivo-p-14">{block.label}</p>}
        </div>
      </div>

      <div className="flex-2 flex flex-col">
        {(Array.isArray(block.text) ? block.text : [block.text]).map(
          (phrases, i) => (
            <div className="max-w-150 mb-5 h-fit overflow-hidden">
              <h2 className="paragraph-p">{phrases}</h2>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
