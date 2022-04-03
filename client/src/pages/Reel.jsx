import React from "react";
import { motion } from "framer-motion";
import { pageVariants } from "../constants/varients";
const Reel = () => {
  return (
    <motion.div
      layout
      variants={pageVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      className="max-w-5xl min-h-screen mx-auto"
    >
      Reel
    </motion.div>
  );
};

export default Reel;
