const User = require("../models/User");
const Blog = require("../models/Blog");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const formidable = require("formidable");
const fs = require("fs");
const slugify = require("slugify");

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

exports.publicProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    !user && new Error(`${username} not found`);

    const blogs = await Blog.find({ postedBy: user._id })
      .populate("postedBy", "_id name username")
      .populate("categories", "_id name slug")
      .select("_id slug title excerpt categories postedBy updatedAt");
    return res.status(200).json({ user, blogs });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateUser = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Photo could not be uploaded" });
    }

    let user = req.profile;
    user = _.extend(user, fields);

    if (fields.username) {
      user.username = slugify(fields.username).toLowerCase();
    }

    if (fields.password && fields.password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password should be min 6 characters long" });
    }

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({ error: "Image shoud be less than 1mb" });
      }
      user.photo.data = fs.readFileSync(files.photo.filepath);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      user.photo = undefined;
      res.json(user);
    });
  });
};

exports.photoUser = (req, res) => {
  const username = req.params.username;
  User.findOne({ username }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (user.photo.data) {
      res.set("Content-Type", user.photo.contentType);
      return res.send(user.photo.data);
    }
  });
};
