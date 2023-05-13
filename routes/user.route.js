const express = require("express");
const {
  LoginController,
  RegisterController,
} = require("../controller/user.controller");
const { model } = require("mongoose");
const userRouter = express.Router();

userRouter.post("/register", RegisterController);
userRouter.post("/login", LoginController);

module.exports = { userRouter };
