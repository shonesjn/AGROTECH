import { useEffect, useState } from "react";
import axios from "axios";
import SensorCard from "../components/SensorCard";
import ChartSection from "../components/ChartSection";
import WeatherWidget from "../components/WeatherWidget";
import AIAlertPanel from "../components/AIAlertPanel";
import ChatbotWidget from "../components/ChatbotWidget";
import { Thermometer, Droplets, Droplet, Sun } from "lucide-react";

export default function Dashboard() {
  const [sensor, setSensor] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const fetchLatestSensor = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/sensors/latest"
      );
      setSensor(response.data.data);
      setIsConnected(true);
    } catch (err) {
      console.log(err);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    fetchLatestSensor();
    const interval = setInterval(fetchLatestSensor, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!sensor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#08111F] text-white">
        <h2 className="text-2xl font-semibold">
          Loading Sensor Data...
        </h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container font-body-lg text-on-surface overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .dashboard-container {
            --color-error-container: #93000a;
            --color-on-background: #dae2fd;
            --color-on-primary-fixed-variant: #005236;
            --color-on-secondary: #233144;
            --color-surface-container-highest: #2d3449;
            --color-inverse-surface: #dae2fd;
            --color-surface-tint: #4edea3;
            --color-on-error: #690005;
            --color-surface-container: #171f33;
            --color-tertiary-fixed-dim: #f9bd22;
            --color-background: #0b1326;
            --color-on-tertiary-fixed: #261a00;
            --color-on-surface: #dae2fd;
            --color-on-secondary-container: #abb9d2;
            --color-on-error-container: #ffdad6;
            --color-primary: #4edea3;
            --color-on-tertiary: #402d00;
            --color-surface-container-low: #131b2e;
            --color-secondary: #b9c7e0;
            --color-surface: #0b1326;
            --color-primary-fixed-dim: #4edea3;
            --color-outline-variant: #3c4a42;
            --color-on-secondary-fixed: #0d1c2f;
            --color-surface-container-lowest: #060e20;
            --color-primary-fixed: #6ffbbe;
            --color-inverse-on-surface: #283044;
            --color-tertiary-container: #ce9a00;
            --color-secondary-fixed: #d5e3fd;
            --color-on-primary-container: #00422b;
            --color-primary-container: #10b981;
            --color-secondary-fixed-dim: #b9c7e0;
            --color-inverse-primary: #006c49;
            --color-outline: #86948a;
            --color-tertiary-fixed: #ffdf9f;
            --color-on-tertiary-container: #4a3500;
            --color-on-surface-variant: #bbcabf;
            --color-on-primary-fixed: #002113;
            --color-surface-container-high: #222a3d;
            --color-surface-dim: #0b1326;
            --color-error: #ffb4ab;
            --color-surface-bright: #31394d;
            --color-on-secondary-fixed-variant: #3a485c;
            --color-secondary-container: #3c4a5e;
            --color-tertiary: #f9bd22;
            --color-surface-variant: #2d3449;
            --color-on-tertiary-fixed-variant: #5c4300;
            --color-on-primary: #003824;
            
            background-color: var(--color-background);
            color: var(--color-on-surface);
        }

        .dashboard-container .bg-surface-container-low { background-color: var(--color-surface-container-low); }
        .dashboard-container .bg-primary-container { background-color: var(--color-primary-container); }
        .dashboard-container .bg-primary-container\\/10 { background-color: color-mix(in srgb, var(--color-primary-container) 10%, transparent); }
        .dashboard-container .bg-surface-container { background-color: var(--color-surface-container); }
        .dashboard-container .bg-surface-container\\/50 { background-color: color-mix(in srgb, var(--color-surface-container) 50%, transparent); }
        .dashboard-container .bg-surface-container\\/30 { background-color: color-mix(in srgb, var(--color-surface-container) 30%, transparent); }
        .dashboard-container .bg-surface-container-highest { background-color: var(--color-surface-container-highest); }
        .dashboard-container .bg-surface-container-lowest { background-color: var(--color-surface-container-lowest); }
        .dashboard-container .bg-surface-container-high { background-color: var(--color-surface-container-high); }
        .dashboard-container .bg-background { background-color: var(--color-background); }
        .dashboard-container .bg-background\\/80 { background-color: color-mix(in srgb, var(--color-background) 80%, transparent); }
        .dashboard-container .bg-primary { background-color: var(--color-primary); }
        .dashboard-container .bg-primary\\/5 { background-color: color-mix(in srgb, var(--color-primary) 5%, transparent); }
        .dashboard-container .bg-primary\\/10 { background-color: color-mix(in srgb, var(--color-primary) 10%, transparent); }
        .dashboard-container .bg-primary\\/20 { background-color: color-mix(in srgb, var(--color-primary) 20%, transparent); }
        .dashboard-container .bg-secondary\\/10 { background-color: color-mix(in srgb, var(--color-secondary) 10%, transparent); }
        .dashboard-container .bg-secondary\\/20 { background-color: color-mix(in srgb, var(--color-secondary) 20%, transparent); }
        .dashboard-container .bg-tertiary\\/10 { background-color: color-mix(in srgb, var(--color-tertiary) 10%, transparent); }
        .dashboard-container .bg-tertiary\\/20 { background-color: color-mix(in srgb, var(--color-tertiary) 20%, transparent); }
        .dashboard-container .bg-tertiary\\/5 { background-color: color-mix(in srgb, var(--color-tertiary) 5%, transparent); }
        .dashboard-container .bg-error\\/10 { background-color: color-mix(in srgb, var(--color-error) 10%, transparent); }
        .dashboard-container .bg-error\\/20 { background-color: color-mix(in srgb, var(--color-error) 20%, transparent); }
        
        .dashboard-container .text-primary { color: var(--color-primary); }
        .dashboard-container .text-secondary { color: var(--color-secondary); }
        .dashboard-container .text-tertiary { color: var(--color-tertiary); }
        .dashboard-container .text-error { color: var(--color-error); }
        .dashboard-container .text-error\\/80 { color: color-mix(in srgb, var(--color-error) 80%, transparent); }
        .dashboard-container .text-on-surface { color: var(--color-on-surface); }
        .dashboard-container .text-on-surface-variant { color: var(--color-on-surface-variant); }
        .dashboard-container .text-on-surface-variant\\/40 { color: color-mix(in srgb, var(--color-on-surface-variant) 40%, transparent); }
        .dashboard-container .text-on-surface-variant\\/50 { color: color-mix(in srgb, var(--color-on-surface-variant) 50%, transparent); }
        .dashboard-container .text-on-primary-container { color: var(--color-on-primary-container); }
        .dashboard-container .text-on-primary { color: var(--color-on-primary); }

        .dashboard-container .border-outline-variant\\/20 { border-color: color-mix(in srgb, var(--color-outline-variant) 20%, transparent); border-width: 1px; }
        .dashboard-container .border-outline-variant\\/30 { border-color: color-mix(in srgb, var(--color-outline-variant) 30%, transparent); border-width: 1px; }
        .dashboard-container .border-outline-variant\\/50 { border-color: color-mix(in srgb, var(--color-outline-variant) 50%, transparent); border-width: 1px; }
        .dashboard-container .border-primary\\/20 { border-color: color-mix(in srgb, var(--color-primary) 20%, transparent); border-width: 1px; }
        .dashboard-container .border-primary\\/30 { border-color: color-mix(in srgb, var(--color-primary) 30%, transparent); border-width: 1px; }
        .dashboard-container .border-secondary { border-color: var(--color-secondary); border-width: 1px; }
        .dashboard-container .border-secondary\\/20 { border-color: color-mix(in srgb, var(--color-secondary) 20%, transparent); border-width: 1px; }
        .dashboard-container .border-tertiary\\/20 { border-color: color-mix(in srgb, var(--color-tertiary) 20%, transparent); border-width: 1px; }
        .dashboard-container .border-error\\/20 { border-color: color-mix(in srgb, var(--color-error) 20%, transparent); border-width: 1px; }
        
        .dashboard-container .hover\\:border-primary\\/50:hover { border-color: color-mix(in srgb, var(--color-primary) 50%, transparent); }
        .dashboard-container .hover\\:bg-surface-container-highest:hover { background-color: var(--color-surface-container-highest); }
        .dashboard-container .hover\\:text-primary:hover { color: var(--color-primary); }
        .dashboard-container .group:hover .group-hover\\:text-primary { color: var(--color-primary); }

        .dashboard-container .font-body-lg { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; }
        .dashboard-container .font-body-sm { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; line-height: 20px; }
        .dashboard-container .font-headline-md { font-family: 'Manrope', sans-serif; font-size: 24px; font-weight: 600; line-height: 32px; }
        .dashboard-container .font-headline-lg { font-family: 'Manrope', sans-serif; font-size: 32px; font-weight: 700; line-height: 40px; letter-spacing: -0.02em; }
        .dashboard-container .font-label-mono { font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 500; line-height: 16px; letter-spacing: 0.05em; }

        .dashboard-container .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block; line-height: 1; text-transform: none; letter-spacing: normal;
        }

        .dashboard-container .glow-emerald {
            box-shadow: 0 0 12px 0px rgba(16, 185, 129, 0.15);
        }

        .dashboard-container .chart-grid {
            background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 40px 40px;
        }

        .dashboard-container .p-stack-lg { padding: 32px; }
        .dashboard-container .p-stack-md { padding: 16px; }
        .dashboard-container .p-margin-desktop { padding: 40px; }
        .dashboard-container .px-margin-desktop { padding-left: 40px; padding-right: 40px; }
        .dashboard-container .mb-stack-lg { margin-bottom: 32px; }
        .dashboard-container .mb-stack-md { margin-bottom: 16px; }
        .dashboard-container .gap-stack-lg { gap: 32px; }
        .dashboard-container .gap-stack-md { gap: 16px; }
        .dashboard-container .gap-stack-sm { gap: 8px; }
        .dashboard-container .gap-base { gap: 4px; }
      `}</style>
      
      <div className="flex h-screen w-full">
        {/* Sidebar Navigation */}
        <aside className="relative w-72 bg-gradient-to-b from-[#05131e]/90 to-[#020508]/95 backdrop-blur-3xl border-r border-primary/20 flex flex-col h-full z-30 shrink-0 shadow-[10px_0_30px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Animated Background Orbs for Sidebar */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-[80px] animate-pulse"></div>
          
          <div className="relative z-10 p-stack-lg flex flex-col gap-base mt-4">
            <div className="flex items-center gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight drop-shadow-sm">AgroTech</h1>
                <p className="text-[9px] uppercase tracking-[0.3em] text-primary font-black drop-shadow-[0_0_5px_rgba(78,222,163,0.8)] mt-1">SMART FARMING</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              <a className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-primary/20 to-transparent border border-primary/30 text-primary shadow-[0_0_15px_rgba(78,222,163,0.15)] group transition-all" href="#">
                <span className="material-symbols-outlined group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(78,222,163,1)] transition-all" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                <span className="font-bold text-sm tracking-wide">Dashboard</span>
                <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(78,222,163,1)]"></div>
              </a>
              
              <a className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group" href="#">
                <span className="material-symbols-outlined group-hover:text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(78,222,163,0.8)] transition-all">sensors</span>
                <span className="font-medium text-sm tracking-wide">Sensors</span>
              </a>
              
              <a className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group" href="#">
                <span className="material-symbols-outlined group-hover:text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(78,222,163,0.8)] transition-all">psychology</span>
                <span className="font-medium text-sm tracking-wide">AI Assistant</span>
              </a>
              


              <a className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group mt-2" href="#">
                <span className="material-symbols-outlined group-hover:text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(78,222,163,0.8)] transition-all">settings</span>
                <span className="font-medium text-sm tracking-wide">Settings</span>
              </a>
            </nav>
          </div>
          <div className="absolute bottom-0 w-full z-10 p-6 pb-6 md:p-8 md:pb-6 border-t border-white/5 bg-black/40 backdrop-blur-md">
            <div className="relative flex flex-col justify-between bg-white/[0.02] p-6 border border-white/[0.05] group overflow-hidden transition-all hover:bg-white/[0.04]">
              {/* Glowing Orb */}
              <div className={`absolute top-0 right-0 w-40 h-40 blur-[70px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 ${isConnected ? 'bg-primary/20' : 'bg-red-500/20'}`}></div>
              
              <div>
                <div className="relative z-10 flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-none bg-white/[0.05] border border-white/10 flex items-center justify-center">
                    <span className={`w-3 h-3 rounded-full animate-pulse ${isConnected ? 'bg-primary shadow-[0_0_12px_rgba(78,222,163,1)]' : 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)]'}`}></span>
                  </div>
                  <span className={`text-[11px] uppercase tracking-[0.25em] font-black ${isConnected ? 'text-primary drop-shadow-[0_0_8px_rgba(78,222,163,0.5)]' : 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`}>
                    {isConnected ? "SYSTEM LIVE" : "OFFLINE"}
                  </span>
                </div>
                <p className="relative z-10 text-xs text-gray-400 font-medium leading-relaxed">
                  {isConnected ? "Gateway node actively transmitting telemetry via LEO Satellite." : "Connection to gateway node lost. Retrying..."}
                </p>
              </div>

              <button className="relative z-10 w-full py-3.5 bg-white/[0.05] text-white border border-white/10 font-black text-[10px] tracking-widest uppercase hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all mt-4">
                  DIAGNOSTICS
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col bg-background overflow-y-auto min-w-0">
          {/* Top Header */}
          <header className="min-h-[64px] shrink-0 flex items-center justify-between px-margin-desktop border-b border-outline-variant/30 bg-background/80 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-stack-md">
              <h2 className="font-headline-md">{getGreeting()} 👋</h2>
              <span className="h-6 w-[1px] bg-outline-variant/50"></span>
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="font-label-mono text-primary">AGROTECH</span>
              </div>
            </div>
            <div className="flex items-center gap-stack-md">

              <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">help_outline</span>
              </button>
            </div>
          </header>

          <div className="p-margin-desktop flex flex-col gap-stack-lg">
            {/* AI Alert Panel */}
            <AIAlertPanel />

            {/* Real-Time Sensors Grid */}
            <section>
              <div className="flex items-center justify-between mb-stack-md">
                <h4 className="font-body-lg font-bold text-on-surface uppercase tracking-wider">Real-Time Sensors</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-label-mono text-primary text-[10px]">LIVE DATA FEED</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-md">
                
                <SensorCard
                  title="Temperature"
                  value={sensor.temperature.toFixed(1)}
                  unit="°C"
                  icon={<Thermometer size={20} />}
                  color="#ffb4ab"
                  status={sensor.temperature > 35 ? "High" : sensor.temperature < 20 ? "Low" : "Normal"}
                  isConnected={isConnected}
                />

                <SensorCard
                  title="Humidity"
                  value={sensor.humidity.toFixed(1)}
                  unit="%"
                  icon={<Droplets size={20} />}
                  color="#4edea3"
                  status={sensor.humidity > 80 ? "High" : sensor.humidity < 40 ? "Low" : "Good"}
                  isConnected={isConnected}
                />

                <SensorCard
                  title="Soil Moisture"
                  value={sensor.moisture.toFixed(1)}
                  unit="%"
                  icon={<Droplet size={20} />}
                  color="#b9c7e0"
                  status={sensor.moisture < 30 ? "Dry" : sensor.moisture > 70 ? "Wet" : "Optimal"}
                  isConnected={isConnected}
                />

                <SensorCard
                  title="Light Intensity"
                  value={sensor.light}
                  unit="lux"
                  icon={<Sun size={20} />}
                  color="#f9bd22"
                  status={sensor.light > 700 ? "Bright" : sensor.light > 300 ? "Normal" : "Low"}
                  isConnected={isConnected}
                />
              </div>
            </section>

            {/* Sensor Analytics Chart Section */}
            <ChartSection />
          </div>

          {/* Weather & Environment Footer */}
          <footer className="mt-auto border-t border-outline-variant/30 bg-surface-container-lowest p-6">
            <WeatherWidget />
            
            <div className="mt-6 flex justify-between items-center font-label-mono text-on-surface-variant/50 text-[10px]">
              <p>© 2024 AgroTech IoT. All rights reserved. Secure Cloud Environment.</p>
              <div className="flex gap-4">
                <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                <a className="hover:text-primary transition-colors" href="#">System Status</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
      
      {/* Background Atmospheric Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"></div>
      <ChatbotWidget sensor={sensor} isConnected={isConnected} />
    </div>
  );
}
