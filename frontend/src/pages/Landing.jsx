import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BackgroundEffects from "../components/BackgroundEffects";
import CursorGlow from "../components/CursorGlow";
import LoginPanel from "../components/LoginPanel";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Landing() {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="flex min-h-screen overflow-hidden w-screen">

      {/* LEFT - Hero side (shrinks when panel opens) */}
      <motion.div
        animate={{ width: showPanel ? "58%" : "100%" }}
        transition={{ type: "spring", damping: 26, stiffness: 180 }}
        className="relative min-h-screen overflow-hidden flex-shrink-0"
      >
        <BackgroundEffects />
        <CursorGlow />
        <Navbar />
        <Hero onGetStarted={() => setShowPanel(true)} />
      </motion.div>

      {/* RIGHT - Login panel (expands from right) */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ width: "0%", opacity: 0 }}
            animate={{ width: "42%", opacity: 1 }}
            exit={{ width: "0%", opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 180 }}
            className="relative min-h-screen overflow-hidden flex-shrink-0"
            style={{
              background: "#141b2a",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <LoginPanel onClose={() => setShowPanel(false)} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}