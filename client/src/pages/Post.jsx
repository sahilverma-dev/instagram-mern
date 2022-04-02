import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { likeIconVarient, pageVariants } from "../constants/varients";
import { fakePostData } from "../constants/fakePostData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HiDotsHorizontal as MenuIcon } from "react-icons/hi";
import { CgHeart as HeartIcon } from "react-icons/cg";
import { BsBookmark as TagIcon } from "react-icons/bs";
import { BsBookmarkFill as TagFillIcon } from "react-icons/bs";
import { FaHeart as HeartFillIcon } from "react-icons/fa";
import { RiChat3Line as CommentIcon } from "react-icons/ri";
import { FiSend as SendIcon } from "react-icons/fi";
import { motion } from "framer-motion";
import { item } from "../constants/varients";
import { formatNumder } from "../utilities";

import { useAuth } from "../context/authContext";

const Post = () => {
  const { user } = useAuth();
  const { postID } = useParams();
  const [post, setPost] = useState();
  const [commentInput, setCommentInput] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const unsub = () => {
      setPost(fakePostData.find((post) => post.id === postID));
    };
    // console.log(post);
    return unsub();
  }, []);

  const commentSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      className="py-6 max-w-5xl mx-auto"
    >
      {post && (
        <div className="sm:flex border dark:border-0 dark:bg-dark-600">
          <div
            className="relative w-full hidden sm:block"
            onDoubleClick={handleLike}
          >
            <LazyLoadImage src={post?.postImage} className="h-full" alt="" />
            <motion.img
              src="https://clipart.info/images/ccovers/1499793238facebook-love-emoji-like-png.png"
              className="absolute top-[50%] w-[100px] aspect-square left-[50%] translate-x-[-50%] translate-y-[-50%]"
              initial={false}
              variants={likeIconVarient}
              animate={isLiked ? "liked" : "unliked"}
            />
          </div>
          <div className="sm:w-[350px] flex-shrink-0 flex flex-col items-center justify-between">
            <div className="p-3 w-full flex items-center justify-between gap-2 border-b dark:border-b-0 border-gray-200">
              <Link to={`/${post?.user?.username}`}>
                <img
                  src={post?.user?.profilePic}
                  alt={post?.user?.username}
                  className="rounded-full h-9 w-9 aspect-square  object-cover"
                />
              </Link>
              <div className="flex-grow">
                <Link
                  to={`/${post?.user?.username}`}
                  className="font-semibold text-sm"
                >
                  {post?.user?.username}
                </Link>
                <Link
                  to={`/${post?.user?.username}`}
                  className="text-gray-600 dark:text-gray-400 text-xs block"
                >
                  {post?.user?.name}
                </Link>
              </div>
              <button>
                <MenuIcon />
              </button>
            </div>
            <div
              className="relative w-full h-full sm:hidden"
              onDoubleClick={handleLike}
            >
              <LazyLoadImage
                src={post?.postImage}
                className="h-full w-full object-cover"
                alt={post?.caption}
              />
              <motion.img
                src="https://clipart.info/images/ccovers/1499793238facebook-love-emoji-like-png.png"
                className="absolute top-[50%] w-[100px] aspect-square z-10 left-[50%] translate-x-[-50%] translate-y-[-50%]"
                initial={false}
                variants={likeIconVarient}
                animate={isLiked ? "liked" : "unliked"}
              />
            </div>
            <div className="md:hidden w-full p-2 text-xm">
              <Link to={post?.user?.username} className="font-semibold">
                {post?.user?.username}
              </Link>
              <span className="ml-1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Incidunt sequi rerum eligendi eveniet cum labore animi, adipisci
                sapiente suscipit ipsa.
              </span>
            </div>
            <div className="flex-grow hidden sm:block py-1 text-xs max-h-[400px] w-full overflow-y-scroll">
              <div className="w-full border-b dark:border-b-0 px-3 py-2">
                {"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim similique adipisci magni veniam nobis minima beatae nihil soluta, ipsum repellat. Omnis veniam aut dicta illum delectus, voluptatibus quidem libero! Expedita ipsam voluptatibus dolores, deserunt labore similique repellat odio debitis in cupiditate veritatis est numquam id maiores amet, eius quas doloremque." ||
                  "No Caption"}
              </div>
              <div className="flex-col hidden sm:flex gap-4 px-2 my-2 w-full">
                {fakePostData.map((comment, index) => (
                  <div key={index} className="flex gap-2">
                    <Link
                      to={`/${comment?.user?.username}`}
                      className="h-8 w-8 aspect-square rounded-full"
                    >
                      <LazyLoadImage
                        src={comment?.user?.profilePic}
                        className="h-full w-full aspect-square rounded-full"
                        alt={comment?.user?.username}
                      />
                    </Link>
                    <div className="">
                      <Link to={`/${comment?.user?.username}`}>
                        <span className="font-semibold text-xs">
                          {comment?.user?.username}
                        </span>
                      </Link>
                      <span className="w-full ml-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Lorem ipsum dolor sit
                        amet, consectetur adipisicing elit. Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Lorem ipsum
                        dolor sit amet, consectetur adipisicing elit.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex text-xl sm:p-3 border-t dark:border-t-0 w-full p-3">
              <div className="flex w-full text-slate-900 dark:text-white gap-2">
                <button onClick={handleLike}>
                  {isLiked ? (
                    <HeartFillIcon className="text-red-500" size={22} />
                  ) : (
                    <HeartIcon size={22} />
                  )}
                </button>
                <button>
                  <CommentIcon />
                </button>
                <button>
                  <SendIcon />
                </button>
              </div>
              <button>
                <TagFillIcon />
              </button>
            </div>
            <div className="hidden sm:block sm:border-t dark:border-0 dark:text-white w-full font-semibold text-slate-900 text-sm p-2">
              View all {formatNumder(post?.likes)} comments
            </div>
            <div className="sm:block sm:border-t dark:border-t-0 w-full text-slate-900 p-2">
              <form onSubmit={commentSubmit}>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user?.profilePic ||
                      "https://parkridgevet.com.au/wp-content/uploads/2020/11/Profile-300x300.png"
                    }
                    className="h-8 w-8 aspect-square rounded-full"
                  />
                  <input
                    type="text"
                    className="w-full text-sm outline-none bg-transparent font-light"
                    placeholder="Add a comment..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={commentInput.length <= 0}
                    className="text-blue-500 font-semibold text-sm"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Post;
