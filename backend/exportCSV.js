import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import { Parser } from "json2csv";

import Sensor from "./models/Sensor.js";

dotenv.config();

async function exportData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    const sensors = await Sensor.find().sort({ createdAt: 1 }).lean();

    console.log(`Found ${sensors.length} records`);

    const fields = [
      "temperature",
      "humidity",
      "moisture",
      "light",
      "tilt",
      "temperatureConfidence",
      "humidityConfidence",
      "moistureConfidence",
      "lightConfidence",
      "tiltConfidence",
      "overallConfidence",
      "status",
      "createdAt"
    ];

    const parser = new Parser({ fields });

    const csv = parser.parse(sensors);

    fs.writeFileSync("sensor_data.csv", csv);

    console.log("✅ CSV exported successfully!");
    console.log("File: sensor_data.csv");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

exportData();
