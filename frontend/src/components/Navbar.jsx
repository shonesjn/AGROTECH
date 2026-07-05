import { Sun, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="sticky top-0 z-50">

      <div
        className="
        w-full
        h-24
        bg-[#111827]/80
        backdrop-blur-2xl
        border
        border-white/10
        rounded-3xl
        shadow-xl
        px-8
        flex
        items-center
        justify-between
      "
      >

        {/* LEFT */}

        <div>

          <p className="text-xs uppercase tracking-[0.35em] text-green-400 font-semibold">
            Dashboard
          </p>

          <h1 className="text-3xl font-bold text-white mt-1">
            <span className="text-white">AgroTech</span>
          </h1>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          {/* WEATHER */}

          <div
            className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-white/10
            bg-[#08111F]
            px-5
            py-3
          "
          >

            <Sun
              size={22}
              className="text-yellow-400"
            />

            <div>

              <p className="text-xs text-gray-400">
                Weather
              </p>

              <h3 className="font-semibold text-white">
                29°C Sunny
              </h3>

            </div>

          </div>

          {/* PROFILE */}

          <div
            className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-white/10
            bg-[#08111F]
            px-4
            py-2
          "
          >

            <img
              src={
                user?.photoURL ||
                "https://ui-avatars.com/api/?name=User"
              }
              alt="profile"
              className="
                h-12
                w-12
                rounded-xl
                object-cover
                border-2
                border-green-400
              "
            />

            <div>

              <h3 className="text-white font-semibold leading-none">
                {user?.displayName || "Farmer"}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                {user?.email}
              </p>

            </div>

          </div>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="
            h-12
            w-12
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            flex
            items-center
            justify-center
            text-red-400
            hover:bg-red-500/20
            transition-all
            duration-300
          "
          >

            <LogOut size={20} />

          </button>

        </div>

      </div>

    </header>
  );
}