using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Http;

namespace server.Controllers
{
    public class HabilitarUsuarioController : ApiController
    {
        public class DniData
        {
            public string Dni { get; set; }
        }

        [HttpPost]
        [Route("api/HabilitarUsuario")]
        public IHttpActionResult HabilitarUsuario([FromBody] DniData dniData)
        {
            try
            {
                string dni = dniData.Dni;
                bool result = HabilitarUsuarioEnBD(dni);

                if (result)
                {
                    return Ok("El DNI ha sido habilitado para votar.");
                }
                else
                {
                    return BadRequest("Error al habilitar el DNI para votar.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private bool HabilitarUsuarioEnBD(string dni)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand cmd = connection.CreateCommand();
                cmd.CommandText = "sp_HabilitarUsuario"; // Nombre del procedimiento almacenado
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@dni", dni); // Agregar el parámetro del DNI

                int rowsAffected = cmd.ExecuteNonQuery();

                return rowsAffected > 0;
            }
        }
    }
}
