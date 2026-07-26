"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

import ImageComponent from "@/components/ui/image";
import WorkModal from "@/components/modal/work/work-modal";
import { useInView } from "react-intersection-observer";

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
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
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
        ref={ref}
        className="
        absolute inset-5
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
            initial={{ y: "100%" }}
            animate={{
              y: inView ? 0 : "100%",
              transition: {
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1],
              },
            }}
            custom={0}
            className="max-w-250
              font-neue font-bold
              text-s text-[52px]
               tracking-[-0.05em]
              leading-none uppercase 
              max-lg:text-[52px]
            "
          >
            {work.title}

            <span
              className="
                relative font-inter font-black top-0.5 left-1 align-top text-[28px]
                tracking-[0.3em]
                max-lg:top-1
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
            initial={{
              filter: "brightness(0.5)",
              filter: "blur(10px)",
            }}
            animate={{
              filter: inView ? "brightness(1)" : "brightness(0.5)",
              filter: inView ? "blur(0px)" : "blur(10px)",
            }}
            transition={{
              duration: 0.8,
              ease: [0.33, 1, 0.68, 1],
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
      <section id="works" className="relative pointer-events-none">
        <div
          className="relative top-0 px-5 flex items-center justify-center 
          z-50 max-md:px-0"
        >
          <div className="relative top-15 size-fit flex items-center gap-4 max-md:px-5">
            <span className="triangle-s" />
            <p className="text-chivo-s-14">Projetos selecionados</p>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none z-70">
          <div
            className="
      sticky top-0 h-screen flex items-center justify-end pr-5 pointer-events-none
    max-md:top-[calc(100vh-140px)] max-md:items-start max-md:justify-center max-md:pr-0
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
                  className="relative w-2.5 h-2.5 flex items-center justify-center 
                  pointer-events-auto cursor-pointer group
                  max-md:w-4 max-md:h-4
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
                    className="absolute w-2.5 h-2.5 bg-bg-s-2
                    max-md:w-4 max-md:h-4
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
                      className="absolute -top-0.75 -left-0.75 
                      w-4 h-4 border border-[#FFFFFF]
                       max-md:w-6 max-md:h-6 max-md:-left-1 max-md:-top-1
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
                        className=" absolute -top-0.75 -left-0.75 
                        w-4 h-4 border border-[#FFFFFF]
                        max-md:w-6 max-md:h-6 max-md:-left-1 max-md:-top-1
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
          className="h-full flex flex-col items-center justify-center select-none
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
