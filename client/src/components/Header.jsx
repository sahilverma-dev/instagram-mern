import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// hooks
import NavLink from "../hooks/NavLink";

// icons
import { GrInstagram as InstagramIcon } from "react-icons/gr";
import { RiHome5Fill as HomeActiveIcon } from "react-icons/ri";
import { RiHome5Line as HomeInActiveIcon } from "react-icons/ri";
import { RiSearch2Line as SearchInActiveIcon } from "react-icons/ri";
import { RiSearch2Fill as SearchActiveIcon } from "react-icons/ri";
import { MdOutlineExplore as ExploreInActiveIcon } from "react-icons/md";
import { MdExplore as ExploreActiveIcon } from "react-icons/md";
import { RiHeartFill as HeartInActiveIcon } from "react-icons/ri";
import { RiHeartLine as HeartActiveIcon } from "react-icons/ri";
import { FiSend as SendIcon } from "react-icons/fi";

const navigationData = [
  {
    name: "Home",
    path: "/",
    activeIcon: <HomeActiveIcon color="#343434" size={20} />,
    inActiveIcon: <HomeInActiveIcon color="#343434" size={20} />,
  },
  {
    name: "Search",
    path: "/search",
    inActiveIcon: <SearchInActiveIcon color="#343434" size={20} />,
    activeIcon: <SearchActiveIcon color="#343434" size={20} />,
  },
  {
    name: "Explore",
    path: "/explore",
    activeIcon: <ExploreActiveIcon color="#343434" size={20} />,
    inActiveIcon: <ExploreInActiveIcon color="#343434" size={20} />,
  },
  {
    name: "Notifications",
    path: "/notifications",
    activeIcon: <HeartInActiveIcon color="#343434" size={20} />,
    inActiveIcon: <HeartActiveIcon color="#343434" size={20} />,
  },
];

const Header = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.onscroll = () => {
        if (window.scrollY > 100) {
          setSticky(true);
        } else {
          setSticky(false);
        }
      };
    };
    return handleScroll();
  }, []);
  return (
    <div
      className={`px-4 ${
        sticky ? "sticky top-0 py-4" : "py-6"
      } bg-white w-full transition-all`}
    >
      <div className="max-w-7xl mx-auto flex  items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-1">
            <InstagramIcon color="#343434" size={20} />
            <img
              src="./images/logo.png"
              alt="logo"
              className="h-8 w-auto object-fill"
            />
          </div>
        </Link>
        <div className="flex items-center gap-4">
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
        <div className="flex items-center justify-end w-[120px] gap-3">
          <Link to="/chat">
            <SendIcon size={20} />
          </Link>
          <img
            src="https://avatars.githubusercontent.com/u/83828231"
            className="block h-7 w-7 aspect-square rounded-full border"
            alt="user"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
