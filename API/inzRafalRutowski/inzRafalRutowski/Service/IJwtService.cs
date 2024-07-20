using System.IdentityModel.Tokens.Jwt;

namespace inzRafalRutowski.Service
{
    public interface IJwtService
    {
        public string Generate(int id);
        public JwtSecurityToken Verify(string jwt);
    }
}
