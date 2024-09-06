using finfast_backend.Models;
using finfast_backend.RequestModels;

namespace finfast_backend
{
    public interface IDataRepository
    {
        public Task<List<Persona>> GetPersonasList();
        public Task<Persona?> GetPersona(Guid Id);
        public Task<bool> DeletePersona(Guid Id);
        public Task<Persona?> UpdatePersona(UpdatePersonaRequestModel updatePersonaRequestModel);
        public Task<Persona?> CreatePersona(CreatePersonaRequestModel createPersonRequestModel);

        public Task<List<Ciudad>> GetCiudades(short codigoRegion);
        public Task<List<Comuna>> GetComunas(short codigoCiudad);
        public Task<List<Region>> GetRegiones();

    }
}
