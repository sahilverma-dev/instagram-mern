import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Explore from "../pages/Explore";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Post from "../pages/Post";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Header from "./Header";

import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="p-3 max-w-6xl  mx-auto">
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
      </div>
    </BrowserRouter>
  );
};

export default App;
