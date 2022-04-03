import React, { useEffect, useState } from "react";

// icons
import { HiDotsHorizontal as MenuIcon } from "react-icons/hi";
import { FaHeart as HeartFillIcon } from "react-icons/fa";
import { BiHeart as HeartIcon } from "react-icons/bi";
import { formatNumder } from "../utilities";

import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import { item } from "../constants/varients";

import { useAuth } from "../context/authContext";
import axios from "axios";
import { API_BASE } from "../api";

const PostCard = ({ post }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setLikes(post?.likes?.length);
    setLiked(post?.likes?.includes(user.id));
  }, []);

  const likePost = async () => {
    try {
      const { data } = await axios({
        url: `${API_BASE}/api/v1/post/like`,
        method: "POST",
        data: {
          postID: post._id,
          userID: user.id,
        },
      });
      console.log(data);
      setLiked(true);
      setLikes(likes + 1);
    } catch (error) {
      console.log(error);
    }
  };
  const unLikePost = async () => {
    try {
      const { data } = await axios({
        url: `${API_BASE}/api/v1/post/unlike`,
        method: "POST",
        data: {
          postID: post._id,
          userID: user.id,
        },
      });
      console.log(data);
      setLiked(false);
      setLikes(likes - 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div layout variants={item}>
      <Link to={`/p/${post._id}`}>
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
          <Link to={`/${post.user.username}`} className="block">
            <p className="text-sm font-semibold">{[post.user.username]}</p>
            <p className="text-[8px] text-gray-500">{[post.user.name]}</p>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          {likes > 0 && (
            <p className="text-sm font-semibold mr-2" title={`${likes} likes`}>
              {formatNumder(likes || 0)} likes
            </p>
          )}
          <button onClick={() => (liked ? unLikePost() : likePost())}>
            {liked ? <HeartFillIcon fill="#ff2828" /> : <HeartIcon size={20} />}
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
