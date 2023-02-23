const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Category = new mongoose.model(
  "Category",
  mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: true,
        max: 32,
      },
      slug: {
        type: String,
        unique: true,
        index: true,
      },

      postedBy: [{ type: ObjectId, ref: "User", required: true }],
    },
    { timestamps: true }
  )
);

module.exports = Category;
