const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.json({ message: "No token" });

  const decoded = jwt.verify(token, "secret");
  req.user = decoded.id;

  next();
};