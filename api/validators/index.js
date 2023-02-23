const { validationResult } = require("express-validator");

exports.runValidationResult = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array()[0].msg });
  }
  next();
};
