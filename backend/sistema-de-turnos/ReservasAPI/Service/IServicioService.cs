using ReservasAPI.DTOs;

namespace ReservasAPI.Service
{
    public interface IServicioService
    {
        Task<List<ServicioDTO>> GetAllAsync();
        Task<ServicioDTO?> GetByIdAsync(int id);
        Task<ServicioDTO> CreateAsync(CrearServicioDTO dto);
        Task<bool> UpdateAsync(int id, CrearServicioDTO dto);
        Task<bool> DeleteAsync(int id);


    }
}
