using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservasAPI.Data;
using ReservasAPI.DTOs;
using ReservasAPI.Entities;
using ReservasAPI.Repositories;


namespace ReservasAPI.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [Authorize]
    public class ReservasController : Controller
    {
        private readonly IReservasRepository _reservasRepository;

        public ReservasController(IReservasRepository reservasRepository)
        {
            _reservasRepository = reservasRepository;
        }

        //POST" api/reservas
        [HttpPost]
        public async Task<IActionResult> crearReserva([FromBody] CrearReservaDTO dto)
        {
            //extraemos el email del usuario directamente desde su token jwt decodificado por .NET
            var usuarioEmail = User.FindFirst(ClaimTypes.Email)?.Value ?? User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

            if (string.IsNullOrEmpty(usuarioEmail))
            {
                return Unauthorized(new { mensaje = "Usuario no identificado en el token. " });
            }

            var nuevaReserva = new Reserva
            {
                CanchaId = dto.CanchaId,
                Fecha = dto.Fecha,
                Hora = dto.Hora,
                UsuarioEmail = usuarioEmail,
                Estado = "Confirmado"
            };

            var creada = await _reservasRepository.CrearReservAsync(nuevaReserva);

            return CreatedAtAction(nameof(ObtenerPorId), new { id = creada.id }, creada);

        }
        //GET: api/reservas/is-reservas
        [HttpGet("mis-reservas")]
        public async Task<IActionResult> ObtenerMisReservas()
        {
            var usuarioEmail = User.FindFirst(ClaimTypes.Email)?.Value ?? User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

            if (string.IsNullOrEmpty(usuarioEmail))
            {
                return Unauthorized();
            }

            var misReservas = await _reservasRepository.ObtenerPorUsuarioEmailAsync(usuarioEmail);
            return Ok(misReservas);

        }

        //GET: api/reservas
        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerPorId(int id) 
        {
            var reserva = await _reservasRepository.ObtenerPorIdAsync(id);
            if(reserva == null) return NotFound();
            return Ok(reserva);
        }

        //DELETE: api/reservas/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id) 
        {
            var exito = await _reservasRepository.EliminarReservaAsync(id);
            if(!exito) return NotFound(new { mensaje = "La reserva no existe."});
            return Ok(new { mensaje = "Reserva eliminada con exito." });
        }


    }
}
