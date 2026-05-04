import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Lenis from "lenis";

import { IoClose } from "react-icons/io5";
import { motion } from "motion/react";
import TextAnimated from "@/components/ui/text-animated";
import { useWorkStore } from "@/store/useWorkStore";

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
  initial: { clipPath: "inset(0% 0% 0% 100%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: "inset(0% 0% 0% 100%)",
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

export const FiltersModal = ({ lenis }) => {
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);
  const {
    activeYear,
    setActiveYear,
    activeStatus,
    setActiveStatus,
    activeStyles,
    setActiveStyles,
    closeFilters,
    resetStyles,
  } = useWorkStore();
  /*  */

  const years = ["all", "2026", "2025", "2024"];
  const status = ["all", "completed", "ongoing", "concept"];
  const styles = [
    { value: "minimal", icon: "—" },
    { value: "modern", icon: "▭" },
    { value: "industrial", icon: "▦" },
    { value: "luxury", icon: "✦" },
    { value: "warm", icon: "☀" },
  ];
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

  /*  */

  const resetAll = () => {
    setActiveYear("all");
    setActiveStatus("all");
    resetStyles();
  };

  const Item = ({ label, active, onClick, color }) => (
    <button onClick={onClick} className="flex items-center gap-2 uppercase ">
      {active && (
        <span className={`size-2 rounded-[1px] ${color} animate-pulse`} />
      )}
      <span
        className={`font-azeret font-medium text-[14px] tracking-[0.05em] leading-none uppercase 
           ${active ? "text-s" : "text-s/50 hover:text-s/75"}`}
      >
        {label}
      </span>
    </button>
  );
  const StyleItem = ({ item, active, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center gap-2 p-5 border rounded-sm transition-all
        ${
          active
            ? "bg-s text-p border-s"
            : "border-s/25 text-s/50 hover:text-s hover:border-s/50"
        }`}
      >
        <span className="text-[22px]">{item.icon}</span>
        <span className="font-azeret font-medium  text-[12px] tracking-[0.05em] leading-none uppercase ">
          {item.value}
        </span>
      </button>
    );
  };
  return (
    <>
      <motion.div
        className="fixed right-0 top-0 m-4 pt-15 px-10 w-[45vw] h-[calc(100%-32px)] bg-p/25 backdrop-blur-3xl rounded-sm z-[1000] max-ds:w-[70vw] max-lg:w-full max-md:p-5 max-md:w-[calc(100vw-32px)]"
        variants={menuAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.button
          type="button"
          onClick={closeFilters}
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
              backgroundColor: "#000",
            }}
            className="p-3 backdrop-blur-2xl rounded-sm group  bg-s"
          >
            <IoClose
              className="text-p text-[24px] group-hover:text-s group-hover:rotate-90
                transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            />
          </motion.button>
        </motion.button>

        <div
          className="relative size-full overflow-y-scroll flex flex-col justify-between"
          ref={scrollRef}
        >
          <div className="flex flex-col items-start">
            <TextAnimated
              phrases={["Categoriesㅤ"]}
              variants={textSlide}
              as="h2"
              className="flex flex-col"
              lineClassName="mb-15 font-i-sans font-normal text-s text-[72px] tracking-[-0.07em] leading-none max-md:text-[42px]"
              wordClassName="mr-2"
              wordDelay={0.065}
              lineDelay={0.025}
            />

            {/* YEAR */}

            <div className="w-full flex items-start max-md:flex-col max-md:gap-5">
              <div className="flex-1">
                <div className="size-fit flex items-center gap-2">
                  <span className="size-2 bg-s rounded-[1px]" />
                  <p className="font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase ">
                    year
                  </p>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                {years.map((y) => (
                  <Item
                    key={y}
                    label={
                      y === "all"
                        ? "All"
                        : y && y === "2026"
                          ? "Recent (2026)"
                          : y
                    }
                    active={activeYear === y}
                    onClick={() => setActiveYear(y)}
                    color="bg-blue-400"
                  />
                ))}
              </div>
            </div>
            <div className="w-full h-px bg-s/20 my-10" />

            {/* STATUS */}
            <div className="w-full flex items-start max-md:flex-col max-md:gap-5">
              <div className="flex-1">
                <div className="size-fit flex items-center gap-2">
                  <span className="size-2 bg-s rounded-[1px]" />
                  <p className="font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase ">
                    status
                  </p>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                {status.map((s) => (
                  <Item
                    key={s}
                    label={s}
                    active={activeStatus === s}
                    onClick={() => setActiveStatus(s)}
                    color="bg-green-400"
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-s/20 my-10" />

            {/* STYLE */}
            <div className=" w-full flex items-start max-md:flex-col max-md:gap-5">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="size-2 bg-s rounded-[1px]" />
                  <p className="text-s text-[14px] uppercase">style</p>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-3 gap-3">
                {styles.map((item) => (
                  <StyleItem
                    key={item.value}
                    item={item}
                    active={activeStyles.includes(item.value)}
                    onClick={() => setActiveStyles(item.value)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mb-10 flex items-center justify-between gap-5">
            <motion.button
              whileTap={{ scale: 1.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#fff",
              }}
              onClick={resetAll}
              className="p-5 px-10 w-full bg-p backdrop-blur-2xl rounded-sm group "
            >
              <p
                className="font-azeret font-semibold 
              text-s text-[12px] tracking-[0.05em] leading-none uppercase 
              group-hover:text-p transition-colors duration-500"
              >
                reset all
              </p>
            </motion.button>

            <motion.button
              whileTap={{ scale: 1.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#000",
              }}
              onClick={closeFilters}
              className="p-5 px-10 w-full bg-s backdrop-blur-2xl rounded-sm group"
            >
              <p
                className="font-azeret font-semibold 
              text-p text-[12px] tracking-[0.05em] leading-none uppercase 
              group-hover:text-s transition-colors duration-500"
              >
                apply & close
              </p>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fixed left-0 top-0 w-screen h-dvh backdrop-blur-lg bg-p/75 z-[900]"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={closeFilters}
      />
    </>
  );
};
