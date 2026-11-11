import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Trophy,
  MapPin,
  Clock,
  X,
  Calendar,
  CheckCircle,
} from "lucide-react";
import useAuth from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

//Lista de Deportes
const DEPORTES = [
  {
    id: "futbol",
    nombre: "Fútbol",
    descripcion:
      "Canchas sintéticas y de césped natural para Fútbol 5, 7 y 11.",
    icono: "⚽",
    imagen: "/public/deportes/futbol.webp",
    canchasDisponibles: 4,
  },
  {
    id: "padel",
    nombre: "Pádel",
    descripcion:
      "Canchas de cristal con césped sintético de última generación.",
    icono: "🎾",
    imagen: "/public/deportes/padel.jpg",
    canchasDisponibles: 3,
  },
  {
    id: "basquet",
    nombre: "Básquet",
    descripcion:
      "Canchas cubiertas con piso flotante profesional e iluminación LED.",
    icono: "🏀",
    imagen: "/public/deportes/basquetbol.jpg",
    canchasDisponibles: 2,
  },
  {
    id: "voley",
    nombre: "Vóley",
    descripcion:
      "Canchas techadas de parquet y canchas de arena para Beach Vóley.",
    icono: "🏐",
    imagen: "/public/deportes/voley.jpeg",
    canchasDisponibles: 2,
  },
];

//MOCK DE CANCHAS SEGUN EL DEPORTE
const CANCHAS_MOCK = {
  futbol: [
    {
      id: 101,
      nombre: "Cancha 1 - Sintético F5",
      superficie: "Sintético 12mm",
      precio: 12000,
      techada: true,
    },
    {
      id: 102,
      nombre: "Cancha 2 - Sintético F5",
      superficie: "Sintético 12mm",
      precio: 12000,
      techada: false,
    },
    {
      id: 103,
      nombre: "Cancha 3 - Césped Natural F7",
      superficie: "Césped Natural",
      precio: 18000,
      techada: false,
    },
    {
      id: 104,
      nombre: "Cancha 4 - Césped Natural F11",
      superficie: "Césped Natural",
      precio: 30000,
      techada: true,
    },
  ],
  padel: [
    {
      id: 201,
      nombre: "Pádel Central - Cristal",
      superficie: "Césped Azul Pro",
      precio: 10000,
      techada: true,
    },
    {
      id: 202,
      nombre: "Pádel 2 - Cristal",
      superficie: "Césped Verde",
      precio: 9000,
      techada: true,
    },
    {
      id: 203,
      nombre: "Pádel 3 - Panorámica",
      superficie: "Césped Azul",
      precio: 11000,
      techada: true,
    },
  ],
  basquet: [
    {
      id: 301,
      nombre: "Gimnasio Principal",
      superficie: "Piso Flotante Parquet",
      precio: 15000,
      techada: true,
    },
    {
      id: 302,
      nombre: "Cancha Auxiliar",
      superficie: "Goma de Alto Impacto",
      precio: 12000,
      techada: true,
    },
  ],
  voley: [
    {
      id: 401,
      nombre: "Vóley Techado 1",
      superficie: "Piso Flotante",
      precio: 11000,
      techada: true,
    },
    {
      id: 402,
      nombre: "Beach Vóley Arena",
      superficie: "Arena Fina",
      precio: 8500,
      techada: false,
    },
  ],
};

const HORARIOS_DISPONIBLES = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export default function Canchas() {
  const { user } = useAuth;
  const navigate = useNavigate();
  const [deporteSeleccionado, setDeporteSeleccionado] = useState(null);
  const [reservas, setReservas] = useState([]);

  console.log("🔍 Estado actual de user en Canchas:", user);
  console.log("🔍 Token en localStorage:", localStorage.getItem("token"));

  const [canchaEditar, setCanchaEditar] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [reservaConfirmada, setReservaConfirmada] = useState(false);

  const handleAbrirModal = (cancha) => {
    const token = localStorage.getItem("token");

    if (!user && !token) {
      navigate("/login");
      return;
    }

    setCanchaEditar(cancha);
    setHorarioSeleccionado("");
    setReservaConfirmada(false);
  };

  const handleCerrarModal = () => {
    setCanchaEditar(null);
    setReservaConfirmada(false);
  };

  const handlConfirmarReserva = async () => {
    if (!horarioSeleccionado || !canchaEditar) return;
    try {
      const datosReserva = {
        canchaId: canchaEditar.id,
        fecha: fechaSeleccionada,
        hora: horarioSeleccionado,
      };

      const response = await api.post("/reservas", datosReserva);

      const reservaCreada = response.data || {
        ...datosReserva,
        id: `${canchaEditar.id}-${fechaSeleccionada}-${horarioSeleccionado}`,
      };
      console.log("Reserva Creada en el servidor:", response.data);

      setReservas((prev) => [...prev, reservaCreada]);
      setReservaConfirmada(true);
    } catch (error) {
      console.error("Error al guardar la reserva en la api:", error);
      alert(
        error.response?.data?.mensaje || "Hubo un error al procesar la reserva",
      );
    }
  };
  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const response = await api.get("/reservas");
        setReservas(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error al obtener reservas ocupadas:", error);
        setReservas([]);
      }
    };

    cargarReservas();
  }, []);

  //Deporte actual sleccionado
  const deporteActual = DEPORTES.find(
    (deporte) => deporte.id === deporteSeleccionado,
  );
  const canchaDelDeporte = deporteSeleccionado
    ? CANCHAS_MOCK[deporteSeleccionado] || []
    : [];

  return (
    <div className="min-h-screen bg-verde-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {!deporteSeleccionado ? (
          <div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600/15 text-emerald-800 text-xs sm:text-sm font-bold mb-3">
                <Trophy className="w-4 h-4 text-emerald-700" />
                Reserva de Turnos
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-verde-900 tracking-tight">
                Elegí tu Deporte
              </h1>
              <p className="mt-2 text-sm sm:text-base text-verde-800 max-w-xl mx-auto font-medium">
                Seleccioná una disciplina para consultar la disponibilidad de
                canchas y reservar tu horario.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DEPORTES.map((deporte) => (
                <div
                  key={deporte.id}
                  onClick={() => setDeporteSeleccionado(deporte.id)}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-verde-900/10 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={deporte.imagen}
                      alt={deporte.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-verde-950/80 via-verde-950/20 to-transparent" />
                    <span className="absolute top-3 left-3 text-3xl bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow">
                      {deporte.icono}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow">
                      {deporte.canchasDisponibles} Canchas
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold text-verde-900 mb-1">
                        {deporte.nombre}
                      </h3>
                      <p className="text-xs text-verde-800 font-medium leading-relaxed">
                        {deporte.descripcion}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="mt-5 w-full py-2.5 px-4 rounded-xl bg-emerald-600 group-hover:bg-emerald-500 text-white text-xs sm:text-sm font-extrabold transition-colors shadow"
                    >
                      Ver Canchas
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={() => setDeporteSeleccionado(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-verde-900 font-bold text-xs sm:text-sm shadow border border-verde-900/10 hover:bg-verde-100 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-700" />
              Volver a Deportes
            </button>
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-verde-900/10 mb-8 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <span className="text-5xl bg-emerald-100 p-4 rounded-2xl">
                {deporteActual?.icono}
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-verde-900">
                  Canchas de {deporteActual?.nombre}
                </h2>
                <p className="text-xs sm:text-sm font-medium text-verde-800">
                  {deporteActual?.descripcion}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {canchaDelDeporte.map((cancha) => (
                <div
                  key={cancha.id}
                  className="bg-white rounded-3xl p-6 shadow-lg border border-verde-900/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-extrabold text-verde-900">
                        {cancha.nombre}
                      </h3>
                      <span
                        className={`text-xs font-extrabold px-3 py-1 rouded-full ${cancha.techada ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"}`}
                      >
                        {cancha.techada ? "Techada" : "Al Aire Libre"}
                      </span>
                    </div>
                    <p className="text-xs text-verde-800 font-semibold mb-4 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                      Superficie:
                      <span className="font-bold text-verde-900">
                        {cancha.superficie}
                      </span>
                    </p>
                  </div>
                  <div className="pt-4 border-t border-verde-900/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-verde-800 block">
                        Precio por hora
                      </span>
                      <span className="text-xl font-black text-emerald-700">
                        ${cancha.precio.toLocaleString("es-AR")}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAbrirModal(cancha)}
                      className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow transition-colors flex items-center gap-2"
                    >
                      Ver Turnos
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {canchaEditar && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={handleCerrarModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {!reservaConfirmada ? (
              <>
                <div className="mb-6">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                    Reservar Turno
                  </span>
                  <h3 className="text-xl font-black text-verde-900">
                    {canchaEditar.nombre}
                  </h3>
                  <p className="text-xs text-verde-800 mt-1">
                    Precio:{" "}
                    <span className="font-bold text-emerald-700">
                      ${canchaEditar.precio.toLocaleString("es-AR")} / hora
                    </span>
                  </p>
                </div>

                {/* Seleccion de fecha */}
                <div className="m-5">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-verde-900 mb-2">
                    <Calendar className="w-4 h-4 text-emerald-600">
                      Selecciona la fecha:
                    </Calendar>
                  </label>
                  <input
                    type="date"
                    value={fechaSeleccionada}
                    onChange={(e) => setFechaSeleccionada(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-verde-900 focus:outline-none focus:border-emerald-500 shadow-sm"
                  />
                </div>

                {/* Seleccion de Horario (de 08:00 a 20:00) */}
                <div className="mb-6">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-verde-900 mb-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Horarios Disponibles (08:00 a 20:00 hs)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
                    {HORARIOS_DISPONIBLES.map((hora) => {
                      const ocupado =
                        Array.isArray(reservas) &&
                        reservas.some(
                          (r) =>
                            String(r.canchaId) === String(canchaEditar?.id) &&
                            r.fecha === fechaSeleccionada &&
                            r.hora === hora,
                        );

                      const seleccionado = horarioSeleccionado === hora;

                      return (
                        <button
                          key={hora}
                          type="button"
                          onClick={() => setHorarioSeleccionado(hora)}
                          className={`py-2 rounded-xl text-xs font-extrabold border transition-all ${ocupado ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 line-through" : seleccionado ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-105" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300"}`}
                        >
                          {hora} {ocupado && "(Ocupado)"}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Boton de confirmacion */}
                <button
                  type="button"
                  disabled={!horarioSeleccionado}
                  onClick={handlConfirmarReserva}
                  className={`w-full py-3 rounded-2xl font-black text-sm shadow-lg transition-all ${horarioSeleccionado ? "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                >
                  {horarioSeleccionado
                    ? `Confirmar para las ${horarioSeleccionado} hs`
                    : "Seleccioná un horari"}
                </button>
              </>
            ) : (
              /* Pantalla de confirmacion exitosa */
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-verde-900 mb-2">
                  ¡Turno Reservado!
                </h3>
                <p className="text-xs text-verde-800 font-medium mb-6">
                  Tu Reserva para{" "}
                  <span className="font-bold text-verde-900">
                    {canchaEditar.nombre}
                  </span>
                  el día{" "}
                  <span className="font-bold text-verde-900">
                    {fechaSeleccionada}
                  </span>{" "}
                  a las{" "}
                  <span className="font-bold text-emerald-700">
                    {horarioSeleccionado} hs
                  </span>
                  ha sido confirmada con éxito.
                </p>
                <button
                  onClick={handleCerrarModal}
                  className="w-full py-3 rounded-2xl bg-verde-950 text-verde-900 font-extrabold text-sm hover:bg-verde-900 hover:text-white transition-colors shadow"
                >
                  Entendido
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
