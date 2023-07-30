using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;


namespace server.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "GET, POST, PUT, DELETE, OPTIONS")]


    public class TokenData
    {
        public string Token { get; set; }
    }
    public class LoginController : ApiController
    {

        private string GenerateToken(string dni)
        {
            // Clave secreta para firmar el token (puedes cambiarla a tu gusto)
            string claveSecreta = "polinaFullStack123proyectodelaescuela";

            // Crear los claims del token
            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, dni),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            // Configurar la firma del token
            var clave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(claveSecreta));
            var credenciales = new SigningCredentials(clave, SecurityAlgorithms.HmacSha256);

            // Crear el token JWT
            var token = new JwtSecurityToken(
                issuer: "issuer", // Cambiar a tu emisor (opcional)
                audience: "audience", // Cambiar a tu audiencia (opcional)
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(15), // Cambiar a la expiración deseada (opcional)
                signingCredentials: credenciales
            );

            // Serializar el token como string
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenString;
        }

        private bool ValidateToken(string token)
        {
            string claveSecreta = "polinaFullStack123proyectodelaescuela";
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(claveSecreta);

                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = "issuer",
                    ValidAudience = "audience",
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };

                SecurityToken validatedToken;
                var principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);

                // Aquí puedes realizar más validaciones según tus necesidades, como verificar el tiempo de expiración del token, etc.

                return true; // El token es válido
            }
            catch
            {
                return false; // El token no es válido o ha expirado
            }
        }

        // POST: api/Login/Validate
        [HttpPost]
        [Route("api/Login/Validate")]
        public IHttpActionResult Validate([FromBody] TokenData tokenData)
        {
            try
            {
                if (ValidateToken(tokenData.Token))
                {
                    return Ok("Token válido");
                }
                else
                {
                    return BadRequest("Token inválido");
                }
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        // GET: api/Login
        public IEnumerable<Login> Get()
        {
            GestorLogin gLogin = new GestorLogin();
            return gLogin.getAdmins();
        }

        // GET: api/Login/5
        public Login Get(string dni)
        {
            GestorLogin gLogin = new GestorLogin();
            return gLogin.getAdminByDNI(dni);
        }

        // POST: api/Login
        public IHttpActionResult Post([FromBody] LoginCredentials credentials)
        {
            // Verificar las credenciales de inicio de sesión
            string dni = credentials.Dni;
            string password = credentials.Password;

            GestorLogin gLogin = new GestorLogin();
            Login admin = gLogin.getAdminByDNI(dni);

            if (admin != null && admin.password == password)
            {
                // Credenciales válidas, generar el token
                var token = GenerateToken(dni);
                return Ok(token);
            }
            else
            {
                // Contraseña incorrecta o DNI no encontrado, retornar un mensaje de error
                return BadRequest("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
            }
        }


        // PUT: api/Login/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Login/5
        public void Delete(int id)
        {
        }
    }
}
