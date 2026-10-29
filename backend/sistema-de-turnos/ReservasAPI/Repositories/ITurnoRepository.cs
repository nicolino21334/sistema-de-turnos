using ReservasAPI.Entities;

namespace ReservasAPI.Repositories;

public interface ITurnoRepository
{
    Task<IEnumerable<Turno>> GetAllAsync();
    Task<IEnumerable<Turno>> GetByUserIdAsync(int userId);
    Task<Turno?> GetByIdAsync(int id);
    Task<Turno> CreateAsync(Turno turno);
    Task<bool> ChangesStatusAsync(int id, string newStatus);
    Task<bool> IsSlotOccupiedAsync(DateTime fechaHora, int servicioId);
    Task<IEnumerable<DateTime>> GetOccupiedSlotsAsync(int servicioId, DateTime fecha);
}