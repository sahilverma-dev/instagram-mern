import React, { useEffect } from "react";

import { motion } from "framer-motion";

import { fakePostData } from "../constants/fakePostData";
import ProfilePostCard from "../components/ProfilePostCard";

const Explore = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <div className="grid grid-cols-4 gap-5">
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
