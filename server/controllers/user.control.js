const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const { User } = require("../models/user.model");
const ApiFeatures = require("../utils/apifeatures");

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  const isUserExistUsername = await User.findOne({ username });
  const isUserExistEmail = await User.findOne({ email });
  if (isUserExistUsername) {
    res.json({
      status: 400,
      error: "Username already taken",
    });
    throw new Error("Username already taken");
  }
  if (isUserExistEmail) {
    res.json({
      status: 400,
      error: "Email already taken",
    });
    throw new Error("Email already taken");
  }
  if (!name || !username || !email || !password) {
    res.json({
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
      const payload = {
        user: {
          id: newUser._id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          profilePic: newUser.profilePic,
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
            res.json({
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
            res.json({
              status: 400,
              error: "User not found",
            });
            throw new Error("User not found");
          }
        }
      );
    } else {
      res.status(201).json({
        status: 201,
        message: "Can't create user",
        data: newUser,
      });
      throw new Error("User not created");
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.json({
      status: 400,
      error: "User not found",
    });
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.json({
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
        res.json({
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
        res.json({
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
  const user = await User.findOne({ username }).populate("posts");
  if (!user) {
    res.json({
      status: 400,
      error: "User not found",
    });
    throw new Error("User not found");
  }
  res.status(200).json({
    status: 200,
    user,
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const apifeatures = new ApiFeatures(User.find(), req.query).search();
  const users = await apifeatures.query;
  try {
    res.status(200).json({
      status: 200,
      users,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

const editUser = asyncHandler(async (req, res) => {
  res.send("Edit User");
});

const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete User");
});

// follow user
const followUser = asyncHandler(async (req, res) => {
  const { following, followBy } = req.body;
  const userToFollow = await User.findById(following);
  const userFollowBy = await User.findById(followBy);
  if (!userToFollow) {
    res.json({
      status: 400,
      error: "User to follow not found",
    });
    throw new Error("User to follow not found");
  }
  if (!userFollowBy) {
    res.json({
      status: 400,
      error: "User to follow not found",
    });
    throw new Error("User to follow not found");
  }
  userToFollow.followers.push(userFollowBy._id);
  userFollowBy.following.push(userToFollow._id);
  await userToFollow.save();
  await userFollowBy.save();
  res.status(200).json({
    status: 200,
    message: "User followed successfully",
  });
});

// unfollow user
const unfollowUser = asyncHandler(async (req, res) => {
  const { unFollowing, unFollowBy } = req.body;
  const userToUnfollow = await User.findById(unFollowing);
  const userUnfollowBy = await User.findById(unFollowBy);
  if (!userToUnfollow) {
    res.json({
      status: 400,
      error: "User to unfollow not found",
    });
    throw new Error("User to unfollow not found");
  }
  if (!userUnfollowBy) {
    res.json({
      status: 400,
      error: "User to unfollow not found",
    });
    throw new Error("User to unfollow not found");
  }
  const index = userToUnfollow.followers.indexOf(userUnfollowBy._id);
  userToUnfollow.followers.splice(index, 1);
  const index2 = userUnfollowBy.following.indexOf(userToUnfollow._id);
  userUnfollowBy.following.splice(index2, 1);
  await userToUnfollow.save();
  await userUnfollowBy.save();
  res.status(200).json({
    status: 200,
    message: "User unfollowed successfully",
  });
});

// get all followers
const getAllFollowers = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).populate(
    "followers",
    "username name profilePic"
  );
  if (!user) {
    res.json({
      status: 400,
      error: "User not found",
    });
    throw new Error("User not found");
  }
  res.status(200).json({
    status: 200,
    followers: user.followers,
  });
});

// get all following
const getAllFollowing = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).populate(
    "following",
    "username name profilePic"
  );
  if (!user) {
    res.json({
      status: 400,
      error: "User not found",
    });
    throw new Error("User not found");
  }
  res.status(200).json({
    status: 200,
    following: user.following,
  });
});

// search user
const searchUser = asyncHandler(async (req, res) => {
  const { q: username } = req.query;
  const regex = new RegExp(username, "i");
  const users = await User.find({ username: regex }).populate("posts");
  if (!users) {
    res.json({
      status: 400,
      error: "User not found",
    });
    throw new Error("User not found");
  }
  res.status(200).json({
    status: 200,
    total: users.length,
    users,
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getAllUsers,
  editUser,
  deleteUser,
  followUser,
  unfollowUser,
  getAllFollowers,
  getAllFollowing,
  searchUser,
};
