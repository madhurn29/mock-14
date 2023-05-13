var jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log("url => ", req.url);
  try {
    var decoded = jwt.verify(token, "mock-14");
    if (req.method === "POST") {
      req.body.username = decoded.username;
      req.body.UserId = decoded.userId;
    } else if (req.method === "PATCH" && req.url.includes("comment")) {
      req.body.username = decoded.username;
    }

    next();
  } catch (err) {
    res.status(400).send({ message: err.message, status: "Not authorized" });
  }
};

module.exports = { Auth };
