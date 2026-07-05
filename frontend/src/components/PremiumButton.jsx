import { motion } from "framer-motion";

export default function PremiumButton({
  children,
  primary = true,
  onClick,
  className = "",
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        y: -3,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{ duration: 0.2 }}
      className={`
        inline-flex
        items-center
        justify-center
        h-14
        min-w-[200px]
        px-8
        rounded-2xl
        text-lg
        font-semibold
        transition-all
        duration-300

        ${
          primary
            ? `
              bg-gradient-to-r
              from-green-500
              to-emerald-500
              text-white
              shadow-lg
              shadow-green-500/30
              hover:shadow-green-500/60
            `
            : `
              border
              border-green-400/40
              bg-white/5
              backdrop-blur-lg
              text-white
              hover:bg-green-500/10
              hover:border-green-400
            `
        }

        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}