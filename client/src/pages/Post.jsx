import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { pageVariants } from "../constants/varients";
import { fakePostData } from "../constants/fakePostData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HiDotsHorizontal as MenuIcon } from "react-icons/hi";
import { BiHeart as HeartIcon } from "react-icons/bi";
import { motion } from "framer-motion";
import { postVarients } from "../constants/varients";

import { formatNumder } from "../utilities";

import Profile from "./Profile";
import { MdVerified as VerifiedIcon } from "react-icons/md";

const Post = () => {
  const { postID } = useParams();

  const [isLiked, setIsLiked] = useState(false);

  const post = fakePostData.find((x) => x.id === postID);

  const iconVariants = {
    liked: {
      scale: [1, 2, 1],
      opacity: [0.5, 1, 0],
    },
    unliked: {
      opacity: 0,
    },
  };

  return (
    <div className="flex ">
      <div className="mx-4">
        <motion.div
          layout
          variants={postVarients}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="h-[80vh] w-[70vw]">
            <LazyLoadImage
              placeholderSrc="https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
              className="block aspect-square object-cover object-left h-[80vh] w-[70vw] "
              src={post.postImage}
              alt={post.cation}
            />

            <motion.img
              src="https://clipart.info/images/ccovers/1499793238facebook-love-emoji-like-png.png"
              className="relative  mx-auto bottom-[65%]"
              initial={false}
              variants={iconVariants}
              animate={isLiked ? "liked" : "unliked"}
              onDoubleClick={() => setIsLiked(!isLiked)}
              width="50"
              height="50"
            />
          </div>

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
                <HeartIcon
                  onClick={() => setIsLiked(!isLiked)}
                  color={isLiked ? "red" : "black"}
                  size={20}
                />
              </button>
              <button>
                <MenuIcon size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-1 max-w-7xl  mx-auto ">
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="flex flex-col md:flex-row gap-1">
            <div className="md:w-[300px] w-full flex-shrink-0 static md:min-h-screen h-auto md:p-0 p-2">
              <div className="flex flex-col items-center p-2">
                <div className="relative h-20 w-20 aspect-square rounded-full p-1 border-pink-500 border-2">
                  <img
                    src={post.user.profilePic}
                    className="h-full w-full aspect-square object-cover object-center rounded-full mx-auto md:mx-0"
                    alt="user"
                  />
                  <VerifiedIcon className="absolute bottom-0 right-0 text-xl text-blue-700" />
                </div>
                <div className="flex my-4 items-center w-full text-center justify-between">
                  <div>
                    <span className="font-semibold text-lg">
                      {formatNumder(14)}
                    </span>
                    <p className="text-gray-500 text-sm">posts</p>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">
                      {formatNumder(1000)}
                    </span>
                    <p className="text-gray-500 text-sm">followers</p>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">
                      {formatNumder(0)}
                    </span>
                    <p className="text-gray-500 text-sm">following</p>
                  </div>
                </div>
                {true ? (
                  <button className="py-2 w-full rounded bg-blue-700 font-semibold text-white">
                    Follow
                  </button>
                ) : (
                  <button className="py-2 w-full rounded bg-gray-500 font-semibold text-white">
                    Unfollow
                  </button>
                )}
                <div className="my-3">
                  <h2 className="font-semibold my-1">{post.user.username}</h2>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nesciunt aperiam omnis culpa harum expedita! Possimus eaque
                    distinctio voluptatibus dignissimos odit inventore, eos nisi
                    laudantium unde.
                  </p>
                  <a
                    href="https://instagram-firebase.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sm text-blue-700"
                  >
                    https://instagram-firebase.netlify.app/
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Post;
