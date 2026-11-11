import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Canchas from "./pages/Canchas";
import MisReservas from "./pages/MisReservas";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-emerald-50/30 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/canchas" element={<Canchas />} />
            <Route
              path="/mis-reservas"
              element={
                <PrivateRoute>
                  <MisReservas />
                </PrivateRoute>
              }
            />
            <Route
              path="/mis-turnos"
              element={
                <PrivateRoute>
                  <MisReservas />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
