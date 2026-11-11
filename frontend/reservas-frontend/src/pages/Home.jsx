import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import {
  Trophy,
  CalendarCheck,
  ShieldCheck,
  Clock,
  ArrowRight,
  Zap,
  Coffee,
  Car,
  Calendar,
} from "lucide-react";

const SERVICIOS = [
  {
    icono: <Zap className="w-5 h-5 text-emerald-600" />,
    titulo: "Iluminacion LED Pro",
    desc: "Canchas 100% equipadas para partidos nocturnos.",
  },
  {
    icono: <Car className="w-5 h-5 text-emerald-600" />,
    titulo: "Estacionamiento Gratis",
    desc: "Predio privado con seguridad las 24 hs.",
  },
  {
    icono: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    titulo: "Vestuarios &amp; Duchas",
    desc: "Instalaciones sanitarias con agua caliente.",
  },
  {
    icono: <Coffee className="w-5 h-5 text-emerald-600" />,
    titulo: "Buffet &amp; Resto Bar",
    desc: "El lugar ideal para el tercer tiempo.",
  },
];

export default function Home() {
  const { user } = useAuth();
  const nombreUsuario =
    user?.nombre || user?.nombreUsuario || user?.name || "Jugador";
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!user && (
        /* VISTA PARA VISITANTES (NO LOGUEADOS) */
        <div className="flex flex-col items-center text-center space-y-6 py-6">
          {/* Badge decorarivo */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-verde-600/15 border border-verde-600/30 text-verde-600 font-semibold text-sm">
            <Trophy className="w-4 h-4 text-verde-600" />
            <span>Reserva Online Rapida y Sencilla</span>
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
              className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#e7e7c9] font-extrabold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Iniciar Sesion</span>
              <ArrowRight className="w-5 h-5 text-[#e7e7c9]" />
            </Link>
            <Link
              to="/registro"
              className="px-8 py-4 rounded-xl bg-verde-900 hover:bg-verde-800 text-[#e7e7c9] font-extrabold text-lg shadow-md transition-all flex items-center justify-center border border-verde-700"
            >
              Crear una cuenta
            </Link>
          </div>

          {/* Tarjeta de beneficios */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-16">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-verde-900/15 shadow-sm text-left">
              <div className="bg-verde-600/15 w-12 h-12 rounded-xl flex items-center justify-center text-verde-600 mb-4">
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
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-verde-900/15 shadow-sm text-left">
              <div className="bg-verde-600/15 w-12 h-12 rounded-xl flex items-center justify-center text-verde-700 mb-4">
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
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-verde-900/15 shadow-sm text-left">
              <div className="bg-verde-600/15 w-12 h-12 rounded-xl flex items-center justify-center text-verde-600 mb-4">
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
      )}
      {user && (
        <>
          <div className=" bg-verde-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div className="max-w-lg text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-4 border border-emerald-500/30">
                <Trophy className="w-4 h-4" />
                Panel de Jugador
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                ¡Hola de nuevo, {nombreUsuario}!
              </h1>
              <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed mb-8">
                Yendo a la sección{" "}
                <span className="text-emerald-400 font-bold">"Canchas"</span>{" "}
                vas a poder encontrar las canchas de las distintas disciplinas
                que tenemos disponibles y reservar tu turno.
              </p>
              <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                <Link
                  to="/canchas"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-verde-950 font-extrabold text-sm shadow-lg transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  Ir a Canchas
                </Link>
                <Link
                  to="/mis-reservas"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm transition-all border border-white/20"
                >
                  Ver Mis Turnos
                </Link>
              </div>
            </div>
            <div className="text-8xl opacity-90 hidden md:block select-none">
              🏆
            </div>
          </div>
          {/*Tarjeta para ir a canchas */}
          <Link
            to="/canchas"
            className="flex items-center justify-between p-6 sm:p-8 bg-white rounded-3xl shadow-md border border-verde-900/10 hover:border-emerald-500 hover:shadow-xl transition-all group cursor-pointer mb-10"
          >
            <div className="flex items-center gap-4 p-5">
              <h3 className="text-lg font-extrabold text-verde-900 group-hover:text-emerald-700 transition-colors">
                Ver Canchas por Disciplina
              </h3>
              <p className="text-xs sm:text-sm text-verde-800 font-medium mt-0.5">
                Hacé clic acá para explorar las canchas de Fútbol, Pádel,
                Básquet y Vóley con sus precios y características.
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-emerald-600 group-hover:translate-x-1.5 transition-transform shrink-0 hidden sm:block" />
          </Link>
          {/*Servicios del complejo */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-verde-900/10">
            <h2 className="text-xl font-extrabold text-verde-900 mb-6 text-center">
              Servicios de nuestro complejo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICIOS.map((s, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-3"
                >
                  <div className="p-3 bg-emerald-100 rounded-2xl mb-3">
                    {s.icono}
                  </div>
                  <h4 className="font-bold text-verde-900 text-sm mb-1">
                    {s.titulo}
                  </h4>
                  <p className="text-xs text-verde-800 font-medium leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
