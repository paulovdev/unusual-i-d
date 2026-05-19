"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import Lenis from "lenis";
import { IoClose } from "react-icons/io5";
import TextAnimated from "@/components/ui/text-animated";
import ImageComponent from "@/components/ui/image";
import {
  FiMapPin, // location
  FiGrid, // area
  FiCircle, // status
  FiLayers, // style
  FiUser, // client
  FiUsers, // consultants
  FiCamera, // photograph
} from "react-icons/fi";
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
        className="fixed left-0 top-0 m-4 p-10 w-[50vw] h-[calc(100vh-32px)] bg-[#fefcf5] backdrop-blur-3xl rounded-sm z-[1000]
        max-ds:w-[70vw] max-lg:w-full max-md:p-5 max-md:w-[calc(100vw-32px)]"
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
          className="absolute top-5 right-5 z-30"
        >
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#fff",
            }}
            className="p-3 backdrop-blur-2xl border border-p/10 rounded-sm group max-md:p-2 bg-p"
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
        className="fixed inset-0 bg-p/75 backdrop-blur-lg z-900"
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
  let color = "";

  switch (work.status) {
    case "completed":
      color = "bg-green-400";
      break;

    case "ongoing":
      color = "bg-yellow-400";
      break;

    case "concept":
      color = "bg-blue-400";
      break;

    default:
      color = "bg-p/30";
  }

  return (
    <div className="size-full flex flex-col items-end justify-between max-md:gap-5">
      <div className="w-full flex flex-col gap-15 max-md:mb-10">
        <div className="w-full flex items-center gap-5">
          <div className="flex-1 size-fit flex items-center gap-2">
            <span className="size-2 bg-p rounded-[1px]" />
            <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
              {work.mark}
            </p>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <span className="font-azeret font-medium text-p text-[14px] tracking-[0.01em] leading-none uppercase truncate ">
              {work.category}
            </span>
            <span className="mx-5 text-p">/</span>
            <span className="font-azeret font-medium text-p text-[14px] tracking-[0.01em] leading-none uppercase truncate ">
              {work.year}
            </span>
          </div>
        </div>
        <TextAnimated
          phrases={[work.title + "ㅤ"]}
          variants={textSlide}
          as="h2"
          className="flex flex-col"
          lineClassName="font-neue font-normal text-p text-[72px] tracking-[-0.05em]
               leading-none max-md:text-[42px]"
          wordClassName="mr-2"
          wordDelay={0.015}
          lineDelay={0.1}
        />
        <div className="flex flex-col gap-3">
          <div className="w-full flex ">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FiMapPin className="text-p text-[14px]" />

                <p
                  className="font-azeret font-medium
                text-p text-[14px] tracking-[0.05em] leading-none uppercase"
                >
                  localização
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-15">
              <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
                {work.location.city}, {work.location.country}
              </p>
            </div>
          </div>
          <div className="w-full flex ">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FiGrid className="text-p text-[14px]" />

                <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
                  área
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-15">
              <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
                {work.area}
                <span className="lowercase!">m²</span>
              </p>
            </div>
          </div>
          <div className="w-full flex ">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FiCircle className="text-p text-[14px]" />

                <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
                  status
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-15">
              <div className="size-fit flex items-center gap-2">
                <span className={`size-2  ${color} `} />
                <span className="font-azeret font-medium text-p text-[14px] tracking-[0.01em] leading-none uppercase truncate ">
                  {work.status}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full flex ">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FiLayers className="text-p text-[14px]" />

                <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
                  estilo
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-15">
              <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
                {work.styles.join(", ")}
              </p>
            </div>
          </div>
          <div className="w-full flex ">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FiUser className="text-p text-[14px]" />

                <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
                  cliente
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-15">
              <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
                {work.client}
              </p>
            </div>
          </div>
          <div className="w-full flex ">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FiUsers className="text-p text-[14px]" />

                <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
                  consultores
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-15">
              <p className="max-w-90 max-md:max-w-50 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase truncate">
                {work.consultants}
              </p>
            </div>
          </div>
          <div className="w-full flex ">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FiCamera className="text-p text-[14px]" />

                <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
                  fotografia
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-15">
              <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
                {work.photograph}
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
    </div>
  );
};

const WorkImageBlock = ({ block }) => {
  if (!block?.image?.asset?.url) return null;

  return (
    <figure className="relative mt-15 w-full h-[50vh] overflow-hidden rounded-sm max-md:h-[30vh] max-md:mt-5">
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
          lineClassName="max-w-150 mb-5 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-[1.2] uppercase "
          wordClassName="mr-1"
          wordDelay={0.015}
          lineDelay={0.4}
        />
      </div>
    </div>
  );
};
