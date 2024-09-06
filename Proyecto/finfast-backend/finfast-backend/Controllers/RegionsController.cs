using finfast_backend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace finfast_backend.Controllers
{
    [Route("api/regiones")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IDataRepository _repository;

        public ValuesController(IDataRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetRegiones()
        {
            try
            {
                List<Region> regions = await _repository.GetRegiones();
                return regions.Count > 0 ? Ok(regions) : NotFound(); 
            }
            catch(Exception ex)
            {
                return StatusCode(500, new { Mensaje = "Una excepción fue arrojada durante la operación: " + ex.Message });
            }


        }
        [HttpGet("ciudades")]
        public async Task<IActionResult> GetCiudades([FromQuery] short region)
        {
            try
            {
                List<Ciudad> ciudades = await _repository.GetCiudades(region);
                return ciudades.Count > 0 ? Ok(ciudades) : NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensaje = "Una excepción fue arrojada durante la operación: " + ex.Message });
            }
        }
        [HttpGet("ciudades/comunas")]
        public async Task<IActionResult> GetComunas([FromQuery] short ciudad)
        {
            try
            {
                List<Comuna> comunas = await _repository.GetComunas(ciudad);
                return comunas.Count > 0 ? Ok(comunas) : NotFound();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensaje = "Una excepción fue arrojada durante la operación: " + ex.Message });
            }
        }

    }
}
