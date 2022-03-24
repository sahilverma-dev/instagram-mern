import React, { useEffect } from "react";
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
    >
      <motion.div layout className="grid grid-cols-3 gap-5">
        {fakePostData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;
