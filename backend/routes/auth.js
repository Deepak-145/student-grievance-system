const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await Student.findOne({ email });
  if (exist) return res.json({ message: "Email exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = new Student({ name, email, password: hash });
  await user.save();

  res.json({ message: "Registered" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });
  if (!user) return res.json({ message: "Invalid email" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, "secret");

  res.json({ token });
});

module.exports = router;