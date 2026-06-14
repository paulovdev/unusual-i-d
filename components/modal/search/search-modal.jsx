import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Lenis from "lenis";

import { IoClose } from "react-icons/io5";
import { motion } from "motion/react";
import TextAnimated from "@/components/ui/text-animated";
import { BiSearch } from "react-icons/bi";
import { useWorkStore } from "@/store/useWorkStore";
import { RxUpdate } from "react-icons/rx";
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

export const SearchModal = ({ lenis, work }) => {
  const { setActiveWork, query, setQuery, closeSearch } = useWorkStore();
  const [randomSuggestions, setRandomSuggestions] = useState(
    () => work?.slice(0, 4) || [],
  );
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

  const suggestions = query
    ? work.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      )
    : randomSuggestions;

  const shuffleSuggestions = () => {
    const arr = [...work];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setRandomSuggestions(arr.slice(0, 4));
  };

  return (
    <>
      <motion.div
        className="fixed right-0 top-0 m-4 px-5 pt-1 w-full max-w-200 h-[calc(100vh-32px)] 
        bg-[#EBEBEB] backdrop-blur-3xl rounded-sm z-9999
        max-md:h-dvh max-md:p-5 max-md:w-screen max-md:m-0 max-md:rounded-none 
        will-change-auto"
        variants={menuAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.button
          type="button"
          onClick={closeSearch}
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
            className="group size-15 rounded-sm 
            border border-p/10 backdrop-blur-2xl 
            flex items-center justify-center
            cursor-pointer bg-p"
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
          className="size-full overflow-y-scroll"
          ref={scrollRef}
        >
          <div className="flex flex-col items-start">
            <div className="mt-20 mb-8 h-fit overflow-hidden">
              <motion.h2
                variants={textSlide}
                initial="initial"
                animate="animate"
                className="font-neue font-bold
                              text-p text-[clamp(52px,6vw,74px)] text-start tracking-[-0.05em]
                              leading-none uppercase"
              >
                Pesquisar
              </motion.h2>
            </div>

            <div className="relative w-full max-md:mb-10">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="pesquise por projetos..."
                className="w-full p-5 border border-p/10 rounded-sm outline-none 
                font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase "
              />
              {query ? (
                <span
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-3.5 group"
                >
                  <IoClose
                    className="text-p text-[28px] 
                  hover:scale-110 hover:rotate-90 
                  transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  />{" "}
                </span>
              ) : (
                <span className="absolute right-4 top-3.5">
                  <BiSearch className="text-p text-[28px]" />{" "}
                </span>
              )}
            </div>

            <div className="my-10 w-full flex items-start max-md:flex-col max-md:gap-5">
              <div className="flex-1">
                <div className="size-fit flex items-center gap-5 max-md:mb-5">
                  <span className="relative left-1 -top-px size-2.5 bg-p rotate-45" />

                  {query === "" ? (
                    <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase ">
                      sugestões
                    </p>
                  ) : (
                    <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase ">
                      {suggestions.length === 1 ? (
                        <span>{suggestions.length} resultado</span>
                      ) : (
                        <span>{suggestions.length} resultados</span>
                      )}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-[1.25] w-full flex flex-col gap-5">
                {suggestions.map((item, i) => (
                  <motion.div
                    key={item.title}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="relative w-full group"
                    onClick={() => {
                      setActiveWork(item);
                      closeSearch();
                    }}
                  >
                    <figure
                      className="w-full h-60 overflow-hidden rounded-sm 
                      border border-transparent
                    group-hover:border-p duration-250 ease-[cubic-bezier(0.76,0,0.24,1)]
                    max-md:h-75"
                    >
                      <Image
                        src={item?.heroMedia?.image.asset.url}
                        width={1000}
                        height={1000}
                        alt=""
                        className="size-full object-cover brightness-90"
                      />

                      <div className="absolute left-5 bottom-5">
                        <p className="mb-2 text-s text-[14px] tracking-[0.05em] leading-none uppercase ">
                          {item.title}
                        </p>

                        <p className="text-s/75 text-[12px] tracking-[0.05em] leading-none uppercase ">
                          {item.category} / {item.year}
                        </p>
                      </div>
                    </figure>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#fff",
            }}
            onClick={() => {
              if (query) {
                setQuery("");
              } else {
                shuffleSuggestions();
              }
            }}
            className="mb-10 h-15 px-10 w-full bg-p border border-s/10 backdrop-blur-2xl rounded-sm 
            flex items-center justify-center gap-5 group"
          >
            <RxUpdate
              className="text-[22px] text-s group-hover:rotate-155 group-hover:text-p
            transition-all duration-500 delay-25 ease-[cubic-bezier(0.76,0,0.24,1)]"
            />
            <p
              className="font-azeret font-medium 
            text-s text-[14px] tracking-[0.05em] leading-none uppercase
             group-hover:text-p transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            >
              atualizar sugestões
            </p>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed left-0 top-0 w-screen h-dvh backdrop-blur-lg bg-p/75 z-900 cursor-pointer"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={closeSearch}
      />
    </>
  );
};
