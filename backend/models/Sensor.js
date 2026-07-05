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
  },
  {
    timestamps: true,
  }
);

const Sensor = mongoose.model("Sensor", sensorSchema);

export default Sensor;