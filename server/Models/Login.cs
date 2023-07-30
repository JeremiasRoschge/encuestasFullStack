using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace server.Models
{
    public class Login
    {
        public int userId { get; set; }
        public string dni { get; set; }
        public string password { get; set; }


        public Login() { }

        public Login(int id, string DNI, string Password)
        {
            userId = id;
            dni = DNI;
            password = Password;

        }

    }
}