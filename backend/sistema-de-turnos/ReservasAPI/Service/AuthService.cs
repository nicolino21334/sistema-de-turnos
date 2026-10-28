using System.Drawing;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using ReservasAPI.DTOs;
using ReservasAPI.Entities;
using ReservasAPI.Repositories;

namespace ReservasAPI.Service
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUsuarioRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<AuthResponseDTO?> RegisterAsync(RegisterDTO dto) 
        {
            //1. Validar si el email ya existe
            if (await _userRepository.ExistsEmailAsync(dto.Email))
                return null;

            //2. Hashear la contrasenia con BCrypt
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            //3. crear la entidad usuario
            var usuario = new Usuario
            {
                Nombre = dto.Nombre,
                Email = dto.Email,
                PasswordHash = passwordHash,
                Rol = dto.Rol
            };

            //4. Guardar en base de datos
            await _userRepository.AddAsync(usuario);

            //5. Generar el token y responder
            string token = GenerarToken(usuario);

            return new AuthResponseDTO
            {


                Token = token,
                Nombre = usuario.Nombre,
                Email = usuario.Email,
                Rol = usuario.Rol

            };
        }

        public async Task<AuthResponseDTO?> LoginAsync(LoginDTO dto)
        {
            //1. Buscar usuario por email
            var usuario = await _userRepository.GetByEmailAsync(dto.Email);
            if (usuario == null) return null;

            //2. verificar la contrasenia
            bool esPasswordValida = BCrypt.Net.BCrypt.Verify(dto.Password, usuario.PasswordHash);
            if (!esPasswordValida) return null;

            //3. Generar token
            string token = GenerarToken(usuario);
            return new AuthResponseDTO
            {

                Token = token,
                Nombre = usuario.Nombre,
                Email = usuario.Email,
                Rol = usuario.Rol

            };
        }

        private string GenerarToken(Usuario usuario) 
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Name, usuario.Nombre),
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim(ClaimTypes.Role, usuario.Rol)
            };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
