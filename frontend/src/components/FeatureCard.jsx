import { motion } from "framer-motion";

export default function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      className="glass rounded-3xl p-8 w-80"
    >
      <div className="text-green-400 mb-6 text-5xl">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-400">
        {description}
      </p>

    </motion.div>
  );
}