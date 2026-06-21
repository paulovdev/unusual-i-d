"use client";

import { motion } from "motion/react";

const TextLink = ({ children, className = "", bgColor = "bg-white" }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className={`relative w-fit overflow-hidden cursor-pointer group ${className}`}
    >
      <div className="relative p-1 z-20">{children}</div>

      <motion.span
        className={`absolute inset-0 rounded-xs z-10 ${bgColor}`}
        variants={{
          initial: {
            clipPath: "inset(0 100% 0 0)",
          },
          hover: {
            clipPath: "inset(0 0% 0 0)",
          },
        }}
        transition={{
          duration: 0.6,
          delay: 0.01,
          ease: [0.33, 1, 0.68, 1],
        }}
      />
    </motion.div>
  );
};

export default TextLink;
