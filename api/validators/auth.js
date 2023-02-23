const { check } = require("express-validator");

exports.signupValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Must be a valid email address "),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

exports.signinValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];
