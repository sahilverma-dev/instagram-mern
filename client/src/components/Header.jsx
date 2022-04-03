import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// hooks
import NavLink from "../hooks/NavLink";

// framer motion
import { AnimatePresence, motion } from "framer-motion";

// other
import { useAuth } from "../context/authContext";
import {
  ReelActiveIcon,
  ReelInactiveIcon,
  UploadIcon,
} from "../constants/Extra";
import { container, item } from "../constants/varients";
import { useTheme } from "../context/themeContext";

// icons
import { GrInstagram as InstagramIcon } from "react-icons/gr";
import { RiHome5Fill as HomeActiveIcon } from "react-icons/ri";
import { RiHome5Line as HomeInActiveIcon } from "react-icons/ri";
import { RiSearch2Line as SearchInActiveIcon } from "react-icons/ri";
import { IoMdAdd as AddIcon } from "react-icons/io";
import { RiSearch2Fill as SearchActiveIcon } from "react-icons/ri";
import { MdOutlineExplore as ExploreInActiveIcon } from "react-icons/md";
import { MdExplore as ExploreActiveIcon } from "react-icons/md";
import { RiHeartFill as HeartInActiveIcon } from "react-icons/ri";
import { ImSpinner3 as SpinnerIcon } from "react-icons/im";
import { RiHeartLine as HeartActiveIcon } from "react-icons/ri";
import { FiSend as SendIcon } from "react-icons/fi";
import { VscClose as CloseIcon } from "react-icons/vsc";
import { BsSun as SunIcon } from "react-icons/bs";
import { IoIosMoon as MoonIcon } from "react-icons/io";

const navigationData = [
  {
    name: "Home",
    path: "/",
    activeIcon: (
      <HomeActiveIcon className="text-[#343434] dark:text-gray-300" size={20} />
    ),
    inActiveIcon: (
      <HomeInActiveIcon
        className="text-[#343434] dark:text-gray-300"
        size={20}
      />
    ),
  },
  {
    name: "Reels",
    path: "/reels",
    inActiveIcon: (
      <div className="fill-[#343434] dark:fill-gray-300">
        <ReelInactiveIcon size={20} />
      </div>
    ),
    activeIcon: (
      <div className="fill-[#343434] dark:fill-gray-300">
        <ReelActiveIcon size={20} />
      </div>
    ),
  },
  {
    name: "Explore",
    path: "/explore",
    activeIcon: (
      <ExploreActiveIcon
        className="text-[#343434] dark:text-gray-300"
        size={20}
      />
    ),
    inActiveIcon: (
      <ExploreInActiveIcon
        className="text-[#343434] dark:text-gray-300"
        size={20}
      />
    ),
  },
  {
    name: "Notifications",
    path: "/notifications",
    activeIcon: (
      <HeartInActiveIcon
        className="text-[#343434] dark:text-gray-300"
        size={20}
      />
    ),
    inActiveIcon: (
      <HeartActiveIcon
        className="text-[#343434] dark:text-gray-300"
        size={20}
      />
    ),
  },
];

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [image, setImage] = useState();
  const { user, logout } = useAuth();
  const inputRef = useRef(null);

  const [percentage, setPercentage] = useState(0);
  const [caption, setCaption] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // console.log(user);
    const handleScroll = () => {
      window.onscroll = () => {
        if (window.scrollY > 160) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      };
    };
    return handleScroll();
  }, []);
  return (
    <>
      <div
        className={`px-4 ${
          sticky
            ? "sticky top-0 py-4 shadow-lg z-50 dark:bg-dark-400 bg-white md:dark:bg-opacity-60 md:bg-opacity-70 md:backdrop-blur"
            : "md:py-4 py-2 dark:bg-transparent bg-white"
        }  w-full transition-all`}
      >
        <div className="max-w-7xl mx-auto flex  items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-1">
              <InstagramIcon
                className="text-[#343434] dark:text-gray-300"
                size={20}
              />
              <img
                src="/images/logo.png"
                alt="logo"
                className="h-8 w-auto dark:invert object-fill"
              />
            </div>
          </Link>
          {user && (
            <div className="md:flex hidden items-center gap-6">
              {navigationData.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className="relative group aspect-square border border-transparent transition-all hover:border-black hover:scale-110 p-2 rounded-md text-[#343434] dark:text-gray-300"
                  activeIcon={item.activeIcon}
                  inActiveIcon={item.inActiveIcon}
                />
              ))}
            </div>
          )}
          <div className="flex items-center justify-end  gap-3">
            <button
              className="aspect-square dark:text-white p-2"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            {user ? (
              <>
                <Link
                  to="/chat"
                  className="block relative dark:text-white p-2 aspect-square"
                >
                  {/* <div className="absolute top-0 right-0 aspect-square p-1 rounded-full text-white font-semibold bg-red-600"></div> */}
                  <SendIcon size={20} />
                </Link>
                <Link to={`/${user?.username}`}>
                  <img
                    src={user.profilePic}
                    className="block h-7 w-7 aspect-square rounded-full border border-black"
                    alt={user.name}
                    // onClick={logout}
                  />
                </Link>
              </>
            ) : (
              <div className="flex gap-3 items-center">
                <Link
                  to="/login"
                  className="bg-blue-500 text-white font-semibold text-sm py-1 px-3 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-blue-500 font-semibold text-sm rounded"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {user && (
        <button
          className="fixed md:bottom-3 bottom-16 backdrop-blur bg-blue-600 text-white right-3 p-2 aspect-square  rounded-lg z-50"
          onClick={() => setModelOpen(true)}
        >
          <AddIcon size={20} />
        </button>
      )}
      {user && (
        <div className="fixed bottom-0 left-0 w-full z-50  shadow-md bg-white dark:bg-dark-400 flex md:hidden items-center p-4 justify-around gap-6">
          {navigationData.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="relative group aspect-square border border-transparent transition-all hover:border-black hover:scale-110 p-2 rounded-md"
              activeIcon={item.activeIcon}
              inActiveIcon={item.inActiveIcon}
            />
          ))}
        </div>
      )}
      {modelOpen && (
        <div className="fixed top-0 flex items-center justify-center left-0 w-screen h-screen z-50">
          {/* <AnimatePresence> */}
          <motion.div
            layout
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            onClick={() => setModelOpen(false)}
            className="absolute h-full w-full bg-black/80 backdrop-blur -z-10 "
          ></motion.div>
          <motion.button
            layout
            variants={item}
            onClick={() => setModelOpen(false)}
            className="absolute md:top-7 md:right-10 top-5 right-3 text-white md:text-5xl text-3xl"
          >
            <CloseIcon color="#fff" />
          </motion.button>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            layout
            className="p-3 rounded-lg overflow-hidden w-full"
          >
            <motion.div
              layout
              variants={item}
              className="bg-white dark:bg-dark-300 rounded-lg w-full max-w-[450px] mx-auto"
            >
              <div className="border-b-2 dark:border-dark-100 py-2 text-center">
                Create Post
              </div>
              <div className="w-full h-full aspect-square flex items-center justify-center">
                <div className="flex flex-col w-full overflow-hidden items-center justify-between ">
                  {image ? (
                    <div className="p-2">
                      <img
                        src={URL.createObjectURL(image)}
                        className="w-full h-full rounded max-h-[300px] object-contain border"
                        alt="image"
                      />
                    </div>
                  ) : (
                    <div
                      className="mb-16 cursor-pointer dark:invert"
                      onClick={() => inputRef.current.click()}
                    >
                      <UploadIcon />
                    </div>
                  )}
                  <div className="w-full p-3">
                    <form className="w-full">
                      <input
                        type="file"
                        className="block w-full px-3 mb-3 py-1.5 text-base font-normal text-gray-800 bg-white dark:bg-dark-600 dark:text-gray-400  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        accept="image/*"
                        id="formFile"
                        // multiple
                        ref={inputRef}
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          console.log(e.target.files[0]);
                        }}
                      />
                      {image && (
                        <>
                          <input
                            type="text"
                            onChange={(e) => setCaption(e.target.value)}
                            className="block w-full px-3 mb-3 py-1.5 text-base font-normal text-gray-800 bg-white dark:bg-dark-100 dark:text-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Add a caption"
                            value={caption}
                          />
                          <div
                            className="w-full flex justify-center"
                            type="submit"
                          >
                            <button
                              className="bg-blue-500 px-4 py-1 
                                  text-white font-semibold text-sm rounded block text-center 
                                  sm:inline-block mx-auto"
                              disabled={caption.length <= 0}
                            >
                              {uploading ? (
                                <div className="flex gap-2 items-center">
                                  <div>Uploading</div>
                                  <SpinnerIcon className="w-3 h-3 animate-spin my-1 mx-auto" />
                                </div>
                              ) : (
                                <>{uploadComplete ? "Complete" : "Upload"}</>
                              )}
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          {/* </AnimatePresence> */}
        </div>
      )}
    </>
  );
};

export default Header;
