import Sensor from "../models/Sensor.js";

// POST /api/sensors
export const addSensorData = async (req, res) => {
  try {
    const sensor = await Sensor.create(req.body);

    res.status(201).json(sensor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/sensors/latest
export const getLatestSensorData = async (req, res) => {
  try {
    const latest = await Sensor.findOne().sort({ createdAt: -1 });

    res.json(latest);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/sensors/history
export const getSensorHistory = async (req, res) => {
  try {
    const history = await Sensor.find().sort({ createdAt: -1 }).limit(100);

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};