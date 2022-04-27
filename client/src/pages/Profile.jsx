import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfilePostCard from "../components/ProfilePostCard";
import { fakePostData } from "../constants/fakePostData";
import { motion } from "framer-motion";
import { container, pageVariants } from "../constants/varients";
import { formatNumder } from "../utilities";

import NotFound from "../components/NotFound";

// icons
import { MdVerified as VerifiedIcon } from "react-icons/md";
import axios from "axios";
import { API_BASE } from "../api";
import { useAuth } from "../context/authContext";

const Profile = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null);
  const [noUser, setNoUser] = useState(false);
  const [follow, setFollow] = useState(false);
  useEffect(() => {
    const unsub = async () => {
      try {
        const { data } = await axios(`${API_BASE}/api/v1/user/${username}`);
        console.log(data);
        if (data) {
          setProfileUser(data?.user);
          setFollow(data?.user?.followers?.includes(user?.id));
          setNoUser(false);
        } else {
          setProfileUser(null);
          navigate("/");
          setNoUser(true);
        }
      } catch (error) {
        setProfileUser(null);
        setNoUser(true);
      }
    };
    return unsub();
  }, [username, user?.id]);

  const followUser = async () => {
    try {
      const { data } = await axios({
        url: `${API_BASE}/api/v1/user/follow`,
        method: "POST",
        data: {
          following: profileUser?._id,
          followBy: user?.id,
        },
      });
      console.log(data);
      setFollow(true);
    } catch (error) {
      console.log(error);
    }
  };
  const unfollowUser = async () => {
    try {
      const { data } = await axios({
        url: `${API_BASE}/api/v1/user/unfollow`,
        method: "POST",
        data: {
          unFollowing: profileUser?._id,
          unFollowBy: user?.id,
        },
      });
      console.log(data);
      setFollow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      className="p-1 max-w-7xl min-h-screen  mx-auto"
    >
      {noUser ? (
        <div className="h-screen flex items-center">
          <NotFound />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-1">
          <div className="md:w-[300px] w-full flex-shrink-0 static md:min-h-screen h-auto md:p-2 p-2">
            <div className="flex flex-col items-center">
              <div className="relative h-20 w-20 aspect-square rounded-full p-1 border-pink-500 border-2">
                <img
                  src={profileUser?.profilePic}
                  className="h-full w-full aspect-square object-cover object-center rounded-full mx-auto md:mx-0"
                  alt={profileUser?.name}
                />
                {profileUser?.verified && (
                  <VerifiedIcon className="absolute bottom-0 right-0 text-xl text-blue-700" />
                )}
              </div>
              <div className="flex my-4 items-center w-full text-center justify-around md:justify-between">
                <div>
                  <span className="font-semibold text-lg">
                    {formatNumder(profileUser?.posts?.length)}
                  </span>
                  <p className="text-gray-500 dark:text-gray-200 text-sm">
                    posts
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-lg">
                    {formatNumder(profileUser?.followers?.length)}
                  </span>
                  <p className="text-gray-500 dark:text-gray-200 text-sm">
                    followers
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-lg">
                    {formatNumder(profileUser?.following?.length)}
                  </span>
                  <p className="text-gray-500 dark:text-gray-200 text-sm">
                    following
                  </p>
                </div>
              </div>
              {user ? (
                <>
                  {user?.id !== profileUser?._id ? (
                    <button
                      className={`py-2 w-full rounded ${
                        follow ? "bg-gray-500" : "bg-blue-700"
                      } font-semibold text-white`}
                      onClick={() => {
                        follow ? unfollowUser() : followUser();
                      }}
                    >
                      {follow ? "Unfollow" : "Follow"}
                    </button>
                  ) : (
                    <button className="py-2 w-full rounded  bg-blue-700 text-white">
                      Edit Profile
                    </button>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="py-2 text-center w-full rounded  bg-blue-700 text-white"
                >
                  Login to Follow
                </Link>
              )}
              <div className="my-3 w-full">
                <h2 className="font-semibold my-1">{profileUser?.name}</h2>
                <p className="text-sm">{profileUser?.bio}</p>
                {profileUser?.link && (
                  <a
                    href={profileUser?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sm text-blue-700"
                  >
                    {profileUser?.link}
                  </a>
                )}
              </div>
            </div>
          </div>
          <motion.div
            layout
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid flex-grow grid-cols-3 md:max-h-screen md:overflow-y-scroll gap-1 lg:gap-5"
          >
            {profileUser?.posts?.reverse()?.map((post) => (
              <ProfilePostCard key={post._id} post={post} />
            ))}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
