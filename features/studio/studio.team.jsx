import { team } from "@/data/data";
import Image from "next/image";
import { useState } from "react";

import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "motion/react";
import { TeamModal } from "@/components/modal/team/team-modal";
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

const TeamCard = ({ item, activeMember, onClick, index, inView }) => {
  return (
    <motion.div
      animate={{
        clipPath:
          activeMember?.name === item.name
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 0% 0%)",
      }}
      transition={{
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <motion.figure
        initial={{
          clipPath: "inset(0% 100% 0% 0%)",
        }}
        animate={{
          clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
        }}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="relative w-full h-[65vh] overflow-hidden"
      >
        <Image
          src={item.src}
          alt={item.name}
          fill
          placeholder="blur"
          className="
          absolute size-full object-cover brightness-75
          group-hover:scale-110
          transition-all duration-500
          ease-[cubic-bezier(0.76,0,0.24,1)]
          "
        />
      </motion.figure>
      <div className="mt-5 mb-5 max-w-100 overflow-hidden">
        <motion.p
          initial="initial"
          animate={inView && "animate"}
          variants={textSlide}
          custom={0.3 + index * 0.1}
          className="font-neue font-bold text-[38px] tracking-[-0.05em] leading-none uppercase"
        >
          {item.name}
        </motion.p>
      </div>
      <p className=" text-chivo-n-14 text-p/50">{item.role}</p>
    </motion.div>
  );
};

const Card = ({ member, activeMember, onClick, index, inView }) => {
  return (
    <motion.div
      className="relative w-full cursor-pointer group"
      animate={{
        clipPath:
          activeMember?.name === member.name
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 0% 0%)",
      }}
      transition={{
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      }}
      onClick={onClick}
    >
      <motion.figure
        initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
        animate={{
          clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
        }}
        exit={{ clipPath: "inset(0% 100% 0% 0%)" }}
        transition={{
          duration: 0.8,
          delay: index * 0.035,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="relative w-full h-[60vh] overflow-hidden max-ds:h-[50vh]"
      >
        <Image
          src={member.src}
          alt={member.name}
          fill
          placeholder="blur"
          className="object-cover brightness-75 
          group-hover:scale-110
           transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        />
        <div className="absolute bottom-0 left-0 p-5 w-full flex items-center justify-between z-10">
          <div className="w-full flex flex-col items-start">
            <div className="mb-4 w-[calc(100%+15px)] h-fit overflow-hidden">
              <motion.p
                initial="initial"
                animate={inView && "animate"}
                variants={textSlide}
                custom={0.75}
                className="relative left-1 text-chivo-n-14 text-[12px] text-start text-s/75"
              >
                {member.role}
              </motion.p>
            </div>
            <div className="mb-4 w-[calc(100%+15px)] h-fit overflow-hidden">
              <motion.p
                initial="initial"
                animate={inView && "animate"}
                variants={textSlide}
                custom={0.5}
                className="big-text-3-n text-[42px] text-start text-s"
              >
                {member.name}
              </motion.p>
            </div>
            {/*  <div className="mt-12 w-[calc(100%+15px)] h-fit overflow-hidden ">
              <motion.div
                initial="initial"
                animate={inView && "animate"}
                variants={textSlide}
                custom={0.25}
                className="flex items-center gap-2"
              >
                <p
                  className="text-chivo-s-14 text-start
          "
                >
                  ver mais
                </p>
                <span
                  className="text-s group-hover:rotate-45 
              transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                >
                  +
                </span>
              </motion.div>
            </div> */}
          </div>
        </div>
      </motion.figure>
    </motion.div>
  );
};

const StudioTeam = ({ lenis }) => {
  const [activeMember, setActiveMember] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 3;

  const canGoPrev = startIndex > 0;

  const canGoNext = startIndex < team.length - itemsPerPage;

  const handleNext = () => {
    if (!canGoNext) return;
    setStartIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!canGoPrev) return;
    setStartIndex((prev) => prev - 1);
  };

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <>
      <section id="about" className="relative mt-15 px-5" ref={ref}>
        <div
          className="mb-10 flex items-center justify-between gap-10 select-none"
          ref={ref}
        >
          <div className="size-fit flex items-center gap-4">
            <span className="triangle-p" />
            <p className="text-chivo-p-14 text-end">
              Pessoas por trás da prática
            </p>
          </div>
          <div className="flex items-center gap-5">
            <motion.button
              whileTap={canGoPrev ? { scale: 0.95 } : {}}
              whileHover={
                canGoPrev
                  ? {
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,0.8)",
                    }
                  : {}
              }
              disabled={!canGoPrev}
              className={`group size-15 
            border border-p/10 backdrop-blur-2xl 
            flex items-center justify-center
            cursor-pointer
    ${canGoPrev ? "bg-p cursor-pointer" : "bg-p/50 cursor-not-allowed opacity-50"}
  `}
              onClick={handlePrev}
            >
              <GoArrowLeft
                className={`${canGoPrev ? "text-s group-hover:text-p" : "text-s opacity-50"} 
                text-[24px] transition-colors duration-500`}
              />
            </motion.button>

            <motion.button
              whileTap={canGoNext ? { scale: 0.95 } : {}}
              whileHover={
                canGoNext
                  ? {
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,0.8)",
                    }
                  : {}
              }
              disabled={!canGoNext}
              className={`group size-15 
            border border-p/10 backdrop-blur-2xl 
            flex items-center justify-center
            cursor-pointer
    ${canGoNext ? "bg-p cursor-pointer" : "bg-p/50 cursor-not-allowed opacity-50"}
  `}
              onClick={handleNext}
            >
              <GoArrowRight
                className={`${canGoNext ? "text-s group-hover:text-p" : "text-s opacity-50"} 
                text-[24px] transition-colors duration-500`}
              />
            </motion.button>
          </div>
        </div>

        {/*  */}

        <div className="overflow-hidden w-full">
          <motion.div
            animate={{
              x: `-${startIndex * 33.333}%`,
            }}
            transition={{
              duration: 0.8,
              ease: [0.88, 0, 0.24, 1],
            }}
            className="
            flex gap-2.5
            "
          >
            {team.map((item, i) => (
              <div
                key={item.name}
                className="min-w-[calc(33.333%-7px)]
max-lg:min-w-[calc(50%-10px)]
max-md:min-w-full"
              >
                <TeamCard
                  index={i}
                  item={item}
                  activeMember={activeMember}
                  onClick={() => setActiveMember(item)}
                  inView={inView}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <AnimatePresence mode="wait">
        {activeMember && (
          <TeamModal
            member={activeMember}
            lenis={lenis}
            onClose={() => setActiveMember(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default StudioTeam;
