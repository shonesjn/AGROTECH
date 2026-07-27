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

  const fetchSensor = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/sensors/latest"
      );
      setSensor(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSensor();
    const interval = setInterval(fetchSensor, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const alerts = useMemo(() => {
    if (!sensor) return [];
    const list = [];
    if (sensor.temperature > 35) {
      list.push({
        id: "temp-high",
        icon: <Thermometer size={18} />,
        title: "High Temperature",
        message: "Temperature is above the safe threshold. Consider irrigation to reduce crop heat stress.",
        color: "text-red-400",
        bg: "bg-red-500/10",
        borderColor: "border-red-500/30",
        glow: "shadow-[0_0_15px_rgba(239,68,68,0.2)]",
      });
    }
    if (sensor.moisture < 30) {
      list.push({
        id: "moisture-low",
        icon: <Droplets size={18} />,
        title: "Low Soil Moisture",
        message: "Soil moisture is critically low. Irrigation is recommended immediately.",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        glow: "shadow-[0_0_15px_rgba(59,130,246,0.2)]",
      });
    }
    if (sensor.light < 300) {
      list.push({
        id: "light-low",
        icon: <Sun size={18} />,
        title: "Low Light Intensity",
        message: "The LDR indicates low light conditions. Crop photosynthesis may reduce.",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        glow: "shadow-[0_0_15px_rgba(234,179,8,0.2)]",
      });
    }
    if (sensor.tilt) {
      list.push({
        id: "tilt",
        icon: <TriangleAlert size={18} />,
        title: "Tilt Detected",
        message: "Tilt sensor detected movement. Please inspect the field device.",
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
        glow: "shadow-[0_0_15px_rgba(249,115,22,0.2)]",
      });
    }
    if (list.length === 0) {
      list.push({
        id: "healthy",
        icon: <Leaf size={18} />,
        title: "Healthy Farm",
        message: "All monitored environmental parameters are within the optimal range.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30",
        glow: "shadow-[0_0_15px_rgba(16,185,129,0.2)]",
      });
    }
    return list;
  }, [sensor]);

  useEffect(() => {
    alerts.forEach((alert) => {
      if (!spokenAlerts.current.has(alert.id)) {
        speak(alert.message);
        spokenAlerts.current.add(alert.id);
      }
    });
  }, [alerts]);

  if (!sensor) {
    return (
      <div className="rounded-xl bg-primary/5 border border-primary/20 glow-emerald p-8 flex justify-center items-center h-64">
        <p className="text-primary font-bold tracking-[0.2em] uppercase text-xs animate-pulse">Loading AI Engine...</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-[#05131e]/90 to-[#020508]/95 backdrop-blur-3xl border border-primary/30 shadow-[0_15px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(78,222,163,0.1)] overflow-hidden flex flex-col justify-between group">
      {/* Animated Background Orbs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Laser highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/80 to-transparent shadow-[0_0_15px_rgba(78,222,163,0.8)] opacity-70"></div>
      {/* Header */}
      <div className="relative z-10 border-b border-primary/20 p-6 md:p-8 flex justify-between items-center bg-gradient-to-r from-primary/10 to-transparent">
        <div className="flex items-center gap-5 md:gap-6">
          <div className="relative h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/30 shadow-[inset_0_0_15px_rgba(78,222,163,0.2),0_0_20px_rgba(78,222,163,0.3)]">
            <div className="absolute inset-0 rounded-2xl border border-primary/50 animate-ping opacity-20"></div>
            <BrainCircuit className="text-primary drop-shadow-[0_0_8px_rgba(78,222,163,1)]" size={32} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight drop-shadow-sm">
              AgroTech Alert Panel
            </h2>
            <div className="flex items-center gap-2 mt-1.5">
              <Sparkles className="text-primary animate-pulse" size={14} />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-black drop-shadow-[0_0_5px_rgba(78,222,163,0.8)]">
                {isMuted ? "Audio Muted" : isSpeaking ? "Voice Active..." : "Live Monitoring"}
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex gap-3 md:gap-4">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              if (!isMuted) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              } else if (lastAlert) {
                // Play last alert when turning audio back on if it exists
                // We must use a timeout to avoid react state race conditions with isMuted
                setTimeout(() => {
                  if (window.speechSynthesis) {
                     window.speechSynthesis.cancel();
                     const speech = new SpeechSynthesisUtterance(lastAlert);
                     speech.rate = 0.95;
                     speech.pitch = 1;
                     speech.volume = 1;
                     speech.lang = "en-US";
                     speech.onstart = () => setIsSpeaking(true);
                     speech.onend = () => setIsSpeaking(false);
                     window.speechSynthesis.speak(speech);
                  }
                }, 50);
              }
            }}
            className={`group relative flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full transition-all duration-500 ease-out border shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer ${
              isMuted
                ? "bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20"
                : "bg-primary/5 border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(78,222,163,0.3)]"
            }`}
          >
            {/* Animated Glow when speaking */}
            {!isMuted && isSpeaking && (
              <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-40"></div>
            )}
            
            {/* Icon Container */}
            <div className="relative z-10 flex items-center justify-center transition-colors">
              {isMuted ? (
                <VolumeX size={20} className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-transform duration-300 group-hover:scale-110" />
              ) : (
                <div className="relative flex items-center justify-center">
                  <Volume2 size={20} className="drop-shadow-[0_0_8px_rgba(78,222,163,0.8)] transition-transform duration-300 group-hover:scale-110" />
                  {isSpeaking && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="relative z-10 p-6 md:p-8 flex-1 bg-black/20">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_5px_rgba(78,222,163,1)]"></span>
          Real-Time Diagnostics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`group/card relative flex items-start gap-5 p-5 md:p-6 rounded-2xl border bg-gradient-to-br from-[#061219]/80 to-[#020508]/90 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-default overflow-hidden ${alert.borderColor}`}
            >
              {/* Card Hover Glow */}
              <div className={`absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ${alert.bg} blur-2xl`}></div>
              
              <div className={`relative z-10 h-12 w-12 md:h-14 md:w-14 rounded-xl flex items-center justify-center border shrink-0 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)] transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-6 ${alert.bg} ${alert.borderColor} ${alert.color}`}>
                {alert.icon}
              </div>
              <div className="relative z-10 pt-1">
                <h4 className={`text-base md:text-lg font-black tracking-wide drop-shadow-md ${alert.color}`}>
                  {alert.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}