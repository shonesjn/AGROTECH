import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema(
  {
    temperature: {
      type: Number,
      required: true,
    },

    humidity: {
      type: Number,
      required: true,
    },

    moisture: {
      type: Number,
      required: true,
    },

    light: {
      type: Number,
      required: true,
    },

    tilt: {
      type: Boolean,
      default: false,
    },

    temperatureConfidence: {
      type: Number,
      default: 100,
    },

    humidityConfidence: {
      type: Number,
      default: 100,
    },

    moistureConfidence: {
      type: Number,
      default: 100,
    },

    lightConfidence: {
      type: Number,
      default: 100,
    },

    tiltConfidence: {
      type: Number,
      default: 100,
    },

    overallConfidence: {
      type: Number,
      default: 100,
    },

    status: {
      type: String,
      enum: ["Reliable", "Warning", "Anomaly"],
      default: "Reliable",
    },
  },
  {
    timestamps: true,
  }
);

const Sensor = mongoose.model("Sensor", sensorSchema);

export default Sensor;