using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using ReservasAPI.Entities;

namespace ReservasAPI.Data; 

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Servicio>().HasData(
        new Servicio { Id = 1, Nombre = "Cancha 1 - Fútbol 5", Descripcion = "Sintético", Precio = 20000, Activo = true },
        new Servicio { Id = 2, Nombre = "Cancha 2 - Fútbol 5", Descripcion = "Sintético", Precio = 20000, Activo = true },
        new Servicio { Id = 3, Nombre = "Cancha 3 - Fútbol 5", Descripcion = "Sintético", Precio = 20000, Activo = true },
        new Servicio { Id = 4, Nombre = "Cancha 1 - Pádel", Descripcion = "Cristal y sintético", Precio = 15000, Activo = true },
        new Servicio { Id = 5, Nombre = "Cancha 2 - Pádel", Descripcion = "Cristal y sintético", Precio = 15000, Activo = true },
        new Servicio { Id = 6, Nombre = "Cancha - Básquet", Descripcion = "Piso flotante", Precio = 18000, Activo = true },
        new Servicio { Id = 7, Nombre = "Cancha - Vóley", Descripcion = "Piso parquet", Precio = 16000, Activo = true }
        );
    }

    //tablas de la base de datos
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Servicio> Servicios { get; set; }
   
    public DbSet<Turno> Turnos { get; set; } = null!;
}