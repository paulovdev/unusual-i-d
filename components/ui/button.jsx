"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { RiArrowRightLongLine } from "react-icons/ri";

const Button = ({
  text = "Button",
  bg = "bg-s",
  textColor = "text-p",
  iconColor = "text-p",

  hoverBg = "bg-p",
  hoverTextColor = "text-s",
  hoverIconColor = "text-s",
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 1.1 }}
      className={`w-fit h-15 px-8 rounded-sm border border-p/10
        flex items-center justify-center select-none cursor-pointer
        transition-colors duration-500 delay-25 ease-[cubic-bezier(0.76,0,0.24,1)]  
        will-change-transform ${hovered ? hoverBg : bg}`}
    >
      <motion.div
        layout
        className={`flex items-center gap-5 ${
          hovered ? "flex-row-reverse" : "flex-row"
        }`}
        transition={{
          layout: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
      >
        <motion.span
          layout
          animate={{
            x: hovered ? 14 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="flex"
        >
          <RiArrowRightLongLine
            className={`relative right-2 text-[22px] 
              transition-colors duration-500 delay-25 ease-[cubic-bezier(0.76,0,0.24,1)]  ${
                hovered ? hoverIconColor : iconColor
              }`}
          />
        </motion.span>

        <motion.p
          layout
          animate={{
            x: hovered ? 4 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className={`font-azeret font-semibold text-[14px] tracking-[0.05em] leading-none uppercase transition-colors duration-500 ${
            hovered ? hoverTextColor : textColor
          }`}
        >
          {text}
        </motion.p>
      </motion.div>
    </motion.button>
  );
};

export default Button;
