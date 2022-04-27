import React from "react";
import { Link } from "react-router-dom";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import { motion } from "framer-motion";
import { item } from "../constants/varients";
import { LazyLoadImage } from "react-lazy-load-image-component";
const SearchUserItem = ({ user }) => {
  return (
    <motion.div
      variants={item}
      className="hover:bg-white hover:dark:bg-dark-100 p-2 rounded"
    >
      <Link
        to={`/${user?.username}`}
        className="flex items-center gap-3  w-full"
      >
        <LazyLoadImage
          className="w-11 h-11 rounded-full object-cover"
          src={user?.profilePic}
          alt="avatar"
        />
        <div className="flex flex-col items-start">
          <span className="text-black dark:text-white text-sm font-semibold">
            {user?.username}
            {user?.verified && (
              <VerifiedIcon className="inline-flex text-xs text-blue-500 ml-1" />
            )}
          </span>
          <span className="text-gray-400 text-sm">{user?.name}</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default SearchUserItem;
