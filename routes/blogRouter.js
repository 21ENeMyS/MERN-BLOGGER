const express = require("express");
const router = express.Router();
const {
  createBlog,
  readAll,
  readOne,
  removed,
  updated,
  photo,
  searchBlog,
  Related,
  limitBlog,
  blogsWithCategories,
  listByUser,
  listBySort,
} = require("../controllers/blogController");
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
  canUpdateBlog,
} = require("../controllers/authController");

router.post("/blog", requireSignin, adminMiddleware, createBlog);
router.get("/blogs", readAll);
router.post("/blogs-categories", blogsWithCategories);
router.post("/blogs/limit", limitBlog);
router.get("/blog/:slug", readOne);
router.delete("/blog/:slug", requireSignin, adminMiddleware, removed);
router.put("/blog/:slug", requireSignin, adminMiddleware, updated);
router.get("/blog/photo/:slug", photo);
router.post("/blogs/by/sort", listBySort);
router.post("/blogs/related", Related);
router.get("/blogs/search", searchBlog);

// user
router.post("/user/blog", requireSignin, authMiddleware, createBlog);
router.delete("/user/blog/:slug", requireSignin, authMiddleware, removed);
router.put("/user/blog/:slug", requireSignin, authMiddleware, updated);
router.get("/:username/blogs", listByUser);

module.exports = router;
