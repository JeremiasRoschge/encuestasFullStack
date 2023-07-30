using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;

namespace server.Models
{
    public class GestorConsultDNI
    {
        private string GetConnectionString()
        {
            return ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
        }

        public Dictionary<string, string> ConsultarDni(string dni)
        {
            Dictionary<string, string> resultado = new Dictionary<string, string>();

            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "sp_ConsultarDni";
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@dni", dni);

                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.Read())
                    {
                        resultado.Add("Curso", dr["curso"].ToString());
                        resultado.Add("ApellidoNombre", dr["apellido_nombre"].ToString());
                        resultado.Add("Habilitado", dr["habilitado"].ToString());
                    }
                    else
                    {
                        resultado.Add("Error", "No se encontraron resultados.");
                    }

                    dr.Close();
                }
            }

            return resultado;
        }
    }
}
