import { ClipText } from "@/components/ui/clip-text";
import { motion } from "motion/react";

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

const PricingIntro = () => {
  return (
    <section
      id="price"
      className="
    relative h-[65vh]
    px-15 pt-40
    flex flex-col items-center justify-center
    max-lg:px-5 max-lg:pt-30 max-lg:items-start max-lg:h-75 z-10
  "
    >
      <div className="relative flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="mb-15 relative flex flex-col items-center ">
            <div className="overflow-hidden max-lg:h-fit">
              <motion.h2
                {...textSlide}
                custom={0.25}
                className="big-text-intro-p text-s"
              >
                Como definimos o escopo
              </motion.h2>
            </div>
            <div className="overflow-hidden max-lg:h-fit">
              <motion.h2
                {...textSlide}
                custom={0.5}
                className="big-text-intro-p text-s"
              >
                de um projeto
              </motion.h2>
            </div>
          </div>
          <div className="max-w-150">
            {[
              "Três formatos de interação, todos com código personalizado e baseados em movimento.",
            ].map((phrases, i, arr) => (
              <div
                key={i}
                style={{
                  marginBottom: arr.length - 1 === i ? "80px" : undefined,
                }}
              >
                <ClipText
                  text={phrases}
                  animate={"animate"}
                  delay={0.5 + 0.15 * i}
                  tag="h2"
                  className="
                 text-chivo-s-14 text-center
                "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingIntro;
