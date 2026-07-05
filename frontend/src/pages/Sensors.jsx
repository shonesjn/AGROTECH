import {
  Cpu,
  Thermometer,
  Droplets,
  Move3D,
  Sun,
  Wifi,
  Activity,
  Database,
  Server,
} from "lucide-react";

const sensors = [
  {
    title: "ESP32 Development Board",
    icon: <Cpu size={34} className="text-green-400" />,
    image: "/images/esp32.png",
    description:
      "The ESP32 is the central controller of the AgroTech system. It collects sensor readings from connected devices and transmits them securely to the backend server via Wi-Fi. It acts as the bridge between IoT hardware and the cloud platform.",
    details: [
      "Status : Online",
      "Connectivity : Wi-Fi",
      "Firmware : v1.0",
      "Upload Interval : Every 5 Seconds",
    ],
  },
  {
    title: "DHT11 Temperature & Humidity Sensor",
    icon: <Thermometer size={34} className="text-sky-400" />,
    image: "/images/dht11.png",
    description:
      "The DHT11 sensor measures ambient temperature and relative humidity around the crops. These readings are used to monitor environmental conditions and support AI-driven irrigation and climate recommendations.",
    details: [
      "Temperature : 31°C",
      "Humidity : 68%",
      "Status : Active",
      "Last Updated : Just Now",
    ],
  },
  {
    title: "Soil Moisture Sensor",
    icon: <Droplets size={34} className="text-cyan-400" />,
    image: "/images/moisture.png",
    description:
      "The Soil Moisture Sensor measures the water content present in the soil. It helps determine whether irrigation is required, preventing both overwatering and underwatering while ensuring healthy crop growth.",
    details: [
      "Moisture : 62%",
      "Soil Condition : Moist",
      "Status : Active",
      "Last Updated : Just Now",
    ],
  },
  {
    title: "Tilt Sensor",
    icon: <Move3D size={34} className="text-yellow-400" />,
    image: "/images/tilt.png",
    description:
      "The Tilt Sensor detects changes in orientation or unexpected movement. It can identify equipment displacement, accidental movement, or unauthorized tampering within the smart farm.",
    details: [
      "Current State : Stable",
      "Detection : No Tilt",
      "Status : Active",
      "Last Trigger : Never",
    ],
  },
  {
    title: "LDR Light Sensor",
    icon: <Sun size={34} className="text-orange-400" />,
    image: "/images/ldr.png",
    description:
      "The Light Dependent Resistor (LDR) measures ambient light intensity. It helps determine day and night conditions, enabling intelligent greenhouse automation and smart lighting control.",
    details: [
      "Light Level : Bright",
      "Lux : 840",
      "Status : Active",
      "Last Updated : Just Now",
    ],
  },
];

export default function Sensors() {
  return (
    <div className="space-y-8 text-white">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">
          Sensors & IoT Devices
        </h1>

        <p className="text-gray-400 mt-2 max-w-4xl leading-7">
          Monitor all IoT devices connected to the AgroTech platform.
          These sensors continuously collect environmental information
          that powers AI recommendations, smart irrigation,
          blockchain verification, and real-time farm monitoring.
        </p>
      </div>

      {/* Overview */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-[#111827] rounded-2xl p-6 border border-white/10">
          <Wifi size={30} className="text-green-400 mb-4" />
          <h2 className="text-3xl font-bold">5</h2>
          <p className="text-gray-400">
            Connected Devices
          </p>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 border border-white/10">
          <Activity size={30} className="text-green-400 mb-4" />
          <h2 className="text-2xl font-bold text-green-400">
            Online
          </h2>
          <p className="text-gray-400">
            System Status
          </p>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 border border-white/10">
          <Server size={30} className="text-blue-400 mb-4" />
          <h2 className="text-xl font-bold">
            Backend Connected
          </h2>
          <p className="text-gray-400">
            API Status
          </p>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 border border-white/10">
          <Database size={30} className="text-purple-400 mb-4" />
          <h2 className="text-xl font-bold">
            MongoDB Live
          </h2>
          <p className="text-gray-400">
            Database
          </p>
        </div>

      </div>

      {/* Sensor Cards */}

      <div className="space-y-8">

        {sensors.map((sensor) => (

          <div
            key={sensor.title}
            className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-lg"
          >

            <div className="grid lg:grid-cols-3">

              {/* Image */}

              <div className="bg-[#0F172A] flex items-center justify-center p-10">

                <img
                  src={sensor.image}
                  alt={sensor.title}
                  className="h-52 object-contain"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/300x300/1f2937/ffffff?text=Sensor";
                  }}
                />

              </div>

              {/* Details */}

              <div className="lg:col-span-2 p-8">

                <div className="flex items-center gap-4">

                  {sensor.icon}

                  <h2 className="text-3xl font-bold">
                    {sensor.title}
                  </h2>

                </div>

                <p className="text-gray-400 mt-5 leading-8">
                  {sensor.description}
                </p>

                <div className="grid md:grid-cols-2 gap-5 mt-8">

                  {sensor.details.map((detail) => (

                    <div
                      key={detail}
                      className="bg-[#0F172A] rounded-xl p-5 border border-white/5"
                    >
                      {detail}
                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Communication Flow */}

      <div className="bg-[#111827] rounded-3xl p-8 border border-white/10">

        <h2 className="text-2xl font-bold mb-8">
          Communication Flow
        </h2>

        <div className="text-center text-green-400 text-xl font-semibold leading-10">

          DHT11

          <br />

          +

          <br />

          Soil Moisture

          <br />

          +

          <br />

          LDR

          <br />

          +

          <br />

          Tilt Sensor

          <br />

          ↓

          <br />

          ESP32

          <br />

          ↓

          <br />

          Backend API

          <br />

          ↓

          <br />

          MongoDB Database

        </div>

      </div>

      {/* Logs */}

      <div className="bg-[#111827] rounded-3xl p-8 border border-white/10">

        <h2 className="text-2xl font-bold mb-6">
          Recent Sensor Logs
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10 text-left">

              <th className="pb-4">Time</th>

              <th>Device</th>

              <th>Reading</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody className="text-gray-300">

            <tr className="border-b border-white/5 h-14">
              <td>10:32:14</td>
              <td>DHT11</td>
              <td>31°C | 68%</td>
              <td className="text-green-400">Success</td>
            </tr>

            <tr className="border-b border-white/5 h-14">
              <td>10:32:13</td>
              <td>Soil Moisture</td>
              <td>62%</td>
              <td className="text-green-400">Success</td>
            </tr>

            <tr className="border-b border-white/5 h-14">
              <td>10:32:12</td>
              <td>LDR</td>
              <td>840 Lux</td>
              <td className="text-green-400">Success</td>
            </tr>

            <tr className="border-b border-white/5 h-14">
              <td>10:32:11</td>
              <td>Tilt Sensor</td>
              <td>Stable</td>
              <td className="text-green-400">Success</td>
            </tr>

            <tr className="h-14">
              <td>10:32:10</td>
              <td>ESP32</td>
              <td>Heartbeat</td>
              <td className="text-green-400">Connected</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}