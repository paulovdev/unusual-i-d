"use client";

import { motion } from "framer-motion";

const OPEN_GAP = 2;
const CLOSED_GAP = 4;

const OPEN_HEIGHT = 22;
const CLOSED_HEIGHT = 20;

const WIDTH = 25;
const BORDER_WIDTH = 1;
const RINGS_COUNT = 5;
const SIZE = 35;

const Ring = ({ i, menuOpen }) => {
  const openBaseY = i * OPEN_GAP;
  const closedBaseY = i * CLOSED_GAP;
  const lift = -(RINGS_COUNT - i) * 2;

  return (
    <motion.figure
      className="absolute left-[calc(100%-20px)]"
      style={{ top: 0 }}
      initial={{
        opacity: 0,
        y: closedBaseY + CLOSED_GAP / 2,
      }}
      animate={{
        opacity: 1,
        y: menuOpen
          ? [closedBaseY, openBaseY + lift - 3, openBaseY + lift]
          : [openBaseY + lift, closedBaseY + 3, closedBaseY],
        scaleX: menuOpen ? [1, 1.04, 1] : [1, 1.08, 1],
        scaleY: menuOpen ? [1, 0.98, 1] : [1, 0.96, 1],
      }}
      transition={{
        opacity: {
          duration: 0.8,
          delay: i * 0.08,
          ease: [0.76, 0, 0.24, 1],
        },
        y: {
          duration: 0.8,
          delay: i * 0.04,
          ease: [0.76, 0, 0.24, 1],
        },
        scaleX: {
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.12,
        },
        scaleY: {
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.12,
        },
      }}
    >
      <motion.div
        className="border-s rounded-xs"
        animate={{
          width: WIDTH,
          height: menuOpen ? OPEN_HEIGHT : CLOSED_HEIGHT,
        }}
        transition={{
          height: {
            duration: 0.8,
            delay: i * 0.04,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
        style={{
          borderWidth: BORDER_WIDTH,
        }}
      />
    </motion.figure>
  );
};

const String = ({ menuOpen = false, className = "" }) => {
  return (
    <div
      className={`relative flex items-start justify-center mix-blend-exclusion overflow-visible ${className}`}
      style={{
        width: SIZE,
        height: SIZE,
      }}
    >
      {Array.from({ length: RINGS_COUNT }).map((_, i) => (
        <Ring key={i} i={i} menuOpen={menuOpen} />
      ))}
    </div>
  );
};

export default String;
