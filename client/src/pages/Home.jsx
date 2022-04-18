import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

import { fakePostData } from "../constants/fakePostData";
import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: "100vw" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ x: "100vw" }}
        transition={{ duration: 0.5 }}
        className="lg:p-3 p-1 max-w-6xl min-h-screen mx-auto"
      >
        <Story />
        <motion.div
          layout
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5"
        >
          {posts?.reverse().map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
