import React from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const StoryCard = ({ profilePic, username }) => {
  return (
    <div className="flex flex-col items-center">
      <LazyLoadImage
        src={profilePic}
        alt={username}
        className="h-16 w-16 rounded-full object-cover object-center p-1 border-2 border-pink-600"
      />
      <Link to={`/${username}`} className="text-xs">
        {username.length > 10 ? `${username.slice(0, 10)}...` : username}
      </Link>
    </div>
  );
};

export default StoryCard;
