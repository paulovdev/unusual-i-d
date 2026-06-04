import TextAnimated from "@/components/ui/text-animated";
import { CiFolderOn } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { PiGps } from "react-icons/pi";
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

const ProjectsIntro = ({ work }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <section id="about" className="relative h-[65vh]" ref={ref}>
      <div
        className="pb-20 h-screen flex flex-col items-start justify-center 
        max-lg:p-10 max-lg:py-30 max-md:py-30 max-md:p-5"
      >
        <div className="w-full mb-10 px-15 max-md:px-5">
          <div className="mb-8 size-fit flex items-center gap-2">
            <span className="size-2  bg-p rounded-[1px]" />
            <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
              2023 - 2026
            </p>
          </div>
          <div className="w-full">
            <TextAnimated
              phrases={[`Todos os nossos projetos lançados`]}
              variants={textSlide}
              as="h2"
              className="max-w-400 flex flex-col"
              lineClassName="font-neue font-normal 
              text-start text-p text-[96px] tracking-[-0.07em] leading-[1.1]
              max-lg:text-[62px] max-md:text-[42px]"
              wordClassName="mr-2"
              wordDelay={0.015}
              lineDelay={0.1}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsIntro;
