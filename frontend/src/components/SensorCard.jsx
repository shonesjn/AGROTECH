import { Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function SensorCard({
  title,
  value,
  unit,
  icon,
  color,
  status,
  updated = "Live",
  isConnected = true,
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative border flex flex-col justify-between overflow-hidden transition-all duration-500 backdrop-blur-2xl h-[170px] p-5 rounded-none"
      style={{
        background: `linear-gradient(135deg, ${color}15 0%, rgba(10,15,25,0.4) 100%)`,
        borderColor: `${color}30`,
        boxShadow: `0 15px 35px -10px ${color}20, inset 0 2px 20px ${color}10`,
      }}
    >
      {/* Glassy Reflection */}
      <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Heavy Glowing Orbs Inside */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-40 group-hover:opacity-70 group-hover:scale-125 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: color }}
      ></div>
      <div 
        className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-[40px] opacity-20 group-hover:opacity-50 group-hover:scale-125 transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: color }}
      ></div>

      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div 
          className="w-10 h-10 rounded-none flex items-center justify-center backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.2)] border transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
          style={{ 
            color: color, 
            background: `linear-gradient(135deg, ${color}25, ${color}05)`,
            borderColor: `${color}40`,
            boxShadow: `0 0 20px ${color}20`
          }}
        >
          {icon}
        </div>
        
        <div className="px-3 py-1.5 rounded-none border backdrop-blur-md transition-all duration-300 group-hover:scale-105"
             style={{ borderColor: `${color}25`, background: `${color}15` }}
        >
           <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-black drop-shadow-md" style={{ color: color }}>
             {status}
           </span>
        </div>
      </div>

      {/* Middle: Title & Value */}
      <div className="relative z-10 mt-auto mb-3 flex flex-col gap-1">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-300 font-bold drop-shadow-md">
          {title}
        </p>
        <div className="flex items-baseline gap-1.5">
          <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            {value}
          </h1>
          {unit && (
            <span className="text-base sm:text-lg font-bold drop-shadow-md" style={{ color: color }}>
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t transition-colors duration-500" style={{ borderColor: `${color}25` }}>
        <div className="flex items-center gap-2">
          <span 
            className={`w-2 h-2 rounded-full ${isConnected ? 'animate-pulse' : ''}`}
            style={{ backgroundColor: isConnected ? color : '#ef4444', boxShadow: isConnected ? `0 0 10px ${color}` : 'none' }}
          ></span>
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest drop-shadow-md" style={{ color: isConnected ? color : '#ef4444' }}>
            {isConnected ? "Live Data" : "Offline"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          <Activity size={12} style={{ color: color }} />
          <span className="text-[9px] font-black tracking-widest uppercase drop-shadow-md" style={{ color: color }}>
            {updated}
          </span>
        </div>
      </div>
    </motion.div>
  );
}