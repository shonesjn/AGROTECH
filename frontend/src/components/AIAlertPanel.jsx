import {
  BrainCircuit,
  TriangleAlert,
  CheckCircle2,
  Droplets,
  Thermometer,
  Leaf,
  CloudSun,
  Volume2,
  VolumeX,
  Sparkles,
  Sun,
} from "lucide-react";

import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

export default function AIAlertPanel() {
  const spokenAlerts = useRef(new Set());

  const [sensor, setSensor] = useState(null);

  const [lastAlert, setLastAlert] = useState("");

  const [isSpeaking, setIsSpeaking] = useState(false);

  const [isMuted, setIsMuted] = useState(false);

  // -----------------------------
  // Fetch Latest Sensor Data
  // -----------------------------

  const fetchSensor = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/sensors/latest"
      );

      setSensor(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSensor();

    const interval = setInterval(fetchSensor, 5000);

    return () => clearInterval(interval);
  }, []);

  // -----------------------------
  // Speech
  // -----------------------------

  const speak = (text) => {
    if (isMuted) return;

    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;
    speech.lang = "en-US";

    speech.onstart = () => setIsSpeaking(true);

    speech.onend = () => setIsSpeaking(false);

    setLastAlert(text);

    window.speechSynthesis.speak(speech);
  };

  // -----------------------------
  // AI Rules
  // -----------------------------

  const alerts = useMemo(() => {
    if (!sensor) return [];

    const list = [];

    // Temperature

    if (sensor.temperature > 35) {
      list.push({
        id: "temp-high",
        icon: <Thermometer size={18} />,
        title: "High Temperature",
        message:
          "Temperature is above the safe threshold. Consider irrigation to reduce crop heat stress.",
        color: "text-red-400",
        bg: "bg-red-500/10",
      });
    }

    // Soil Moisture

    if (sensor.moisture < 30) {
      list.push({
        id: "moisture-low",
        icon: <Droplets size={18} />,
        title: "Low Soil Moisture",
        message:
          "Soil moisture is critically low. Irrigation is recommended immediately.",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
      });
    }

    // Light

    if (sensor.light < 300) {
      list.push({
        id: "light-low",
        icon: <Sun size={18} />,
        title: "Low Light Intensity",
        message:
          "The LDR indicates low light conditions. Crop photosynthesis may reduce.",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
      });
    }

    // Tilt

    if (sensor.tilt) {
      list.push({
        id: "tilt",
        icon: <TriangleAlert size={18} />,
        title: "Tilt Detected",
        message:
          "Tilt sensor detected movement. Please inspect the field device.",
        color: "text-orange-400",
        bg: "bg-orange-500/10",
      });
    }

    // Healthy

    if (list.length === 0) {
      list.push({
        id: "healthy",
        icon: <Leaf size={18} />,
        title: "Healthy Farm",
        message:
          "All monitored environmental parameters are within the optimal range.",
        color: "text-green-400",
        bg: "bg-green-500/10",
      });
    }

    return list;
  }, [sensor]);

  // -----------------------------
  // Speak only new alerts
  // -----------------------------

  useEffect(() => {
    alerts.forEach((alert) => {
      if (!spokenAlerts.current.has(alert.id)) {
        speak(alert.message);
        spokenAlerts.current.add(alert.id);
      }
    });
  }, [alerts]);

  // -----------------------------
  // Crop Health
  // -----------------------------

  const cropHealth = useMemo(() => {
    if (!sensor) return 0;

    let score = 100;

    if (sensor.temperature > 35) score -= 10;

    if (sensor.moisture < 30) score -= 20;

    if (sensor.light < 300) score -= 5;

    return Math.max(score, 60);
  }, [sensor]);

  // -----------------------------
  // Irrigation
  // -----------------------------

  const irrigation =
    sensor?.moisture < 30
      ? "Start Now"
      : sensor?.moisture < 50
      ? "Monitor"
      : "Not Required";
        if (!sensor) {
    return (
      <div className="rounded-3xl bg-[#111827] border border-white/10 shadow-xl p-8 flex justify-center items-center">
        <p className="text-gray-400">Loading AgroAI...</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-[#111827] border border-white/10 shadow-xl overflow-hidden">

      {/* Header */}

      <div className="border-b border-white/10 p-6 flex justify-between items-center">

        <div className="flex items-center gap-4">

          <div className="h-14 w-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">
            <BrainCircuit className="text-purple-400" size={28} />
          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              AgroAI Intelligence
            </h2>

            <p className="text-gray-400 text-sm">
              AI-powered Farm Monitoring
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          {/* Replay */}

          <button
            onClick={() => lastAlert && speak(lastAlert)}
            className="h-12 w-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center hover:bg-green-500/20 transition"
          >
            <Volume2 className="text-green-400" />
          </button>

          {/* Mute */}

          <button
            onClick={() => {
              setIsMuted(!isMuted);

              if (!isMuted) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }
            }}
            className={`h-12 w-12 rounded-xl border flex items-center justify-center transition ${
              isMuted
                ? "bg-red-500/10 border-red-500/20"
                : "bg-[#08111F] border-white/10"
            }`}
          >
            {isMuted ? (
              <VolumeX className="text-red-400" />
            ) : (
              <Volume2 className="text-green-400" />
            )}
          </button>

        </div>

      </div>

      {/* Status */}

      <div className="grid grid-cols-2 gap-4 p-6">

        <div className="rounded-2xl bg-[#08111F] p-4 border border-white/10">

          <p className="text-xs text-gray-500 uppercase">
            AI Engine
          </p>

          <div className="mt-2 flex items-center gap-2">

            <Sparkles
              className="text-purple-400"
              size={18}
            />

            <span className="font-semibold">
              AgroAI v2.0
            </span>

          </div>

        </div>

        <div className="rounded-2xl bg-[#08111F] p-4 border border-white/10">

          <p className="text-xs text-gray-500 uppercase">
            Status
          </p>

          <div className="mt-2 flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>

            <span className="text-green-400 font-semibold">

              {isMuted
                ? "Muted"
                : isSpeaking
                ? "Speaking..."
                : "Monitoring"}

            </span>

          </div>

        </div>

      </div>

      {/* Recommendations */}

      <div className="px-6 pb-4">

        <h3 className="font-semibold text-white mb-4">
          AI Recommendations
        </h3>

        <div className="space-y-4">

          {alerts.map((alert) => (

            <div
              key={alert.id}
              className={`rounded-2xl p-4 border border-white/10 ${alert.bg}`}
            >

              <div className="flex gap-4">

                <div className={alert.color}>
                  {alert.icon}
                </div>

                <div>

                  <h4 className={`font-semibold ${alert.color}`}>
                    {alert.title}
                  </h4>

                  <p className="text-sm text-gray-300 mt-1 leading-6">
                    {alert.message}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* AI Analysis */}

      <div className="grid grid-cols-3 gap-4 px-6 pb-6">

        <div className="rounded-2xl bg-[#08111F] p-4 border border-white/10">

          <Droplets className="text-blue-400 mb-2" />

          <h4 className="font-semibold">
            Irrigation
          </h4>

          <p className="text-sm text-gray-400 mt-2">
            {irrigation}
          </p>

        </div>

        <div className="rounded-2xl bg-[#08111F] p-4 border border-white/10">

          <CloudSun className="text-yellow-400 mb-2" />

          <h4 className="font-semibold">
            Temperature
          </h4>

          <p className="text-sm text-gray-400 mt-2">
            {sensor.temperature.toFixed(1)}°C
          </p>

        </div>

        <div className="rounded-2xl bg-[#08111F] p-4 border border-white/10">

          <Leaf className="text-green-400 mb-2" />

          <h4 className="font-semibold">
            Crop Health
          </h4>

          <p className="text-sm text-green-400 mt-2">
            {cropHealth}%
          </p>

        </div>

      </div>

      {/* Live Sensor Summary */}

      <div className="grid grid-cols-4 gap-4 px-6 pb-6">

        <div className="rounded-xl bg-[#08111F] p-3 text-center">

          <p className="text-xs text-gray-500">
            Temp
          </p>

          <h4 className="font-bold text-red-400">
            {sensor.temperature.toFixed(1)}°C
          </h4>

        </div>

        <div className="rounded-xl bg-[#08111F] p-3 text-center">

          <p className="text-xs text-gray-500">
            Humidity
          </p>

          <h4 className="font-bold text-cyan-400">
            {sensor.humidity.toFixed(1)}%
          </h4>

        </div>

        <div className="rounded-xl bg-[#08111F] p-3 text-center">

          <p className="text-xs text-gray-500">
            Moisture
          </p>

          <h4 className="font-bold text-blue-400">
            {sensor.moisture.toFixed(1)}%
          </h4>

        </div>

        <div className="rounded-xl bg-[#08111F] p-3 text-center">

          <p className="text-xs text-gray-500">
            Light
          </p>

          <h4 className="font-bold text-yellow-400">
            {sensor.light}
          </h4>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-white/10 p-5 flex justify-between items-center">

        <div className="flex items-center gap-2">

          <CheckCircle2
            className="text-green-400"
            size={18}
          />

          <span className="text-sm text-gray-300">
            {alerts.length} Active AI Insight{alerts.length !== 1 ? "s" : ""}
          </span>

        </div>

        <TriangleAlert
          className="text-yellow-400"
          size={18}
        />

      </div>

    </div>
  );
}