using ReservasAPI.Entities;

namespace ReservasAPI.Repositories
{
    public interface IUsuarioRepository
    {
        Task<Usuario?> GetByEmailAsync(string email);
        Task<Usuario?> GetByIdAsync(int id);
        Task AddAsync(Usuario usuario);
        Task<bool> ExistsEmailAsync(string email);
    }
}
