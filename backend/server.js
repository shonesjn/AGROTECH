import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB().then(() => {
  console.log("MongoDB Connected");
  console.log("Hybrid Sensor Reliability Module Enabled");
  console.log("Waiting for ESP32 Data...");
});

app.get("/", (req, res) => {
  res.json({
    project: "AGRO Smart Agriculture System",
    version: "2.0",
    status: "Running"
  });
});

app.use("/api/sensors", sensorRoutes);
app.use("/api/chat", chatRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});