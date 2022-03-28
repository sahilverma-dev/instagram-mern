import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Explore from "../pages/Explore";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Post from "../pages/Post";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Header from "./Header";

import { AnimatePresence } from "framer-motion";
import Footer from "./Footer";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="dark:bg-black dark:text-white ">
        <BrowserRouter>
          <Header
            themeChange={() => setDarkMode(!darkMode)}
            darkMode={darkMode}
          />
          <AnimatePresence>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/p/:postID" element={<Post />} />
              <Route path="/:username" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
