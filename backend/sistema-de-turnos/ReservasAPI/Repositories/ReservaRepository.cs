using ReservasAPI.Entities;
using ReservasAPI.Data;
using Microsoft.EntityFrameworkCore;
using ReservasAPI.Data;

namespace ReservasAPI.Repositories
{
    public class ReservaRepository : IReservasRepository
    {
        private readonly AppDbContext _context;

        public ReservaRepository (AppDbContext context)
        {
            _context = context;
        }
        public async Task<Reserva> CrearReservaAsync(Reserva reserva) 
        {
            _context.Resevas.Add(reserva);
            await _context.SaveChangesAsync();
            return reserva;
        }
        public async Task<IEnumerable<Reserva>> ObtenerPorUsuarioEmailAsync(string email) 
        {
            return await _context.Resevas.Where(r => r.UsuarioEmail == email).ToListAsync();
        }
        public async Task<IEnumerable<Reserva>> ObtenerTodasAsync() 
        {
            return await _context.Resevas.ToListAsync();
        }
        public async Task<Reserva?> ObtenerPorIdAsync(int id) 
        {
            return await _context.Resevas.FindAsync(id);
        }
        public async Task<bool> EliminarReservaAsync( int id) 
        {
            var reserva = await _context.Resevas.FindAsync(id);
            if(reserva == null) return false;

            _context.Resevas.Remove(reserva);
            await _context.SaveChangesAsync();
            return true;
        }
        

    }
}
