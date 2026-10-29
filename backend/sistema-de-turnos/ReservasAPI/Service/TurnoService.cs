using ReservasAPI.Entities;
using ReservasAPI.Repositories;
using ReservasAPI.DTOs;
using ReservasAPI.Service;

namespace ReservasAPI.Service
{
    public class TurnoService : ITurnoService
    {
        private readonly ITurnoRepository _turnoRepository;
        private readonly IServicioRepository _servicioRepository;

        public TurnoService(ITurnoRepository turnoRepository, IServicioRepository servicioRepository)
        {
            _turnoRepository = turnoRepository;
            _servicioRepository = servicioRepository;
        }

        public async Task<IEnumerable<TurnoDTO>> GetAllAsync()
        {
            var turnos = await _turnoRepository.GetAllAsync();
            return turnos.Select(MapToDto);
        }

        public async Task<IEnumerable<TurnoDTO>> GetByUserIdAsync(int userId)
        {
            var turnos = await _turnoRepository.GetByUserIdAsync(userId);
            return turnos.Select(MapToDto);
        }

        public async Task<TurnoDTO?> GetByIdAsync(int id)
        {
            var turno = await _turnoRepository.GetByIdAsync(id);
            return turno == null ? null : MapToDto(turno);
        }

        public async Task<TurnoDTO> CreateAsync(CrearTurnoDTO dto, int userId) 
        {
            //la reserva debe ser en el futuro
            if (dto.FechaHora <= DateTime.Now) 
            {
                throw new InvalidOperationException("La fecha y hora del tueno debe ser posterior al momento actual.");
            }

            //validar el horario comercial (ej: de 8:00 a 20:00)
            if(dto.FechaHora.Hour < 8 || dto.FechaHora.Hour >= 20)
            {
                throw new InvalidOperationException("La hora del turno solo pueden reservarse entre las 8:00 y las 20:00.");
            }

            //evitar doble reserva en el mismo horario y servicio
            var estaOcupado = await _turnoRepository.IsSlotOccupiedAsync(dto.FechaHora, dto.ServicioId);
            if (estaOcupado)
            {
                throw new InvalidOperationException("Ya hay un turno reservado para este servicio en la fecha y hora seleccionada");
            }

            //minuto en 00
            if (dto.FechaHora.Minute != 0 || dto.FechaHora.Second != 0)
            {
                throw new InvalidOperationException("Las reservas deben realizarse en horas en punto (ej: 17:00)");

            }

            //Reserva en el futuro con al menos 1 hora de anticipacion
            if (dto.FechaHora <= DateTime.Now.AddHours(1)) 
            {
                throw new InvalidOperationException("Las reservas deben realizarse con al menos 1 hora de anticipacion");
            }

            //No mas de 7 dias a futuro
            if (dto.FechaHora > DateTime.Now.AddDays(7)) 
            {
                throw new InvalidOperationException("Las reservas no pueden realizarse con mas de 7 dias de anticipacion");
            }

            //Validar que la cancha exista y este Activa
            var servicio = await _servicioRepository.GetByIdAsync(dto.ServicioId);
            if (servicio == null) 
            {
                throw new InvalidOperationException("La cancha seleccionada no existe.");
            }

            if (!servicio.Activo)
            {
                throw new InvalidOperationException("La cancha seleccionada se encuentra fuera de servicio por mantenimiento.");
            }





            var turno = new Turno
            {
                FechaHora = dto.FechaHora,
                ServicioId = dto.ServicioId,
                UsuarioId = userId,
                Estado = "Pendiente"
            };

            var createdTurno = await _turnoRepository.CreateAsync(turno);
            return MapToDto(createdTurno);
        }

        public async Task<bool> ChangeStatusAsync(int id, string newStatus) 
        {
            return await _turnoRepository.ChangesStatusAsync(id, newStatus);
        }

        public async Task<bool> CancelAsync(int id, int userId, bool isAdmin) 
        {
            var turno = await _turnoRepository.GetByIdAsync(id);
            if (turno == null) 
            {
                return false;
            }

            //si no es admin, solo el usuario duenio del turno puede cancelarlo
            if (!isAdmin && turno.Usuario.Id != userId) 
            {
                throw new InvalidOperationException("No tenes permiso para cancelar este turno");
            }

            //Al menos 1 hora de anticipacion para cancelar el turno
            if (!isAdmin && turno.FechaHora <= DateTime.Now.AddHours(1)) 
            {
                throw new InvalidOperationException("Solo se pueden cancelar los turnos con al menos 1 hora fr anticipacion");
            }

            return await _turnoRepository.ChangesStatusAsync(id, "Cancelado");

        }

        public async Task<IEnumerable<string>> GetOccupiedSlotsAsync(int servicioId, DateTime fecha) 
        {
            var turnos = await _turnoRepository.GetOccupiedSlotsAsync(servicioId, fecha);
            //formateamos la hora en string "HH:MM" para que el frontend de React la reciba lista
            return turnos.Select(t => t.ToString("HH:mm"));
        }

        private static TurnoDTO MapToDto(Turno turno) 
        {
            return new TurnoDTO
            {
                Id = turno.Id,
                FechaHora = turno.FechaHora,
                Estado = turno.Estado,
                UsuarioId = turno.UsuarioId,
                NombreUsuario = turno.Usuario != null ? turno.Usuario.Nombre : string.Empty,
                ServicioId = turno.ServicioId,
                NombreServicio = turno.Servicio != null ? turno.Servicio.Nombre : string.Empty,
                PrecioServicio = turno.Servicio != null ? turno.Servicio.Precio : 0
            };
        }
    }
}
