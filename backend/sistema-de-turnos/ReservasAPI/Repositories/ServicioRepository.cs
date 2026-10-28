using Microsoft.EntityFrameworkCore;
using ReservasAPI.Data;
using ReservasAPI.Entities;

namespace ReservasAPI.Repositories
{
    public class ServicioRepository : IServicioRepository
    {
        private readonly AppDbContext _context;
        public ServicioRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Servicio>> GetAllAsync()
        {
            return await _context.Servicios.ToListAsync();
        }
        public async Task<Servicio?> GetByIdAsync(int id)
        {
            return await _context.Servicios.FindAsync(id);
        }
        public async Task AddAsync(Servicio servicio)
        {
            _context.Servicios.AddAsync(servicio);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Servicio servicio)
        {
            _context.Servicios.Update(servicio);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var servicio = await _context.Servicios.FindAsync(id);
            if (servicio != null)
            {
                _context.Servicios.Remove(servicio);
                await _context.SaveChangesAsync();
            }
        }

    }
}
