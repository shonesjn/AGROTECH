import {
  User,
  Moon,
  Bell,
  Info,
  LogOut,
} from "lucide-react";

import { useState } from "react";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Settings() {

  const navigate = useNavigate();

  const user = auth.currentUser;

  const [darkMode, setDarkMode] = useState(true);
  const [aiAlerts, setAiAlerts] = useState(true);
  const [voiceAlerts, setVoiceAlerts] = useState(true);
  const [telegramAlerts, setTelegramAlerts] = useState(true);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="space-y-8 text-white">

      {/* Header */}

      <div>

        <h1 className="text-5xl font-bold">

          ⚙️ Settings

        </h1>

        <p className="text-gray-400 mt-3">

          Manage your AgroTech preferences.

        </p>

      </div>

      {/* Profile */}

      <div className="bg-[#111827] rounded-3xl border border-white/10 p-8">

        <div className="flex items-center gap-3 mb-6">

          <User className="text-green-400" />

          <h2 className="text-2xl font-bold">

            Profile

          </h2>

        </div>

        <div className="flex items-center gap-6">

          <img
            src={
              user?.photoURL ||
              "https://ui-avatars.com/api/?name=User"
            }
            alt="User"
            className="h-20 w-20 rounded-2xl border-2 border-green-400"
          />

          <div>

            <h3 className="text-xl font-semibold">

              {user?.displayName || "Farmer"}

            </h3>

            <p className="text-gray-400">

              {user?.email}

            </p>

          </div>

        </div>

      </div>

      {/* Appearance */}

      <div className="bg-[#111827] rounded-3xl border border-white/10 p-8">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Moon className="text-yellow-400" />

            <h2 className="text-xl font-semibold">

              Dark Mode

            </h2>

          </div>

          <label className="relative inline-flex items-center cursor-pointer">

            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />

            <div className="w-12 h-6 bg-gray-600 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div>

          </label>

        </div>

      </div>

      {/* Notifications */}

      <div className="bg-[#111827] rounded-3xl border border-white/10 p-8">

        <div className="flex items-center gap-3 mb-8">

          <Bell className="text-blue-400" />

          <h2 className="text-2xl font-bold">

            Notifications

          </h2>

        </div>

        <div className="space-y-6">

          {[
            {
              label: "AI Alerts",
              value: aiAlerts,
              set: setAiAlerts,
            },
            {
              label: "Voice Alerts",
              value: voiceAlerts,
              set: setVoiceAlerts,
            },
            {
              label: "Telegram Alerts",
              value: telegramAlerts,
              set: setTelegramAlerts,
            },
          ].map((item) => (

            <div
              key={item.label}
              className="flex justify-between items-center"
            >

              <span>

                {item.label}

              </span>

              <label className="relative inline-flex items-center cursor-pointer">

                <input
                  type="checkbox"
                  checked={item.value}
                  onChange={() => item.set(!item.value)}
                  className="sr-only peer"
                />

                <div className="w-12 h-6 bg-gray-600 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div>

              </label>

            </div>

          ))}

        </div>

      </div>

      {/* About */}

      <div className="bg-[#111827] rounded-3xl border border-white/10 p-8">

        <div className="flex items-center gap-3 mb-6">

          <Info className="text-purple-400" />

          <h2 className="text-2xl font-bold">

            About AgroTech

          </h2>

        </div>

        <div className="space-y-3 text-gray-300">

          <p>

            <strong>Version:</strong> 1.0.0

          </p>

          <p>

            <strong>Frontend:</strong> React + Tailwind CSS

          </p>

          <p>

            <strong>Backend:</strong> Node.js + Express

          </p>

          <p>

            <strong>Database:</strong> MongoDB

          </p>

          <p>

            <strong>Hardware:</strong> ESP32 + IoT Sensors

          </p>

        </div>

      </div>

      {/* Logout */}

      <button
        onClick={logout}
        className="
          w-full
          rounded-2xl
          bg-red-500
          hover:bg-red-600
          transition
          py-4
          flex
          items-center
          justify-center
          gap-3
          font-semibold
        "
      >

        <LogOut size={20} />

        Logout

      </button>

    </div>
  );
}