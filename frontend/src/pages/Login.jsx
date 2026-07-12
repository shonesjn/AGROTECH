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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 bg-[#050b14] bg-grid-pattern">

      {/* Animated Background Glow */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-emerald-500/15 blur-[150px] rounded-full pointer-events-none"
      />

      {/* Floating Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="
          relative
          w-full
          max-w-[480px]
          rounded-[2rem]
          glass
          shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)]
          p-10
          text-center
          z-10
        "
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent rounded-[2rem] pointer-events-none" />

        {/* Animated Logo */}
        <motion.div
          animate={{
            y: [-4, 4, -4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl drop-shadow-lg inline-block"
        >
          🌱
        </motion.div>

        <h1 className="mt-6 text-5xl font-black text-gradient drop-shadow-sm">
          AgroTech
        </h1>

        <p className="mt-2 text-2xl font-semibold text-white">
          Welcome Back
        </p>

        <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
          Sign in to access your smart agriculture dashboard,
          monitor real-time IoT sensors, receive alerts,
          and manage your farm securely.
        </p>

        <div className="mt-8">
          <PremiumButton onClick={handleGoogleLogin}>
            Continue with Google
          </PremiumButton>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-white/5"></div>
          <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">
            Smart Farming Platform
          </span>
          <div className="flex-1 h-px bg-white/5"></div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-3 text-left">

          <motion.div
            whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.06)" }}
            className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 transition-colors border border-white/[0.02]"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 text-lg">
              🔒
            </div>
            <div>
              <p className="text-gray-200 font-medium text-sm">
                Secure Authentication
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Powered by Google & Firebase
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.06)" }}
            className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 transition-colors border border-white/[0.02]"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 text-lg">
              📡
            </div>
            <div>
              <p className="text-gray-200 font-medium text-sm">
                Live IoT Monitoring
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Real-time ESP32 sensor updates
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.06)" }}
            className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 transition-colors border border-white/[0.02]"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 text-lg">
              ☁️
            </div>
            <div>
              <p className="text-gray-200 font-medium text-sm">
                Cloud Connected
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                MongoDB + AI Dashboard
              </p>
            </div>
          </motion.div>

        </div>

      </motion.div>

    </div>
  );
}