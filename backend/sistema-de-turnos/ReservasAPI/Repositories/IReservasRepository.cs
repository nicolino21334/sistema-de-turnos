using ReservasAPI.Entities;

namespace ReservasAPI.Repositories
{
    public interface IReservasRepository
    {
        Task<Reserva> CrearReservaAsync(Reserva reserva);
        Task<IEnumerable<Reserva>> ObtenerPorUsuarioEmailAsync(string email);
        Task<IEnumerable<Reserva>> ObtenerTodasAsync();
        Task<Reserva?> ObtenerPorIdAsync(int id);


        Task<bool> EliminarReservaAsync(int id);


    }
}
