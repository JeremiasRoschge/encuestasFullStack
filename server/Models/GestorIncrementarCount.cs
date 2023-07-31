using System.Data.SqlClient;
using System.Configuration;
using System;

public class GestorIncrementarCount
{
    private string GetConnectionString()
    {
        return ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
    }

    public string IncrementarCountPorDNI(string dni)
    {
        try
        {
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                // Abrir la conexión
                conn.Open();

                // Crear y configurar el comando para llamar al procedimiento almacenado
                using (SqlCommand command = new SqlCommand("IncrementarCountPorDNI", conn))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    // Agregar el parámetro @dni al procedimiento almacenado
                    command.Parameters.AddWithValue("@dni", dni);

                    // Ejecutar el procedimiento almacenado
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            string result = reader["Result"].ToString();
                            return result;
                        }
                    }
                }
            }
        }
        catch (Exception ex)
        {
            // Manejar cualquier excepción que pueda ocurrir durante la ejecución del procedimiento almacenado
            return ex.Message;
        }

        // Si no se devuelve nada desde el procedimiento almacenado, retornar un mensaje de error
        return "error";
    }
}
