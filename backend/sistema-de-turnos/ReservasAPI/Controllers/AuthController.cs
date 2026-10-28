using Microsoft.AspNetCore.Mvc;
using ReservasAPI.DTOs;
using ReservasAPI.Service;

namespace ReservasAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        //POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
        {
            var response = await _authService.RegisterAsync(dto);
            if (response == null)
                return BadRequest(new { mensaje = "El Email ya se encuentra registrado" });
            return Ok(response);
        }

        //POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            var response = await _authService.LoginAsync(dto);
            if (response == null)
                return Unauthorized(new { mensaje = "Credenciales invalidas. Verifique email y contrasenia" });
            return Ok(response);
        }
    }
}
