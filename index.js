const express = require("express");
const app = express();
var cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { blogRouter } = require("./routes/blog.route");
app.use(cors());
app.use(express.json());
require("dotenv").config();

app.use("/", userRouter);
app.use("/blogs", blogRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`connected to mongoDB`);
  } catch (error) {
    console.log(error);
  }
  console.log(`listening on ${process.env.PORT}`);
});
