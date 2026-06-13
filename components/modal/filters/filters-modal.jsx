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
    activeArea,
    setActiveArea,
    activeLocation,
    setActiveLocation,
    closeFilters,
    resetStyles,
  } = useWorkStore();
  /*  */

  const areaValue = activeArea === "all" ? 0 : activeArea;
  const years = ["all", "2026", "2025", "2024"];
  const status = ["all", "completed", "ongoing", "concept"];
  const styles = [
    { value: "minimalist", icon: "—" },
    { value: "modern", icon: "▭" },
    { value: "industrial", icon: "▦" },
    { value: "luxury", icon: "✦" },
    { value: "warm", icon: "☀" },
  ];

  const locations = [
    "all",
    "Brasil",
    "Estados Unidos",
    "França",
    "Italia",
    "Índia",
  ];

  const locationLabel = (l) => {
    if (l === "all") return "Todas localizações";
    return l;
  };
  const yearLabel = (y) => {
    if (y === "all") return "Todos os espaços";
    if (y === "2026") return "Mais recentes (2026)";
    if (y === "2025") return "2025";
    if (y === "2024") return "2024";
    return y;
  };
  const statusLabel = (s) => {
    if (s === "all") return "Todos";
    if (s === "completed") return "Concluído";
    if (s === "ongoing") return "Em andamento";
    if (s === "concept") return "Conceitual";
    return s;
  };
  const styleLabel = (v) => {
    const map = {
      minimalist: "Minimalista",
      modern: "Moderno",
      industrial: "Industrial",
      luxury: "Luxo",
      warm: "Aconchegante",
    };
    return map[v] || v;
  };

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
    setActiveLocation("all");
    setActiveArea("all");
  };

  const statusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-400";
      case "ongoing":
        return "bg-yellow-400";
      case "concept":
        return "bg-blue-400";
      default:
        return "bg-p/50";
    }
  };

  const Item = ({ label, active, onClick, color }) => (
    <button onClick={onClick} className="flex items-center gap-2 uppercase ">
      {active && (
        <span className={`size-2 rounded-[1px] ${color} animate-pulse`} />
      )}
      <span
        className={`font-azeret font-medium text-[14px] tracking-[0.05em] leading-none uppercase 
           ${active ? "text-p" : "text-p/50 hover:text-p/75"}`}
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
            ? "bg-p text-s border-s"
            : "border-p/10 text-p/50 hover:text-p hover:border-p/50"
        }`}
      >
        <span className="text-[22px]">{item.icon}</span>
        <span
          className="font-azeret font-medium 
        text-[12px] tracking-[0.05em] leading-none uppercase "
        >
          {item.value}
        </span>
      </button>
    );
  };
  return (
    <>
      <motion.div
        className="fixed right-0 top-0 px-10 pt-10 w-[40vw] h-dvh
        bg-s backdrop-blur-3xl z-9999
        max-ds:w-[70vw] max-lg:w-full max-md:p-5 max-md:w-screen will-change-auto"
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
          <motion.div
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#fff",
            }}
            className="p-3 backdrop-blur-2xl border border-s/10 rounded-sm group  bg-p"
          >
            <IoClose
              className="text-s text-[24px] group-hover:text-p group-hover:rotate-90
                transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            />
          </motion.div>
        </motion.button>

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
          className="relative size-full overflow-y-scroll flex flex-col justify-between"
          ref={scrollRef}
        >
          <div className="flex flex-col items-start">
            <TextAnimated
              phrases={["Filtros"]}
              variants={textSlide}
              as="h2"
              className="flex flex-col"
              lineClassName="mb-15 font-neue font-normal text-p text-[72px] tracking-[-0.07em] leading-none max-md:text-[42px]"
              wordClassName="mr-2"
              wordDelay={0.015}
              lineDelay={0.1}
            />

            {/* YEAR */}

            <div className="w-full flex items-start max-md:flex-col max-md:gap-5">
              <div className="flex-1">
                <div className="size-fit flex items-center gap-2">
                  <span className="size-2  bg-p rounded-[1px]" />
                  <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase ">
                    ano
                  </p>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                {years.map((y) => (
                  <Item
                    key={y}
                    label={yearLabel(y)}
                    active={activeYear === y}
                    onClick={() => setActiveYear(y)}
                    color="bg-p/50"
                  />
                ))}
              </div>
            </div>
            <div className="w-full h-px bg-p/10 my-10" />

            {/* STATUS */}
            <div className="w-full flex items-start max-md:flex-col max-md:gap-5">
              <div className="flex-1">
                <div className="size-fit flex items-center gap-2">
                  <span className="size-2  bg-p rounded-[1px]" />
                  <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase ">
                    status
                  </p>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                {status.map((s) => (
                  <Item
                    key={s}
                    label={statusLabel(s)}
                    active={activeStatus === s}
                    onClick={() => setActiveStatus(s)}
                    color={statusColor(s)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-p/10 my-10" />

            {/* STYLE */}
            <div className=" w-full flex items-start max-md:flex-col max-md:gap-5">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="size-2  bg-p rounded-[1px]" />
                  <p className="text-p text-[14px] uppercase">style</p>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-3 gap-3">
                {styles.map((item) => (
                  <StyleItem
                    key={item.value}
                    item={{
                      ...item,
                      value: styleLabel(item.value),
                    }}
                    active={activeStyles.includes(item.value)}
                    onClick={() => setActiveStyles(item.value)}
                  />
                ))}
              </div>
            </div>
            {/* LOCATION */}

            {/* AREA */}
            <div className="w-full h-px bg-p/10 my-10" />

            <div className="mb-10 mt-5 w-full flex items-start max-md:flex-col max-md:gap-5">
              <div className="flex-1">
                <div className="size-fit flex items-center gap-2">
                  <span className="size-2  bg-p rounded-[1px]" />
                  <p
                    className="font-azeret font-medium text-p text-[14px] 
        tracking-[0.05em] leading-none uppercase"
                  >
                    time
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <div className="relative w-full h-5 flex items-center ">
                  <div className="absolute w-full h-1.5 bg-p/10 rounded-sm" />

                  <div
                    className="absolute h-1.5 bg-p rounded-sm"
                    style={{
                      width: `${(areaValue / 200) * 100}%`,
                    }}
                  />

                  <input
                    type="range"
                    min={0}
                    max={200}
                    step={1}
                    value={areaValue}
                    onChange={(e) => {
                      const value = Number(e.target.value);

                      setActiveArea(value);
                    }}
                    className="range-thumb w-full rounded-sm"
                  />

                  <div
                    className="absolute -top-10"
                    style={{
                      left: `${(areaValue / 225) * 100}%`,
                    }}
                  >
                    <p className="font-azeret font-semibold text-p text-[14px] tracking-[0.08em] uppercase whitespace-nowrap">
                      {areaValue}m²
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-10 flex items-center justify-between gap-5">
            <motion.button
              whileTap={{ scale: 1.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#fff",
              }}
              onClick={resetAll}
              className="p-5 px-10 w-full bg-p border border-s/10 backdrop-blur-2xl rounded-sm group "
            >
              <p
                className="font-azeret font-semibold 
              text-s text-[12px] tracking-[0.05em] leading-none uppercase 
              group-hover:text-p transition-colors duration-500"
              >
                limpar filtros
              </p>
            </motion.button>

            <motion.button
              whileTap={{ scale: 1.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#000",
              }}
              onClick={closeFilters}
              className="p-5 px-10 w-full bg-s border border-s/10 backdrop-blur-2xl rounded-sm group"
            >
              <p
                className="font-azeret font-semibold 
              text-p text-[12px] tracking-[0.05em] leading-none uppercase 
              group-hover:text-s transition-colors duration-500"
              >
                aplicar filtros e fechar
              </p>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed left-0 top-0 w-screen h-dvh backdrop-blur-lg bg-p/75 z-900 cursor-pointer"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={closeFilters}
      />
    </>
  );
};
