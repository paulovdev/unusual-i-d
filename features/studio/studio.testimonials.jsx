import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useInView } from "react-intersection-observer";
import imgTest from "@/public/assets/images/home/bg.jpg";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import TextAnimated from "@/components/ui/text-animated";
import { useState } from "react";

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
const testimonials = [
  {
    spaceImg: imgTest,
    clientImg: imgTest,
    text: [
      `“The space feels exactly how we imagined — calm, precise and effortless.`,
      `Every detail was carefully considered, without ever feeling overdesigned.”`,
    ],
    client: "— Private Client",
    space: "pumpolex",
  },
  {
    spaceImg: imgTest,
    clientImg: imgTest,
    text: [
      `“Working with the team was seamless from start to finish.`,
      `They translated abstract ideas into something tangible and refined.”`,
    ],
    client: "— Art Director",
    space: "noir studio",
  },
  {
    spaceImg: imgTest,
    clientImg: imgTest,
    text: [
      `“There’s a quiet confidence in how everything comes together.`,
      `Nothing screams for attention, yet everything feels intentional.”`,
    ],
    client: "— Architect",
    space: "atelier 21",
  },
];

const Card = ({ testimonial, index }) => {
  return (
    <motion.div className="relative w-full h-[75vh] border border-p/25 flex items-center rounded-md overflow-hidden">
      {/* IMAGE */}
      <motion.figure
        initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        exit={{ clipPath: "inset(0% 0% 0% 100%)" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="relative top-0 left-0 w-[50vw] h-full overflow-hidden"
      >
        <Image
          src={testimonial.spaceImg}
          fill
          alt={testimonial.client}
          className="object-cover brightness-75"
        />

        {/* overlay igual você tinha */}
        <div className="absolute inset-0 flex flex-col justify-between p-10">
          <p className="font-azeret text-s text-[14px] uppercase">
            0{index + 1}/0{testimonials.length}
          </p>
          <p className="self-end font-azeret text-s text-[14px] uppercase">
            from {testimonial.space} space
          </p>
        </div>
      </motion.figure>

      <motion.div
        className="relative w-[50vw] p-10 h-full flex flex-col justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.4,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        <Image
          src={testimonial.clientImg}
          width={150}
          height={150}
          alt={testimonial.client}
          className="size-25 object-cover rounded-full brightness-75"
        />

        <TextAnimated
          phrases={testimonial.text}
          variants={textSlide}
          as="h2"
          className="flex flex-col"
          lineClassName="mb-10 font-i-sans font-normal 
            text-p text-[48px] tracking-[-0.07em] leading-none
            max-md:text-[38px]"
          wordClassName="mr-2"
          wordDelay={0.035}
          lineDelay={0.035}
        />

        <p className="self-end font-azeret text-p text-[14px] uppercase">
          {testimonial.client}
        </p>
      </motion.div>
    </motion.div>
  );
};

const StudioTestimonials = () => {
  const [index, setIndex] = useState(0);

  const canGoPrev = index > 0;
  const canGoNext = index < testimonials.length - 1;

  const handleNext = () => {
    if (!canGoNext) return;
    setIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!canGoPrev) return;
    setIndex((prev) => prev - 1);
  };

  /*  */

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <section id="about" className="relative mb-30 px-15 max-md:px-5" ref={ref}>
      <div className="my-15 w-full h-px bg-p/15" />
      <div
        className="mb-10 flex items-center justify-between gap-10 select-none"
        ref={ref}
      >
        <div className=" size-fit flex items-center gap-2">
          <span className="size-2 bg-p rounded-[1px]" />
          <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
            TESTIMONIALS
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

      <div className="">
        <AnimatePresence mode="wait">
          <Card key={index} index={index} testimonial={testimonials[index]} />
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StudioTestimonials;
