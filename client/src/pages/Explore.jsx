import React, { useEffect } from "react";

import { motion } from "framer-motion";

import { fakePostData } from "../constants/fakePostData";
import ProfilePostCard from "../components/ProfilePostCard";
import { container, pageVariants } from "../constants/varients";

const Explore = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      className="lg:p-3 p-1 max-w-6xl  mx-auto"
    >
      <div className="my-2">
        <input
          type="text"
          className="w-full border p-1 md:p-3 text-xs md:text-sm md:rounded-none bg-transparent dark:border-gray-500 outline-slate-900 rounded"
          placeholder="Search"
        />
      </div>
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
