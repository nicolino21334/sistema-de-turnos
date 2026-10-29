namespace ReservasAPI.DTOs
{
    public class TurnoDTO
    {
        public int Id { get; set; }
        public DateTime FechaHora { get; set; }
        public string Estado { get; set; } = "Pendiente"; // "Pendiente", "Confirmado", "Cancelado"

        //informaciuon util del usuario
        public int UsuarioId { get; set; }
        public string NombreUsuario { get; set; } = string.Empty;

        //informacion util del servicio
        public int ServicioId { get; set; }
        public string NombreServicio { get; set; } = string.Empty;
        public decimal PrecioServicio { get; set; }
    }
}
