import React from "react";

// icons
import { HiDotsHorizontal as MenuIcon } from "react-icons/hi";
import { BiHeart as HeartIcon } from "react-icons/bi";
import { formatNumder } from "../utilities";

import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import { postVarients } from "../constants/varients";

const PostCard = ({post}) => {

  

  return (
    <motion.div
      layout
      variants={postVarients}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Link to={`/p/${post.id}`}>
        <LazyLoadImage
          placeholderSrc="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
          className="block aspect-square object-cover object-center"
          src={post.postImage}
          alt={post.cation}
        />
      </Link>
      <div className="flex items-center justify-between p-2">
        <div className="flex gap-2">
          <Link to={`/${post.user.username}`}>
            <LazyLoadImage
              src={post.user.profilePic}
              alt={post.user.username}
              className="block h-9 w-9 border border-gray-400 aspect-square object-cover object-top rounded-full"
            />
          </Link>
          <div>
            <p className="text-sm font-semibold">{[post.user.username]}</p>
            <p className="text-[8px] text-gray-500">{[post.user.name]}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {post.likes > 0 && (
            <p
              className="text-sm font-semibold mr-2"
              title={`${post.likes} likes`}
            >
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
