import {
  BrainCircuit,
  Sparkles,
  Activity,
  Mic,
  ShieldCheck,
  Bot,
  Cpu,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function AIAssistant() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false);

    }, 2500);

    return () => clearTimeout(timer);

  }, []);

  return (

    <div className="space-y-8 text-white">

      {/* Header */}

      <div>

        <p className="uppercase tracking-[0.25em] text-green-400 text-sm font-semibold">

          Artificial Intelligence

        </p>

        <h1 className="text-5xl font-bold mt-3">

          AgroAI Intelligence Center

        </h1>

        <p className="text-gray-400 mt-4 max-w-4xl leading-7">

          AgroAI continuously analyses environmental conditions,
          predicts crop requirements, monitors sensor health,
          and provides intelligent recommendations to improve
          productivity while reducing water and fertilizer usage.

        </p>

      </div>

      {/* Loading Animation */}

      {loading ? (

        <div className="rounded-3xl bg-[#111827] border border-white/10 p-12">

          <div className="flex flex-col items-center">

            <div className="h-24 w-24 rounded-full bg-purple-500/20 flex items-center justify-center animate-pulse">

              <BrainCircuit
                size={52}
                className="text-purple-400"
              />

            </div>

            <h2 className="text-3xl font-bold mt-8">

              AgroAI Initializing...

            </h2>

            <p className="text-gray-400 mt-3">

              Analyzing sensor data and generating recommendations

            </p>

            <div className="w-full max-w-xl bg-[#08111F] rounded-full h-4 mt-10 overflow-hidden">

              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 animate-[pulse_2s_infinite] w-3/4 rounded-full"></div>

            </div>

          </div>

        </div>

      ) : (

        <>

          {/* Status Cards */}

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">

              <div className="flex justify-between">

                <BrainCircuit className="text-purple-400" />

                <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></span>

              </div>

              <h2 className="mt-6 text-3xl font-bold">

                Online

              </h2>

              <p className="text-gray-400 mt-2">

                AI Engine Status

              </p>

            </div>

            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">

              <div className="flex justify-between">

                <Sparkles className="text-yellow-400" />

                <span className="text-green-400 font-bold">

                  96%

                </span>

              </div>

              <h2 className="mt-6 text-3xl font-bold">

                96%

              </h2>

              <p className="text-gray-400 mt-2">

                AI Confidence

              </p>

            </div>

            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">

              <div className="flex justify-between">

                <Activity className="text-cyan-400" />

                <span className="text-green-400 font-bold">

                  Live

                </span>

              </div>

              <h2 className="mt-6 text-3xl font-bold">

                148

              </h2>

              <p className="text-gray-400 mt-2">

                Analyses Today

              </p>

            </div>

            <div className="rounded-3xl bg-[#111827] border border-white/10 p-6">

              <div className="flex justify-between">

                <Mic className="text-green-400" />

                <span className="text-green-400 font-bold">

                  Ready

                </span>

              </div>

              <h2 className="mt-6 text-3xl font-bold">

                Voice AI

              </h2>

              <p className="text-gray-400 mt-2">

                Assistant Status

              </p>

            </div>

          </div>

          {/* AI Overview */}

          <div className="rounded-3xl bg-[#111827] border border-white/10 p-8">

            <div className="flex items-center gap-4">

              <Bot
                size={40}
                className="text-green-400"
              />

              <div>

                <h2 className="text-3xl font-bold">

                  Welcome to AgroAI

                </h2>

                <p className="text-gray-400 mt-2">

                  Your intelligent agricultural assistant continuously
                  analyses real-time IoT sensor data, predicts crop
                  requirements, and provides smart farming recommendations.

                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <div className="rounded-2xl bg-[#08111F] border border-white/10 p-6">

                <Cpu className="text-green-400 mb-4" />

                <h3 className="font-semibold text-lg">

                  Sensor Monitoring

                </h3>

                <p className="text-gray-400 mt-3 leading-7">

                  Continuously collects temperature,
                  humidity, soil moisture,
                  light intensity and tilt
                  sensor values.

                </p>

              </div>

              <div className="rounded-2xl bg-[#08111F] border border-white/10 p-6">

                <BrainCircuit className="text-purple-400 mb-4" />

                <h3 className="font-semibold text-lg">

                  AI Analysis

                </h3>

                <p className="text-gray-400 mt-3 leading-7">

                  Generates intelligent irrigation,
                  fertilizer and crop health
                  recommendations based on
                  sensor values.

                </p>

              </div>

              <div className="rounded-2xl bg-[#08111F] border border-white/10 p-6">

                <ShieldCheck className="text-blue-400 mb-4" />

                <h3 className="font-semibold text-lg">

                  Secure Decisions

                </h3>

                <p className="text-gray-400 mt-3 leading-7">

                  Recommendations and sensor
                  information can later be verified
                  using blockchain technology.

                </p>

              </div>

            </div>

          </div>

          {/* ================= AI ALERT CENTER ================= */}

<div className="grid xl:grid-cols-2 gap-8">

  {/* Alerts */}

  <div className="rounded-3xl bg-[#111827] border border-white/10 p-8">

    <h2 className="text-2xl font-bold mb-6">
      🚨 AI Alert Center
    </h2>

    <div className="space-y-5">

      <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">

        <h3 className="text-red-400 font-semibold">
          High Temperature Detected
        </h3>

        <p className="text-gray-300 mt-2 leading-7">
          Current temperature is above the recommended range.
          AI predicts possible crop heat stress during the afternoon.
        </p>

        <div className="mt-4 text-sm text-red-300">
          Recommendation: Increase irrigation frequency.
        </div>

      </div>

      <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">

        <h3 className="text-blue-400 font-semibold">
          Low Soil Moisture
        </h3>

        <p className="text-gray-300 mt-2 leading-7">
          Soil moisture has dropped below the optimal level.
          Irrigation is recommended within two hours.
        </p>

        <div className="mt-4 text-sm text-blue-300">
          Priority : HIGH
        </div>

      </div>

      <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">

        <h3 className="text-green-400 font-semibold">
          Crop Health Stable
        </h3>

        <p className="text-gray-300 mt-2 leading-7">
          No disease symptoms detected.
          Environmental conditions remain favourable.
        </p>

      </div>

    </div>

  </div>

  {/* Crop Health */}

  <div className="rounded-3xl bg-[#111827] border border-white/10 p-8">

    <h2 className="text-2xl font-bold mb-6">
      🌱 Crop Health Analysis
    </h2>

    <div className="flex items-center justify-center">

      <div className="h-52 w-52 rounded-full border-[18px] border-green-500 flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-5xl font-bold">
            96%
          </h2>

          <p className="text-gray-400 mt-2">
            Healthy
          </p>

        </div>

      </div>

    </div>

    <div className="grid grid-cols-2 gap-5 mt-10">

      <div className="rounded-xl bg-[#08111F] p-5 border border-white/10">

        <h3 className="text-green-400 font-semibold">
          Disease Risk
        </h3>

        <p className="mt-2 text-xl">
          Low
        </p>

      </div>

      <div className="rounded-xl bg-[#08111F] p-5 border border-white/10">

        <h3 className="text-green-400 font-semibold">
          Growth Stage
        </h3>

        <p className="mt-2 text-xl">
          Vegetative
        </p>

      </div>

      <div className="rounded-xl bg-[#08111F] p-5 border border-white/10">

        <h3 className="text-green-400 font-semibold">
          AI Confidence
        </h3>

        <p className="mt-2 text-xl">
          96%
        </p>

      </div>

      <div className="rounded-xl bg-[#08111F] p-5 border border-white/10">

        <h3 className="text-green-400 font-semibold">
          Overall Status
        </h3>

        <p className="mt-2 text-xl">
          Excellent
        </p>

      </div>

    </div>

  </div>

</div>

{/* ================= WEATHER & IRRIGATION ================= */}

<div className="grid xl:grid-cols-2 gap-8">

  {/* Weather Intelligence */}

  <div className="rounded-3xl bg-[#111827] border border-white/10 p-8">

    <h2 className="text-2xl font-bold mb-6">
      🌤 Weather Intelligence
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between border-b border-white/10 pb-4">
        <span>Temperature</span>
        <span>31°C</span>
      </div>

      <div className="flex justify-between border-b border-white/10 pb-4">
        <span>Humidity</span>
        <span>76%</span>
      </div>

      <div className="flex justify-between border-b border-white/10 pb-4">
        <span>Rain Probability</span>
        <span>15%</span>
      </div>

      <div className="rounded-2xl bg-green-500/10 p-5 border border-green-500/20">

        <h3 className="font-semibold text-green-400">
          AI Recommendation
        </h3>

        <p className="mt-3 text-gray-300 leading-7">
          No rainfall is expected today.
          Irrigation is recommended after 5 PM to reduce evaporation losses.
        </p>

      </div>

    </div>

  </div>

  {/* Irrigation */}

  <div className="rounded-3xl bg-[#111827] border border-white/10 p-8">

    <h2 className="text-2xl font-bold mb-6">
      💧 Smart Irrigation Recommendation
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between border-b border-white/10 pb-4">
        <span>Current Moisture</span>
        <span>42%</span>
      </div>

      <div className="flex justify-between border-b border-white/10 pb-4">
        <span>Recommended Moisture</span>
        <span>65%</span>
      </div>

      <div className="flex justify-between border-b border-white/10 pb-4">
        <span>Water Required</span>
        <span>2.4 Litres</span>
      </div>

      <div className="rounded-2xl bg-blue-500/10 p-5 border border-blue-500/20">

        <h3 className="font-semibold text-blue-400">
          AI Decision
        </h3>

        <p className="mt-3 text-gray-300 leading-7">
          Begin irrigation within the next two hours.
          Delaying irrigation may reduce crop productivity due to increasing temperatures.
        </p>

      </div>

    </div>

  </div>

</div>



        </>

      )}

    </div>

  );

}