import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data.message ||
          "credenciales incorrectas o error al conectar con el servidor",
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
          <LogIn className="w-7 h-7" />
        </div>
        <h2
          className="text-2xl sm:text-3xl font-extrabold text-verde-900"
          style={{ margin: "0 0 4px 0" }}
        >
          Iniciar Sesión
        </h2>
        <p
          className="text-xs sm:text-sm font-semibold text-verde-800"
          style={{ margin: "0 0 24px 0" }}
        >
          Ingresá tus datos para acceder al complejo
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
              Correo Electrónico
            </label>
            <div className="relative" style={{ width: "100%" }}>
              <Mail className="w-5 h-5 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-verde-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-verde-900 text-sm font-medium shadow-sm"
                placeholder="tu@email.com"
                required
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
              <Lock className="w-5 h-5 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-verde-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 text-verde-900 text-sm font-medium shadow-sm"
                placeholder="••••••••"
                required
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
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-md transition-all disabled:opacity-50 mt-4"
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "8px",
              cursor: "pointer",
              border: "none",
              boxSizing: "border-box",
            }}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>
        <p
          className="text-xs sm:text-sm text-verde-800 font-semibold"
          style={{ marginTop: "24px" }}
        >
          ¿No tenés cuenta todavia?{" "}
          <Link
            to="/registro"
            className="font-extrabold text-emerald-700 hover:underline"
            style={{ marginLeft: "4px" }}
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
