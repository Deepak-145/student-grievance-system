require("dotenv").config();   // ✅ sabse upar

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api/grievances", require("./routes/grievance"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// Server
app.listen(process.env.PORT, () => 
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);