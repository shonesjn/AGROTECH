import { useEffect, useState } from "react";
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

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/sensors/history"
      );

      // The backend returns data sorted by newest first (createdAt: -1).
      // We want the newest `range` items, but plotted chronologically (oldest on left, newest on right).
      const latest = res.data.data.slice(0, range).reverse();

      const formatted = latest.map((item) => ({
        time: new Date(item.createdAt).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).toLowerCase(),
        temp: item.temperature,
        humidity: item.humidity,
        moisture: item.moisture,
        light: item.light,
      }));

      setChartData(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, [range]);

  return (
    <section>
      {/* Outside Heading and Toolbar */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between">
          <h4 className="font-body-lg font-bold text-on-surface uppercase tracking-wider">Sensor Analytics</h4>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]"></div>
            <span className="font-[JetBrains_Mono] text-blue-500 text-[10px] uppercase font-bold tracking-widest">HISTORICAL TRENDS</span>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Custom Legend */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2.5 px-3 py-1.5 border border-[#ffb4ab]/20 bg-[#ffb4ab]/10 rounded-none">
              <div className="w-4 h-1 bg-[#ffb4ab] rounded-full shadow-[0_0_8px_rgba(255,180,171,0.8)]"></div>
              <span className="text-[9px] sm:text-[10px] text-[#ffb4ab] font-black tracking-widest uppercase">TEMPERATURE</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 border border-[#4edea3]/20 bg-[#4edea3]/10 rounded-none">
              <div className="w-4 h-0 border-t-2 border-dashed border-[#4edea3]"></div>
              <span className="text-[9px] sm:text-[10px] text-[#4edea3] font-black tracking-widest uppercase">HUMIDITY</span>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1.5 border border-white/5 rounded-none backdrop-blur-md">
            {[
              { label: '1 Min', value: 12 },
              { label: '5 Min', value: 60 },
              { label: '10 Min', value: 120 },
              { label: '20 Min', value: 240 }
            ].map((r) => (
              <button
                key={r.value}
                onClick={() => setRange(r.value)}
                className={`px-4 sm:px-6 py-2.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all rounded-none ${
                  range === r.value 
                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Box */}
      <div className="relative border border-white/[0.05] bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-8 xl:p-10 overflow-hidden rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        {/* Chart */}
        <div className="h-[350px] sm:h-[450px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                tick={{ fill: "#6b7280", fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={false}
                dy={15}
              />

              <YAxis
                tick={{ fill: "#6b7280", fontSize: 10, fontWeight: 700 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={false}
                dx={-10}
              />

              <Tooltip
                contentStyle={{
                  background: "rgba(10, 15, 25, 0.9)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "0px",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "700",
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8)",
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
                itemStyle={{ fontWeight: "black" }}
              />

              <Area
                type="monotone"
                dataKey="temp"
                name="Temperature (°C)"
                stroke="#ffb4ab"
                strokeWidth={3}
                fill="url(#temp)"
                activeDot={{ r: 6, fill: "#ffb4ab", stroke: "#000", strokeWidth: 3, style: { filter: "drop-shadow(0px 0px 10px rgba(255,180,171,1))" } }}
              />

              <Area
                type="monotone"
                dataKey="humidity"
                name="Humidity (%)"
                stroke="#4edea3"
                strokeWidth={2}
                fill="url(#humidity)"
                strokeDasharray="5 5"
                activeDot={{ r: 5, fill: "#4edea3", stroke: "#000", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}