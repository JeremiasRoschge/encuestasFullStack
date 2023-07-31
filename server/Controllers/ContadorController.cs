using System.Data.SqlClient;
using System.Web.Http;
using System;
using System.Configuration;
using System.Data;

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

        // Agregar una instrucción de retorno para cubrir el bloque catch
        return BadRequest("Error en el servidor");
    }
}
