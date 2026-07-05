import express from "express";

import {
  addSensorData,
  getLatestSensorData,
  getSensorHistory,
} from "../controllers/sensorController.js";

const router = express.Router();

router.post("/", addSensorData);

router.get("/latest", getLatestSensorData);

router.get("/history", getSensorHistory);

export default router;