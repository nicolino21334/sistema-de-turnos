using System.ComponentModel.DataAnnotations;

namespace ReservasAPI.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string Nombre { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        [MinLength(6,ErrorMessage = "La contrasenia debe tener al menos 6 caracteres")]
        public string Password { get; set; } = string.Empty;
        public string Rol { get; set; } = "Cliente";

    }
}
