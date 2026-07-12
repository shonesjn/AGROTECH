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
              border-2
              border-transparent
              bg-gradient-to-r
              from-emerald-400
              via-emerald-500
              to-teal-600
              text-white
              shadow-[0_0_20px_rgba(16,185,129,0.4)]
              hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]
            `
            : `
              glass-pill
              text-gray-100
              hover:bg-white/10
              hover:text-white
              hover:border-emerald-500/50
            `
        }

        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}