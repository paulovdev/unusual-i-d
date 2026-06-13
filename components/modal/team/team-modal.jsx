import Image from "next/image";
import { useEffect, useRef } from "react";

import Lenis from "lenis";

import { IoClose } from "react-icons/io5";
import { motion } from "motion/react";
import TextAnimated from "@/components/ui/text-animated";
import { FiMapPin } from "react-icons/fi";
import { FaInstagram, FaStarOfLife } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

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
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    clipPath: "inset(0% 100% 0% 0%)",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const overlayAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const TeamModal = ({ member, lenis, onClose }) => {
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);
  useEffect(() => {
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
  }, [lenis]);
  return (
    <>
      <motion.div
        className="fixed left-0 top-0 m-4 px-5 pt-1 w-full max-w-200 h-[calc(100vh-32px)] 
        bg-[#dedede] backdrop-blur-3xl rounded-sm z-9999
         max-md:h-dvh max-md:p-5 max-md:w-screen max-md:m-0 max-md:rounded-none 
         will-change-auto"
        variants={menuAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          type="button"
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
          className="absolute top-5 right-5 z-30 group"
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

        <div className="size-full overflow-y-scroll" ref={scrollRef}>
          <motion.div
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
            className="flex flex-col items-end justify-between max-md:justify-start max-md:gap-5"
          >
            <div className="w-full flex flex-col max-md:mb-10">
              <div className="h-fit overflow-hidden">
                <motion.h2
                  variants={textSlide}
                  initial="initial"
                  animate="animate"
                  className="mt-25 font-neue font-bold
                              text-p text-[74px] text-start tracking-[-0.05em]
                              leading-none uppercase"
                >
                  {member.name}
                </motion.h2>
              </div>
            </div>

            <div className="mt-15 w-full h-px bg-p/15"></div>

            <div className="mt-4 w-full min-h-20 flex items-start justify-between">
              <a
                target="_blank"
                href={"https://instagram.com/" + member.email}
                className="flex-1 font-chivo font-semibold 
          text-p text-[14px] text-start tracking-widest
          leading-none uppercase"
              >
                e-mail
              </a>

              <a
                target="_blank"
                href={"https://instagram.com/" + member.instagram}
                className="flex-1 font-chivo font-semibold 
          text-p text-[14px] text-start tracking-widest
          leading-none uppercase"
              >
                instagram
              </a>

              <p
                className="font-chivo font-semibold 
          text-p text-[14px] text-end tracking-widest
          leading-none uppercase"
              >
                {member.location}
              </p>

              <div className="flex-1 flex items-end justify-end">
                <FaStarOfLife className="text-p text-[14px]" />
              </div>
            </div>

            <div className="relative w-full h-[50vh]">
              <figure className="size-full overflow-hidden">
                <Image
                  src={member.src}
                  alt={member.name}
                  fill
                  sizes=""
                  placeholder="blur"
                  className="object-cover rounded-sm"
                />
                <p
                  className="absolute right-5 bottom-5 font-chivo font-semibold 
          text-s text-[14px] text-start tracking-widest
          leading-none uppercase"
                >
                  {member.role}
                </p>
              </figure>
            </div>

            <div
              className="border-b border-p/10 py-10 w-full flex items-start
       max-md:flex-col max-md:items-start max-md:gap-5 max-md:py-5"
            >
              <div className="flex-1">
                <div className="flex items-center gap-5">
                  <span className="relative left-1 -top-px size-2.5 bg-p rotate-45" />
                  <p
                    className="font-chivo font-semibold 
          text-p text-[14px] text-end tracking-widest 
          leading-none uppercase will-change-transform"
                  >
                    biografia
                  </p>
                </div>
              </div>
              <div className="flex-2 flex flex-col">
                {(Array.isArray(member.bio) ? member.bio : [member.bio]).map(
                  (phrases, i) => (
                    <div className="max-w-150 mb-5 h-fit overflow-hidden">
                      <h2
                        className="font-inter font-medium 
                  text-p text-[24px] tracking-[-0.04em]
                  leading-[1.1]"
                      >
                        {phrases}
                      </h2>
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="fixed left-0 top-0 w-screen h-dvh backdrop-blur-lg bg-p/75 z-900 cursor-pointer"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
      />
    </>
  );
};
