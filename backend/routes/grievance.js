const express = require("express");
const router = express.Router();
const Grievance = require("../models/Grievance");
const auth = require("../middleware/auth");

// Create
router.post("/", auth, async (req, res) => {
  const g = new Grievance({ ...req.body, userId: req.user });
  await g.save();
  res.json(g);
});

// Get all
router.get("/", auth, async (req, res) => {
  const data = await Grievance.find({ userId: req.user });
  res.json(data);
});

// Update
router.put("/:id", auth, async (req, res) => {
  const updated = await Grievance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;