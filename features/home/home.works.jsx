"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

import ImageComponent from "@/components/ui/image";
import WorkModal from "@/components/modal/work/work-modal";

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

const Works = ({
  work,
  setHover,
  setActiveWork,
  activeWork,
  index,
  setActiveIndex,
}) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  useEffect(() => {
    const element = container.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(index);
        }
      },
      {
        threshold: 0.6,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [index, setActiveIndex]);

  return (
    <div
      id={`work-${work._id}`}
      ref={container}
      className="
        relative top-0 
        pointer-events-auto 
        w-full h-screen 
        flex items-center justify-between 
        gap-5 group cursor-pointer
      "
      onMouseEnter={() => setHover(work._id)}
      onMouseLeave={() => setHover(null)}
      onClick={() => {
        setHover(null);
        setActiveWork(work);
      }}
    >
      <div
        className="
        absolute inset-0 
        flex items-center justify-center 
        z-30
      "
      >
        <motion.div
          className="h-fit overflow-hidden"
          animate={{
            opacity: activeWork ? 0 : 1,
          }}
        >
          <motion.h2
            {...textSlide}
            custom={0}
            className="
              font-neue font-bold
              text-s text-[82px]
              text-center tracking-[-0.05em]
              leading-none uppercase 
              max-md:text-[52px]
            "
          >
            {work.title}

            <span
              className="
                relative top-2 left-2 align-top text-[28px]
                tracking-[0.3em]
                max-md:top-1
              "
            >
              {work.titleMark}
            </span>
          </motion.h2>
        </motion.div>
      </div>

      <div
        className="
        absolute inset-0 
        w-screen h-screen 
        z-10
      "
      >
        <div
          className="
          relative size-full overflow-hidden
        "
        >
          <motion.figure
            style={{
              y,
              scale,
            }}
            className="
              absolute inset-0 
              h-[130%]
            "
          >
            <ImageComponent
              image={work.heroMedia.image}
              className="
                size-full 
                object-cover 
                brightness-75
              "
            />
          </motion.figure>
        </div>
      </div>
    </div>
  );
};

const HomeWorks = ({ work, lenis }) => {
  const [hover, setHover] = useState(null);
  const [activeWork, setActiveWork] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const workFeatureFilter = work.filter((item) => item.featured);

  function handleAnchor(index, item) {
    setActiveIndex(index);

    const element = document.getElementById(`work-${item._id}`);

    if (!element) return;

    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(element, {
        duration: 2,
      });
    } else {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <>
      <section id="works" className=" relative pointer-events-none">
        <div
          className=" relative top-0  px-10  flex items-center justify-start  mix-blend-exclusion  z-50
        max-md:px-0"
        >
          <div className="relative top-15 size-fit flex items-center gap-4 max-md:px-5 ">
            <span
              className="relative -top-px size-2.5 bg-s 
                rotate-45
              "
            />
            <p
              className="
                font-chivo font-semibold
                text-s text-[14px]
                tracking-widest
                leading-none uppercase
              "
            >
              Projetos selecionados (0
              {workFeatureFilter.length})
            </p>
          </div>
        </div>

        <div
          className=" absolute inset-0 pointer-events-none z-70
  "
        >
          <div
            className="
      sticky top-0 h-screen flex items-center justify-end pr-15 pointer-events-none
      max-md:top-1/3 max-md:justify-center max-md:pr-0
    "
          >
            <div
              className="flex flex-col items-start gap-15 pointer-events-auto
              max-md:flex-row max-md:items-center
      "
            >
              {workFeatureFilter.map((item, index) => (
                <button
                  key={item._id}
                  onClick={() => handleAnchor(index, item)}
                  className="relative  w-2.5 h-2.5 flex items-center justify-center 
                  pointer-events-auto cursor-pointer group
    "
                >
                  <motion.span
                    animate={{
                      opacity: activeIndex === index ? 1 : 0.5,
                      rotate: activeIndex === index ? 135 : 45,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className=" absolute w-2.5 h-2.5 bg-s
  "
                  />

                  {activeIndex !== index && (
                    <motion.span
                      initial={{
                        opacity: 0,
                        rotate: 45,
                      }}
                      animate={{
                        opacity: 0,
                        rotate: 45,
                      }}
                      whileHover={{
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                      className="absolute -top-0.75 -left-0.75 w-4 h-4 border border-s
        "
                    />
                  )}

                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <motion.span
                        key="active"
                        initial={{
                          scale: 0,
                          opacity: 0,
                          rotate: 45,
                        }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          rotate: 45,
                        }}
                        exit={{ rotate: 45, scale: 0, opacity: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                        className=" absolute -top-0.75 -left-0.75 w-4 h-4 border border-s
          "
                      />
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          className=" h-full flex flex-col items-center justify-center select-none
        "
        >
          {workFeatureFilter.map((item, index) => (
            <Works
              key={item._id}
              work={item}
              index={index}
              setHover={setHover}
              setActiveWork={setActiveWork}
              activeWork={activeWork}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeWork && (
          <WorkModal
            work={activeWork}
            isOpen={!!activeWork}
            onClose={() => setActiveWork(null)}
            lenis={lenis}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeWorks;
