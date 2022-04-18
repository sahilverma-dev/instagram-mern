const { Router } = require("express");
const {
  getUser,
  registerUser,
  loginUser,
  followUser,
  unfollowUser,
  getAllFollowers,
  getAllFollowing,
  getAllUsers,
} = require("../controllers/user.control");

const router = Router();

router.get("/all", getAllUsers);
router.get("/:username", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
router.get("/:username/followers", getAllFollowers);
router.get("/:username/following", getAllFollowing);
// router.get("/edit", editUser);

module.exports = { userRoute: router };
