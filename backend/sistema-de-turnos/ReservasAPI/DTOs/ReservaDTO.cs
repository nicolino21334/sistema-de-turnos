using System.Drawing;

namespace ReservasAPI.DTOs
{
    public class CrearReservaDTO 
    {
        public int CanchaId { get; set; }
        public string Fecha { get; set; } = string.Empty;
        public string Hora { get; set; } = string.Empty;
    }

    public class ReservaReadDTO
    {
        public int Id { get; set; }
        public int CadenaId { get; set; }
        public string UsuarioEmail { get; set; } = string.Empty;
        public string Fecha { get; set; } = string.Empty;
        public string Hora { get; set; } = string.Empty;
        public string Estado { get; set; } = string.Empty;
    }
}
