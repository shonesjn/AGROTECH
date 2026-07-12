import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <>
      {/* Main Background & Grid Pattern */}
      <div className="fixed inset-0 -z-50 bg-[#050b14] bg-grid-pattern" />

      {/* Animated Green Glow Top Left */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/20 blur-[150px] rounded-full -z-40 pointer-events-none" 
      />

      {/* Animated Green Glow Bottom Right */}
      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -60, 0],
          y: [0, -40, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/15 blur-[160px] rounded-full -z-40 pointer-events-none" 
      />
    </>
  );
}