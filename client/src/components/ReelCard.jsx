import React from "react";
import { motion } from "framer-motion";
import { item } from "../constants/varients";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdVerified as VerifiedIcon } from "react-icons/md";

const ReelCard = ({ reel }) => {
  return (
    <motion.div
      layout
      variants={item}
      className="relative !snap-center h-full flex-shrink-0 aspect-[9/16]"
    >
      <div className="absolute top-0 left-0 h-full w-full card-gradient "></div>
      <LazyLoadImage
        src={reel?.thumbnail}
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 p-3 w-full bg-transparent ">
        <p className="w-full mb-2 text-sm">{reel?.caption}</p>
        <div className="flex gap-2 items-center">
          <LazyLoadImage
            src={reel?.user?.profilePic}
            alt={reel?.user?.name}
            className="rounded-full h-6 w-6 object-cover"
          />
          <div className="flex flex-col">
            <p className="flex items-center gap-1 text-xs">
              {reel?.user?.name}
              {reel?.user?.isVerified && (
                <VerifiedIcon className="text-blue-500 text-xs" />
              )}
            </p>
            <p className="text-[8px] text-gray-300">{reel?.user?.username}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReelCard;
