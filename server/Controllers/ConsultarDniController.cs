using System;
using System.Web.Http;
using server.Models;

namespace server.Controllers
{
    public class ConsultaDniController : ApiController
    {
        [HttpGet]
        [Route("api/ConsultaDni/{dni}")]
        public IHttpActionResult ConsultaDni(string dni)
        {
            try
            {
                GestorConsultDNI gestorConsultDNI = new GestorConsultDNI();
                var resultado = gestorConsultDNI.ConsultarDni(dni);

                if (resultado.ContainsKey("Error"))
                {
                    return NotFound();
                }

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
