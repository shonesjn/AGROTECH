import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import PremiumButton from "../components/PremiumButton";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
     const result = await signInWithPopup(auth, provider);

console.log(result.user);

navigate("/dashboard");

      // Later we'll store the user in MongoDB
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/10 blur-[150px] rounded-full"></div>

      {/* Floating Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
        }}
        transition={{
          opacity: { duration: 0.6 },
          scale: { duration: 0.6 },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="
          relative
          w-full
          max-w-lg
          rounded-3xl
          border
          border-green-500/20
          bg-white/5
          backdrop-blur-xl
          shadow-2xl
          p-10
          text-center
        "
      >

        {/* Animated Logo */}
        <motion.div
          animate={{
            rotate: [0, 8, -8, 0],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="text-7xl"
        >
          🌱
        </motion.div>

        <h1 className="mt-4 text-6xl font-black text-green-400">
          AgroTech
        </h1>

        <p className="mt-3 text-3xl font-semibold text-white">
          Welcome Back
        </p>

        <p className="mt-5 text-gray-400 leading-8">
          Sign in to access your smart agriculture dashboard,
          monitor real-time IoT sensors, receive alerts,
          and manage your farm securely.
        </p>

        <div className="mt-10">
          <PremiumButton onClick={handleGoogleLogin}>
            Continue with Google
          </PremiumButton>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-white/10"></div>

          <span className="text-gray-500 text-sm">
            Smart Farming Platform
          </span>

          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4 text-left">

          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 rounded-xl bg-white/5 p-3"
          >
            <span className="text-green-400 text-xl">🔒</span>

            <div>
              <p className="text-white font-medium">
                Secure Authentication
              </p>

              <p className="text-sm text-gray-400">
                Powered by Firebase
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 rounded-xl bg-white/5 p-3"
          >
            <span className="text-green-400 text-xl">📡</span>

            <div>
              <p className="text-white font-medium">
                Live IoT Monitoring
              </p>

              <p className="text-sm text-gray-400">
                Real-time ESP32 sensor updates
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 rounded-xl bg-white/5 p-3"
          >
            <span className="text-green-400 text-xl">☁️</span>

            <div>
              <p className="text-white font-medium">
                Cloud Connected
              </p>

              <p className="text-sm text-gray-400">
                MongoDB + AI Dashboard
              </p>
            </div>
          </motion.div>

        </div>

      </motion.div>

    </div>
  );
}