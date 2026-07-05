import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import sensorRoutes from "./routes/sensorRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB().then(() => {
  console.log("MongoDB Connected");
  console.log("Waiting for ESP32 (Wokwi) data...");
});

// Home Route
app.get("/", (req, res) => {
  res.send("AGRO Backend Running...");
});

// Sensor Routes
app.use("/api/sensors", sensorRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});