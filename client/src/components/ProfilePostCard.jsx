import React from "react";

// icons

// icons
import { IoCopy as CollectionIcon } from "react-icons/io5";
import { FaPlay as PlayIcon } from "react-icons/fa";
import { FaComment as CommentIcon } from "react-icons/fa";
import { BiHeart as HeartIcon } from "react-icons/bi";
import { formatNumder } from "../utilities";

import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import { postVarients } from "../constants/varients";

const ProfilePostCard = ({ post, span }) => {
  return (
    <motion.div
      layout
      variants={postVarients}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${span ? "col-span-2 row-span-2" : ""}`}
    >
      <Link to={`/p/${post.id}`}>
        <div className="relative group aspect-square overflow-hidden bg-gray-800  text-white  md:mb-1">
          <div className="absolute top-2 right-2 z-30 md:text-xl text-white">
            {/* {post?.isVideo && <PlayIcon />} */}
            {post?.collection && <CollectionIcon className="rotate-180" />}
          </div>
          {/* overlay*/}
          <div className="absolute text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer h-full w-full bg-black/40 z-10">
            <div className="flex h-full justify-center items-center">
              <div className="flex flex-col md:text-xl text-sm md:flex-row md:gap-6">
                <div className="flex items-center">
                  <HeartIcon />
                  <span className="ml-2">
                    {formatNumder(post?.likedBy?.length || 0)}
                  </span>
                </div>
                <div className="flex items-center">
                  <CommentIcon />
                  <span className="ml-2">
                    {post?.comments?.toLocaleString() || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <LazyLoadImage
            src={post.postImage}
            placeholderSrc="https://cutewallpaper.org/24/image-placeholder-png/index-of-img.png"
            alt={post?.id}
            className="h-full w-full aspect-square object-cover object-center"
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProfilePostCard;
