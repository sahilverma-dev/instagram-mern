import React from "react";
import { motion } from "framer-motion";
import { container, pageVariants } from "../constants/varients";
import ReelCard from "../components/ReelCard";
import { fakeReelData } from "../constants/fakeReelsDara";
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
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        layout
        className="grid-cols-4 lg:grid-cols-4 md:grid-cols-3 !hidden sm:!grid gap-4 "
      >
        {fakeReelData.map((reel, index) => (
          <ReelCard key={reel?.index} reel={reel} />
        ))}
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="sm:!hidden !flex flex-col gap-0 snap-mandatory snap-y"
      >
        {fakeReelData.map((reel, index) => (
          <ReelCard key={reel?.index} reel={reel} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Reel;
