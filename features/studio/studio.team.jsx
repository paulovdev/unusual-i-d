import { team } from "@/data/data";
import Image from "next/image";
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "motion/react";
import { TeamModal } from "@/components/modal/team/team-modal";

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
          delay: index * 0.05,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="relative w-full h-[60vh] max-ds:h-[35vh] overflow-hidden"
      >
        <Image
          src={member.src}
          alt={member.name}
          fill
          placeholder="blur"
          className="object-cover rounded-sm brightness-75"
        />
        <div className="absolute bottom-0 left-0 p-5 w-full flex items-center justify-between z-10">
          <div className="w-full flex flex-col items-start">
            <p className="mb-4 font-azeret font-medium text-s/75 text-[12px] tracking-[0.05em] leading-none uppercase">
              {member.role}
            </p>
            <div className="w-full flex items-center justify-between">
              <p
                className="font-neue font-normal 
            text-s text-[32px] tracking-[-0.05em] leading-none
            max-md:text-[34px]"
              >
                {member.name}
              </p>
              <div className="flex items-center gap-2">
                <FaLinkedin className=" text-s text-[18px]" />
                <FaXTwitter className=" text-s text-[18px]" />
              </div>
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

  const itemsPerPage = 4;
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
    threshold: 0.5,
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
          <div className=" size-fit flex items-center gap-2">
            <span className="size-2  bg-p rounded-[1px]" />
            <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
              nosso timetes
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
              className={`p-3 backdrop-blur-2xl rounded-sm group max-md:p-2
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
              className={`p-3 backdrop-blur-2xl rounded-sm group max-md:p-2
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
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
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
