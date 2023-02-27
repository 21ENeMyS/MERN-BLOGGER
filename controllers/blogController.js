const Blog = require("../models/Blog");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const User = require("../models/User");
const formidable = require("formidable");
const slugify = require("slugify");
const { stripHtml } = require("string-strip-html");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbHandler");
const fs = require("fs");
const { smartTrim } = require("../helpers/blog");

exports.createBlog = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not upload" });
    }
    const { title, body, categories } = fields;

    if (!title || !title.length) {
      return res.status(400).json({
        error: "title is required",
      });
    }

    if (!body || body.length < 200) {
      return res.status(400).json({
        error: "Content is too short",
      });
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({
        error: "At least one category is required",
      });
    }

    let blog = new Blog();
    blog.title = title;
    blog.body = body;
    blog.excerpt = smartTrim(body, 320, "", "...");
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    blog.mdesc = stripHtml(body.substring(0, 160)).result;
    blog.postedBy = req.auth._id;

    let arrayOfCategories = categories ? categories.split(",") : [];
    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res
          .status(400)
          .json({ error: "Image should be less then 1mb in size" });
      }
      blog.photo.data = fs.readFileSync(files.photo.filepath);
      blog.photo.contentType = files.photo.type;
    }
    try {
      const blogDocument = await blog.save();
      const result = await Blog.findByIdAndUpdate(
        blogDocument._id,
        { $push: { categories: arrayOfCategories } },
        { new: true }
      );
      await res.json(result);
    } catch (err) {
      res.status(400).json({ error: errorHandler(err) });
    }
  });
};

exports.readAll = (req, res) => {
  Blog.find()
    .populate("categories", "_id name slug")
    .populate("postedBy", "_id name username")
    .select(
      "_id title slug excerpt categories tags postedBy createdAt updatedAt"
    )
    .then((data) => res.json(data))
    .catch((err) => res.json({ error: errorHandler(err) }));
};

exports.limitBlog = async (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 9;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  try {
    const blogs = await Blog.find()
      .populate("postedBy", "_id name username profile")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select(
        "_id title slug excerpt categories  postedBy createdAt updatedAt"
      );
    return res.json({ blogs, size: blogs.length });
  } catch (error) {
    return res.status(400).json({ error: errorHandler(error) });
  }
};

exports.blogsWithCategories = async (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 9;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  try {
    const blogs = await Blog.find()
      .populate("categories", "_id name slug")
      .populate("postedBy", "_id name username profile")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select(
        "_id title slug excerpt categories  postedBy createdAt updatedAt"
      );
    const categories = await Category.find();
    return res.json({ blogs, categories, size: blogs.length });
  } catch (error) {
    return res.status(400).json({ error: errorHandler(error) });
  }
};

exports.readOne = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    const blog = await Blog.findOne({ slug })
      .populate("categories", "_id name slug")
      .populate("postedBy", "_id name username profile")
      .select(
        "_id title body slug mtitle mdesc categories postedBy createdAt updatedAt"
      );
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error: errorHandler(error) });
  }
};
exports.removed = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    await Blog.findOneAndRemove({ slug });
    return res.json({ message: "Blog deleted sucessfully" });
  } catch (error) {
    return res.status(400).json({ error: errorHandler(error) });
  }
};

exports.updated = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Blog.findOne({ slug }).exec((err, oldBlog) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not upload",
        });
      }

      let slugBeforeMerge = oldBlog.slug;
      oldBlog = _.merge(oldBlog, fields);
      oldBlog.slug = slugBeforeMerge;

      const { body, desc, categories } = fields;

      if (body) {
        oldBlog.excerpt = smartTrim(body, 320, " ", " ...");
        oldBlog.desc = stripHtml(body.substring(0, 160));
      }

      if (categories) {
        oldBlog.categories = categories.split(",");
      }

      if (files.photo) {
        if (files.photo.size > 10000000) {
          return res.status(400).json({
            error: "Image should be less then 1mb in size",
          });
        }
        oldBlog.photo.data = fs.readFileSync(files.photo.filepath);
        oldBlog.photo.contentType = files.photo.type;
      }

      oldBlog.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(result);
      });
    });
  });
};

exports.photo = async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  try {
    const blog = await Blog.findOne({ slug }).select("photo");
    if (!blog) throw new Error({ message: "Blog not found " });
    res.set("Content-Type", blog.photo.contentType);
    return res.send(blog.photo.data);
  } catch (error) {
    return res.status(400).json({ error: errorHandler(error) });
  }
};

exports.Related = async (req, res) => {
  const limit = req.body.limit ? parseint(req.body.limit) : 3;
  const { _id, categories } = req.body.blog;
  try {
    const blogs = await Blog.find({
      _id: { $ne: _id },
      categories: { $in: categories },
    })
      .limit(limit)
      .populate("postedBy", "_id name username profile")
      .select("title slug excerpt postedBy createdAt updatedAt");
    return await res.json(blogs);
  } catch (error) {
    return res.status(400).json({ error: "Blogs not found" });
  }
};

exports.searchBlog = async (req, res) => {
  const { search } = req.query;
  try {
    if (!search) {
      error = new Error("A search query is needed to find the blogs");
      error.statusCode = 404;
      throw error;
    }
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { body: { $regex: search, $options: "i" } },
      ],
    }).select("-photo -body");
    return res.json(blogs);
  } catch (error) {
    const { message } = error;
    const status = error.statusCode || 500;
    return res.status(status).json({ error: message });
  }
};

exports.listBySort = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Blog.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Blogs not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.listByUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const blogs = await Blog.find({ postedBy: user._id })
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name username")
      .select("_id title slug postedBy createdAt updatedAt");
    return res.json(blogs);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
