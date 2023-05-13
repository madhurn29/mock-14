const { BlogModel } = require("../model/blogs.model");

const PostBlogController = async (req, res) => {
  let date = new Date();
  let date1 = date.getDate();
  let month = date.getMonth();
  let year = date.getYear() - 100;

  req.body.date = `${date1}-${month}-${year}`;

  req.body.likes = 0;
  req.body.comments = [];
  try {
    const blog = new BlogModel(req.body);
    await blog.save();
    res.status(200).send({ message: "Blog posted successfully!" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const LikesController = async (req, res) => {
  console.log(req.params, "params");
  const { id } = req.params;

  try {
    const blog = await BlogModel.findOne({ _id: id });
    const payload = { likes: blog.likes + 1 };

    await BlogModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ message: "Likes upated" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const CommentController = async (req, res) => {
  console.log(req.params, "params");
  const { id } = req.params;
  const payload = req.body;

  try {
    const blog = await BlogModel.findOne({ _id: id });

    // console.log(blog)

    const body = { comments: [...blog.comments, payload] };

    await BlogModel.findByIdAndUpdate({ _id: id }, body);
    res.status(200).send({ message: "comment upated" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const GetPostController = async (req, res) => {
  const queryObj = {};
  const { title, category, page, limit, sort, order } = req.query;

  let dataLimit = limit || 5;
  let skipQuery = (page - 1) * dataLimit;
  let blogs;
  if (title) {
    queryObj.title = title;
  }
  if (category) {
    queryObj.category = category;
  }

  try {
    if (page) {
      blogs = await BlogModel.find(queryObj).skip(skipQuery).limit(dataLimit);
    } else if (sort && page) {
      blogs = await BlogModel.find(queryObj)
        .sort({ date: order === "asc" ? 1 : -1 })
        .skip(skipQuery)
        .limit(dataLimit);
    } else if (sort) {
      blogs = await BlogModel.find(queryObj).sort({
        date: order === "asc" ? 1 : -1,
      });
    } else {
      blogs = await BlogModel.find(queryObj);
    }

    res.status(200).send(blogs);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const EditBlogController = async (req, res) => {
  const { id } = req.params;
  try {
    await BlogModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ message: "Blog Edited successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};


const DeleteBlogController = async (req, res) => {
    const { id } = req.params;
    try {
      await BlogModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ message: "Blog Deleted successfully" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

module.exports = {
  PostBlogController,
  LikesController,
  CommentController,
  GetPostController,
  EditBlogController,
  DeleteBlogController
};
