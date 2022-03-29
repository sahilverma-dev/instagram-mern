import React from "react";
import { fakePostData } from "../constants/fakePostData";
import StoryCard from "./StoryCard";
import { motion } from "framer-motion";
import { container } from "../constants/varients";
const Story = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex gap-3 max-w-screen overflow-x-scroll snap-x my-6"
    >
      {fakePostData.map((user) => (
        <StoryCard
          key={user.id}
          username={user.user.username}
          profilePic={user.user.profilePic}
        />
      ))}
    </motion.div>
  );
};

export default Story;
