import React from "react";

import { motion } from "framer-motion";

const Explore = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      Explore
    </motion.div>
  );
};

export default Explore;
