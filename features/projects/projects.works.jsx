"use client";

import ImageComponent from "@/components/ui/image";
import TextAnimated from "@/components/ui/text-animated";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { FiGrid, FiList } from "react-icons/fi";
import { useWorkStore } from "@/store/useWorkStore";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useCallback, useRef, useState } from "react";

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
const mediaOverlap = {
  initial: {
    y: "100%",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },

  animate: {
    y: "0%",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },

  exit: {
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};
const scale = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.25,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const WorksGrid = ({ work, index }) => {
  const container = useRef();
  const { activeWork, setActiveWork } = useWorkStore();

  return (
    <motion.div
      ref={container}
      initial={{ opacity: 0, y: 75 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.035 * index,
      }}
      className={`${index === 0 && "col-span-2"}`}
    >
      <motion.div
        animate={{
          clipPath:
            activeWork?.title === work.title
              ? "inset(0% 100% 0% 0%)"
              : "inset(0% 0% 0% 0%)",
        }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="
          relative h-[90vh] w-full cursor-pointer 
          max-md:h-[50vh]"
        onClick={() => setActiveWork(work)}
      >
        <figure className="absolute inset-0 size-full overflow-hidden rounded-sm">
          <ImageComponent
            image={work.heroMedia.image}
            className="size-full rounded-sm object-cover brightness-75"
          />

          <div
            className="absolute inset-0 z-10 size-full 
          p-10 max-md:p-5"
          >
            <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-[1px] bg-s" />

                <p className="font-azeret text-[14px] font-semibold uppercase tracking-[0.05em] leading-none text-s">
                  {work.mark}
                </p>
              </div>

              <p className="font-azeret text-[14px] font-semibold uppercase tracking-[0.05em] leading-none text-s">
                {work.category} / {work.year}
              </p>
            </div>

            <TextAnimated
              phrases={[work.title + "ㅤ"]}
              variants={textSlide}
              as="h2"
              className="flex flex-col"
              lineClassName="font-neue font-bold 
             text-start text-s text-[64px] tracking-[-0.05em] leading-[1.1]
              max-lg:text-[62px] max-md:text-[42px] uppercase"
              wordClassName="mr-2"
              wordDelay={0.015}
              lineDelay={0.1}
            />
          </div>
        </figure>
      </motion.div>
    </motion.div>
  );
};

const WorksList = ({
  work,
  index,
  hovered,
  setHovered,
  setPreview,
  bumpMedia,
}) => {
  const { setActiveWork } = useWorkStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.035 * index,
      }}
    >
      <motion.div
        onMouseEnter={() => {
          setHovered(index);
          setPreview(work);
          bumpMedia();
        }}
        onMouseLeave={() => {
          setHovered(null);
          setPreview(null);
        }}
        onClick={() => setActiveWork(work)}
        className="flex cursor-pointer items-center justify-between border-b border-p/10 py-5"
        animate={{
          opacity: hovered === null || hovered === index ? 1 : 0.25,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          animate={{
            scale: hovered === index ? 1.02 : 1,
          }}
        >
          <TextAnimated
            phrases={[work.title]}
            variants={textSlide}
            as="p"
            className="flex flex-col"
            lineClassName="font-neue font-bold 
             text-start text-p text-[64px] tracking-[-0.05em] leading-[1.1]
              max-lg:text-[62px] max-md:text-[42px] uppercase"
            wordClassName="mr-2"
            wordDelay={0.015}
            lineDelay={0.1}
          />
        </motion.div>

        <motion.div
          animate={{
            scale: hovered === index ? 1.02 : 1,
            opacity: hovered === index || hovered === null ? 1 : 0.4,
          }}
        >
          <TextAnimated
            phrases={[String(work.year)]}
            variants={textSlide}
            as="p"
            className="flex flex-col"
            lineClassName="font-neue font-bold 
             text-end text-p text-[64px] tracking-[-0.05em] leading-[1.1]
              max-lg:text-[62px] max-md:text-[42px] uppercase"
            wordClassName="mr-2"
            wordDelay={0.015}
            lineDelay={0.1}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SpacesWorks = ({ work, activeFiltersCount }) => {
  const {
    activeCategory,
    setActiveCategory,
    openFilters,
    openSearch,
    activeYear,
    activeStatus,
    activeStyles,
  } = useWorkStore();

  const [layout, setLayout] = useState("grid");

  const [hovered, setHovered] = useState(null);
  const [preview, setPreview] = useState(null);

  const { x, y } = useMousePosition();
  const [mediaTick, setMediaTick] = useState(0);

  const bumpMedia = useCallback(() => {
    setMediaTick((t) => t + 1);
  }, []);
  const categories = [
    "todos",
    "3D",
    "marca",
    "direção criativa",
    "web design",
    "motion",
  ];

  const filteredWorks = work.filter((item) => {
    const category = item.category || "";
    const year = item.year || "";

    const matchCategory =
      activeCategory === "todos" || category === activeCategory;

    const matchYear =
      activeYear === "todos" || String(year) === String(activeYear);

    const matchStatus =
      activeStatus === "todos" || item.status === activeStatus;

    const matchStyle =
      activeStyles.length === 0 ||
      item.styles?.some((s) => activeStyles.includes(s.toLowerCase().trim()));

    return matchCategory && matchYear && matchStatus && matchStyle;
  });

  return (
    <>
      <div
        className="
          sticky top-0 z-10 mb-60 flex w-full
          items-center justify-between
           bg-[#ffffff] px-15 py-5 max-md:px-5 
        "
      >
        <div className="flex items-center gap-5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;

            return (
              <motion.button
                key={cat}
                initial={{ scale: 1.05 }}
                whileTap={{ scale: 1.1 }}
                whileHover={
                  !isActive
                    ? {
                        scale: 1.05,
                        backgroundColor: "#000",
                      }
                    : {}
                }
                animate={{
                  backgroundColor: isActive ? "#000" : "#fff",
                }}
                onClick={() => setActiveCategory(cat)}
                className="group w-full rounded-sm border border-p/10 p-5 px-10 cursor-pointer"
              >
                <p
                  className={`
                    text-[14px] font-medium uppercase tracking-[0.05em]
                    transition-colors duration-500 truncate
                    ${isActive ? "text-s" : "text-p group-hover:text-s"}
                  `}
                >
                  {cat}
                </p>
              </motion.button>
            );
          })}
        </div>

        <div className=" flex items-center gap-5">
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
            onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
            className="group rounded-sm border border-p/10 bg-p p-5 backdrop-blur-2xl cursor-pointer max-md:p-2"
          >
            {layout === "grid" ? (
              <FiGrid className="text-[24px] text-s transition-colors duration-500 group-hover:text-p" />
            ) : (
              <FiList className="text-[24px] text-s transition-colors duration-500 group-hover:text-p" />
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
            className="group rounded-sm border border-p/10 bg-p p-5 backdrop-blur-2xl cursor-pointer max-md:p-2"
            onClick={openSearch}
          >
            <IoIosSearch className="text-[24px] text-s transition-colors duration-500 group-hover:text-p" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
            className="group relative rounded-sm border border-p/10 bg-p p-5 backdrop-blur-2xl cursor-pointer max-md:p-2"
            onClick={openFilters}
          >
            <IoFilter className="text-[24px] text-s transition-colors duration-500 group-hover:text-p" />

            {activeFiltersCount > 0 && (
              <div className="absolute -right-2.5 -top-2.5 rounded-sm border border-p/10 bg-[#ffffff] p-2">
                <p className="text-[14px] font-medium uppercase tracking-[0.05em] text-p">
                  {activeFiltersCount}
                </p>
              </div>
            )}
          </motion.button>
        </div>
      </div>

      {layout === "grid" ? (
        <div className="relative -top-50 grid grid-cols-2 gap-5 px-15 max-md:grid-cols-1 max-md:px-5">
          <AnimatePresence mode="wait">
            {filteredWorks.map((item, i) => (
              <WorksGrid key={item.title} work={item} index={i} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="relative -top-50 px-15 max-md:px-5">
          <div className="flex items-center justify-between">
            <p className="font-azeret text-[14px] font-semibold uppercase tracking-[0.05em] text-p">
              nome
            </p>

            <p className="font-azeret text-[14px] font-semibold uppercase tracking-[0.05em] text-p">
              ano
            </p>
          </div>

          <div className="mb-10 mt-5 h-px w-full bg-p/10" />

          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              {filteredWorks.map((item, i) => (
                <WorksList
                  key={item.title}
                  work={item}
                  index={i}
                  hovered={hovered}
                  setHovered={setHovered}
                  setPreview={setPreview}
                  bumpMedia={bumpMedia}
                />
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {preview && (
              <motion.div
                style={{ x, y }}
                className="pointer-events-none rounded-sm fixed top-0 left-0 w-100 h-60 z-30 overflow-hidden will-change-transform -translate-x-1/2 -translate-y-1/2"
                {...scale}
              >
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={`${preview.title}-${mediaTick}`}
                    variants={mediaOverlap}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 rounded-sm will-change-transform"
                  >
                    <ImageComponent
                      image={preview.heroMedia.image}
                      className="size-full object-cover"
                    />
                  </motion.div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-azeret text-s text-[14px] font-medium uppercase tracking-[0.05em] ">
                      ver
                    </p>
                  </div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {filteredWorks.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-sm uppercase text-p/50">
            Nenhum projeto encontrado
          </p>
        </div>
      )}
    </>
  );
};

export default SpacesWorks;
