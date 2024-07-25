using inzRafalRutowski.Models;
using System.IdentityModel.Tokens.Jwt;

namespace inzRafalRutowski.Service
{
    public interface IJwtService
    {
        public string Generate(Employer employer);
        public JwtSecurityToken Verify(string jwt);
    }
}
