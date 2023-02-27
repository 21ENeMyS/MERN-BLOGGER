const { check } = require("express-validator");

exports.categoryCreate = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .matches(/^[a-zA-Z\s'-]{1,100}$/),
];
