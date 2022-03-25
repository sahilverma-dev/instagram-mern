import React, { useEffect } from "react";

import { motion } from "framer-motion";

import { fakePostData } from "../constants/fakePostData";
import ProfilePostCard from "../components/ProfilePostCard";
import { pageVariants } from "../constants/varients";

const Explore = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="lg:p-3 p-1 max-w-6xl  mx-auto"
    >
      <div className="grid lg:grid-cols-4 grid-cols-3 gap-1 lg:gap-5">
        {fakePostData.map((post, index) => (
          <ProfilePostCard
            key={post.id}
            post={post}
            span={[1, 16, 27].includes(index + 1)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Explore;
