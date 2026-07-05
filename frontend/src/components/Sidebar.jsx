import {
  LayoutDashboard,
  Thermometer,
  Bot,
  ShieldCheck,
  Settings,
  LogOut,
  Sprout,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Sensors",
      icon: Thermometer,
      path: "/dashboard/sensors",
    },
    {
      title: "AI Assistant",
      icon: Bot,
      path: "/dashboard/ai",
    },
    {
      title: "Blockchain",
      icon: ShieldCheck,
      path: "/dashboard/blockchain",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <aside
      className="
      w-72
      min-h-screen
      bg-[#08111F]
      border-r
      border-white/5
      flex
      flex-col
      justify-between
      shadow-2xl
    "
    >
      {/* Logo */}
      <div>
        <div className="px-8 py-8">
          <div className="flex items-center gap-4">
            <div
              className="
              h-14
              w-14
              rounded-2xl
              bg-gradient-to-br
              from-green-500
              to-emerald-400
              flex
              items-center
              justify-center
              shadow-lg
              shadow-green-500/20
            "
            >
              <Sprout size={28} className="text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight">
                <span className="text-white">Agro</span>
                <span className="text-green-400">Tech</span>
              </h1>

              <p className="text-sm text-gray-400 mt-1">
                Smart Agriculture
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5" />

        {/* Navigation */}
        <nav className="px-5 mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `
                  group
                  flex
                  items-center
                  gap-5
                  px-5
                  py-4
                  rounded-2xl
                  mb-3
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-green-500/20
                        to-green-500/5
                        border
                        border-green-500/30
                        shadow-lg
                        shadow-green-500/10
                      `
                      : `
                        hover:bg-white/5
                        border
                        border-transparent
                      `
                  }
                `
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`
                      h-11
                      w-11
                      rounded-xl
                      flex
                      items-center
                      justify-center

                      ${
                        isActive
                          ? "bg-green-500 text-white"
                          : "bg-[#111827] text-gray-400 group-hover:text-green-400"
                      }
                    `}
                    >
                      <Icon size={20} />
                    </div>

                    <span
                      className={`
                      font-medium
                      text-[16px]

                      ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      }
                    `}
                    >
                      {item.title}
                    </span>

                    {isActive && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User */}
      <div className="p-5">
        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-[#111827]
          p-5
        "
        >
          <div className="flex items-center gap-4">
            <img
              src={
                user?.photoURL ||
                "https://ui-avatars.com/api/?name=User"
              }
              alt="User"
              className="
                h-14
                w-14
                rounded-2xl
                object-cover
                border-2
                border-green-500
              "
            />

            <div>
              <h3 className="font-semibold text-white">
                {user?.displayName || "Farmer"}
              </h3>

              <p className="text-sm text-gray-400 truncate w-40">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="
            mt-5
            w-full
            rounded-2xl
            bg-red-500/10
            border
            border-red-500/20
            py-3
            flex
            items-center
            justify-center
            gap-3
            text-red-400
            transition-all
            duration-300
            hover:bg-red-500/20
            hover:scale-[1.02]
          "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}