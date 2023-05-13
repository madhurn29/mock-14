const express = require("express");
const { Auth } = require("../middleware/Auth.middleware");
const {
  PostBlogController,
  LikesController,
  CommentController,
  GetPostController,
  EditBlogController,
  DeleteBlogController,
} = require("../controller/blogs.controller");
const { Update } = require("../middleware/Update.middleware");
const blogRouter = express.Router();

blogRouter.get("/", GetPostController);
blogRouter.use(Auth);
blogRouter.post("/", PostBlogController);
blogRouter.patch("/:id/like", LikesController);
blogRouter.patch("/:id/comment", CommentController);
blogRouter.use(Update);
blogRouter.patch("/:id", EditBlogController);
blogRouter.delete("/:id", DeleteBlogController);

module.exports = { blogRouter };
