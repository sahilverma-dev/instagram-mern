const { Router } = require("express");
const {
  getUser,
  registerUser,
  loginUser,
  followUser,
  unfollowUser,
  getAllFollowers,
  getAllFollowing,
} = require("../controllers/user.control");

const router = Router();

router.get("/:username", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
router.get("/:username/followers", getAllFollowers);
router.get("/:username/following", getAllFollowing);

module.exports = { userRoute: router };
