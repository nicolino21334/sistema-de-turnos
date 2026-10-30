import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Registro from "./pages/Registro";

export default function App() {
  return (
    <Route>
      <div className="min-h-screen bg-fondo flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={<Login />} />
            <Route path="/" element={<Registro />} /> */}
          </Routes>
        </main>
      </div>
    </Route>
  );
}
