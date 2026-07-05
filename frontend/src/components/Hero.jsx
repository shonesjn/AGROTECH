import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PremiumButton from "./PremiumButton";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-5 py-2 text-green-300 text-base"
        >
          🌱 AI + IoT + Cloud Agriculture
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 text-6xl md:text-8xl font-black tracking-tight"
        >
          <span className="text-white">Agro</span>
          <span className="text-green-400">Tech</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-3xl md:text-4xl font-semibold text-gray-200"
        >
          AI-enabled Smart Agriculture Monitoring Platform
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-4xl text-xl leading-9 text-gray-400"
        >
          Real-time monitoring, intelligent analytics,
          precision farming, cloud connectivity and secure
          IoT-based agriculture management for modern smart farming.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-col sm:flex-row gap-6"
        >
          <PremiumButton onClick={() => navigate("/login")}>
            🚀 Get Started
          </PremiumButton>

          <PremiumButton
            primary={false}
            onClick={() => navigate("/login")}
          >
            Google Login
          </PremiumButton>
        </motion.div>

        {/* Technology Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-gray-300">
            📡 Real-Time IoT
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-gray-300">
            🤖 AI Analytics
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-gray-300">
            ☁ Cloud Dashboard
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-gray-300">
            🌿 Precision Farming
          </span>
        </motion.div>

      </div>

    </section>
  );
}