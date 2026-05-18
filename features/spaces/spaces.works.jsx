"use client";

import ImageComponent from "@/components/ui/image";
import TextAnimated from "@/components/ui/text-animated";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";

import { useWorkStore } from "@/store/useWorkStore";
import { useRef } from "react";

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
const Works = ({ work, index }) => {
  const container = useRef();
  const { activeWork, setActiveWork } = useWorkStore();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${-1 * (index + 1)}%`],
  );

  return (
    <motion.div
      className=""
      ref={container}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.035 * index,
      }}
    >
      <motion.div
        animate={{
          clipPath:
            activeWork?.title === work.title
              ? "inset(0% 100% 0% 0%)"
              : "inset(0% 0% 0% 0%)",
        }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="relative w-full h-[75vh] max-md:h-[50vh]"
        onClick={() => {
          setActiveWork(work);
        }}
      >
        <figure className="absolute inset-0 size-full rounded-md overflow-hidden ">
          <motion.div
            className="absolute inset-0 overflow-hiddenh-[130%]"
            style={{ y }}
          >
            <ImageComponent
              image={work.heroMedia.image}
              className="size-full object-cover brightness-75 rounded-md"
            />
          </motion.div>
          <div className="absolute inset-0 size-full p-10 z-10 max-md:p-5">
            <div className="mb-10 flex items-center justify-between">
              <div className="size-fit flex items-center gap-2">
                <span className="size-2 bg-s rounded-[1px]" />
                <p className="max-w-125 font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
                  {work.mark}
                </p>
              </div>
              <div className="flex items-end justify-end">
                <p className="max-w-125 font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
                  {work.category} / {work.year}
                </p>
              </div>
            </div>
            <TextAnimated
              phrases={[work.title + "ㅤ"]}
              variants={textSlide}
              as="h2"
              className="flex flex-col"
              lineClassName="font-neue font-normal text-s text-[72px] tracking-[-0.05em]
               leading-none max-md:text-[42px]"
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
  const categories = ["all", "residential", "commercial", "store"];
  const categoryLabels = {
    all: "Todos",
    residential: "Residencial",
    commercial: "Comercial",
    store: "Loja",
  };

  const filteredWorks = work.filter((item) => {
    const category = item.category?.toLowerCase() || "";
    const year = item.year || "";

    const matchCategory =
      activeCategory === "all" || category === activeCategory;

    const matchYear = activeYear === "all" || year === activeYear;

    const matchStatus = activeStatus === "all" || item.status === activeStatus;

    const matchStyle =
      activeStyles.length === 0 ||
      item.styles.some((s) => activeStyles.includes(s.toLowerCase().trim()));

    return matchCategory && matchYear && matchStatus && matchStyle;
  });

  return (
    <>
      <div
        className="sticky top-0 py-5 px-15 mb-60 w-full bg-[#fefcf5]  
           flex items-center justify-between z-10"
      >
        <div className="flex items-center gap-5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;

            return (
              <motion.button
                key={cat}
                initial={{ scale: 1.05, backgroundColor: "#fff" }}
                whileTap={{ scale: 1.1 }}
                whileHover={
                  !isActive ? { scale: 1.05, backgroundColor: "#000" } : {}
                }
                animate={{
                  backgroundColor: isActive ? "#000" : "#fff",
                }}
                onClick={() => setActiveCategory(cat)}
                className="p-5 px-10 rounded-sm border border-p/10 group"
              >
                <p
                  className={`text-[14px] tracking-[0.05em] font-medium  leading-none uppercase 
                   ${isActive ? "text-s" : "group-hover:text-s"}  transition-colors duration-500`}
                >
                  {categoryLabels[cat]}
                </p>
              </motion.button>
            );
          })}
        </div>
        <div className="flex items-center gap-5">
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
            className={`p-5 backdrop-blur-2xl border border-p/10 rounded-sm group max-md:p-2 bg-p cursor-pointer" `}
            onClick={openSearch}
          >
            <IoIosSearch
              className="text-s text-[24px] group-hover:text-p 
                transition-colors duration-500"
            />
          </motion.button>

          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
            className={`p-5 backdrop-blur-2xl border border-p/10 rounded-sm group max-md:p-2 bg-p cursor-pointer" `}
            onClick={openFilters}
          >
            <IoFilter
              className="text-s text-[24px] group-hover:text-p 
                transition-colors duration-500"
            />
            {activeFiltersCount > 0 && (
              <div className="absolute -top-2.5 -right-2.5 p-2 bg-[#fefcf5] border border-p/10 rounded-sm">
                <p className="text-p text-[14px] tracking-[0.05em] font-medium leading-none uppercase">
                  {activeFiltersCount}
                </p>
              </div>
            )}
          </motion.button>
        </div>
      </div>

      <div className="relative -top-50 px-15 grid grid-cols-2 gap-5 max-md:px-5 max-md:grid-cols-1">
        {filteredWorks.length === 0 && (
          <div className="col-span-2 py-40 text-center">
            <p className="text-p/50 uppercase text-sm">No spaces found</p>
          </div>
        )}
        <AnimatePresence>
          {filteredWorks.map((item, i) => (
            <Works key={item.title} work={item} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SpacesWorks;
