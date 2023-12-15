using AutoMapper;
using inzRafalRutowski.DTO.Employer;
using inzRafalRutowski.DTO.Job;
using inzRafalRutowski.Models;
using System.Collections.Generic;
using System.Text.Json;

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
                .ForMember(m => m.ListEmployeeAddToJob, c => c.MapFrom((s,_) => JsonSerializer.Serialize(s.ListEmployeeAddToJob)));

            CreateMap<Job, JobDTO>()
              .ForMember(m => m.End, c => c.MapFrom(s => s.TimeFinishJob))
              .ForMember(m => m.Start, c => c.MapFrom(s => s.TimeStartJob))
              .ForMember(m => m.CurrentEnd, c => c.MapFrom(s => s.CurrentTimeFinishJob))
              .ForMember(m => m.ListEmployeeAddToJob, c => c.MapFrom((s,_) => JsonSerializer.Deserialize<List<ListEmployeeAddToJob>>(s.ListEmployeeAddToJob)));

            CreateMap<JobDTO, JobHistory>()
                .ForMember(m => m.TimeFinishJob, c => c.MapFrom(s => s.End))
                .ForMember(m => m.TimeStartJob, c => c.MapFrom(s => s.Start))
                .ForMember(m => m.CurrentTimeFinishJob, c => c.MapFrom(s => s.CurrentEnd))
                .ForMember(m => m.ListEmployeeAddToJob, c => c.MapFrom((s, _) => JsonSerializer.Serialize(s.ListEmployeeAddToJob)));

            CreateMap<JobHistory, JobDTO>()
              .ForMember(m => m.End, c => c.MapFrom(s => s.TimeFinishJob))
              .ForMember(m => m.Start, c => c.MapFrom(s => s.TimeStartJob))
              .ForMember(m => m.CurrentEnd, c => c.MapFrom(s => s.CurrentTimeFinishJob))
              .ForMember(m => m.ListEmployeeAddToJob, c => c.MapFrom((s, _) => JsonSerializer.Deserialize<List<ListEmployeeAddToJob>>(s.ListEmployeeAddToJob)));

            CreateMap<Job, Job>();

        }
    }
}
