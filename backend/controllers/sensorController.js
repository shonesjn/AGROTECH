import Sensor from "../models/Sensor.js";

// POST /api/sensors
export const addSensorData = async (req, res) => {
  try {
    const {
      temperature,
      humidity,
      moisture,
      light,
      tilt,

      temperatureConfidence = 100,
      humidityConfidence = 100,
      moistureConfidence = 100,
      lightConfidence = 100,
      tiltConfidence = 100,

      overallConfidence = 100,
      status = "Reliable",
    } = req.body;

    if (
      temperature === undefined ||
      humidity === undefined ||
      moisture === undefined ||
      light === undefined
    ) {
      return res.status(400).json({
        message: "Missing required sensor values",
      });
    }

    const sensor = await Sensor.create({
      temperature,
      humidity,
      moisture,
      light,
      tilt,

      temperatureConfidence,
      humidityConfidence,
      moistureConfidence,
      lightConfidence,
      tiltConfidence,

      overallConfidence,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Sensor data stored successfully",
      data: sensor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/sensors/latest
export const getLatestSensorData = async (req, res) => {
  try {
    const latest = await Sensor.findOne().sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({
        success: false,
        message: "No sensor data found",
      });
    }

    res.json({
      success: true,
      data: latest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/sensors/history
export const getSensorHistory = async (req, res) => {
  try {
    const history = await Sensor.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};