"use client";

import ImageComponent from "@/components/ui/image";
import TextAnimated from "@/components/ui/text-animated";
import { AnimatePresence, motion } from "motion/react";
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { FiGrid, FiList } from "react-icons/fi";
import { useWorkStore } from "@/store/useWorkStore";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useCallback, useRef, useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import { ClipText } from "@/components/ui/clip-text";

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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.035 * index,
      }}
      className={`${index === 0 ? "col-span-1" : "max-lg:col-span-2"}`}
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
          relative h-screen w-full cursor-pointer 
          max-lg:max-h-150 max-md:max-h-100"
        onClick={() => setActiveWork(work)}
      >
        <figure className="absolute inset-0 size-full overflow-hidden  group">
          <ImageComponent
            image={work.heroMedia.image}
            className="size-full  object-cover brightness-75 group-hover:scale-110
           transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          />

          <div className="absolute  inset-5 flex items-center justify-start z-10">
            <div className="w-full flex items-center justify-between">
              {[work.title].map((phrases, i) => (
                <div key={i}>
                  <ClipText
                    text={phrases}
                    animate={"animate"}
                    delay={0.15 * i}
                    tag="h2"
                    className="font-neue text-[42px] text-s font-bold tracking-[-0.05em] leading-none uppercase"
                  />
                </div>
              ))}

              <div className="h-[16px] overflow-hidden">
                <motion.div
                  initial="initial"
                  animate="animate"
                  custom={0.25}
                  variants={textSlide}
                  className="mb-10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-5">
                    <span className="triangle-s left-1" />

                    <p className="text-chivo-s-14">{work.mark}</p>
                  </div>

                  <p className="text-chivo-s-14">{work.category}</p>
                </motion.div>
              </div>
            </div>
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
          {[work.title].map((phrases, i) => (
            <div key={i}>
              <ClipText
                text={phrases}
                animate={"animate"}
                delay={0.15 * i}
                tag="h2"
                className="font-neue text-[42px] text-p font-bold tracking-[-0.05em] leading-none uppercase"
              />
            </div>
          ))}
        </motion.div>

        <motion.div
          animate={{
            scale: hovered === index ? 1.02 : 1,
            opacity: hovered === index || hovered === null ? 1 : 0.4,
          }}
        >
          <div className="h-[16px] overflow-hidden">
            <motion.div
              initial="initial"
              animate="animate"
              custom={0.25}
              variants={textSlide}
              className="mb-10 flex items-center justify-between"
            >
              <div className="flex items-center gap-5">
                <span className="triangle-p left-1" />

                <p className="text-chivo-p-14">{work.mark}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SpacesWorks = ({ work, activeFiltersCount }) => {
  const {
    activeCategory,
    activeYear,
    activeServices,
    activeFeatured,
    openFilters,
    openSearch,
  } = useWorkStore();

  const [layout, setLayout] = useState("grid");

  const [openCat, setOpenCat] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [preview, setPreview] = useState(null);

  const { x, y } = useMousePosition();
  const [mediaTick, setMediaTick] = useState(0);

  const bumpMedia = useCallback(() => {
    setMediaTick((t) => t + 1);
  }, []);

  const filteredWorks = work.filter((item) => {
    const matchCategory =
      activeCategory.length === 0 ||
      activeCategory.every((cat) => item.scope?.includes(cat));

    const matchYear =
      activeYear === "all" || String(item.year) === String(activeYear);

    const matchServices =
      activeServices.length === 0 ||
      activeServices.every((service) => item.services?.includes(service));

    const matchFeatured = !activeFeatured || item.featured === true;

    return matchCategory && matchYear && matchServices && matchFeatured;
  });

  return (
    <>
      <div
        className="
    relative top-0 z-10 mb-50 flex w-full
    items-center justify-between
    bg-bg-s px-5 py-5 max-lg:px-5 
  "
      >
        <AnimatePresence mode="wait">
          {!openCat && (
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.15,
                  duration: 0.8,
                  ease: [0.88, 0, 0.24, 1],
                },
              }}
              exit={{
                opacity: 0,
                x: 30,
                transition: {
                  delay: 0.15,
                  duration: 0.8,
                  ease: [0.88, 0, 0.24, 1],
                },
              }}
              className="w-full
          flex
          items-center justify-between
          gap-2.5
        "
            >
              {/* FILTER */}

              <motion.button
                whileTap={{
                  scale: 1.1,
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#f5f5f5",
                }}
                onClick={openFilters}
                className="
            relative
            group size-15 
             bg-p
            flex items-center justify-center
            cursor-pointer 
          "
              >
                <IoFilter
                  className="
              text-[24px]
              text-s
              group-hover:text-p
            "
                />

                {activeFiltersCount > 0 && (
                  <div
                    className="
                absolute -right-4 -top-3 bg-red-400 size-8 flex justify-center items-center"
                  >
                    <p
                      className="
                  text-chivo-s-14
                "
                    >
                      {activeFiltersCount}
                    </p>
                  </div>
                )}
              </motion.button>

              <div className="flex items-center gap-5">
                {/* SEARCH */}

                <motion.button
                  whileTap={{
                    scale: 1.1,
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#f5f5f5",
                  }}
                  onClick={openSearch}
                  className=" group size-15    bg-p flex items-center justify-center cursor-pointer
          "
                >
                  <IoIosSearch
                    className="
              text-[24px]
              text-s
              group-hover:text-p
            "
                  />
                </motion.button>

                {/* LAYOUT */}

                <motion.button
                  whileTap={{
                    scale: 1.1,
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#f5f5f5",
                  }}
                  onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
                  className=" group size-15   bg-p flex items-center justify-center cursor-pointer
          "
                >
                  {layout === "grid" ? (
                    <FiGrid className="text-[24px] text-s group-hover:text-p" />
                  ) : (
                    <FiList className="text-[24px] text-s group-hover:text-p" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {layout === "grid" ? (
        <div className="relative -top-50 grid grid-cols-2 gap-2.5 px-5 max-lg:grid-cols-1 max-lg:px-5">
          <AnimatePresence mode="wait">
            {filteredWorks.map((item, i) => (
              <WorksGrid key={item.title} work={item} index={i} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="relative -top-50 px-5 max-lg:px-5">
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
                className="pointer-events-none  fixed top-0 left-0 w-100 h-60 z-30 overflow-hidden will-change-transform -translate-x-1/2 -translate-y-1/2"
                {...scale}
              >
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={`${preview.title}-${mediaTick}`}
                    variants={mediaOverlap}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0  will-change-transform"
                  >
                    <ImageComponent
                      image={preview.heroMedia.image}
                      className="size-full object-cover"
                    />
                  </motion.div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-chivo-s-14">ver</p>
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
