using System.Data.SqlClient;
using System.Web.Http;
using System;
using System.Configuration;
using System.Data;
using System.Net.Http;
using System.Net;
using System.Web.Http.Results;
using server.Models;


namespace server.Controllers
{
    public class ContadorController : ApiController
    {
        public class ContadorRequest
        {
            public string Lista { get; set; }
        }
        private string GetConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
        }

        [HttpPost]
        [Route("api/Contador")]
        public IHttpActionResult ActualizarContador([FromBody] ContadorRequest request)
        {
            try
            {
                // Verificar el DNI antes de actualizar el contador
                IHttpActionResult dniVerificationResult = VerificarDni(request);
                if (dniVerificationResult is BadRequestErrorMessageResult)
                {
                    // El DNI no existe o ha ocurrido un error en la verificación, retornar el mensaje de error
                    return dniVerificationResult;
                }

                // Continuar con la actualización del contador
                using (SqlConnection conn = new SqlConnection(GetConnectionString()))
                {
                    // Abrir la conexión
                    conn.Open();

                    // Crear y configurar el comando para llamar al procedimiento almacenado
                    using (SqlCommand command = new SqlCommand("ActualizarContador", conn))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        // Agregar el parámetro @Lista al procedimiento almacenado
                        command.Parameters.AddWithValue("@Lista", request.Lista);

                        // Ejecutar el procedimiento almacenado
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                string result = reader["Result"].ToString();
                                if (result == "success")
                                {
                                    return Ok("success");
                                }
                                else
                                {
                                    return BadRequest("No se pudo actualizar el contador");
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            // Agregar una instrucción de retorno para cubrir el bloque catch y otros casos
            return BadRequest("Error en el servidor");
        }

        // Método para verificar el DNI antes de actualizar el contador
        private IHttpActionResult VerificarDni(ContadorRequest request)
        {
            try
            {
                GestorConsultDNI gestorConsultDNI = new GestorConsultDNI();
                var resultado = gestorConsultDNI.ConsultarDni(request.Lista); // Corregir aquí

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
