"use client";

import { motion } from "motion/react";

const OPEN_GAP = 25;
const CLOSED_GAP = 25;

const OPEN_HEIGHT = 350;
const CLOSED_HEIGHT = 350;

const WIDTH = 350;
const BORDER_WIDTH = 1;
const RINGS_COUNT = 25;
const SIZE = 350;

const Ring = ({ i, inView }) => {
  const openBaseY = i * OPEN_GAP;
  const closedBaseY = i * CLOSED_GAP;
  const lift = -(RINGS_COUNT - i) * 2;

  return (
    <motion.figure
      className="absolute left-[calc(100%-20px)] will-change-transform"
      style={{ top: 0 }}
      initial={{
        opacity: 0,
        y: closedBaseY + CLOSED_GAP / 2,
        scaleX: 0.6,
        scaleY: 0.9,
      }}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView && [closedBaseY, openBaseY + lift - 6, openBaseY + lift],

        scaleX: inView && [1, 1.1, 1],
        scaleY: inView && [1, 1, 1],
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
        className="border-s rounded-full"
        animate={{
          width: WIDTH,
          height: inView ? OPEN_HEIGHT : CLOSED_HEIGHT,
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

const String = ({ inView = false, className = "" }) => {
  return (
    <div
      className={`relative flex items-start justify-center mix-blend-exclusion overflow-visible ${className}`}
      style={{
        width: SIZE,
        height: SIZE,
      }}
    >
      {Array.from({ length: RINGS_COUNT }).map((_, i) => (
        <Ring key={i} i={i} inView={inView} />
      ))}
    </div>
  );
};

export default String;
