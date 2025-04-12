import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProtectedRoute from './pages/@protect/ProtectedRoute';
import Login from "./pages/@auth/login/login";
import Register from "./pages/@auth/register/register";
import Dashboard from "./pages/@Dashboard/dashboard";
import Commands from "./pages/@Dashboard/pages/commands/console";
import Telemetry from "./pages/@Dashboard/pages/telemetry/telemetry";
import Sensors from "./pages/@Dashboard/pages/sensors/sensors";
import Gallery from "./pages/@Dashboard/pages/gallery/gallery";


function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protect these routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/gallery"
            element={<ProtectedRoute element={<Gallery />} />}
          />
          <Route
            path="/sensors"
            element={<ProtectedRoute element={<Sensors />} />}
          />
          <Route
            path="/telemetry"
            element={<ProtectedRoute element={<Telemetry />} />}
          />
          <Route
            path="/commands"
            element={<ProtectedRoute element={<Commands />} />}
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
