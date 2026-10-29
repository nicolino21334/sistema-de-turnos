using Microsoft.EntityFrameworkCore;
using ReservasAPI.Data;
using ReservasAPI.Entities;

namespace ReservasAPI.Repositories
{
    public class TurnoRepository : ITurnoRepository
    {
        private readonly AppDbContext _context;
        public TurnoRepository(AppDbContext context) 
        {
            _context = context;
        }

        public async Task<IEnumerable<Turno>> GetAllAsync()
        {
            return await _context.Turnos
                .Include(t => t.Usuario)
                .Include(t => t.Servicio)
                .ToListAsync();
        }

        public async Task<IEnumerable<Turno?>> GetByUserIdAsync(int userId)
        {
            return await _context.Turnos
                .Include(t => t.Usuario)
                .Include(t => t.Servicio)
                .Where(t => t.UsuarioId == userId)
                .ToListAsync();
        }

        public async Task<Turno?> GetByIdAsync(int id)
        {
            return await _context.Turnos
                .Include(t => t.Usuario)
                .Include(t => t.Servicio)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<Turno> CreateAsync(Turno turno)
        {
            _context.Turnos.Add(turno);
            await _context.SaveChangesAsync();

            await _context.Entry(turno).Reference(t => t.Usuario).LoadAsync();
            await _context.Entry(turno).Reference(t => t.Servicio).LoadAsync();

            return turno;
        }

        public async Task<bool> ChangesStatusAsync(int id, string newStatus)
        {
            var turno = await _context.Turnos.FindAsync(id);
            if (turno == null)
            {
                return false;
            }
            turno.Estado = newStatus;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<DateTime>> GetOccupiedSlotsAsync(int servicioId, DateTime fecha)
        {
            return await _context.Turnos
                .Where(t => t.ServicioId == servicioId 
                            && t.FechaHora.Date == fecha.Date 
                            && t.Estado != "Cancelado")
                .Select(t => t.FechaHora)
                .ToListAsync();
        }
        public async Task<bool> IsSlotOccupiedAsync(DateTime fechaHora, int servicioId)
        {
            return await _context.Turnos
                .AnyAsync(t => t.ServicioId == servicioId 
                            && t.FechaHora == fechaHora
                            && t.Estado != "Cancelado");
        }
    }
}
