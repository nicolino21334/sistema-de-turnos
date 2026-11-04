import { useState } from "react";
import { ArrowLeft, Trophy, MapPin } from "lucide-react";

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

export default function Canchas() {
  const [deporteSeleccionado, setDeporteSeleccionado] = useState(null);

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
                      Superficie:{" "}
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
    </div>
  );
}
