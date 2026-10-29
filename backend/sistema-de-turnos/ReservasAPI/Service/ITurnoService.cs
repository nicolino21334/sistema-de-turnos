using ReservasAPI.DTOs;

namespace ReservasAPI.Service
{
    public interface ITurnoService
    {

        Task<IEnumerable<TurnoDTO>> GetAllAsync();
        Task<IEnumerable<TurnoDTO>> GetByUserIdAsync(int userId);
        Task<TurnoDTO?> GetByIdAsync(int id);
        Task<TurnoDTO> CreateAsync(CrearTurnoDTO dto, int userId);
        Task<bool> ChangeStatusAsync(int id, string newStatus);
        Task<bool> CancelAsync(int id, int userId, bool isAdmin);
        Task<IEnumerable<string>> GetOccupiedSlotsAsync(int servicioId, DateTime fecha);

    }
}
