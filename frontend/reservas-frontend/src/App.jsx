import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

export default function App() {
  return (
    <Router>
      <div
        className="min-h-screen bg-fondo flex flex-col font-sans"
        style={{ backgroundColor: "#e7e7c9", color: "#182c25" }}
      >
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
