import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Wellness from "./pages/Wellness";
import Tools from "./pages/Tools";
import Goals from "./pages/Goals";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";

// Wellness
import MentalWellness from "./wellness/MentalWellness";
import PhysicalWellness from "./wellness/PhysicalWellness";
import NutritionWellness from "./wellness/NutritionWellness";

// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";

// Protection
import PrivateRoute from "./routes/PrivateRoute";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Context
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />

          <main className="flex-grow">
            <Routes>

              {/* PUBLIC */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* PROTECTED */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/wellness"
                element={
                  <PrivateRoute>
                    <Wellness />
                  </PrivateRoute>
                }
              />

              <Route
                path="/wellness/mental"
                element={
                  <PrivateRoute>
                    <MentalWellness />
                  </PrivateRoute>
                }
              />

              <Route
                path="/wellness/physical"
                element={
                  <PrivateRoute>
                    <PhysicalWellness />
                  </PrivateRoute>
                }
              />

              <Route
                path="/wellness/nutrition"
                element={
                  <PrivateRoute>
                    <NutritionWellness />
                  </PrivateRoute>
                }
              />

              <Route
                path="/tools"
                element={
                  <PrivateRoute>
                    <Tools />
                  </PrivateRoute>
                }
              />

              <Route
                path="/goals"
                element={
                  <PrivateRoute>
                    <Goals />
                  </PrivateRoute>
                }
              />

              <Route
                path="/calendar"
                element={
                  <PrivateRoute>
                    <Calendar />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
