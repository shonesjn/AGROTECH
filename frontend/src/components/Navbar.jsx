import { LogOut } from "lucide-react";
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
        h-20
        bg-[#0b1120]/90
        backdrop-blur-2xl
        border-b
        border-white/8
        px-10
        flex
        items-center
        justify-between
      "
      >

        {/* LEFT - Logo */}
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-400 font-semibold drop-shadow-sm">
            Dashboard
          </p>
          <h1 className="text-3xl font-black mt-1 tracking-tight">
            <span className="text-white">Agro</span>
            <span className="text-gradient drop-shadow-sm">Tech</span>
          </h1>
        </div>

        {/* RIGHT - Profile & Logout */}
        <div className="flex items-center gap-5">

          {user ? (
            <>
              {/* PROFILE */}
              <div
                className="
                flex
                items-center
                gap-4
                glass-pill
                px-4
                py-2
                rounded-full
              "
              >
                <img
                  src={
                    user.photoURL ||
                    "https://ui-avatars.com/api/?name=User&background=0D9488&color=fff"
                  }
                  alt="profile"
                  className="
                    h-10
                    w-10
                    rounded-full
                    object-cover
                    border-2
                    border-emerald-500/50
                    shadow-[0_0_12px_rgba(16,185,129,0.3)]
                  "
                />
                <div className="pr-2">
                  <h3 className="text-white font-semibold leading-none text-sm tracking-wide">
                    {user.displayName || "Farmer"}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {user.email || "farmer@agrotech.com"}
                  </p>
                </div>
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                title="Logout"
                className="
                h-12
                w-12
                rounded-full
                border
                border-red-500/20
                bg-red-500/10
                flex
                items-center
                justify-center
                text-red-400
                hover:bg-red-500/20
                hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]
                transition-all
                duration-300
              "
              >
                <LogOut size={20} />
              </button>
            </>
          ) : null}

        </div>

      </div>
    </header>
  );
}