import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import {
  Trophy,
  CalendarCheck,
  ShieldCheck,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!user ? (
        /* VISTA PARA VISITANTES (NO LOGUEADOS) */
        <div className="flex flex-col items-center text-center space-y-8 py-8">
          {/* Badge decorarivo */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-verde-800/10 border border-verde-700/30 text-verde-900 font-semibold text-sm">
            <Trophy className="w-4 h-4 text-verde-600" />
            <span>Reserva Online Rapida y Sencella</span>
          </div>

          {/* TITULO PRINCIPAL */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-verde-900 tracking-tight max-w-4xl leading-tight">
            Vivi la pasion del deporte con el{" "}
            <span className="text-verde-600">Complejo Deportivo</span>
          </h1>

          {/* Descripcion */}
          <p className="text-lg sm:text-xl text-verde-800 max-w-2xl font-normal leading-relaxed">
            Alquilá tu cancha de Fútbol 5, Pádel, Básquet o Vóley en segundos.
            Consultá la disponibilidad de horarios en tiempo real y asegurá tu
            turno sin demoras.
          </p>

          {/* Botones de Accion */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <Link
              to="/login"
              className="px-8 py-4 rounded-xl bg-verde-600 hover:bg-verde-700 text-fondo font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Iniciar Sesion</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/registro"
              className="px-8 py-4 rounded-xl bg-verde-800 hover:bg-verde-900 text-fondo font-semibold text-lg shadow-md transition-all flex items-center justify-center"
            >
              Crear una cuenta
            </Link>
          </div>

          {/* Tarjeta de beneficios */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-16">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-verde-900/10 shadow-sm text-left">
              <div className="bg-verde-700/10 w-12 h-12 rounded-xl flex items-center justify-center text-verde-700 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-verde-900 text-lg mb-1">
                Horarios en Vivo
              </h3>
              <p className="text-sm text-verde-800">
                Visualiza al instante que turnos estan libres u ocupados de
                08:00 a 20:00 hs.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-verde-900/10 shadow-sm text-left">
              <div className="bg-verde-700/10 w-12 h-12 rounded-xl flex items-center justify-center text-verde-700 mb-4">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-verde-900 text-lg mb-1">
                Reserva Anticipada
              </h3>
              <p className="text-sm text-verde-800">
                Reservá con hasta 7 días de anticipación para no quedarte sin tu
                partido.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-verde-900/10 shadow-sm text-left">
              <div className="bg-verde-700/10 w-12 h-12 rounded-xl flex items-center justify-center text-verde-700 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-verde-900 text-lg mb-1">
                Estado de las Canchas
              </h3>
              <p className="text-sm text-verde-800">
                Enterate de antemano qué canchas están activas y cuáles en
                mantenimiento.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* VISTA PARA USUARIOS LOGUEADOS(BIENVENIDA Y ACCESO DEPORTIVO) */
        <div className="space-y-8">
          <div className="bg-verde-900 text-fondo p-8 rounded-3xl shadow-xl border border-verde-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold">
                ¡Hola de nuevo! 👋
              </h1>
              <p className="text-fondo/80 mt-1">
                Seleccioná un deporte para ver las canchas disponibles y
                reservar tu turno.
              </p>
            </div>
          </div>

          {/* Aca en el siguiente paso renderizaremos las grillas de Deportes/Canchas */}
          <div className="bg-white/40 border border-verde-900/10 rounded-2xl p-8 text-center text-verde-900">
            <p className="font-semibold text-lg">
              Próximo paso: Catálogo de Canchas por Deporte
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
