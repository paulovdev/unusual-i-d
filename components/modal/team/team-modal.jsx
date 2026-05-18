import Image from "next/image";
import { useEffect, useRef } from "react";

import Lenis from "lenis";

import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import TextAnimated from "@/components/ui/text-animated";
import { FiMapPin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
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
        className="fixed left-0 top-0 m-4 p-10 w-[45vw] h-[calc(100vh-32px)] 
       bg-[#fefcf5] backdrop-blur-3xl rounded-sm z-[1000] max-ds:w-[70vw] max-lg:w-full max-md:p-5 max-md:w-[calc(100vw-32px)]"
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
            className="p-3 backdrop-blur-2xl border border-p/10 rounded-sm group max-md:p-2 bg-p"
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
            <div className="w-full flex flex-col gap-15 max-md:mb-10">
              <div className=" size-fit flex items-center gap-2">
                <span className="size-2 bg-p rounded-[1px]" />
                <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
                  {member.role}
                </p>
              </div>

              <TextAnimated
                phrases={[member.name]}
                variants={textSlide}
                as="h2"
                className="flex flex-col"
                lineClassName="font-neue font-normal text-p text-[72px] tracking-[-0.07em]
               leading-none max-md:text-[42px]"
                wordClassName="mr-2"
                wordDelay={0.015}
                lineDelay={0.1}
              />
            </div>

            {/*  */}

            <div className="relative mt-10 w-full h-[50vh]">
              <Image
                src={member.src}
                alt={member.name}
                fill
                sizes=""
                placeholder="blur"
                className="object-cover rounded-md"
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <div className="mt-10 w-full flex">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <MdOutlineEmail className="text-p text-[14px]" />

                    <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase ">
                      e-mail
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-15">
                  <p className="font-azeret font-medium text-p text-[14px] tracking-[0.01em] leading-[1.1] uppercase ">
                    {member.email}
                  </p>
                </div>
              </div>
              <div className="w-full flex">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <FaInstagram className="text-p text-[14px]" />

                    <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase ">
                      instagram
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-15">
                  <p className="font-azeret font-medium text-p text-[14px] tracking-[0.01em] leading-[1.1] uppercase ">
                    {member.instagram}
                  </p>
                </div>
              </div>
              <div className="w-full flex">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-p text-[14px]" />

                    <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase ">
                      localização
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-15">
                  <p className="font-azeret font-medium text-p text-[14px] tracking-[0.01em] leading-[1.1] uppercase ">
                    {member.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="my-10 w-full h-px bg-p/10"></div>
            <div className="w-full flex items-start max-md:flex-col max-md:gap-5">
              <div className="flex-1">
                <div className="size-fit flex items-center gap-2">
                  <span className="size-2 bg-p " />
                  <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase ">
                    biografia
                  </p>
                </div>
              </div>
              <div className="flex-2 flex flex-col gap-15">
                <TextAnimated
                  phrases={
                    Array.isArray(member.bio) ? member.bio : [member.bio]
                  }
                  variants={textSlide}
                  as="span"
                  className="flex flex-col"
                  lineClassName="max-w-150 mb-5 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-[1.2] uppercase "
                  wordClassName="mr-2"
                  wordDelay={0.015}
                  lineDelay={0.4}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="fixed left-0 top-0 w-screen h-dvh backdrop-blur-lg bg-p/75 z-[900]"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClose}
      />
    </>
  );
};
