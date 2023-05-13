const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 4;
var jwt = require("jsonwebtoken");
//* -------Register controllers---------//
const RegisterController = async (req, res) => {
  const { email, pass, username, avatar } = req.body;

  if (email && pass && avatar && username) {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.status(400).send({ message: "User already exists" });
    } else {
      try {
        bcrypt.hash(pass, saltRounds, async (err, hash) => {
          if (hash) {
            const user = new UserModel({ email, pass: hash, username, avatar });
            await user.save();
            res.status(200).send({ message: "Registered successfully" });
          } else {
            res.status(400).send({ message: err.message });
          }
        });
      } catch (error) {
        res.status(400).send({ message: error.message });
      }
    }
  } else {
    res.status(400).send({ message: "Enter all details" });
  }
};

//* -------Login controllers---------//
const LoginController = async (req, res) => {
  const { email, pass } = req.body;

  if (email && pass) {
    try {
      const user = await UserModel.findOne({ email });

      if (user) {
        bcrypt.compare(pass, user.pass, async (err, result) => {
          if (result) {
            res.status(200).send({
              message: "Login successful",
              token: jwt.sign(
                { userId: user._id, username: user.username },
                "mock-14"
              ),
            });
          } else {
            res.status(400).send({ message: "Invalid credentials" });
          }
        });
      } else {
        res.status(400).send({ message: "Please Register first" });
      }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  } else {
    res.status(400).send({ message: "Enter all details" });
  }
};
module.exports = { RegisterController, LoginController };
