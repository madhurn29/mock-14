const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    UserId: String,
    username: String,
    title: String,
    content: String,
    category: String,
    date: String,
    likes: Number,
    comments: [{ username: String, content: String }],
  },
  {
    versionKey: false,
  }
);

const BlogModel = mongoose.model("blog", blogSchema);
module.exports = { BlogModel };
