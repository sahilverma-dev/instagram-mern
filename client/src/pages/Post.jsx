import React from "react";
import { useParams } from "react-router-dom";
import { fakePostData } from "../constants/fakePostData";
import { HiDotsHorizontal as MenuIcon } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatNumder } from "../utilities";
import { LazyLoadImage } from "react-lazy-load-image-component";

// import { FaRegComment as CommentIcon } from "react-icons/fa";
import { RiHeartFill as HeartInActiveIcon } from "react-icons/ri";
import { RiHeartLine as HeartActiveIcon } from "react-icons/ri";
import { GrNext as NextIcon } from "react-icons/gr";
import { GrPrevious as PreviousIcon } from "react-icons/gr";
import { BsBookmark as TagIcon } from "react-icons/bs";
import { RiChat3Line as CommentIcon } from "react-icons/ri";
import { FiSend as SendIcon } from "react-icons/fi";

function Post() {
  const { postID } = useParams();

  const post = fakePostData.find((x) => x.id === postID);

  return (
    <div className="grid grid-cols-12 gap-2 h-screen">
      <div className="flex items-center  h-5/6  col-span-2">
        <div>
          <img className="" src={post.postImage} alt="" />

          <img
            className="relative h-10 w-10 rounded-full mx-auto bottom-5 bg-white p-1 border border-red-700"
            src={post.user.profilePic}
            alt=""
          />
        </div>
      </div>
      <div className=" flex col-span-1 items-center  h-5/6">
        <PreviousIcon className=" h-10 w-10 ml-auto " />
      </div>
      <div className="flex  h-5/6 shadow-md border  border-gray-300 col-span-6">
        <img className="w-1/2" src={post.postImage} alt="" />
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center  w-full justify-between p-2">
            <div className="flex gap-3">
              <Link to={`/${post.user.username}`}>
                <LazyLoadImage
                  src={post.user.profilePic}
                  alt={post.user.username}
                  className="block h-9 w-9 border  border-red-700 border-1 p-[1px] aspect-square object-cover object-top rounded-full"
                />
              </Link>
              <Link to={`/${post.user.username}`} className="block">
                <p className="text-sm font-bold dark:text-white text-gray-800 ">
                  {[post.user.username]}
                </p>
                <p className="text-xs font-bold dark:text-white text-gray-700">
                  {[post.user.name]}
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <button>
                <MenuIcon size={20} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 mx-2">
            <button>
              <HeartActiveIcon className="h-5 w-5" />
            </button>
            <button>
              <CommentIcon className="h-5 w-5" />
            </button>
            <button>
              <SendIcon className="h-5 w-5" />
            </button>

            <button className="ml-auto">
              <TagIcon className="h-5 w-5 " />
            </button>
          </div>
          <div className="flex">
            <img
              className="mx-2 h-4 w-4 rounded-full"
              src={post.user.profilePic}
              alt=""
            />
            <span className="text-xs">
              liked by <b>someone</b> and <b> {post.likes} </b> others
            </span>
          </div>

          <div className="mx-2">
            <span className="text-xs ">
              {" "}
              <b>some_one76 </b> I really love symmetry{" "}
            </span>
          </div>

          <div className="mx-2 text-[10px] font-bold text-gray-500">
            3 hours
          </div>

          <div className="mx-2">
            <div className="flex text-xs">
              <HeartActiveIcon className="h-4 w-4 mt-1" />{" "}
              <span className="font-bold mx-2"> random99 </span> super!{" "}
            </div>
            <div className="flex text-xs">
              <HeartActiveIcon className="h-4 w-4 mt-1" />{" "}
              <span className="font-bold mx-2"> random99 </span> super!{" "}
            </div>
            <div className="flex text-xs">
              <HeartActiveIcon className="h-4 w-4 mt-1" />{" "}
              <span className="font-bold mx-2"> random99 </span> super!{" "}
            </div>
            <div className="flex text-xs">
              <HeartActiveIcon className="h-4 w-4 mt-1" />{" "}
              <span className="font-bold mx-2"> random99 </span> super!{" "}
            </div>
            <div className="flex text-xs">
              <HeartActiveIcon className="h-4 w-4 mt-1" />{" "}
              <span className="font-bold mx-2"> random99 </span> super!{" "}
            </div>
          </div>

          <div className=" flex  mt-auto">
            <div className="flex ">
              <img
                src={post.user.profilePic}
                className="mx-2 h-8 w-8 rounded-full  "
                alt=""
              />
              <div className="flex  bg-white w-3/4 border px-5 rounded-full text-sm border-gray-500 ">
                <input
                  placeholder="Add a Comment"
                  className="bg-white outline-none  "
                  type="text"
                />
                <button className="bg-white text-blue-700 font-bold mr-5 rounded-full">
                  post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex items-center col-span-1 h-5/6">
        <NextIcon className=" h-10 w-10 " />
      </div>
      <div className="flex items-center h-5/6 col-span-2">
        <div>
          <img className="" src={post.postImage} alt="" />

          <img
            className="relative h-10 w-10 rounded-full mx-auto bottom-5 bg-white p-1 border border-red-700"
            src={post.user.profilePic}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Post;
