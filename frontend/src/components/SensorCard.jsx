import { Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function SensorCard({
  title,
  value,
  unit,
  icon,
  color,
  status,
  updated = "Just now",
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{ duration: 0.25 }}
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#111827]
        p-5
        shadow-lg
        transition-all
        duration-300
        hover:border-green-400/40
        hover:shadow-green-500/10
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          opacity-10
          blur-3xl
        "
        style={{ background: color }}
      />

      {/* Header */}

      <div className="flex items-center justify-between">

        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            background: `${color}20`,
            color,
          }}
        >
          {icon}
        </div>

        <div className="flex items-center gap-1">

          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>

          <span className="text-[10px] font-semibold uppercase tracking-wider text-green-400">
            Live
          </span>

        </div>

      </div>

      {/* Title */}

      <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-gray-400">
        {title}
      </p>

      {/* Value */}

      <div className="mt-2 flex items-end gap-1">

        <h1 className="text-2xl font-bold leading-none text-white">
          {value}
        </h1>

        {unit && (
          <span className="mb-1 text-lg font-medium text-gray-400">
            {unit}
          </span>
        )}

      </div>

      {/* Footer */}

      <div className="mt-5 flex items-center justify-between">

        <div>

          <p className="text-[10px] uppercase tracking-wide text-gray-500">
            Status
          </p>

          <p
            className="mt-1 text-sm font-semibold"
            style={{ color }}
          >
            {status}
          </p>

        </div>

        <div className="text-right">

          <p className="text-[10px] uppercase tracking-wide text-gray-500">
            Updated
          </p>

          <div className="mt-1 flex items-center justify-end gap-1">

            <Activity
              size={12}
              className="text-green-400"
            />

            <span className="text-xs text-gray-300">
              {updated}
            </span>

          </div>

        </div>

      </div>

    </motion.div>
  );
}