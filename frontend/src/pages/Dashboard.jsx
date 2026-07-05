import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SensorCard from "../components/SensorCard";
import ChartSection from "../components/ChartSection";
import WeatherWidget from "../components/WeatherWidget";
import AIAlertPanel from "../components/AIAlertPanel";

import {
  Cpu,
  Database,
  Server,
  ShieldCheck,
} from "lucide-react";

import {
  FaTemperatureHigh,
  FaTint,
  FaCloudRain,
  FaSun,
} from "react-icons/fa";

export default function Dashboard() {

  const [sensor, setSensor] = useState(null);

  const fetchLatestSensor = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/sensors/latest"
      );

      setSensor(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLatestSensor();

    const interval = setInterval(fetchLatestSensor, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!sensor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#08111F] text-white">
        <h2 className="text-2xl font-semibold">
          Loading Sensor Data...
        </h2>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#08111F] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">

        {/* Navbar */}
        <Navbar />

        {/* ================= HERO ================= */}

        <section className="mt-10">

          <p className="uppercase tracking-[0.25em] text-sm text-green-400 font-semibold">
            Smart Farm Control Center
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Good Morning 👋
          </h1>

          <p className="mt-4 max-w-3xl text-base text-gray-400 leading-7">
            Monitor real-time sensor values, AI insights,
            blockchain records and your farm health from one
            intelligent dashboard.
          </p>

        </section>

       
        {/* ================= SENSOR CARDS ================= */}

        <section className="mt-14">

          <div>

            <h2 className="text-2xl font-bold">
              Real-Time Sensor Monitoring
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Live environmental data from connected IoT devices.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            <SensorCard
              title="Temperature"
              value={sensor.temperature.toFixed(1)}
              unit="°C"
              status={
                sensor.temperature > 35
                  ? "High"
                  : sensor.temperature < 20
                  ? "Low"
                  : "Normal"
              }
              updated="Live"
              color="#ef4444"
              icon={<FaTemperatureHigh size={22} />}
            />

            <SensorCard
              title="Humidity"
              value={sensor.humidity.toFixed(1)}
              unit="%"
              status={
                sensor.humidity > 80
                  ? "High"
                  : sensor.humidity < 40
                  ? "Low"
                  : "Good"
              }
              updated="Live"
              color="#06b6d4"
              icon={<FaCloudRain size={22} />}
            />

            <SensorCard
              title="Soil Moisture"
              value={sensor.moisture.toFixed(1)}
              unit="%"
              status={
                sensor.moisture < 30
                  ? "Dry"
                  : sensor.moisture > 70
                  ? "Wet"
                  : "Optimal"
              }
              updated="Live"
              color="#3b82f6"
              icon={<FaTint size={22} />}
            />

            <SensorCard
              title="Light Intensity"
              value={sensor.light}
              unit=""
              status={
                sensor.light > 700
                  ? "Bright"
                  : sensor.light > 300
                  ? "Normal"
                  : "Low"
              }
              updated="Live"
              color="#facc15"
              icon={<FaSun size={22} />}
            />

          </div>

        </section>

        {/* ================= ANALYTICS ================= */}

        <section className="mt-14">

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            <div className="space-y-8">
              <ChartSection />
            </div>

            <div className="space-y-8">
              <WeatherWidget />
              <AIAlertPanel />
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}