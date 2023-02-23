const Category = require("../models/Category");
const Slugify = require("slugify");
const { errorHandler } = require("../helpers/dbHandler");
const Blog = require("../models/Blog");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  const categoryExist = await Category.findOne({ name });
  const slug = Slugify(name).toLowerCase();
  if (categoryExist) {
    return res.status(400).json({ error: `Category is already exists` });
  }
  const saveCategory = new Category({ name, slug });
  await saveCategory
    .save()
    .then((result) => {
      return res
        .status(200)
        .json({ message: `${name} saved successfully` || result });
    })
    .catch((err) => {
      return res.status(500).json(errorHandler(err));
    });
};

exports.readCategory = async (req, res) => {
  await Category.find()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.readOne = async (req, res) => {
  const limit = req.body.limit ? parseInt(req.body.limit) : 3;
  const skip = req.body.skip ? parseInt(req.body.skip) : 0;
  const slug = req.params.slug.toLowerCase();
  try {
    const category = await Category.findOne({ slug });
    const blogs = await Blog.find({ categories: category })
      .populate("categories", "_id name slug")
      .populate("postedBy", "_id name username")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select("_id title slug excerpt categories postedBy createdAt updatedAt");
    return res
      .status(200)
      .json({ category: category, blogs, size: blogs.length });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteCategory = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  await Category.findOneAndRemove({ slug })
    .then((result) => {
      return res.status(200).json({ message: `${slug} deleted successfully` });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
