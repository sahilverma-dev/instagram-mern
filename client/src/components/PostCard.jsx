import React from "react";

// icons
import { HiDotsHorizontal as MenuIcon } from "react-icons/hi";
import { BiHeart as HeartIcon } from "react-icons/bi";
import { formatNumder } from "../utilities";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { postVarients } from "../constants/varients";

const PostCard = ({ post }) => {
  return (
    <motion.div
      layout
      variants={postVarients}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <img
        className="block aspect-square object-cover object-center"
        src={post.postImage}
        alt={post.cation}
      />
      <div className="flex items-center justify-between p-2">
        <div className="flex gap-2">
          <Link to={`/${post.user.username}`}>
            <img
              src={post.user.profilePic}
              alt={post.user.username}
              className="block h-9 w-9 aspect-square object-cover object-top rounded-full"
            />
          </Link>
          <div>
            <p className="text-sm font-semibold">{[post.user.username]}</p>
            <p className="text-[8px] text-gray-500">{[post.user.name]}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {post.likes > 0 && (
            <p className="text-sm font-semibold mr-2">
              {formatNumder(post.likes)} likes
            </p>
          )}
          <button>
            <HeartIcon size={20} />
          </button>
          <button>
            <MenuIcon size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
