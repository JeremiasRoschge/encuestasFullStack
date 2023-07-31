using System;
using System.Net;
using System.Web.Http;
using server.Models;

namespace server.Controllers
{
    public class ConsultaDniController : ApiController
    {
        [HttpGet]
        [Route("api/VerificarDNI/{dni}")]
        public IHttpActionResult ConsultaDni(string dni)
        {
            try
            {
                GestorConsultDNI gestorConsultDNI = new GestorConsultDNI();
                var resultado = gestorConsultDNI.ConsultarDni(dni);

                if (resultado.ContainsKey("Error"))
                {
                    string mensaje = "Failed DNI";
                    return Content(HttpStatusCode.OK, mensaje);
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
