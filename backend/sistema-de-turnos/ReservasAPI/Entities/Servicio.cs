using System.ComponentModel.DataAnnotations.Schema;

namespace ReservasAPI.Entities
{
    public class Servicio
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Precio { get; set; }
        public int DuracionMinutos { get; set; }
    }
}
