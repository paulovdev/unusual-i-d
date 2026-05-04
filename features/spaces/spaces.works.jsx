"use client";

import ImageComponent from "@/components/ui/image";
import TextAnimated from "@/components/ui/text-animated";
import { AnimatePresence, motion } from "motion/react";
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";

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
const Works = ({ work, index }) => {
  const { activeWork, setActiveWork } = useWorkStore();
  return (
    <motion.div
      className=""
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
        <figure className="absolute inset-0 size-full rounded-md overflow-hidden">
          <ImageComponent
            image={work.heroMedia.image}
            className="size-full object-cover brightness-75 rounded-md"
          />
          <div className="absolute inset-0 size-full p-10 z-10 max-md:p-5">
            <div className="mb-10 size-fit flex items-center gap-2">
              <span className="size-2 bg-s rounded-[1px]" />
              <p className="max-w-125 font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
                {work.category} / {work.year}
              </p>
            </div>
            <TextAnimated
              phrases={[work.title]}
              variants={textSlide}
              as="h2"
              className="flex flex-col"
              lineClassName="font-i-sans font-normal 
              text-start text-s text-[62px] tracking-[-0.07em] leading-[1.1]
              max-md:text-[42px]"
              wordClassName="mr-2"
              wordDelay={0.035}
              lineDelay={0.04}
            />
            <div className="absolute inset-0 p-10 flex items-end justify-end max-md:p-5">
              <button className="p-4 px-10 bg-s backdrop-blur-2xl rounded-sm max-md:p-2">
                <p className="max-w-125 font-azeret font-medium text-p text-[12px] tracking-[0.05em] leading-none uppercase">
                  READ MORE +
                </p>
              </button>
            </div>
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
        className="sticky top-0 py-5 px-15 mb-60 w-full bg-[#F5F4F0]  
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
                className="p-5 px-10 rounded-sm group"
              >
                <p
                  className={`text-[14px] tracking-[0.05em] font-medium leading-none uppercase 
                   ${isActive ? "text-s" : "group-hover:text-s"}  transition-colors duration-500`}
                >
                  {cat}
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
            className={`p-5 backdrop-blur-2xl rounded-sm group max-md:p-2 bg-p cursor-pointer" `}
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
            className={`p-5 backdrop-blur-2xl rounded-sm group max-md:p-2 bg-p cursor-pointer" `}
            onClick={openFilters}
          >
            <IoFilter
              className="text-s text-[24px] group-hover:text-p 
                transition-colors duration-500"
            />
            {activeFiltersCount > 0 && (
              <div className="absolute -top-2.5 -right-2.5 p-2 bg-s rounded-sm">
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
        <AnimatePresence mode="wait">
          {filteredWorks.map((item, i) => (
            <Works key={item.title} work={item} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SpacesWorks;
