namespace ReservasAPI.Entities
{
    public class Turno
    {
        public int Id { get; set; }
        public DateTime  FechaHora { get; set; }
        public string Estado { get; set; } = "Pendiente"; // "Pendiente", "Confirmado", "Cancelado"

        //clave foranea y relacion con usuario y servicio
        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }

        public int ServicioId { get; set; }
        public Servicio? Servicio { get; set; }
    }
}
