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
      className={`${index === 0 ? "col-span-2 max-lg:col-span-2" : "max-lg:col-span-2"}`}
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
          relative h-[calc(100vh-100px)] w-full cursor-pointer 
          max-lg:max-h-150 max-md:max-h-100"
        onClick={() => setActiveWork(work)}
      >
        <figure className="absolute inset-0 size-full overflow-hidden rounded-sm group">
          <ImageComponent
            image={work.heroMedia.image}
            className="size-full rounded-sm object-cover brightness-75 group-hover:scale-110
           transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          />

          <div
            className="absolute inset-0 z-10 size-full 
          p-10 max-lg:p-5"
          >
            <div className="mb-10 h-[16px] overflow-hidden">
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

                <p className="text-chivo-s-14">
                  {work.category} / {work.year}
                </p>
              </motion.div>
            </div>

            {[work.title].map((phrases, i) => (
              <div key={i}>
                <ClipText
                  text={phrases}
                  animate={"animate"}
                  delay={0.15 * i}
                  tag="h2"
                  className="big-text-1-n text-s"
                />
              </div>
            ))}
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
          <div className="h-fit overflow-hidden">
            <motion.h3
              variants={textSlide}
              initial="initial"
              animate="animate"
              custom={0.15}
              className="big-text-2-n text-p"
            >
              {work.title}
            </motion.h3>
          </div>
        </motion.div>

        <motion.div
          animate={{
            scale: hovered === index ? 1.02 : 1,
            opacity: hovered === index || hovered === null ? 1 : 0.4,
          }}
        >
          <div className="h-fit overflow-hidden">
            <motion.h3
              variants={textSlide}
              initial="initial"
              animate="animate"
              custom={0.15}
              className="big-text-2-n text-p"
            >
              {work.year}
            </motion.h3>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SpacesWorks = ({ work, activeFiltersCount }) => {
  const {
    activeCategory,
    setActiveCategory,
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

  const categories = [
    "all",
    "marca",
    "web design",
    "direção criativa",
    "motion",
    "3D",
  ];

  const filteredWorks = work.filter((item) => {
    const matchCategory =
      activeCategory === "all" || item.category === activeCategory;

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
    sticky top-0 z-10 mb-50 flex w-full
    items-center justify-between
    bg-bg-s px-15 py-5 max-lg:px-5 
  "
      >
        {/* MOBILE CATEGORY BUTTON */}

        <motion.button
          whileTap={{ scale: 1.1 }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(255,255,255,0.8)",
          }}
          onClick={() => setOpenCat(!openCat)}
          className="
      shrink-0
      group size-15 rounded-sm
      border border-p/10 bg-p backdrop-blur-2xl
      flex items-center justify-center
      cursor-pointer
      lg:hidden
    "
        >
          <MdOutlineCategory
            className="
        text-[24px] text-s
        transition-colors duration-500
        group-hover:text-p
      "
          />
        </motion.button>

        <AnimatePresence mode="wait">
          {openCat && (
            <motion.div
              initial={{
                opacity: 0,
                width: 0,
              }}
              animate={{
                opacity: 1,
                width: "auto",
                transition: {
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
              exit={{
                opacity: 0,
                width: 0,
                transition: {
                  delay: 0.15,
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
              className="
          flex-1
          ml-5
          overflow-hidden
          lg:hidden
        "
            >
              <motion.div
                initial={{
                  x: -30,
                }}
                animate={{
                  x: 0,
                  transition: {
                    delay: 0.15,
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
                exit={{
                  x: -30,
                  transition: {
                    delay: 0.15,
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
                className="
            flex
            items-center
            gap-3
            overflow-x-auto
            no-scrollbar
          "
              >
                {categories.map((cat, i) => {
                  const isActive = activeCategory === cat;

                  return (
                    <motion.button
                      key={cat}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                        transition: {
                          delay: 0.15 * i,
                          duration: 0.8,
                          ease: [0.76, 0, 0.24, 1],
                        },
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          delay: 0.15 * i,
                          duration: 0.8,
                          ease: [0.76, 0, 0.24, 1],
                        },
                      }}
                      whileTap={{
                        scale: 1.05,
                      }}
                      onClick={() => setActiveCategory(cat)}
                      className={`
                  shrink-0
                  h-15
                  px-8
                  rounded-sm
                  border border-p/10
                  cursor-pointer

                  ${isActive ? "bg-p text-s" : "bg-bg-s-2 text-p"}
                `}
                    >
                      <p
                        className="
                    text-[14px]
                    font-medium
                    uppercase
                    tracking-[0.05em]
                    whitespace-nowrap
                  "
                      >
                        {cat === "all" ? "todos" : cat}
                      </p>
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="
      flex items-center gap-5
      max-lg:hidden
    "
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;

            return (
              <motion.button
                key={cat}
                whileTap={{
                  scale: 1.1,
                }}
                whileHover={
                  !isActive
                    ? {
                        scale: 1.05,
                        backgroundColor: "#000",
                      }
                    : {}
                }
                animate={{
                  backgroundColor: isActive ? "#000" : "#f5f5f5",
                }}
                onClick={() => setActiveCategory(cat)}
                className="
            group
            px-10
            h-15
            rounded-sm
            cursor-pointer
          "
              >
                <p
                  className={`
              text-[14px]
              font-medium
              uppercase
              tracking-[0.05em]

              ${isActive ? "text-s" : "text-p group-hover:text-s"}
            `}
                >
                  {cat === "all" ? "todos" : cat}
                </p>
              </motion.button>
            );
          })}
        </div>

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
              className="
          flex
          items-center
          gap-2.5
        "
            >
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
                className="
            group size-15 rounded-sm
             bg-p
            flex items-center justify-center
            cursor-pointer
          "
              >
                {layout === "grid" ? (
                  <FiGrid className="text-[24px] text-s group-hover:text-p" />
                ) : (
                  <FiList className="text-[24px] text-s group-hover:text-p" />
                )}
              </motion.button>

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
                className="
            group size-15 rounded-sm
              bg-p
            flex items-center justify-center
            cursor-pointer
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
            group size-15 rounded-sm
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
                absolute
                -right-2.5
                -top-2.5
                rounded-sm
               
                bg-bg-s-2
                p-2
              "
                  >
                    <p
                      className="
                  text-[14px]
                  font-medium
                  text-p
                "
                    >
                      {activeFiltersCount}
                    </p>
                  </div>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {layout === "grid" ? (
        <div className="relative -top-50 grid grid-cols-2 gap-5 px-15 max-lg:grid-cols-1 max-lg:px-5">
          <AnimatePresence mode="wait">
            {filteredWorks.map((item, i) => (
              <WorksGrid key={item.title} work={item} index={i} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="relative -top-50 px-15 max-lg:px-5">
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
