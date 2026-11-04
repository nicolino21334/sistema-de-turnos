import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate, Link } from "react-router-dom";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(nombre, email, password);
      setExito(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Ocurrió un error al registrar el usuario",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 100px)",
        padding: "20px 16px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        className="bg-white shadow-2xl rounded-3xl border border-verde-900/15"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "32px 28px",
          margin: "0 auto",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          className="bg-emerald-600/15 text-emerald-700"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px auto",
          }}
        >
          <UserPlus className="w-7 h-7" />
        </div>
        <h2
          className="text-2xl sm:text-3xl font-extrabold text-verde-900"
          style={{ margin: "0 0 4px 0" }}
        >
          Crear Cuenta
        </h2>
        <p
          className="text-xs sm:text-sm font-semibold text-verde-800"
          style={{ margin: "0 0 24px 0" }}
        >
          Ingresá tus datos para registrarte en el complejo
        </p>

        {error && (
          <div
            className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs flex items-center gap-2 text-left"
            style={{
              marginBottom: "16px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {exito && (
          <div
            className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 text-left"
            style={{
              marginBottom: "16px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Usuario registrado con éxito. Redirigiendo al login...</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div style={{ width: "100%", textAlign: "left" }}>
            <label
              className="block text-xs sm:text-sm font-bold text-verde-900"
              style={{ marginBottom: "6px" }}
            >
              Nombre Completo
            </label>
            <div className="relative" style={{ width: "100%" }}>
              <User className="w-5 h-5 text-verde-700 absolute left-3 top-1/2  -translate-y-1/2" />
              <input
                type="text"
                placeholder="Juan Pérez"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-verde-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-verde-600 text-verde-900 text-sm"
                style={{
                  width: "100%",
                  paddingLeft: "44px",
                  paddingRight: "16px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
          <div style={{ width: "100%", textAlign: "left" }}>
            <label
              className="block text-xs sm:text-sm font-bold text-verde-900"
              style={{ marginBottom: "6px" }}
            >
              Correo Electrónico
            </label>
            <div className="relative" style={{ width: "100%" }}>
              <Mail className="w-5 h-5 text-verde-700 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="juan@ejemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-verde-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-verde-600 text-verde-900 text-sm"
                style={{
                  width: "100%",
                  paddingLeft: "44px",
                  paddingRight: "16px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
          <div style={{ width: "100%", textAlign: "left" }}>
            <label
              className="block text-xs sm:text-sm font-bold text-verde-900"
              style={{ marginBottom: "6px" }}
            >
              Contraseña
            </label>
            <div className="relative" style={{ width: "100%" }}>
              <Lock className="w-5 h-5 text-verde-700 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-verde-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-verde-600 text-verde-900 text-sm"
                style={{
                  width: "100%",
                  paddingLeft: "44px",
                  paddingRight: "16px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            text-fondo
            font-bol
            className="w-full py-3 rounded-xl bg-verde-600 hover:bg-verde-700d shadow-md transition-all disabled:opacity-50 mt-2"
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "8px",
              cursor: "pointer",
              border: "none",
              boxSizing: "border-box",
            }}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p
          className="text-xs sm:text-sm text-verde-800 font-semibold"
          style={{ marginTop: "24px" }}
        >
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="font-extrabold text-emerald-700 hover:underline"
            style={{ marginLeft: "4px" }}
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
