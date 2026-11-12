namespace ReservasAPI.Entities
{
    public class Reserva
    {
        public int id { get; set; }
        public int CanchaId { get; set; }
        public int UsuarioId { get; set; }
        public string UsuarioEmail { get; set; } = string.Empty;
        public string Fecha { get; set; } = string.Empty;
        public string Hora { get; set; } = string.Empty;
        public string Estado { get; set; } = "Confirmado";
    }
}
