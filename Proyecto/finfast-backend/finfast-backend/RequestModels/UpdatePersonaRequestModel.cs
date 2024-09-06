using System.ComponentModel.DataAnnotations;

namespace finfast_backend.RequestModels
{
    public class UpdatePersonaRequestModel
    {
        [Required]
        public Guid id { get; set; }

        [Required]
        public int RunCuerpo { get; set; }

        [Required]
        public char RunDigito { get; set; }


        [Required]
        public string Nombres { get; set; }

        [Required]
        public string ApellidoPaterno { get; set; }

        [Required]
        public string? ApellidoMaterno { get; set; }

        public string? Email { get; set; }

        [Required]
        public short SexoCodigo { get; set; }

        public DateTime? FechaNacimiento { get; set; }

        [Required]
        public short RegionCodigo { get; set; }

        [Required]
        public short CiudadCodigo { get; set; }

        [Required]
        public short ComunaCodigo { get; set; }

        public string? Direccion { get; set; }

        public int? Telefono { get; set; }

        public string? Observaciones { get; set; }
    }
}
