"use client";

import React, { useEffect } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
export default function Home() {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  // Aurora bg from https://www.youtube.com/watch?v=oOC5px9ie5I
  const colors = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
  const color = useMotionValue(colors[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  useEffect(() => {
    animate(color, colors, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  return (
    <motion.section
      style={{ backgroundImage }}
      className="flex flex-1 justify-center items-center text-center overflow-hidden bg-gray-950 text-gray-200"
    >
      <motion.div variants={container} initial="hidden" animate="visible">
        <motion.h1 className="text-9xl" variants={item}>
          Hello
        </motion.h1>
        <motion.p variants={item} className="text-2xl py-5">This is a text</motion.p>
      </motion.div>
    </motion.section>
  );
}
