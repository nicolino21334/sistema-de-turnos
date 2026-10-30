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
    <header className="bg-verde-900 text-fondo shadow-md border-b border-verde-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LOGO / NOMBRE COMLEJO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-verde-600 p-2.5 rounded-xl text-fondo group-hover:bg-verde-700 transition-colors shadow-sm">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight block">
              COMPLEJO DEPORTIVO
            </span>
            <span className="text-xs text-verde-600 font-semibold tracking-wider uppercase block -mt-1">
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
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-verde-800 hover:bg-verde-700 text-fondo text-sm font-medium transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Mis turnos</span>
              </Link>
              {/* Tag del usuario logueado */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-verde-800/60 border border-verde-700 text-xs">
                <User className="w-3.5 h-3.5 text-verde-600" />
                <span className="font-medium text-fondo/90">{user.email}</span>
                {user.role === "Admin" && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-amber-500/20 text-amber-300 font-bold rounded uppercase">
                    Admin
                  </span>
                )}
              </div>
              {/* Boton Cerrar Sesion */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-900/40 text-red-300 hover:text-red-200 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-fondo hover:text-white transition-colors"
              >
                Iniciar Sesion
              </Link>
              <Link
                to="/registro"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-verde-600 hover:bg-verde-700 text-fondo shadow-sm transition-all"
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
