using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace server.Models
{
    public class GestorLogin
    {
        public List<Login> getAdmins()
        {
            List<Login> lista = new List<Login>();
            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(strConn))
            {
                conn.Open();
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "GetAllAdmins";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {

                    int id = dr.GetInt32(0);
                    string dni = dr.GetString(1).Trim();
                    string password = dr.GetString(2).Trim();


                    Login login = new Login(id, dni, password);
                    lista.Add(login);


                }
                dr.Close();
                conn.Close();
            }

            return lista;
        }

        public Login getAdminByDNI(string dni)
        {
            Login admin = null;
            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(strConn))
            {
                conn.Open();
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "GetAdminByDNI";
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@dni", dni); // Agregar el parámetro del DNI

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.Read())
                {
                    int id = dr.GetInt32(0);
                    string dniValue = dr.GetString(1).Trim();
                    string password = dr.GetString(2).Trim();

                    admin = new Login(id, dniValue, password);
                }

                dr.Close();
                conn.Close();
            }

            return admin;
        }
    }
}
