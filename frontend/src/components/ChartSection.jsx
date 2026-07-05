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

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/sensors/history"
      );

      // Oldest → Newest
      const formatted = res.data
        .reverse()
        .map((item) => ({
          time: new Date(item.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
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
  }, []);

  return (
    <div className="rounded-3xl bg-[#111827] border border-white/10 p-6 shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-semibold text-white">
            Sensor Analytics
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Live Temperature & Humidity Trends
          </p>

        </div>

        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
          LIVE
        </span>

      </div>

      {/* Chart */}

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={chartData}>

            <defs>

              <linearGradient
                id="temp"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#22c55e"
                  stopOpacity={0.5}
                />

                <stop
                  offset="95%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />

              </linearGradient>

              <linearGradient
                id="humidity"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#38bdf8"
                  stopOpacity={0.5}
                />

                <stop
                  offset="95%"
                  stopColor="#38bdf8"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#1f2937"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              tick={{
                fill: "#9ca3af",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#9ca3af",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #22c55e",
                borderRadius: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="temp"
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#temp)"
            />

            <Area
              type="monotone"
              dataKey="humidity"
              stroke="#38bdf8"
              strokeWidth={3}
              fill="url(#humidity)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}