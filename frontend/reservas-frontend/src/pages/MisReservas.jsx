import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Trash2, Trophy, CheckCircle } from "lucide-react";
import api from "../services/api";

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [cargando, setcargando] = useState(true);
  //function para cancelar
  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const response = await api.get("/reservas/misreservas");
        setReservas(response.data);
      } catch (error) {
        console.error("Error al obtener mis reservas:", error);
      } finally {
        setcargando(false);
      }
    };
    obtenerReservas();
  }, []);

  const handleCancelarReserva = async (idReserva) => {
    try {
      await api.delete(`/reservas/${idReserva}}`);

      setReservas((prev) => prev.filter((r) => r.id !== idReserva));
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("No se pudo cancelar el turno. Intentalo de nuevo.");
    }
  };

  if (cargando) {
    return <div className="p-8 text-center">Cargando tus reservas...</div>;
  }

  return (
    <div className="min-h-screen bg-emerald-50/40 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-600/15 text-emerald-800 text-xs font-bold mb-2">
              <Trophy className="w-4 h-4 text-emerald-700" />
              Gestión de Turnos
            </div>
            <h1 className="text-3xl font-black text-verde-900">Mis Turnos</h1>
            <p className="text-xs sm:text-sm text-verde-800 font-medium">
              Consultá tus partidos agendados o cancelá turnos activos.
            </p>
          </div>

          <Link
            to="/canchas"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow transition-all"
          >
            <Calendar className="w-4 h-4" />
            Reservar Nueva Cancha
          </Link>
        </div>
        {/*Lista de Reservas */}
        {reservas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservas.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-3xl p-6 shadow-md border border-verde-900/10 flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden"
              >
                <div className="lex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl bg-emerald-100 p-2.5 rounded-2xl">
                      {r.deporteIcono || "⚽"}
                    </span>
                    <div>
                      <span className="ext-xs font-bold text-emerald-700 uppercase">
                        {r.deporteNombre}
                      </span>
                      <h3 className="text-lg font-black text-verde-900 leading-tight">
                        {r.canchaNombre}
                      </h3>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    <CheckCircle className="w-4 h-4" />
                    {r.estado || "confirmado"}
                  </span>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 space-y-2 mb-4 border border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-verde-900">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    Fecha: <span className="ext-slate-700">{r.fecha}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-verde-900">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Horario: <span className="text-slate-700">{r.hora} hs</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                  <div>
                    <span className="flex justify-between items-center pt-3 border-t border-slate-100">
                      Total:
                    </span>
                    <span className="text-lg font-black text-emerald-700">
                      ${r.precio?.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCancelarReserva(r.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-extrabold text-xs transition-colors border border-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    Cancelar Turno
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Estado Vacio (sin reservas) */
          <div className="bg-white rounded-3xl p-10 text-center shadow-md border border-verde-900/10">
            <span className="text-6xl mb-4 block">📅</span>
            <h3 className="text-xl font-extrabold text-verde-900 mb-2">
              No tenés reservas activas
            </h3>
            <p className="text-xs sm:text-sm text-verde-800 font-medium mb-6 max-w-sm mx-auto">
              Aún no reservaste ningún turno. Elegí la disciplina y el horario
              que más te convenga.
            </p>
            <Link
              to="/canchas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow transition-all"
            >
              Ver Canchas Disponibles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
