using server.Models;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;

public class VotacionController : ApiController
{
    private string GetConnectionString()
    {
        return ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
    }

    [HttpPost]
    [Route("api/Votar")]
    public IHttpActionResult EnviarVoto([FromBody] VotoModel voto)
    {
        string procedureName;

        // Verificar qué combinación se cumplió
        if (voto.President == "Lista MIVP" && voto.Secretary == "Lista PEV")
        {
            procedureName = "sp_Combinacion1";
        }
        else if (voto.President == "Lista MIVP" && voto.Secretary == "Voto en blanco")
        {
            procedureName = "sp_Combinacion2";
        }
        else if (voto.President == "Lista PEV" && voto.Secretary == "Lista MIVP")
        {
            procedureName = "sp_Combinacion3";
        } else if (voto.President == "PEV" && voto.Secretary == "Voto en blanco")
        {
            procedureName = "sp_Combinacion4";
        } else if (voto.President == "Voto en blanco" && voto.Secretary == "Lista MIVP")
        {
            procedureName = "sp_Combinacion5";
        } else if (voto.President == "Voto en blanco" && voto.Secretary == "Lista PEV")
        {
            procedureName = "sp_Combinacion6";
        }

        else
        {
            // Combinación 7: Voto en blanco y Voto en blanco
            procedureName = "sp_Combinacion7";
        }

        try
        {
            EjecutarProcedimientoAlmacenado(procedureName);
            return Ok("¡El voto se envió correctamente!");
        }
        catch (Exception ex)
        {
            return BadRequest("Error al enviar el voto: " + ex.Message);
        }
    }

    private void EjecutarProcedimientoAlmacenado(string procedureName)
    {
        try
        {
            string connectionString = GetConnectionString();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(procedureName, connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.ExecuteNonQuery();
                }
            }
        }
        catch (Exception ex)
        {
            throw new Exception("Error al ejecutar el procedimiento almacenado: " + ex.Message);
        }
    }
}
