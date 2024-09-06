using finfast_backend.Models;
using finfast_backend.RequestModels;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace finfast_backend
{
    public class DataRepository : IDataRepository
    {

        private readonly PruebaTecnicaContext _dbContext;

        public DataRepository(PruebaTecnicaContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<Persona?> CreatePersona(CreatePersonaRequestModel createPersonRequestModel)
        {
            Persona persona = new Persona
            {
                RunCuerpo = createPersonRequestModel.RunCuerpo,
                RunDigito = createPersonRequestModel.RunDigito.ToString(),
                Nombres = createPersonRequestModel.Nombres,
                ApellidoPaterno = createPersonRequestModel.ApellidoPaterno,
                ApellidoMaterno = createPersonRequestModel.ApellidoMaterno,
                Email = createPersonRequestModel.Email,
                SexoCodigo = createPersonRequestModel.SexoCodigo,
                FechaNacimiento = createPersonRequestModel.FechaNacimiento.HasValue ? DateOnly.FromDateTime(createPersonRequestModel.FechaNacimiento.Value) : (DateOnly?)null,
                RegionCodigo = createPersonRequestModel.RegionCodigo,
                CiudadCodigo = createPersonRequestModel.CiudadCodigo,
                ComunaCodigo = createPersonRequestModel.ComunaCodigo,
                Direccion = createPersonRequestModel.Direccion,
                Telefono = createPersonRequestModel.Telefono,
                Observaciones = createPersonRequestModel.Observaciones
            };

            _dbContext.Add(persona);

            int result = await _dbContext.SaveChangesAsync();
            if (result > 0) 
            {

                return await _dbContext.Personas
                    .AsNoTracking()
                    .FirstOrDefaultAsync(p => p.Run.Replace(".", "").Contains(createPersonRequestModel.RunCuerpo.ToString() + '-' + createPersonRequestModel.RunDigito.ToString()));
            }

            return null;
        }

        public async Task<bool> DeletePersona(Guid Id)
        {
            Persona? persona = await _dbContext.Personas.Where(e => e.Id == Id).FirstOrDefaultAsync();
            if (persona == null) return false;

            _dbContext.Remove(persona);

            int modified_entries = await _dbContext.SaveChangesAsync();

            return modified_entries > 0;
        }

        public async Task<Persona?> GetPersona(Guid Id)
        {
            return await _dbContext.Personas.Where(e => e.Id == Id).FirstOrDefaultAsync();
        }

        public async Task<List<Persona>> GetPersonasList()
        {
            return await _dbContext.Personas.ToListAsync();
        }

        public async Task<Persona?> UpdatePersona(UpdatePersonaRequestModel updatePersonaRequestModel)
        {
            Persona? persona = await _dbContext.Personas.Where(e => e.Id == updatePersonaRequestModel.id).FirstOrDefaultAsync();

            if(persona == null) throw new ArgumentException("No se encontró una persona con ese Id");

            persona.RunCuerpo = updatePersonaRequestModel.RunCuerpo;
            persona.RunDigito = updatePersonaRequestModel.RunDigito.ToString();
            persona.Nombres = updatePersonaRequestModel.Nombres;
            persona.ApellidoPaterno = updatePersonaRequestModel.ApellidoPaterno;
                     persona.ApellidoMaterno = updatePersonaRequestModel.ApellidoMaterno;
            persona.Email = updatePersonaRequestModel.Email;
            persona.SexoCodigo = updatePersonaRequestModel.SexoCodigo;
            persona.FechaNacimiento = updatePersonaRequestModel.FechaNacimiento.HasValue
                ? DateOnly.FromDateTime(updatePersonaRequestModel.FechaNacimiento.Value)
                : (DateOnly?)null;
            persona.RegionCodigo = updatePersonaRequestModel.RegionCodigo;
            persona.CiudadCodigo = updatePersonaRequestModel.CiudadCodigo;
            persona.ComunaCodigo = updatePersonaRequestModel.ComunaCodigo;
            persona.Direccion = updatePersonaRequestModel.Direccion;
            persona.Telefono = updatePersonaRequestModel.Telefono;
            persona.Observaciones = updatePersonaRequestModel.Observaciones;


            int result = await _dbContext.SaveChangesAsync();

            return result > 0 ? persona : null;
        }

        public async Task<List<Ciudad>> GetCiudades(short codigoRegion)
        {
            return await _dbContext.Ciudads.Where(e => e.RegionCodigo == codigoRegion).ToListAsync();
        }
        public async Task<List<Comuna>> GetComunas(short codigoCiudad)
        {
            return await _dbContext.Comunas.Where(e => e.CiudadCodigo == codigoCiudad).ToListAsync();
        }
        public async Task<List<Region>> GetRegiones()
        {
            return await _dbContext.Regions.ToListAsync();
        }
    }
}
