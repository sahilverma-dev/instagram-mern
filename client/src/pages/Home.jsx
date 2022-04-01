import React, { useEffect } from "react";
import PostCard from "../components/PostCard";

import { fakePostData } from "../constants/fakePostData";
import { motion } from "framer-motion";
import { container, pageVariants } from "../constants/varients";
import Story from "../components/Story";

const Home = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      className="lg:p-3 p-1 max-w-6xl mx-auto"
    >
      <Story />
      <motion.div
        layout
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5"
      >
        {fakePostData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;
