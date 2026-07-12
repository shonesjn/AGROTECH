import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PremiumButton from "./PremiumButton";

export default function Hero({ onGetStarted }) {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
    <section className="relative min-h-screen pt-20 pb-12 px-6 flex items-center justify-center">

      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[15%] text-4xl opacity-20 blur-[1px]"
        >
          ☁️
        </motion.div>
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[60%] left-[10%] text-5xl opacity-20 blur-[2px]"
        >
          🌱
        </motion.div>
        <motion.div
          animate={{ y: [0, -40, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] right-[15%] text-6xl opacity-10 blur-[3px]"
        >
          🤖
        </motion.div>
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[20%] right-[10%] text-4xl opacity-20 blur-[1px]"
        >
          📡
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-emerald-400 text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.15)] cursor-default"
        >
          🌱 AI + IoT + Cloud Agriculture
        </motion.div>

        {/* Heading with Glow */}
        <motion.div className="relative mt-6">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-emerald-500/30 blur-[60px] rounded-full pointer-events-none -z-10"
          />
          <motion.h1
            variants={itemVariants}
            className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight"
          >
            <span className="text-white">Agro</span>
            <span className="text-gradient drop-shadow-sm">Tech</span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          variants={itemVariants}
          style={{ marginTop: "10px" }}
          className="text-xl md:text-3xl font-semibold text-gray-200"
        >
          AI-enabled Smart Agriculture Monitoring Platform
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-16 max-w-3xl text-base md:text-lg leading-relaxed text-gray-400 font-light"
        >
          Real-time monitoring, intelligent analytics,
          precision farming, cloud connectivity and secure
          IoT-based agriculture management for modern smart farming.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          style={{ marginTop: "30px" }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <PremiumButton onClick={onGetStarted}>
            🚀 Get Started
          </PremiumButton>
        </motion.div>

        {/* Technology Tags */}
        <div style={{ marginTop: "40px" }}>
        <motion.div
          variants={itemVariants}
          
          className="mt-12 pt-20 flex flex-wrap justify-center gap-9"
        >
          {["📡 Real-Time IoT", "🤖 AI Analytics", "☁️ Cloud Dashboard", "🌿 Precision Farming"].map((tag, i) => (
            <motion.span 
              key={i}
              whileHover={{ scale: 1.05, y: -2 }}
              className="glass-pill rounded-full px-5 py-2.5 text-gray-300 text-sm font-medium cursor-default transition-colors hover:text-white hover:border-emerald-500/40"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
        </div>

      </motion.div>
    </section>
  );
}