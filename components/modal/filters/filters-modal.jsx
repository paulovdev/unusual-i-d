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
      label: "Arquitetura de Interiores",
      value: "interior-architecture",
    },
    {
      label: "Design de Interiores Completo",
      value: "full-interior-design",
    },
    {
      label: "Curadoria de Mobiliário e Arte",
      value: "furniture-art-curation",
    },
    {
      label: "Renovação Residencial",
      value: "residential-renovation",
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
    if (y === "all") return "Todos";
    if (y === "2026") return "2026";
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
      <span
        className={`text-chivo-n-14
           ${active ? "text-p" : "text-p/50 hover:text-p/75"}`}
      >
        {label}
      </span>
      {active && (
        <span className="relative -top-px size-3.5 rounded-full border border-p flex justify-center items-center">
          <IoClose className="text-p text-[14px]" />
        </span>
      )}
    </button>
  );

  const ItemYear = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`p-2 size-25 rounded-full group
         ${active ? "bg-p" : "border border-p/10 hover:bg-p"} 
        flex items-center justify-center gap-2 uppercase 
        transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]`}
    >
      <span
        className={`text-chivo-n-14 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
           ${active ? "text-s" : "text-p/50 group-hover:text-s"}`}
      >
        {label}
      </span>
    </button>
  );

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 m-2.5 px-2.5 pt-1 w-full max-w-180 h-[calc(100vh-10px)] 
        bg-bg-s backdrop-blur-3xl z-9999
        max-lg:h-dvh max-lg:w-screen max-lg:m-0 
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
          className="absolute top-2.5 right-2.5 z-30 group"
        >
          <motion.div
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#f5f5f5",
            }}
            className="group size-15 
            backdrop-blur-2xl 
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
          className="relative size-full overflow-y-scroll flex flex-col justify-between"
          ref={scrollRef}
        >
          <div className="mb-15 flex flex-col items-start">
            <div className="mt-25 h-fit overflow-hidden max-lg:mb-5">
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
            {/* CATEGORY */}

            <div className="w-full flex items-start max-lg:flex-col max-lg:gap-5">
              <div className="flex-1 max-lg:mb-5">
                <div className="size-fit flex items-center gap-5">
                  <span className="relative left-1 triangle-p" />

                  <p className="text-chivo-p-14">categoria</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-4">
                {categories.map((cat) => (
                  <Item
                    key={cat.value}
                    label={cat.label}
                    active={activeCategory.includes(cat.value)}
                    onClick={() => setActiveCategory(cat.value)}
                  />
                ))}
              </div>
            </div>
            <div className="w-full h-px bg-p/10 mt-15 mb-5 " />

            {/* YEAR */}

            <div className=" w-full flex items-start flex-col max-lg:gap-5">
              <div className="mb-10">
                <div className="size-fit flex items-center gap-5">
                  <span className="relative left-1 triangle-p" />
                  <p className="text-chivo-p-14">ano</p>
                </div>
              </div>
              <div className="w-full flex items-center justify-between">
                {years.map((y) => (
                  <ItemYear
                    key={y}
                    label={yearLabel(y)}
                    active={activeYear === y}
                    onClick={() => setActiveYear(y)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-p/10 mt-15 mb-5 " />

            {/* SERVICES */}

            <div className="w-full flex items-start max-lg:flex-col max-lg:gap-5">
              <div className="flex-1 max-lg:mb-5">
                <div className="size-fit flex items-center gap-5">
                  <span className="relative left-1 triangle-p" />

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

            <div className="w-full h-px bg-p/10 my-5 max-lg:mb-15" />

            <div className="mb-15 w-full flex items-start max-lg:flex-col max-lg:gap-5">
              <div className="flex-1 max-lg:mb-5">
                <div className="size-fit flex items-center gap-5">
                  <span className="relative left-1 triangle-p" />

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
        <div className="fixed bottom-0 left-0 bg-bg-s p-2.5 w-full">
          <div className="flex items-center justify-between gap-5">
            <motion.button
              whileTap={{ scale: 1.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#f5f5f5",
              }}
              onClick={resetAll}
              className="h-15 px-10 w-full bg-p  backdrop-blur-2xl group "
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
              className="h-15 px-10 w-full bg-bg-s-2  backdrop-blur-2xl group"
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
