import TextAnimated from "@/components/ui/text-animated";
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

const awards = [
  {
    title: "Dezeen Awards — Interior Project Shortlist",
    year: "2026",
  },
  {
    title: "ArchDaily — Featured Project",
    year: "2026",
  },
  {
    title: "Awwwards — Site of the Day",
    year: "2025",
  },
  {
    title: "CSS Design Awards — Special Kudos",
    year: "2025",
  },
  {
    title: "Behance — Curated Gallery (Interior Design)",
    year: "2024",
  },
];

const StudioAwards = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <section
      id="about"
      className="relative mb-30 px-15 flex items-start justify-between max-md:px-5"
      ref={ref}
    >
      <div className="flex-1 size-fit flex items-center gap-2">
        <span className="size-2 bg-p rounded-[1px]" />
        <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
          Awards & features
        </p>
      </div>

      <div className="flex-1 mt-25">
        <div className="flex items-center justify-between">
          <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
            category
          </p>

          <p className="font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
            year
          </p>
        </div>
        <div className="mt-5 mb-10 w-full h-px bg-p/25"></div>
        <div className="flex flex-col gap-4">
          {awards.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <TextAnimated
                phrases={[item.title]}
                variants={textSlide}
                animate={inView}
                as="p"
                className="flex flex-col"
                lineClassName="font-i-sans text-start text-p text-[28px] tracking-[-0.05em] leading-none
       n"
                wordClassName="mr-2"
                wordDelay={0.035}
                lineDelay={0.04}
              />

              <TextAnimated
                phrases={[item.year]}
                variants={textSlide}
                animate={inView}
                as="p"
                className="flex flex-col"
                lineClassName="font-i-sans text-end text-p text-[28px] tracking-[-0.05em] leading-none
       n"
                wordClassName="mr-2"
                wordDelay={0.035}
                lineDelay={0.04}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioAwards;
