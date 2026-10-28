using ReservasAPI.Entities;
using ReservasAPI.Repositories;
using ReservasAPI.DTOs;

namespace ReservasAPI.Service
{
    public class ServicioService : IServicioService
    {
        private readonly IServicioRepository _repository;

        public ServicioService(IServicioRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<ServicioDTO>> GetAllAsync()
        {
            var servicios = await _repository.GetAllAsync();
            return servicios.Select(s => new ServicioDTO
            {
                Id = s.Id,
                Nombre = s.Nombre,
                Descripcion = s.Descripcion,
                Precio = s.Precio,
                DuracionMinutos = s.DuracionMinutos
            }).ToList();
        }

        public async Task<ServicioDTO?> GetByIdAsync(int id)
        {
            var servicio = await _repository.GetByIdAsync(id);
            if (servicio == null) return null;

            return new ServicioDTO
            {
                Id = servicio.Id,
                Nombre = servicio.Nombre,
                Descripcion = servicio.Descripcion,
                Precio = servicio.Precio,
                DuracionMinutos = servicio.DuracionMinutos
            };

        }

        public async Task<ServicioDTO> CreateAsync(CrearServicioDTO dto) 
        {
            var servicio = new Servicio
            {
                Nombre = dto.Nombre,
                Descripcion = dto.Descripcion,
                Precio = dto.Precio,
                DuracionMinutos = dto.DuracionMinutos
            };

            await _repository.AddAsync(servicio);

            return new ServicioDTO
            {
                Id = servicio.Id,
                Nombre = servicio.Nombre,
                Descripcion = servicio.Descripcion,
                Precio = servicio.Precio,
                DuracionMinutos = servicio.DuracionMinutos
            };
        }

        public async Task<bool> UpdateAsync(int id, CrearServicioDTO dto)
        {
            var servicio = await _repository.GetByIdAsync(id);
            if (servicio == null) return false;

            servicio.Nombre = dto.Nombre;
            servicio.Descripcion = dto.Descripcion;
            servicio.Precio = dto.Precio;
            servicio.DuracionMinutos = dto.DuracionMinutos;

            await _repository.UpdateAsync(servicio);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var servicio = await _repository.GetByIdAsync(id);
            if (servicio == null) return false;

            await _repository.DeleteAsync(id);
            return true;
        }
    }
}
