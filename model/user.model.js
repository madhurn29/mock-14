const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: String,
    pass: String,
    username: String,
    avatar: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);
module.exports = {UserModel};