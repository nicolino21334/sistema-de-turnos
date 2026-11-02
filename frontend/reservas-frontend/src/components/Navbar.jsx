import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Calendar, User, LogOut, Trophy } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-verde-900 text-[#e7e7c9] shadow-md border-b border-verde-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LOGO / NOMBRE COMLEJO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-emerald-600 p-2.5 rounded-xl text-[#e7e7c9] group-hover:bg-emerald-500 transition-colors shadow-sm">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight block text-[#e7e7c9]">
              COMPLEJO DEPORTIVO
            </span>
            <span className="text-xs text-emerald-400 font-bold tracking-wider uppercase block -mt-1">
              Reserva de Canchas
            </span>
          </div>
        </Link>
        {/* NAVEGACION y USUSARIO */}
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              {/* Enlace para mis turnos / Reserva del cliente */}
              <Link
                to="/mis-turnos"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-verde-800 hover:bg-verde-700 text-[#e7e7c9] text-sm font-semibold transition-colors border border-verde-700"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Mis turnos</span>
              </Link>
              {/* Tag del usuario logueado */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-verde-800/60 border border-verde-700 text-xs">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-medium text-[#e7e7c9]/90">
                  {user.email}
                </span>
                {user.role === "Admin" && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-amber-500/20 text-amber-300 font-bold rounded uppercase">
                    Admin
                  </span>
                )}
              </div>
              {/* Boton Cerrar Sesion */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-red-900/40 text-red-200 hover:text-red-800/60 border border-red-700/50 transition-colors "
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-bold text-[#e7e7c9] hover:text-white transition-colors"
              >
                Iniciar Sesion
              </Link>
              <Link
                to="/registro"
                className="px-4 py-2 text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#e7e7c9] shadow-sm transition-all"
              >
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
