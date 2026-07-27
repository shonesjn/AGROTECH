import { useEffect, useState, useMemo } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function ChartSection() {
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState(60);
  const [viewMode, setViewMode] = useState("all"); // "all" | "changesOnly"
  const [showLabels, setShowLabels] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/sensors/history"
      );

      // Backend returns data sorted newest first (createdAt: -1).
      // Slice range items and reverse to get chronological order.
      const latest = res.data.data.slice(0, range).reverse();

      const formatted = latest.map((item, index) => {
        const prev = index > 0 ? latest[index - 1] : null;
        
        const tempVal = Number(item.temperature);
        const humVal = Number(item.humidity);

        const prevTemp = prev ? Number(prev.temperature) : null;
        const prevHum = prev ? Number(prev.humidity) : null;

        const tempChanged = prev ? tempVal !== prevTemp : true;
        const humidityChanged = prev ? humVal !== prevHum : true;

        const tempDiff = prev ? Math.round((tempVal - prevTemp) * 10) / 10 : 0;
        const humDiff = prev ? Math.round((humVal - prevHum) * 10) / 10 : 0;

        return {
          time: new Date(item.createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }).toLowerCase(),
          temp: tempVal,
          humidity: humVal,
          moisture: item.moisture,
          light: item.light,
          tempChanged,
          humidityChanged,
          tempDiff,
          humDiff,
          isChangePoint: tempChanged || humidityChanged,
        };
      });

      setChartData(formatted);
    } catch (err) {
      console.log("Error fetching sensor history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, [range]);

  const filteredData = useMemo(() => {
    if (viewMode === "changesOnly") {
      return chartData.filter((item) => item.isChangePoint);
    }
    return chartData;
  }, [chartData, viewMode]);

  const changeCounts = useMemo(() => {
    let tempChanges = 0;
    let humChanges = 0;
    chartData.forEach((d, idx) => {
      if (idx > 0) {
        if (d.tempChanged) tempChanges++;
        if (d.humidityChanged) humChanges++;
      }
    });
    return { tempChanges, humChanges };
  }, [chartData]);

  // Custom Dot Renderers to display badges at change points
  const renderTempDot = (props) => {
    const { cx, cy, payload, index } = props;
    if (!cx || !cy || !payload) return null;

    if (!payload.tempChanged) {
      return <circle key={`temp-dot-${index}`} cx={cx} cy={cy} r={2} fill="#ffb4ab" opacity={0.3} />;
    }

    return (
      <g key={`temp-change-${index}`}>
        {/* Outer Pulsing Aura */}
        <circle cx={cx} cy={cy} r={7} fill="#ffb4ab" fillOpacity={0.25} stroke="#ffb4ab" strokeWidth={1.5} />
        {/* Core Dot */}
        <circle cx={cx} cy={cy} r={4} fill="#ffb4ab" stroke="#0b1326" strokeWidth={2} />

        {/* Value Tag Badge on Change */}
        {showLabels && (
          <g transform={`translate(${cx}, ${cy - 16})`}>
            <rect
              x="-24"
              y="-15"
              width="48"
              height="18"
              rx="4"
              fill="#ffb4ab"
              stroke="#ffb4ab"
              strokeWidth="1"
              style={{ filter: "drop-shadow(0px 2px 6px rgba(255,180,171,0.5))" }}
            />
            <text
              x="0"
              y="-3"
              textAnchor="middle"
              fill="#380704"
              fontSize="10"
              fontWeight="900"
              fontFamily="JetBrains Mono, monospace"
            >
              {payload.temp}°C
            </text>
          </g>
        )}
      </g>
    );
  };

  const renderHumidityDot = (props) => {
    const { cx, cy, payload, index } = props;
    if (!cx || !cy || !payload) return null;

    if (!payload.humidityChanged) {
      return <circle key={`hum-dot-${index}`} cx={cx} cy={cy} r={2} fill="#4edea3" opacity={0.3} />;
    }

    return (
      <g key={`hum-change-${index}`}>
        {/* Outer Pulsing Aura */}
        <circle cx={cx} cy={cy} r={7} fill="#4edea3" fillOpacity={0.25} stroke="#4edea3" strokeWidth={1.5} />
        {/* Core Dot */}
        <circle cx={cx} cy={cy} r={4} fill="#4edea3" stroke="#0b1326" strokeWidth={2} />

        {/* Value Tag Badge on Change */}
        {showLabels && (
          <g transform={`translate(${cx}, ${cy + 22})`}>
            <rect
              x="-22"
              y="-12"
              width="44"
              height="18"
              rx="4"
              fill="#4edea3"
              stroke="#4edea3"
              strokeWidth="1"
              style={{ filter: "drop-shadow(0px 2px 6px rgba(78,222,163,0.5))" }}
            />
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fill="#002113"
              fontSize="10"
              fontWeight="900"
              fontFamily="JetBrains Mono, monospace"
            >
              {payload.humidity}%
            </text>
          </g>
        )}
      </g>
    );
  };

  // Custom Tooltip with change indicators
  const CustomTooltipContent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#0b1326]/95 backdrop-blur-md border border-white/10 p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-[JetBrains_Mono] text-xs min-w-[200px]">
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider mb-2 border-b border-white/10 pb-1 flex justify-between">
            <span>TIME: {label}</span>
            {data.isChangePoint && (
              <span className="text-amber-400 font-black animate-pulse">⚡ VALUE CHANGED</span>
            )}
          </p>

          {/* Temp */}
          <div className="flex items-center justify-between py-1 text-[#ffb4ab]">
            <span className="font-semibold text-[11px]">Temperature:</span>
            <div className="flex items-center gap-1.5 font-black">
              <span>{data.temp}°C</span>
              {data.tempChanged && data.tempDiff !== 0 && (
                <span className={`text-[10px] px-1 py-0.5 rounded ${data.tempDiff > 0 ? "bg-red-500/20 text-red-300" : "bg-blue-500/20 text-blue-300"}`}>
                  {data.tempDiff > 0 ? `▲ +${data.tempDiff}` : `▼ ${data.tempDiff}`}
                </span>
              )}
            </div>
          </div>

          {/* Humidity */}
          <div className="flex items-center justify-between py-1 text-[#4edea3]">
            <span className="font-semibold text-[11px]">Humidity:</span>
            <div className="flex items-center gap-1.5 font-black">
              <span>{data.humidity}%</span>
              {data.humidityChanged && data.humDiff !== 0 && (
                <span className={`text-[10px] px-1 py-0.5 rounded ${data.humDiff > 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                  {data.humDiff > 0 ? `▲ +${data.humDiff}` : `▼ ${data.humDiff}`}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section>
      {/* Outside Heading and Toolbar */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="font-body-lg font-bold text-on-surface uppercase tracking-wider">Sensor Analytics</h4>
            <p className="text-xs text-gray-400 mt-0.5">
              Highlighting real-time Temperature & Humidity shift points
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]"></div>
              <span className="font-[JetBrains_Mono] text-blue-400 text-[10px] uppercase font-bold tracking-widest">HISTORICAL TRENDS</span>
            </div>

            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5">
              <span className="font-[JetBrains_Mono] text-amber-400 text-[10px] uppercase font-bold tracking-widest">
                CHANGES DETECTED: T({changeCounts.tempChanges}) / H({changeCounts.humChanges})
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Custom Legend & Display Toggles */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 px-3 py-1.5 border border-[#ffb4ab]/20 bg-[#ffb4ab]/10">
              <div className="w-4 h-1 bg-[#ffb4ab] rounded-full shadow-[0_0_8px_rgba(255,180,171,0.8)]"></div>
              <span className="text-[9px] sm:text-[10px] text-[#ffb4ab] font-black tracking-widest uppercase">TEMP (°C)</span>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-1.5 border border-[#4edea3]/20 bg-[#4edea3]/10">
              <div className="w-4 h-0 border-t-2 border-dashed border-[#4edea3]"></div>
              <span className="text-[9px] sm:text-[10px] text-[#4edea3] font-black tracking-widest uppercase">HUMIDITY (%)</span>
            </div>

            {/* Toggle Badges Visibility */}
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`px-3 py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest border transition-all ${
                showLabels
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {showLabels ? "🏷️ Badges: ON" : "🏷️ Badges: OFF"}
            </button>
          </div>

          {/* View Mode & Time Range Selector */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Filter */}
            <div className="flex items-center bg-black/40 p-1 border border-white/5 backdrop-blur-md">
              <button
                onClick={() => setViewMode("all")}
                className={`px-3 py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewMode === "all"
                    ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                All Data
              </button>
              <button
                onClick={() => setViewMode("changesOnly")}
                className={`px-3 py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewMode === "changesOnly"
                    ? "bg-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.5)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                ⚡ Change Points Only
              </button>
            </div>

            {/* Range Buttons */}
            <div className="flex items-center gap-1 bg-black/40 p-1 border border-white/5 backdrop-blur-md">
              {[
                { label: "1 Min", value: 12 },
                { label: "5 Min", value: 60 },
                { label: "10 Min", value: 120 },
                { label: "20 Min", value: 240 },
              ].map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRange(r.value)}
                  className={`px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${
                    range === r.value
                      ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Box */}
      <div className="relative border border-white/[0.05] bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-8 xl:p-10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        {/* Chart */}
        <div className="h-[380px] sm:h-[480px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 25, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffb4ab" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ffb4ab" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="humidity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4edea3" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4edea3" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="time"
                tick={{ fill: "#6b7280", fontSize: 10, fontWeight: 700, letterSpacing: "0.05em" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
                dy={10}
              />

              <YAxis
                tick={{ fill: "#6b7280", fontSize: 10, fontWeight: 700 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
                dx={-10}
              />

              <Tooltip content={<CustomTooltipContent />} />

              <Area
                type="monotone"
                dataKey="temp"
                name="Temperature (°C)"
                stroke="#ffb4ab"
                strokeWidth={3}
                fill="url(#temp)"
                dot={renderTempDot}
                activeDot={{
                  r: 8,
                  fill: "#ffb4ab",
                  stroke: "#0b1326",
                  strokeWidth: 3,
                  style: { filter: "drop-shadow(0px 0px 10px rgba(255,180,171,1))" },
                }}
              />

              <Area
                type="monotone"
                dataKey="humidity"
                name="Humidity (%)"
                stroke="#4edea3"
                strokeWidth={2.5}
                fill="url(#humidity)"
                strokeDasharray="5 5"
                dot={renderHumidityDot}
                activeDot={{ r: 7, fill: "#4edea3", stroke: "#0b1326", strokeWidth: 2.5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}