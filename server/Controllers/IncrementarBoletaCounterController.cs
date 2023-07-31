using System;
using System.Web.Http;
using server.Models;

namespace server.Controllers
{
    public class IncrementarBoletaCountController : ApiController
    {
        public class DniRequest
        {
            public string Dni { get; set; }
        }

        [HttpPost]
        [Route("api/IncrementarBoletaCount")]
        public IHttpActionResult IncrementarCount([FromBody] DniRequest request)
        {
            try
            {
                GestorIncrementarBoletaCount gestorIncrementarBoletaCount = new GestorIncrementarBoletaCount();
                string resultado = gestorIncrementarBoletaCount.IncrementarBoletaCountPorDNI(request.Dni);

                if (resultado == "success")
                {
                    return Ok("success");
                }
                else if (resultado == "error")
                {
                    return BadRequest("El DNI no existe en la tabla");
                }
                else
                {
                    return BadRequest("Error en el servidor");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
