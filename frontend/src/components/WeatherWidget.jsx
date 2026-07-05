import { useEffect, useState } from "react";
import axios from "axios";
import {
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  RefreshCw,
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

          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);

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

          console.log(response.data);

          setWeather(response.data);
          setError("");
        } catch (err) {
          console.error(err);

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
        console.error(err);
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
      <div className="rounded-3xl bg-[#111827] h-[420px] flex items-center justify-center">
        <p className="text-white">Loading weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-[#111827] h-[420px] flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-[#111827] p-6 shadow-xl border border-white/10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Live Weather
          </h2>

          <div className="flex items-center gap-2 mt-1">
            <MapPin size={15} className="text-green-400" />

            <p className="text-gray-400">
              {weather.name}, {weather.sys.country}
            </p>
          </div>
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather"
          className="w-16 h-16"
        />
      </div>

      <div className="mt-6">
        <h1 className="text-5xl font-bold text-white">
          {Math.round(weather.main.temp)}°C
        </h1>

        <p className="capitalize text-gray-400 mt-2">
          {weather.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-[#08111F] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Thermometer className="text-red-400" />
            <div>
              <p className="text-xs text-gray-500">
                Feels Like
              </p>
              <h3 className="text-white">
                {Math.round(weather.main.feels_like)}°C
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-[#08111F] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Droplets className="text-blue-400" />
            <div>
              <p className="text-xs text-gray-500">
                Humidity
              </p>
              <h3 className="text-white">
                {weather.main.humidity}%
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-[#08111F] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Wind className="text-cyan-400" />
            <div>
              <p className="text-xs text-gray-500">
                Wind
              </p>
              <h3 className="text-white">
                {weather.wind.speed} m/s
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-[#08111F] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <RefreshCw className="text-green-400" />
            <div>
              <p className="text-xs text-gray-500">
                Updated
              </p>
              <h3 className="text-white">
                {new Date(weather.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-[#08111F] rounded-2xl p-4 flex items-center gap-3">
          <Sunrise className="text-orange-400" />
          <div>
            <p className="text-xs text-gray-500">
              Sunrise
            </p>
            <h3 className="text-white">
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h3>
          </div>
        </div>

        <div className="bg-[#08111F] rounded-2xl p-4 flex items-center gap-3">
          <Sunset className="text-yellow-400" />
          <div>
            <p className="text-xs text-gray-500">
              Sunset
            </p>
            <h3 className="text-white">
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}