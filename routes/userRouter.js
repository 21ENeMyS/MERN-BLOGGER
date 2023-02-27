const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  requireSignin,
} = require("../controllers/authController");
const {
  read,
  publicProfile,
  photoUser,
  updateUser,
} = require("../controllers/userController");
const { signupValidator, signinValidator } = require("../validators/auth");

router.get("/user/profile", requireSignin, authMiddleware, read);
router.get("/user/:username", publicProfile);
router.get("/user/photo/:username", photoUser);
router.put("/user/update", requireSignin, authMiddleware, updateUser);

module.exports = router;
