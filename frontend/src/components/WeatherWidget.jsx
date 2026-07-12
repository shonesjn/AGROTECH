import { useEffect, useState } from "react";
import axios from "axios";
import {
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Sunrise,
} from "lucide-react";

export default function WeatherWidget() {
  const API_KEY = "efbc44ce989a661dd7d98f62144255b3";

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
              params: {
                lat: latitude,
                lon: longitude,
                appid: API_KEY,
                units: "metric",
              },
            }
          );
          setWeather(response.data);
          setError("");
        } catch (err) {
          if (err.response) {
            setError(err.response.data.message);
          } else {
            setError("Unable to fetch weather.");
          }
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Location permission denied.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-[#031109]/90 to-[#020805]/95 backdrop-blur-2xl border border-emerald-500/20 shadow-[0_8px_32px_rgba(16,185,129,0.1)] p-8 flex justify-center items-center h-40">
        <p className="text-emerald-500 font-semibold tracking-[0.2em] uppercase text-xs animate-pulse drop-shadow-md">Loading Weather Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-[#110505]/90 to-[#080202]/95 backdrop-blur-2xl border border-red-500/20 shadow-[0_8px_32px_rgba(239,68,68,0.1)] p-8 flex justify-center items-center h-40">
        <p className="text-red-500 font-bold uppercase tracking-wider text-xs drop-shadow-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-[#031109]/90 to-[#020805]/95 backdrop-blur-2xl border border-emerald-500/20 shadow-[0_8px_32px_rgba(16,185,129,0.1)] overflow-hidden p-6 md:p-8 lg:p-10 flex flex-col xl:flex-row items-center justify-between gap-10">
      
      {/* Glossy top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
      
      {/* Left: Main Weather Info */}
      <div className="flex flex-col xl:flex-row items-center gap-10 min-w-max">
        
        {/* Icon & Temp */}
        <div className="flex items-center gap-6 bg-[#020604]/40 p-4 pr-8 rounded-2xl border border-emerald-500/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.02)]">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather"
            className="w-20 h-20 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          />
          <div>
            <h1 className="text-5xl font-black text-white tracking-tight drop-shadow-lg">
              {Math.round(weather.main.temp)}°C
            </h1>
            <p className="text-sm font-bold text-emerald-400 capitalize tracking-widest mt-2 drop-shadow-md">
              {weather.weather[0].description}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col items-center xl:items-start">
          <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500/80 font-bold mb-2">Location</p>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <MapPin size={14} className="text-emerald-400" />
            </div>
            <span className="text-white font-bold text-lg drop-shadow-md">
              {weather.name}, {weather.sys.country}
            </span>
          </div>
        </div>
      </div>

      {/* Vertical Divider (Hidden on small) */}
      <div className="hidden xl:block w-px h-24 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"></div>

      {/* Right: Metrics Grid */}
      <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-6">
        
        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.02)] transition-all hover:bg-emerald-500/10">
          <div className="flex items-center gap-2 text-emerald-400/80">
            <Thermometer size={16} />
            <p className="text-[10px] uppercase tracking-widest font-bold">Feels Like</p>
          </div>
          <h3 className="text-white font-black text-2xl drop-shadow-md">{Math.round(weather.main.feels_like)}°C</h3>
        </div>

        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.02)] transition-all hover:bg-cyan-500/10">
          <div className="flex items-center gap-2 text-cyan-400/80">
            <Droplets size={16} />
            <p className="text-[10px] uppercase tracking-widest font-bold">Humidity</p>
          </div>
          <h3 className="text-white font-black text-2xl drop-shadow-md">{weather.main.humidity}%</h3>
        </div>

        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.02)] transition-all hover:bg-emerald-500/10">
          <div className="flex items-center gap-2 text-emerald-400/80">
            <Wind size={16} />
            <p className="text-[10px] uppercase tracking-widest font-bold">Wind</p>
          </div>
          <h3 className="text-white font-black text-2xl drop-shadow-md">{weather.wind.speed} <span className="text-sm font-medium text-gray-400">m/s</span></h3>
        </div>

        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.02)] transition-all hover:bg-orange-500/10">
          <div className="flex items-center gap-2 text-orange-400/80">
            <Sunrise size={16} />
            <p className="text-[10px] uppercase tracking-widest font-bold">Sunrise</p>
          </div>
          <h3 className="text-white font-black text-2xl drop-shadow-md">
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </h3>
        </div>

      </div>
    </div>
  );
}