using Microsoft.AspNetCore.Mvc;
using finfast_backend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using finfast_backend.RequestModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace finfast_backend.Controllers
{
    [Route("api/personas")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        private readonly IDataRepository _repository;

        public PersonasController(IDataRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetPersonas()
        {
            try
            {
                List<Persona> personas = await _repository.GetPersonasList();
                return personas.Count > 0 ? Ok(personas) : NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensaje = "Una excepción fue arrojada durante la operación: " + ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPersona(Guid id)
        {
            try
            {
                Persona? persona = await _repository.GetPersona(id);
                return persona != null ? Ok(persona) : NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensaje = "Una excepción fue arrojada durante la operación: " + ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreatePersona([FromBody] CreatePersonaRequestModel createPersonaRequestModel)
        {
            try
            {
                Persona? persona = await _repository.CreatePersona(createPersonaRequestModel);
                return persona != null ? CreatedAtAction(nameof(GetPersona), new { id = persona.Id }, persona) : BadRequest(new { Mensaje = "No se pudo crear la persona." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensaje = "Una excepción fue arrojada durante la operación: " + ex.StackTrace });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePersona(Guid id, [FromBody] UpdatePersonaRequestModel updatePersonaRequestModel)
        {
            try
            {
                if (id != updatePersonaRequestModel.id)
                {
                    return BadRequest(new { Mensaje = "El ID en la URL no coincide con el ID en el cuerpo de la solicitud." });
                }

                Persona? persona = await _repository.UpdatePersona(updatePersonaRequestModel);
                return persona != null ? Ok(persona) : NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensaje = "Una excepción fue arrojada durante la operación: " + ex.StackTrace });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersona(Guid id)
        {
            try
            {
                bool result = await _repository.DeletePersona(id);
                return result ? Ok() : NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensaje = "Una excepción fue arrojada durante la operación: " + ex.Message });
            }
        }
    }
}
