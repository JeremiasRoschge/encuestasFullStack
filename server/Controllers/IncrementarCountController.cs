using System;
using System.Web.Http;
using server.Models;

namespace server.Controllers
{
    public class IncrementarCountController : ApiController
    {
        public class DniRequest
        {
            public string Dni { get; set; }
        }

        [HttpPost]
        [Route("api/IncrementarCount")]
        public IHttpActionResult IncrementarCount([FromBody] DniRequest request)
        {
            try
            {
                GestorIncrementarCount gestorIncrementarCount = new GestorIncrementarCount();
                string resultado = gestorIncrementarCount.IncrementarCountPorDNI(request.Dni);

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
