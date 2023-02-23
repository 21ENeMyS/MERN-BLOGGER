const express = require("express");
const router = express.Router();
const {
  signup,
  signout,
  signin,
  forgotPassword,
  resetPassword,
  preSignup,
} = require("../controllers/authController");
const { runValidationResult } = require("../validators");
const {
  signinValidator,
  signupValidator,
  forgotPasswordValidator,
} = require("../validators/auth");

router.post("/pre-signup", signupValidator, runValidationResult, preSignup);
router.post("/signup", signup);
router.post("/signup", signupValidator, signup);
router.post("/signin", runValidationResult, signinValidator, signin);
router.get("/signout", signout);
router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidationResult,
  forgotPassword
);
router.put("/reset-password", resetPassword);

module.exports = router;
