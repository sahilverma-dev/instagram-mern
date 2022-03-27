import React, { useEffect } from "react";

import { motion } from "framer-motion";

import { fakePostData } from "../constants/fakePostData";
import ProfilePostCard from "../components/ProfilePostCard";
import { container, pageVariants } from "../constants/varients";

const Explore = () => {
  return (
    <motion.div
      variants={pageVariants}
      className="lg:p-3 p-1 max-w-6xl  mx-auto"
    >
      <motion.div
        layout
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-4 grid-cols-3 gap-1 lg:gap-5"
      >
        {fakePostData.map((post, index) => (
          <ProfilePostCard
            key={post.id}
            post={post}
            span={[1, 16, 27].includes(index + 1)}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Explore;
