import { team } from "@/data/data";
import Image from "next/image";
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{
          clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
        }}
        exit={{ clipPath: "inset(0% 100% 0% 0%)" }}
        transition={{
          duration: 0.8,
          delay: index * 0.05,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="relative w-full h-[60vh] overflow-hidden max-ds:h-[50vh]"
      >
        <Image
          src={member.src}
          alt={member.name}
          fill
          placeholder="blur"
          className="object-cover rounded-sm brightness-75 
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
                className="relative left-1 text-chivo-n-14 text-start text-s/75"
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
                className="font-neue font-bold 
             text-start text-s text-[42px] tracking-[-0.04em] leading-[1.1]
              max-lg:text-[62px] max-md:text-[42px] uppercase"
              >
                {member.name}
              </motion.p>
            </div>
            <div className="mt-12 w-[calc(100%+15px)] h-fit overflow-hidden ">
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
            </div>
          </div>
        </div>
      </motion.figure>
    </motion.div>
  );
};

const StudioTeam = ({ lenis }) => {
  const [activeMember, setActiveMember] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 2;
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
      <section id="about" className="relative px-15 max-md:px-5" ref={ref}>
        <div className="my-15 w-full h-px bg-p/15" />
        <div
          className="mb-10 flex items-center justify-between gap-10 select-none"
          ref={ref}
        >
          <div className=" size-fit flex items-center gap-4">
            <span className="relative -top-px size-2.5 bg-p rotate-45" />
            <p className="text-chivo-p-14 text-end">nosso time</p>
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
              className={`group size-15 rounded-sm 
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
              className={`group size-15 rounded-sm 
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
              x: `-${startIndex * 25}%`,
            }}
            transition={{
              duration: 0.8,
              ease: [0.88, 0, 0.24, 1],
            }}
            className="flex gap-2"
          >
            {team.map((member, i) => (
              <div
                key={member.name}
                className="min-w-[calc(25%-6px)] max-md:min-w-full"
              >
                <Card
                  index={i}
                  member={member}
                  activeMember={activeMember}
                  onClick={() => setActiveMember(member)}
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
