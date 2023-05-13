var jwt = require("jsonwebtoken");

const Update = async (req, res, next) => {
  const token = req.headers.authorization;
  const payload = req.body;
  try {
    var decoded = jwt.verify(token, "mock-14");
    if (payload.UserId === decoded.userId) {
      next();
    } else {
      res.status(400).send({ message: "Not Authorized" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message, status: "Not authorized" });
  }
};

module.exports = { Update };
