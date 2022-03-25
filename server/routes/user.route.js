const { Router } = require("express");
const {
  getUser,
  registerUser,
  loginUser,
} = require("../controllers/user.control");

const router = Router();

router.get("/:username", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = { UserRoute: router };
