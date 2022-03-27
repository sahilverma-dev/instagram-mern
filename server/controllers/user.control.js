const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const { User } = require("../models/user.model");

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  const isUserExistUsername = await User.findOne({ username });
  const isUserExistEmail = await User.findOne({ email });
  if (isUserExistUsername) {
    res.status(400).json({
      status: 400,
      error: "Username already taken",
    });
    throw new Error("Username already taken");
  }
  if (isUserExistEmail) {
    res.status(400).json({
      status: 400,
      error: "Email already taken",
    });
    throw new Error("Email already taken");
  }
  if (!name || !username || !email || !password) {
    res.status(400).json({
      status: 400,
      error: "Please fill all the fields",
    });
    throw new Error("Please fill all the fields");
  }
  if (!isUserExistEmail && !isUserExistUsername) {
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(201).json({
        status: 201,
        data: {
          id: newUser._id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
        },
      });
    }
    if (!newUser)
      res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: newUser,
      });
    throw new Error("User not created");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      status: 400,
      error: "User not found",
    });
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({
      status: 400,
      error: "Password is incorrect",
    });
    throw new Error("Password is incorrect");
  }
  const payload = {
    user: {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    },
  };
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    },
    (err, token) => {
      if (err) {
        res.status(400).json({
          status: 400,
          error: "User not found",
        });
        throw new Error("User not found");
      }
      if (token) {
        res.status(200).json({
          status: 200,
          message: "User logged in successfully",
          token,
        });
      }
      if (!token) {
        res.status(400).json({
          status: 400,
          error: "User not found",
        });
        throw new Error("User not found");
      }
    }
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "User logged out successfully",
  });
});

const getUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(400).json({
      status: 400,
      error: "User not found",
    });
    throw new Error("User not found");
  }
  res.status(200).json({
    status: 200,
    data: {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
      posts: user.posts,
    },
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  res.send("Get All Users");
});

const editUser = asyncHandler(async (req, res) => {
  res.send("Edit User");
});

const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete User");
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getAllUsers,
  editUser,
  deleteUser,
};
