import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

import { fakePostData } from "../constants/fakePostData";
import { motion } from "framer-motion";
import { container, pageVariants } from "../constants/varients";
import Story from "../components/Story";
import axios from "axios";
import { API_BASE } from "../api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsub = async () => {
      try {
        const { data } = await axios(`${API_BASE}/api/v1/post/all`);
        console.log(data);
        setPosts(data?.posts);
      } catch (error) {
        console.log(error);
      }
    };
    return unsub();
  }, []);
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      className="lg:p-3 p-1 max-w-6xl min-h-screen mx-auto"
    >
      <Story />
      <motion.div
        layout
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5"
      >
        {posts?.reverse().map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;
