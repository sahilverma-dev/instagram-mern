import * as React from "react";
import { motion } from "framer-motion";

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

const TestCom = () => (
  <motion.li className="item p-3 bg-red-600" variants={item} />
);

export const Test = () => (
  <motion.ul
    className="container bg-gray-100 min-h-screen"
    variants={container}
    initial="hidden"
    animate="visible"
  >
    {[0, 1, 2, 3].map((index) => (
      <TestCom key={index} />
    ))}
  </motion.ul>
);
