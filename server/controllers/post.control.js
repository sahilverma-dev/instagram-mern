const asyncHandler = require("express-async-handler");
const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");

// addpost
const addPost = asyncHandler(async (req, res, next) => {
  const { caption, postImage, user } = req.body;
  const newPost = await Post.create({
    caption,
    postImage,
    user,
  });
  if (newPost) {
    // add post id to user docuemnt
    await User.findByIdAndUpdate(
      user,
      { $push: { posts: newPost._id } },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      message: "Post added successfully",
      data: newPost,
    });
  } else
    res.json({
      status: "failed",
      message: "Post not added",
    });
});

// all post
const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate(
    "user",
    "name  profilePic  username"
  );
  if (posts)
    res.status(200).json({
      status: "success",
      message: "Posts fetched successfully",
      posts,
    });
  else
    res.json({
      status: "failed",
      message: "Posts not found",
    });
});

// singal post
const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate(
    "user comments.user",
    "name  profilePic  username"
  );
  if (post)
    res.status(200).json({
      status: "success",
      post,
      message: "Post found",
    });
  else
    res.json({
      status: "not Found",
      message: "Post not found",
    });
});

// like post
const likePost = asyncHandler(async (req, res) => {
  const { postID, userID } = req.body;
  const post = await Post.findById(postID);
  if (post) {
    const like = post.likes.find((like) => like.toString() === userID);
    if (like) {
      res.json({
        status: "failed",
        message: "Post already liked",
      });
    } else {
      post.likes.push(userID);
      await post.save();
      res.status(200).json({
        status: "success",
        message: "Post liked successfully",
        post,
      });
    }
  } else {
    res.json({
      status: "failed",
      message: "Post not found",
    });
  }
});

// unlike post
const unlikePost = asyncHandler(async (req, res) => {
  const { postID, userID } = req.body;
  const post = await Post.findById(postID);
  if (post) {
    const like = post.likes.find((like) => like.toString() === userID);
    if (like) {
      const index = post.likes.indexOf(userID);
      post.likes.splice(index, 1);
      await post.save();
      res.status(200).json({
        status: "success",
        message: "Post unliked successfully",
        post,
      });
    } else {
      res.json({
        status: "failed",
        message: "Post not liked",
      });
    }
  } else {
    res.json({
      status: "failed",
      message: "Post not found",
    });
  }
});

// get all likes
const getAllLikes = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate(
    "likes",
    "name  profilePic  username"
  );
  if (post)
    res.status(200).json({
      status: "success",
      totalLikes: post.likes.length,
      likes: post?.likes,
      message: "Post found",
    });
  else
    res.json({
      status: "not Found",
      message: "Post not found",
    });
});

// comment on post
const commentOnPost = asyncHandler(async (req, res) => {
  const { postID, userID, comment } = req.body;
  const post = await Post.findById(postID);
  if (post) {
    post.comments.push({
      user: userID,
      comment,
    });
    await post.save();
    res.status(200).json({
      status: "success",
      message: "Comment added successfully",
      comments: post.comments,
    });
  } else
    res.json({
      status: "failed",
      message: "Post not found",
    });
});

// delete comment
const deleteComment = asyncHandler(async (req, res) => {
  const { postID, commentID } = req.body;
  const post = await Post.findById(postID);
  if (post) {
    const comment = post.comments.find(
      (comment) => comment._id.toString() === commentID
    );
    if (comment) {
      const index = post.comments.indexOf(comment);
      post.comments.splice(index, 1);
      await post.save();
      res.status(200).json({
        status: "success",
        message: "Comment deleted successfully",
        post,
      });
    } else
      res.json({
        status: "failed",
        message: "Comment not found",
      });
  } else
    res.json({
      status: "failed",
      message: "Post not found",
    });
});

module.exports = {
  addPost,
  getAllPosts,
  getPost,
  likePost,
  unlikePost,
  getAllLikes,
  commentOnPost,
  deleteComment,
};
