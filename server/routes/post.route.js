const { Router } = require("express");
const {
  addPost,
  getAllPosts,
  getPost,
  likePost,
  unlikePost,
  getAllLikes,
  commentOnPost,
} = require("../controllers/post.control");

const router = Router();

router.post("/add", addPost);
router.get("/all", getAllPosts);
router.get("/:id", getPost);
router.post("/like", likePost);
router.post("/unlike", unlikePost);
router.get("/:id/likes", getAllLikes);
router.post("/comment", commentOnPost);

module.exports = {
  postRoute: router,
};
