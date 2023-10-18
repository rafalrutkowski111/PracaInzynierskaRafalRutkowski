using AutoMapper;
using inzRafalRutowski.DTO.Employer;
using inzRafalRutowski.DTO.Job;
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

            CreateMap<JobDTO, Job>()
                .ForMember(m => m.TimeFinishJob, c => c.MapFrom(s => s.End))
                .ForMember(m => m.TimeStartJob, c => c.MapFrom(s => s.Start))
                .ForMember(m => m.CurrentTimeFinishJob, c => c.MapFrom(s => s.CurrentEnd))
                .ForMember(m => m.Description, c => c.MapFrom(s => s.Desc));

            CreateMap<Job, JobDTO>()
              .ForMember(m => m.End, c => c.MapFrom(s => s.TimeFinishJob))
              .ForMember(m => m.Start, c => c.MapFrom(s => s.TimeStartJob))
              .ForMember(m => m.CurrentEnd, c => c.MapFrom(s => s.CurrentTimeFinishJob))
              .ForMember(m => m.Desc, c => c.MapFrom(s => s.Description));

        }
    }
}
