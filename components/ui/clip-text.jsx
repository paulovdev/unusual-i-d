import { motion } from "motion/react";

const wordReveal = {
  initial: {
    y: "100%",
  },
  animate: (custom) => ({
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
      delay: custom,
    },
  }),
};

export const ClipText = ({ text, className, delay = 0, animate, children }) => {
  return (
    <h2 className={className}>
      {text.split(" ").map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            variants={wordReveal}
            initial="initial"
            animate={animate}
            custom={delay + index * 0.025}
            className="inline-block will-change-transform"
          >
            {word} {children}
          </motion.span>
        </span>
      ))}
    </h2>
  );
};
