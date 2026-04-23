const mongoose = require("mongoose");   // ✅ important

const grievanceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    enum: ["Academic", "Hostel", "Transport", "Other"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved"],
    default: "Pending"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }
});

module.exports = mongoose.model("Grievance", grievanceSchema);