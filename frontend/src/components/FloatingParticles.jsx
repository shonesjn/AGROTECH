import { motion } from "framer-motion";

export default function FloatingParticles() {

  const particles = [...Array(20)];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-30">

      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-green-400 rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [
              Math.random() * window.innerHeight,
              -100,
            ],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

    </div>
  );
}