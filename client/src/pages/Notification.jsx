import React from "react";
import { motion } from "framer-motion";

import { pageVariants } from "../constants/varients";
import { fakePostData } from "../constants/fakePostData";
import ProfilePostCard from "../components/ProfilePostCard";

const Notification = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      className="lg:p-3 p-1 max-w-6xl flex items-center text-center w-full min-h-screen  mx-auto"
    >
      abhi kaam krna hai is page pr
    </motion.div>
  );
};

export default Notification;
