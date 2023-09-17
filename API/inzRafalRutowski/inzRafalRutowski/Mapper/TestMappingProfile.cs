using AutoMapper;
using inzRafalRutowski.DTO;
using inzRafalRutowski.Models;

namespace inzRafalRutowski.Mapper
{
    public class TestMappingProfile : Profile
    {
        public TestMappingProfile() //jeżeli nazwy się pokrywają automatycznie są mapowane
        {
            CreateMap<Employer, EmployerDTO>()  // z pierwszego argumentu do drugiego mapowanie
                .ForMember(m => m.SurnameTest, c => c.MapFrom(s => s.Surname));

            CreateMap<EmployerDTO, Employer>()
                .ForMember(m => m.Surname, c => c.MapFrom(s => s.SurnameTest));

        }
    }
}
