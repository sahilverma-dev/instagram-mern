import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  container,
  likeIconVarient,
  pageVariants,
} from "../constants/varients";
import { fakePostData } from "../constants/fakePostData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HiDotsHorizontal as MenuIcon } from "react-icons/hi";
import { CgHeart as HeartIcon } from "react-icons/cg";
import { BsBookmark as TagIcon } from "react-icons/bs";
import { BsBookmarkFill as TagFillIcon } from "react-icons/bs";
import { FaHeart as HeartFillIcon } from "react-icons/fa";
import { RiChat3Line as CommentIcon } from "react-icons/ri";
import { FiSend as SendIcon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { item } from "../constants/varients";
import { formatNumder } from "../utilities";

import { useAuth } from "../context/authContext";
import axios from "axios";
import { API_BASE } from "../api";

const Post = () => {
  const { user } = useAuth();
  const { postID } = useParams();
  const [post, setPost] = useState();
  const [commentInput, setCommentInput] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    isLiked ? unLikePost() : likePost();
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const unsub = async () => {
      try {
        const { data } = await axios(`${API_BASE}/api/v1/post/${postID}`);
        setPost(data?.post);
        setIsLiked(data?.post?.likes?.includes(user.id));
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      // setPost(fakePostData.find((post) => post.id === postID));
    };
    // console.log(post);
    return unsub();
  }, []);

  const commentSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        url: `${API_BASE}/api/v1/post/comment`,
        method: "POST",
        data: {
          postID: post?._id,
          userID: user.id,
          comment: commentInput,
        },
      });
      console.log(data);
      setPost({
        ...post,
        comments: [
          ...post?.comments,
          {
            user: {
              _id: user?.id,
              name: user?.name,
              username: user?.username,
              profilePic: user?.profilePic,
            },
            comment: commentInput,
          },
        ],
      });
      setCommentInput("");
    } catch (error) {
      console.log(error);
    }
  };

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
      setIsLiked(true);
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
      setIsLiked(false);
      setLikes(likes - 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-6 max-w-5xl min-h-screen mx-auto">
      {post && (
        <div className="sm:flex border dark:border-0 dark:bg-dark-600">
          <div
            className="relative w-full hidden sm:block"
            onDoubleClick={handleLike}
          >
            <LazyLoadImage
              src={post?.image?.original}
              className="h-full w-full object-cover max-h-[500px] min-h-[300px]"
              alt={post?.caption}
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
              className="relative w-full h-full  sm:hidden"
              onDoubleClick={handleLike}
            >
              <LazyLoadImage
                src={post?.image?.original}
                className="h-full w-full min-h-[300px] object-cover"
                alt={post?.caption}
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
            <div className="flex-grow hidden sm:block py-1 text-xs max-h-[300px] w-full overflow-y-scroll">
              <div className="w-full border-b dark:border-b-0 px-3 py-2">
                {post?.caption || "No Caption"}
              </div>
              {post?.comments?.length > 0 && (
                <div
                  layout
                  className="flex-col hidden sm:flex gap-4 px-2 my-2 w-full"
                >
                  {post?.comments?.map((comment, index) => (
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
                        <span className="w-full ml-1">{comment?.comment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {user ? (
              <>
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
              </>
            ) : (
              <div className="border-t p-3 text-sm w-full text-center dark:border-0">
                You have to{" "}
                <Link to="/login" className="text-blue-500">
                  login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
