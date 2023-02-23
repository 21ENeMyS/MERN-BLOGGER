const express = require("express");
const {
  requireSignin,
  adminMiddleware,
} = require("../controllers/authController");
const router = express.Router();
const {
  createCategory,
  readCategory,
  readOne,
  deleteCategory,
} = require("../controllers/categoriesController");
const { runValidationResult } = require("../validators/");
const { categoryCreate } = require("../validators/category");

router.post(
  "/category",
  runValidationResult,
  categoryCreate,
  requireSignin,
  adminMiddleware,
  createCategory
);
router.get("/categories", readCategory);
router.get("/category/:slug", readOne);
router.delete(
  "/category/:slug",
  requireSignin,
  adminMiddleware,
  deleteCategory
);

module.exports = router;
