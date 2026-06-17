import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { IoClose } from "react-icons/io5";
import { motion } from "motion/react";
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

    activeCategory,
    setActiveCategory,

    activeServices,
    setActiveServices,

    activeFeatured,
    setActiveFeatured,

    closeFilters,
    resetFilters,
  } = useWorkStore();

  const years = ["all", "2026", "2025", "2024", "2023", "2022"];
  const categories = [
    {
      label: "Todos",
      value: "all",
    },
    {
      label: "Marca",
      value: "marca",
    },
    {
      label: "Web Design",
      value: "web design",
    },
    {
      label: "Direção Criativa",
      value: "direção criativa",
    },
    {
      label: "Motion",
      value: "motion",
    },
    {
      label: "3D",
      value: "3D",
    },
  ];

  const services = [
    {
      label: "Direção de Arte",
      value: "art-direction",
    },
    {
      label: "Estratégia de Marca",
      value: "brand-strategy",
    },
    {
      label: "UI/UX Design",
      value: "ui-ux",
    },
    {
      label: "Desenvolvimento",
      value: "development",
    },
    {
      label: "Motion Design",
      value: "motion-design",
    },
    {
      label: "Design 3D",
      value: "3d-design",
    },
    {
      label: "Fotografia",
      value: "photography",
    },
    {
      label: "Conteúdo",
      value: "content-creation",
    },
    {
      label: "Creative Coding",
      value: "creative-coding",
    },
    {
      label: "Identidade Visual",
      value: "visual-identity",
    },
  ];

  const yearLabel = (y) => {
    if (y === "all") return "Todos os espaços";
    if (y === "2026") return "Mais recentes (2026)";
    if (y === "2025") return "2025";
    if (y === "2024") return "2024";
    return y;
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
    resetFilters();
  };

  const Item = ({ label, active, onClick }) => (
    <button onClick={onClick} className="flex items-center gap-2 uppercase ">
      {active && <span className="size-2 rounded-full bg-p" />}
      <span
        className={`text-chivo-n-14
           ${active ? "text-p" : "text-p/50 hover:text-p/75"}`}
      >
        {label}
      </span>
    </button>
  );

  return (
    <>
      <motion.div
        className="fixed right-0 top-0 m-4 pt-1 w-full max-w-200 h-[calc(100vh-32px)] 
        bg-[#EBEBEB] backdrop-blur-3xl rounded-sm z-9999
        max-md:h-dvh max-md:w-screen max-md:m-0 max-md:rounded-none 
        will-change-auto"
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
          className="relative px-5 size-full overflow-y-scroll flex flex-col justify-between"
          ref={scrollRef}
        >
          <div className="mb-15 flex flex-col items-start">
            <div className="mt-25 h-fit overflow-hidden max-md:mb-5">
              <motion.h2
                variants={textSlide}
                initial="initial"
                animate="animate"
                className="font-neue font-bold
                 text-p text-[clamp(52px,6vw,74px)] text-start tracking-[-0.05em]
                 leading-none uppercase"
              >
                Filtros
              </motion.h2>
            </div>
            <div className="my-5 w-full h-px bg-p/15"></div>

            {/* YEAR */}

            <div className="w-full flex items-start max-md:flex-col max-md:gap-5">
              <div className="flex-1 max-md:mb-5">
                <div className="size-fit flex items-center gap-5">
                  <span className="relative left-1 -top-px size-2.5 bg-p rotate-45" />
                  <p className="text-chivo-p-14">ano</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                {years.map((y) => (
                  <Item
                    key={y}
                    label={yearLabel(y)}
                    active={activeYear === y}
                    onClick={() => setActiveYear(y)}
                  />
                ))}
              </div>
            </div>
            <div className="w-full h-px bg-p/10 my-5 max-md:mb-15" />

            {/* CATEGORY */}

            <div className="w-full flex items-start max-md:flex-col max-md:gap-5">
              <div className="flex-1 max-md:mb-5">
                <div className="size-fit flex items-center gap-5">
                  <span className="relative left-1 -top-px size-2.5 bg-p rotate-45" />

                  <p className="text-chivo-p-14">categoria</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                {categories.map((item) => (
                  <Item
                    key={item.value}
                    label={item.label}
                    active={activeCategory === item.value}
                    onClick={() => setActiveCategory(item.value)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-p/10 my-5 max-md:mb-15" />

            {/* SERVICES */}

            <div className="w-full flex items-start max-md:flex-col max-md:gap-5">
              <div className="flex-1 max-md:mb-5">
                <div className="size-fit flex items-center gap-5">
                  <span className="relative left-1 -top-px size-2.5 bg-p rotate-45" />

                  <p className="text-chivo-p-14">serviços</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                {services.map((service) => (
                  <Item
                    key={service.value}
                    label={service.label}
                    active={activeServices.includes(service.value)}
                    onClick={() => setActiveServices(service.value)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-p/10 my-5 max-md:mb-15" />

            <div className="mb-15 w-full flex items-start max-md:flex-col max-md:gap-5">
              <div className="flex-1 max-md:mb-5">
                <div className="size-fit flex items-center gap-5">
                  <span className="relative left-1 -top-px size-2.5 bg-p rotate-45" />

                  <p className="text-chivo-p-14">destaque</p>
                </div>
              </div>

              <div className="flex-1">
                <Item
                  label="Projetos em destaque"
                  active={activeFeatured}
                  onClick={() => setActiveFeatured(!activeFeatured)}
                />
              </div>
            </div>
          </div>
        </motion.div>
        <div className="fixed bottom-0 bg-[#EBEBEB] p-5 w-full">
          <div className="flex items-center justify-between gap-5">
            <motion.button
              whileTap={{ scale: 1.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#fff",
              }}
              onClick={resetAll}
              className="h-15 px-10 w-full bg-p border border-s/10 backdrop-blur-2xl rounded-sm group "
            >
              <p
                className="text-chivo-n-14 text-s  
              group-hover:text-p transition-colors duration-500"
              >
                limpar
              </p>
            </motion.button>

            <motion.button
              whileTap={{ scale: 1.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#000",
              }}
              onClick={closeFilters}
              className="h-15 px-10 w-full bg-s border border-s/10 backdrop-blur-2xl rounded-sm group"
            >
              <p
                className="text-chivo-p-14
              group-hover:text-s transition-colors duration-500"
              >
                aplicar
              </p>
            </motion.button>
          </div>
        </div>
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
