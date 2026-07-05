import Sensor from "../models/Sensor.js";

const random = (min, max) =>
  +(Math.random() * (max - min) + min).toFixed(1);

const randomLight = () =>
  Math.floor(Math.random() * (1023 - 200) + 200);

const randomTilt = () =>
  Math.random() < 0.05; // 5% chance

const generateSensorData = async () => {
  try {
    const sensor = await Sensor.create({
      temperature: random(26, 35),
      humidity: random(55, 85),
      moisture: random(25, 80),
      light: randomLight(),
      tilt: randomTilt(),
    });

    console.log("✅ Sensor Data Added");
    console.log(sensor);
  } catch (err) {
    console.log(err.message);
  }
};

export default function startSimulator() {
  console.log("🌱 Virtual Sensor Started...");

  generateSensorData();

  setInterval(generateSensorData, 5000);
}