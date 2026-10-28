using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReservasAPI.DTOs;
using ReservasAPI.Service;
using Microsoft.AspNetCore.Authorization;

namespace ReservasAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiciosController : Controller
    {
        private readonly IServicioService _servicioService;

        public ServiciosController(IServicioService servicioService)
        {
            _servicioService = servicioService;
        }
        // GET: api/servicio
        [HttpGet]
        public async Task<ActionResult<List<ServicioDTO>>> GetAll()
        {
            var servicios = await _servicioService.GetAllAsync();
            return Ok(servicios);
        }

        // GET: api/servicios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServicioDTO>> GetById(int id)
        {
            var servicio = await _servicioService.GetByIdAsync(id);
            if (servicio == null)
            {
                return NotFound(new { mensaje = $"No se encontro el servicio con ID: {id}" });
            }

            return Ok(servicio);
        }

        // Post: api/servicios
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ServicioDTO>> Create([FromBody] CrearServicioDTO dto)
        {
            var nuevoServicio = await _servicioService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = nuevoServicio.Id }, nuevoServicio);
        }

        // PUT: api/servicios/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Update(int id, [FromBody] CrearServicioDTO dto)
        {
            var result = await _servicioService.UpdateAsync(id, dto);
            if (!result)
                return NotFound(new { mensaje = $"No se encontro el servicio con ID: {id}" });

            return NoContent(); //204 No Content cuando la actualizacion es exitosa
        }

        //DELETE: api/servicios/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _servicioService.DeleteAsync(id);
            if (!result)
                return NotFound(new { mensaje = $"No se encontro el servicio con ID: {id}" });
            return NoContent(); //204 No Content cuando la eliminacion es exitosa
        }
    }
}
