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
import Footer from "./Footer";
import { Test } from "../pages/Test";
import HomeLogin from "../pages/HomeLogin";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/p/:postID" element={<Post />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
