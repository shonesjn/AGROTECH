import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function LoginPanel({ onClose }) {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="login-panel-container min-h-screen flex flex-col items-center relative w-full overflow-y-auto overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&family=Manrope:wght@600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .login-panel-container {
          background-color: #0b1326;
          background-image: radial-gradient(at 0% 0%, hsla(161, 84%, 15%, 0.15) 0, transparent 50%),
                            radial-gradient(at 100% 0%, hsla(222, 47%, 11%, 0.15) 0, transparent 50%);
          font-family: 'Inter', sans-serif;
          color: #dae2fd;
        }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;
        }

        .font-manrope { font-family: 'Manrope', sans-serif; }
        .font-jetbrains { font-family: 'JetBrains Mono', monospace; }

        .glow-active:active {
            box-shadow: 0 0 12px 0px rgba(16, 185, 129, 0.4);
            transform: scale(0.98);
            transition: all 0.2s ease;
        }
        .login-panel-container::-webkit-scrollbar {
            display: none;
        }
        .login-panel-container {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      {/* Close Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={onClose}
          className="h-10 w-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #10b981, #059669)",
            boxShadow: "0 0 15px rgba(16,185,129,0.4)",
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Main Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-10 max-w-[440px] mx-auto w-full">
        
        {/* Welcome Title */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full mb-8 text-center"
        >
          <h1 className="text-[28px] leading-[36px] tracking-[-0.02em] font-bold font-manrope text-[#dae2fd] mb-2">
            Log into AgroTech
          </h1>
          <p className="text-[14px] leading-[20px] text-[#bbcabf] max-w-sm mx-auto">
            Access your precision agriculture dashboard and IoT fleet management system.
          </p>
        </motion.div>

        {/* Social Login Button */}
        <button 
          onClick={handleGoogleLogin}
          className="w-full h-14 bg-[#10b981] text-[#00422b] text-[20px] leading-[28px] font-manrope font-semibold rounded-lg flex items-center justify-center gap-4 glow-active transition-all mb-4 group hover:bg-[#4edea3]"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
          </svg>
          <span className="text-white">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="w-full flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-grow bg-[#3c4a42]/30"></div>
          <span className="font-jetbrains text-[#bbcabf] uppercase tracking-widest text-[10px]">Secure Login</span>
          <div className="h-[1px] flex-grow bg-[#3c4a42]/30"></div>
        </div>

        {/* IoT Feature List */}
        <div className="w-full space-y-1">
          {/* Item 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-4 p-4 bg-[#171f33] rounded-xl border border-[#3c4a42]/20 hover:border-[#4edea3]/30 transition-colors"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-[#222a3d] rounded-full text-[#f9bd22]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] leading-[28px] font-semibold font-manrope text-[#dae2fd]">Secure Authentication</span>
              <span className="text-[14px] leading-[20px] text-[#bbcabf]">Powered by Google & Firebase</span>
            </div>
          </motion.div>

          {/* Item 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-4 p-4 bg-[#171f33] rounded-xl border border-[#3c4a42]/20 hover:border-[#4edea3]/30 transition-colors"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-[#222a3d] rounded-full text-[#4edea3]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>satellite_alt</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] leading-[28px] font-semibold font-manrope text-[#dae2fd]">Live IoT Monitoring</span>
              <span className="text-[14px] leading-[20px] text-[#bbcabf]">Real-time ESP32 sensor updates</span>
            </div>
          </motion.div>

          {/* Item 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-4 p-4 bg-[#171f33] rounded-xl border border-[#3c4a42]/20 hover:border-[#4edea3]/30 transition-colors"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-[#222a3d] rounded-full text-[#b9c7e0]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cloud</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] leading-[28px] font-semibold font-manrope text-[#dae2fd]">Cloud Connected</span>
              <span className="text-[14px] leading-[20px] text-[#bbcabf]">MongoDB + AI Dashboard</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#060e20] border-t border-[#3c4a42]/20 py-8 px-5 flex flex-col items-center gap-4 text-center mt-auto">
        <div className="flex items-center gap-2 font-jetbrains font-bold text-[#bbcabf] text-[12px]">
          <span className="material-symbols-outlined text-[16px] text-[#4edea3]">potted_plant</span>
          <span>AgroTech · Precision for the Earth</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-1">
          <a className="font-jetbrains text-[12px] text-[#bbcabf] hover:text-[#4edea3] transition-colors" href="#">Privacy Policy</a>
          <a className="font-jetbrains text-[12px] text-[#bbcabf] hover:text-[#4edea3] transition-colors" href="#">Terms of Service</a>
          <a className="font-jetbrains text-[12px] text-[#bbcabf] hover:text-[#4edea3] transition-colors" href="#">System Status</a>
        </div>
        <p className="text-[14px] leading-[20px] text-[#bbcabf]/60 max-w-xs mt-2">
          © 2024 AgroTech IoT. All rights reserved. Secure Cloud Environment.
        </p>
      </footer>
    </div>
  );
}
