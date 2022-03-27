import React from "react";
import { useParams } from "react-router-dom";
import ProfilePostCard from "../components/ProfilePostCard";
import { fakePostData } from "../constants/fakePostData";
import { motion } from "framer-motion";
import { pageVariants } from "../constants/varients";
import { formatNumder } from "../utilities";

// icons
import { MdVerified as VerifiedIcon } from "react-icons/md";

const Profile = () => {
  const { username } = useParams();
  return (
    <div className="p-1 max-w-7xl  mx-auto">
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
                  src="https://avatars.githubusercontent.com/u/83828231"
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
                <h2 className="font-semibold my-1">Sahil Verma</h2>
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
          <div className="grid flex-grow grid-cols-3 md:max-h-screen md:overflow-y-scroll gap-1 md:p-0 p-2 lg:gap-5">
            {fakePostData.map((post, index) => (
              <ProfilePostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
