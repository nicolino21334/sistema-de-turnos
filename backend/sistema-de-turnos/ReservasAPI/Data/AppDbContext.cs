using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using ReservasAPI.Entities;

namespace ReservasAPI.Data; 

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
    {
        
    }

    //tablas de la base de datos
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Servicio> Servicios { get; set; }
   
    public DbSet<Turno> Turnos { get; set; }
}