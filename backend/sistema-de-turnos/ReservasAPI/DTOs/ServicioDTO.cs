namespace ReservasAPI.DTOs
{
    public class ServicioDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public int DuracionMinutos { get; set; }
        public bool Activo { get; set; } = true; // para indicar si las canchas estan habilitadas para su uso

    }
}
