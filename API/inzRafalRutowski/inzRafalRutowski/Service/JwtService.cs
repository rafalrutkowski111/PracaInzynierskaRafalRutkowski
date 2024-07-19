using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace inzRafalRutowski.Service
{
    public class JwtService :IJwtService
    {
        private string secureKey = "here should be strong seciurity token";

        public string Generate(int id)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);

            var payload = new JwtPayload(id.ToString(), null, null, null, DateTime.Today.AddDays(1));
            var seciurityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(seciurityToken);
        }
    }
}
