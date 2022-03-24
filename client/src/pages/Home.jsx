import React from "react";
import PostCard from "../components/PostCard";

import { fakePostData } from "../constants/fakePostData";

import { motion } from "framer-motion";
import { postContainerVariants } from "../constants/varients";

const Home = () => {
  return (
    <motion.div
      variants={postContainerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-3 max-w-6xl  mx-auto"
    >
      <motion.div layout className="grid grid-cols-3 gap-5">
        {fakePostData.map((post) => (
          <PostCard key={post} post={post} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;
