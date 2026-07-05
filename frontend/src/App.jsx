import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sensors from "./pages/Sensors";
import AIAssistant from "./pages/AIAssistant";
import Blockchain from "./pages/Blockchain";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>

      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Sensors */}
      <Route
        path="/dashboard/sensors"
        element={<Sensors />}
      />

      {/* AI Assistant */}
      <Route
        path="/dashboard/ai"
        element={<AIAssistant />}
      />

      {/* Blockchain */}
      <Route
        path="/dashboard/blockchain"
        element={<Blockchain />}
      />

      {/* Settings */}
      <Route
        path="/dashboard/settings"
        element={<Settings />}
      />

    </Routes>
  );
}

export default App;