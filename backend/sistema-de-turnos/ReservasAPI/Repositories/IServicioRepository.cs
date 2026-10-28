using ReservasAPI.Entities;

namespace ReservasAPI.Repositories
{
    public interface IServicioRepository
    {
        Task<List<Servicio>> GetAllAsync();
        Task<Servicio?> GetByIdAsync(int id);
        Task AddAsync(Servicio servicio);
        Task UpdateAsync(Servicio servicio);
        Task DeleteAsync(int id);
    }
}
