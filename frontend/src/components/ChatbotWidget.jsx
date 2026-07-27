import { useEffect, useRef, useState } from "react";
import axios from "axios";

const createWelcomeMessage = () => ({
  id: 1,
  sender: "bot",
  text: "Hello! I'm your AgroTech personal assistant. I can read the live dashboard values, help analyze soil reports, suggest crop plans, or answer farming questions. How can I help you today?",
  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
});

const formatReading = (value, digits = 1) => {
  if (typeof value !== "number") return "Not available";
  return value.toFixed(digits);
};

const getDashboardSnapshot = (sensor, isConnected) => {
  if (!sensor) return null;

  const temperatureStatus = sensor.temperature > 35 ? "High" : sensor.temperature < 20 ? "Low" : "Normal";
  const humidityStatus = sensor.humidity > 80 ? "High" : sensor.humidity < 40 ? "Low" : "Good";
  const moistureStatus = sensor.moisture < 30 ? "Dry" : sensor.moisture > 70 ? "Wet" : "Optimal";
  const lightStatus = sensor.light > 700 ? "Bright" : sensor.light > 300 ? "Normal" : "Low";

  return {
    connection: isConnected ? "System live" : "Offline",
    temperature: `${formatReading(sensor.temperature)} deg C (${temperatureStatus})`,
    humidity: `${formatReading(sensor.humidity)}% (${humidityStatus})`,
    moisture: `${formatReading(sensor.moisture)}% (${moistureStatus})`,
    light: `${sensor.light ?? "Not available"} lux (${lightStatus})`,
    tilt: sensor.tilt ? "Movement detected" : "Stable",
    moistureStatus,
    temperatureStatus,
    humidityStatus,
    lightStatus,
  };
};

const getDashboardReply = (userText, snapshot) => {
  const lowerInput = userText.toLowerCase();

  if (lowerInput.includes("car") || lowerInput.includes("movie") || lowerInput.includes("sport") || lowerInput.includes("game")) {
    return "I am an AgroTech farming assistant. I can only answer questions related to agriculture, crops, soil, and your dashboard readings.";
  }

  if (!snapshot) {
    return "I cannot read the dashboard yet because the live sensor data is still loading. Please wait for the main page values to appear, then ask again.";
  }

  if (lowerInput.includes("soil") || lowerInput.includes("moisture")) {
    const advice = snapshot.moistureStatus === "Dry"
      ? "The soil looks dry, so irrigation should be checked soon."
      : snapshot.moistureStatus === "Wet"
        ? "The soil is wet, so avoid extra irrigation unless the crop specifically needs it."
        : "The soil moisture is in a healthy range.";

    return `From the main dashboard, soil moisture is ${snapshot.moisture}. ${advice}`;
  }

  if (lowerInput.includes("temperature") || lowerInput.includes("temp") || lowerInput.includes("heat")) {
    const advice = snapshot.temperatureStatus === "High"
      ? "Heat stress may be possible, so monitor irrigation and shade conditions."
      : "Temperature looks acceptable for normal monitoring.";

    return `The dashboard temperature is ${snapshot.temperature}. ${advice}`;
  }

  if (lowerInput.includes("humidity")) {
    const advice = snapshot.humidityStatus === "Low"
      ? "Low humidity can increase water loss from crops."
      : "Humidity does not look critical right now.";

    return `The dashboard humidity is ${snapshot.humidity}. ${advice}`;
  }

  if (lowerInput.includes("light") || lowerInput.includes("lux")) {
    const advice = snapshot.lightStatus === "Low"
      ? "Low light can reduce photosynthesis."
      : "Light levels look usable right now.";

    return `The dashboard light intensity is ${snapshot.light}. ${advice}`;
  }

  if (lowerInput.includes("tilt") || lowerInput.includes("movement") || lowerInput.includes("device")) {
    return `The field device tilt status is: ${snapshot.tilt}.`;
  }

  if (lowerInput.includes("dashboard") || lowerInput.includes("main page") || lowerInput.includes("status") || lowerInput.includes("read") || lowerInput.includes("sensor")) {
    return `I can read the main page now. Current status: ${snapshot.connection}. Temperature: ${snapshot.temperature}. Humidity: ${snapshot.humidity}. Soil moisture: ${snapshot.moisture}. Light: ${snapshot.light}. Device tilt: ${snapshot.tilt}.`;
  }

  return "I can help with farming questions and I can also read the main dashboard values. Ask me about soil moisture, temperature, humidity, light, tilt, or overall sensor status.";
};

const getChatFallbackReply = (userText, snapshot, error) => {
  const backendMessage = error?.response?.data?.message;
  const dashboardReply = getDashboardReply(userText, snapshot);

  if (backendMessage?.toLowerCase().includes("api key")) {
    return `${dashboardReply} Gemini is not connected yet. Please check the Gemini API key in backend/.env, then restart the backend server.`;
  }

  if (backendMessage?.toLowerCase().includes("model")) {
    return `${dashboardReply} Gemini did not accept the configured model. Try setting GEMINI_MODEL in backend/.env to a model available for your API key.`;
  }

  return `${dashboardReply} Gemini is not responding right now, so I used the live dashboard data instead.`;
};

const renderInlineMarkdown = (text) => {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
};

const renderMessageText = (text) => {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, index) => {
        const bulletMatch = line.match(/^\s*[-*]\s+(.+)$/);
        const numberedMatch = line.match(/^\s*(\d+)\.\s+(.+)$/);

        if (!line.trim()) {
          return <div key={index} className="h-1" />;
        }

        if (bulletMatch) {
          return (
            <div key={index} className="flex gap-2">
              <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
              <span>{renderInlineMarkdown(bulletMatch[1])}</span>
            </div>
          );
        }

        if (numberedMatch) {
          return (
            <div key={index} className="flex gap-2">
              <span className="shrink-0 text-primary/90 font-semibold">{numberedMatch[1]}.</span>
              <span>{renderInlineMarkdown(numberedMatch[2])}</span>
            </div>
          );
        }

        return <p key={index}>{renderInlineMarkdown(line)}</p>;
      })}
    </div>
  );
};

export default function ChatbotWidget({ sensor, isConnected }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => [createWelcomeMessage()]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const nextMessageId = useRef(2);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isSending]);

  const addBotMessage = (text) => {
    const botMsg = {
      id: nextMessageId.current++,
      sender: "bot",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, botMsg]);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;

    const userText = inputValue.trim();
    const dashboardSnapshot = getDashboardSnapshot(sensor, isConnected);
    const chatHistory = messages.map((msg) => ({
      sender: msg.sender,
      text: msg.text,
    }));

    const userMsg = {
      id: nextMessageId.current++,
      sender: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsSending(true);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: userText,
        dashboard: dashboardSnapshot,
        history: chatHistory,
      });

      addBotMessage(response.data.reply || getDashboardReply(userText, dashboardSnapshot));
    } catch (error) {
      console.error(error);
      addBotMessage(getChatFallbackReply(userText, dashboardSnapshot, error));
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-primary text-[#003824] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(78,222,163,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(78,222,163,0.6)] transition-all animate-bounce"
        aria-label="Open AgroTech Chatbot"
      >
        <span className="material-symbols-outlined text-[28px]">smart_toy</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-full max-w-sm bg-[#0b1326] border border-primary/20 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-[#103024] p-4 flex items-center justify-between border-b border-primary/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_10px_rgba(78,222,163,0.3)]">
            <span className="material-symbols-outlined text-[24px]">smart_toy</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide">AgroTech Chatbot</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[10px] text-primary/80 uppercase tracking-wider font-semibold">
                {isSending ? "Thinking" : "Online"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-white/70 hover:text-white transition-colors p-1"
            title="Reset Chat"
            onClick={() => {
              setMessages([createWelcomeMessage()]);
              nextMessageId.current = 2;
              setIsSending(false);
            }}
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
            aria-label="Close chat"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pt-8 flex flex-col gap-6 bg-gradient-to-b from-[#05131e]/50 to-transparent">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2`}>
            <div
              style={{ padding: "12px 16px" }}
              className={`max-w-[92%] rounded-2xl ${
                msg.sender === "user"
                  ? "bg-primary/20 text-white border border-primary/30 rounded-br-none"
                  : "bg-[#1a2c3a] text-gray-200 border border-white/5 rounded-bl-none"
              }`}
            >
              <div className="text-sm leading-relaxed text-left">{renderMessageText(msg.text)}</div>
              <div className={`text-[9px] mt-1.5 opacity-60 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
            <div
              style={{ padding: "12px 16px" }}
              className="max-w-[92%] rounded-2xl bg-[#1a2c3a] text-gray-200 border border-white/5 rounded-bl-none"
            >
              <p className="text-sm leading-relaxed text-left">check live data</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: "12px 16px 16px 16px" }} className="shrink-0 bg-[#0a1a24] border-t border-white/5 flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSending}
            placeholder="Type your message..."
            className="flex-1 bg-[#122533] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-70"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isSending}
            className="w-12 h-12 shrink-0 rounded-xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center hover:bg-primary hover:text-[#003824] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Send message"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
        <p className="text-[9px] text-gray-500 text-center">AgroTech Chatbot can make mistakes. Verify important farming information.</p>
      </div>
    </div>
  );
}
