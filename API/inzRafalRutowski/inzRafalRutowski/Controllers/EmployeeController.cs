using inzRafalRutowski.Data;
using inzRafalRutowski.DTO.Employee;
using inzRafalRutowski.Models;
using inzRafalRutowski.ModelsAnother;
using inzRafalRutowski.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace inzRafalRutowski.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : HomeController
    {
        // zrobić logowanie przez mfa nie robiac cookie trylko sprawdzając logowanie po ktorym będzie sprawdzane mfa

        // przy rejestracji można dodać stepper
        // napisac regexa hasło min 8 znaków, znak specjalny, mała litera i dużą litera i liczba
        // napisac regexa do maila w rejestracji
        // dodać walidajce po stronie fronta do tego
        // sprawdzanie czy login i email sie nie powtarza 
        // dodać 2 strone jerestracji gdzie będziemy prosić o dodatkowe informacje
        // zaznaczyć czy chcemy 2-etapowe logowanie za pomoca sms
        // jezeli tak to telefon jest obowiązkoy żeby podać
        // dodać walidajce po stronie fronta do tego
        // dodać do emplercontroller rejestracje (login i email muszą być unikatowe)

        // przy hasle w rejestracji zrobic hashowane haslo(mozna uzyc package bccrypt)
        // uzywa sie go "password = BCrypt.Net.BCrypt.HashPassword(password);"
        // sprawdza się BCrypt.Net.BCrypt.Verifity(password,password) - zwraca true jesli prawda
        // przy storzenei uczegoś zamiast OK() mozna uzyc Create("wiadomosc", wartosc)

        // zaktualizować rejestracne o dodanie potwierdzenia rejestracji przez emaila

        // ustawić żeby w axiosie nie było trzeba za każdym razem pisać przy autoryzacji {withCredentials: true}

        // silnijesza utoryzacjaserwer do serwera Application Signed Request
        // dać możliwość przy sms opcje żeby przez 30 dni nie było trzeba się logować
        //(można podczas logowania sprawdzać date kiedy było ostatnie logowanie za pomocą 
        //pomoca sms i jeżeli ta opcja była wybrana to jeżeli mineło więcej jak 30 dni to zmienić true/false
        // ustawić czas(5 minut) na który będzie się miało czas na wpisanie
        // albo ustawić ilość prób na 5
        // zrobić przycisk wyślij ponownie gdzie będzie wysyłany nowy kod
        // po upływie 5 minut powinna pojawić się opcja wyślij ponownie i ukryć texboxa

        // odzyskiwanie konta za pomocą maila

        // zrobić walidacje po stronie becka



        //refaktoryzacja (zacznijmy od specjalizacji)

        //poprawiać od razu nazwy

        // zamiast badrequestów zrobienie zwracana błędna informacja

        // dodać autoryzcje do programu, zeby controllery ich wymagały (trzbea dac nagłówek [Authorize])
        // aby usprawnić powyższy proces i nie pisać wszędzie [Authorize] dodać policy
        // zrobienie autoryzacji
        // jwt (package jwt)
        // TO NIE WIEM CZY TERAZ CZY PRZY EDYCJI REJESTRACJI - dodać pole admina i osoby z nim moglyby robic wszystkie operacje
        // ,bo normalnie tylko beda mogly osoby wykonywac operacje tylko dla swoich kont

        //walidacja wstpna dla controllerów
        // np sprawdzająca czy to lcizba dodatnia
        // albo tez zeby nie mozna wyslac zapytań

        // to można dodać przy refaktowyzaji (tylko w specjalizacji aby przecwiczyc dodawanie klas statycznych)
        //w interface, klasie statycznej i klasie metody powinny sie nazywac tak samo
        // interface
        // klasa statyczna : interface
        // kalse : interface



        // przy testach jednostkowych zrobienie code coverage

        //testy jednostkowe

        // zrobic po stronie fronta obsługe tokenów w memory(state) albo przez zewnetrzny program (teraz bedzie localstorage)
        // do tego stworzyc refreshtoken z zywotnoscia na 30 dni i access token na 15 minut

        // zrobic zeby cookie usuwaly sie po czasie bezczynnosci na aplikacji
        //dodać zeby tokeny nie żyly przez 1 dzień tylko krótko i żeby usuwały się stare i tworzyły nowe
        // to i to optymalnie jest zroibc zeby usuwaly sie co 15 minut w podobnym czasie
        // "Na koniec, używając tokenów odświeżania, upewnij się, że przechowujesz je w ich własnych plikach cookie.
        // Nie ma potrzeby wysyłania ich z każdym żądaniem API, więc upewnij się, że tak nie jest. 
        // okeny odświeżania należy dodawać tylko podczas odświeżania wygasłych tokenów dostępu. 
        // Oznacza to, że pliki cookie zawierające tokeny odświeżania mają nieco inne ustawienia niż pliki cookie z tokenami dostępu."

        // dodanie logów zapisywanych do bazy danych

        // zrobienie usługi(do logów) która komrpesuje nasze logi i zapisuje je na dysku

        // zrobic Data Seeding - wypełniania bazy danych początkowym zestawem danych w przypadku braku danych

        //IdentityUser można zrobić do autoryzacji. Wiele rzeczy ktorych tu zrobie ona automatyzuje, mozliwe ze przetestuje w odzielnym
        //projekce. Jeszcze do przemyślenia.


        private readonly DataContext _context;
        public EmployeeController(DataContext context , IJwtService jwtService) : base(jwtService)
        {
            _context = context;
        }

        [HttpGet("employeeSearch")]
        public ActionResult<List<EmployeeDTO>> GetEmployeeSearch([FromQuery] Guid id)
        {
            var result = new List<EmployeeDTO>();

            Employee? employeeSearch;
            var employeeWithoutEmployerSearch = _context.EmployeeAnothers.FirstOrDefault(e => Guid.Equals(e.Id, id));

            if (employeeWithoutEmployerSearch == null)
            {
                employeeSearch = _context.Employees.FirstOrDefault(e => Guid.Equals(e.Id, id));

                var employeeSpecialization = _context.EmployeeSpecializations.Where(e2 => Guid.Equals(e2.EmployeeId, employeeSearch.Id)).ToList();
                employeeSpecialization.ForEach(e2 =>
                {
                    var employee = new EmployeeDTO();
                    var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationId));
                    employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                    var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperienceId));
                    employee.ExperienceName = experiences.Select(e3 => e3.ExperienceName).First();
                    employee.Name = employeeSearch.Name;
                    employee.Surname = employeeSearch.Surname;
                    employee.EmployeeId = employeeSearch.Id;
                    employee.SpecializationId = e2.SpecializationId;
                    result.Add(employee);
                });
            }
            else
            {
                var employeeSpecialization = _context.EmployeeSpecializationAnothers.Where(e2 => Guid.Equals(e2.EmployeeAnotherId, employeeWithoutEmployerSearch.Id)).ToList();
                employeeSpecialization.ForEach(e2 =>
                {
                    var employee = new EmployeeDTO();
                    var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationAnotherId));
                    employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                    var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperianceAnotherId));
                    employee.ExperienceName = experiences.Select(e3 => e3.ExperienceName).First();
                    employee.Name = employeeWithoutEmployerSearch.Name;
                    employee.Surname = employeeWithoutEmployerSearch.Surname;
                    employee.EmployeeId = employeeWithoutEmployerSearch.Id;
                    employee.SpecializationId = e2.SpecializationAnotherId;
                    employee.IsEmployed = employeeWithoutEmployerSearch.IsEmployed;
                    result.Add(employee);
                });
            }

            return Ok(result);
        }

        [HttpGet("getEmployeesWithoutEmployer")]
        public ActionResult<List<EmployeeDTO>> GetEmployeesWithoutEmployer()
        {
            var result = new List<EmployeeDTO>();

            var employees = _context.EmployeeAnothers.Where(e => bool.Equals(e.IsEmployed, false)).ToList();


            employees.ForEach(e =>
            {

                var employeeSpecialization = _context.EmployeeSpecializationAnothers.Where(e2 => Guid.Equals(e2.EmployeeAnotherId, e.Id)).ToList();
                employeeSpecialization.ForEach(e2 =>
                {
                    var employee = new EmployeeDTO();
                    var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationAnotherId));
                    employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                    var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperianceAnotherId));
                    employee.ExperienceName = experiences.Select(e3 => e3.ExperienceName).First();
                    employee.Name = e.Name;
                    employee.Surname = e.Surname;
                    employee.EmployeeId = e.Id;
                    result.Add(employee);
                });
            });
            return Ok(result);
        }

        [HttpGet("getEmployees")]
        public ActionResult<List<EmployeeDTO>> GetEmployee([FromQuery] int employerId)
        {
            var result = new List<EmployeeDTO>();

            var employees = _context.Employees.Where(e => int.Equals(e.EmployerId, employerId)).ToList();


            employees.ForEach(e =>
            {

                var employeeSpecialization = _context.EmployeeSpecializations.Where(e2 => Guid.Equals(e2.EmployeeId, e.Id)).ToList();

                if (employeeSpecialization.Count == 0)
                {
                    var employee = new EmployeeDTO();
                    employee.SpecializationName = "Brak";
                    employee.ExperienceName = "Brak";
                    employee.Name = e.Name;
                    employee.Surname = e.Surname;
                    employee.EmployeeId = e.Id;
                    result.Add(employee);
                }
                else
                {
                    employeeSpecialization.ForEach(e2 =>
                    {
                        var employee = new EmployeeDTO();
                        var specializations = _context.Specializations.Where(e3 => int.Equals(e3.Id, e2.SpecializationId));
                        employee.SpecializationName = specializations.Select(e3 => e3.Name).First();

                        var experiences = _context.Experiences.Where(e3 => int.Equals(e3.Id, e2.ExperienceId));
                        employee.ExperienceName = experiences.Select(e3 => e3.ExperienceName).First();
                        employee.Name = e.Name;
                        employee.Surname = e.Surname;
                        employee.EmployeeId = e.Id;
                        result.Add(employee);
                    });
                }

            });
            return Ok(result);
        }

        // kopiowanie z danych z EmployeeAnother i robienie nowego pracowniak z nimi w Emplyee, analogicznie z specjalziacjami pracowników
        [HttpPut]
        public IActionResult AddEmployeeToEmployer([FromQuery] Guid employeeId, [FromQuery] int employerId)
        {
            var employee = _context.EmployeeAnothers.First(e => Guid.Equals(e.Id, employeeId));

            employee.IsEmployed = true;

            var newEmployee = new Employee()
            {
                Name = employee.Name,
                Surname = employee.Surname,
                Id = employee.Id,
                EmployerId = employerId,
            };
            _context.Employees.Add(newEmployee);


            var listSpecialization = _context.EmployeeSpecializationAnothers.Where(x => Guid.Equals(x.EmployeeAnotherId, employeeId)).ToList();

            listSpecialization.ForEach(x =>
            {
                var newSpecialist = new EmployeeSpecialization()
                {
                    EmployeeId = x.EmployeeAnotherId,
                    SpecializationId = x.SpecializationAnotherId,
                    ExperienceId = x.ExperianceAnotherId,
                };
                _context.EmployeeSpecializations.Add(newSpecialist);
            });

            _context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        public IActionResult AddEmployee([FromBody] EmployeeAddDTO request)
        {

            var newEmployee = new Employee
            {
                Name = request.Name,
                Surname = request.Surname,
                EmployerId = request.EmployerId,
                Id = Guid.NewGuid()
            };
            _context.Employees.Add(newEmployee);

            var employeeSpecialization = request.ListSpecializationAndExperience.Select(
                e => new EmployeeSpecialization
                {
                    EmployeeId = newEmployee.Id,
                    SpecializationId = e.SpecializationId,
                    ExperienceId = e.ExperienceId
                }
                ).ToList();

            employeeSpecialization.ForEach(e =>
            {
                _context.EmployeeSpecializations.Add(e);
            });

            _context.SaveChanges();
            return Ok();
        }

        //ten kontorler jest napisany tylko po to żeby dodać pracowników do Empoyeewitoutemployer których będziemy uzywali w programie(szukanie pracowników)

        [HttpPost("addEmployeeWithoutEmployer")]
        public IActionResult AddEmployeeWithoutEmployer([FromBody] EmployeeAddDTO request)
        {

            var newEmployee = new EmployeeAnother
            {
                Name = request.Name,
                Surname = request.Surname,
                IsEmployed = request.IsEmployed,
                Id = Guid.NewGuid()
            };
            _context.EmployeeAnothers.Add(newEmployee);

            var employeeSpecialization = request.ListSpecializationAndExperience.Select(
                e => new EmployeeSpecializationAnother
                {
                    EmployeeAnotherId = newEmployee.Id,
                    SpecializationAnotherId = e.SpecializationId,
                    ExperianceAnotherId = e.ExperienceId
                }
                ).ToList();

            employeeSpecialization.ForEach(e =>
            {
                _context.EmployeeSpecializationAnothers.Add(e);
            });

            _context.SaveChanges();
            return Ok();
        }

        //kontroler sprawdza czy pracownik pracuje i czy jest osobą odpowiedzialną za jakąś prace 
        [HttpPost("checkEmployeeWork")]
        public IActionResult checkEmployeeWorkForEdit([FromBody] EmployeeCheckDTO request)
        {

            bool modifyWorks = false;
            bool removeSpecialist = false;
            DateTime tomorrow = DateTime.Today.AddDays(1);
            List<EmployeeModifyDTO> employeeModifylist = new List<EmployeeModifyDTO>();

            var listEmployeeJob = _context.JobEmployees.Where(x => Guid.Equals(x.EmployeeId, request.EmployeeId) && x.TimeFinishJob > tomorrow).ToList();

            if (listEmployeeJob.Count != 0)
            {
                listEmployeeJob.ForEach(x =>
                {
                    SpecializationAndExperience? changeSpecializationOrExperriance = null;

                    if (request.IsEdit == true)
                    {
                        changeSpecializationOrExperriance = request.ListSpecializationAndExperience.FirstOrDefault(x2 =>
                        int.Equals(x2.SpecializationId, x.SpecializationId) && x2.ExperienceId != x.ExperienceId);
                    }

                    if (changeSpecializationOrExperriance != null || request.IsEdit == false)
                    {
                        modifyWorks = true;
                        var employeeModify = new EmployeeModifyDTO();

                        employeeModify.JobName = _context.Jobs.First(x2 => int.Equals(x2.Id, x.JobId)).Title;
                        employeeModify.JobId = _context.Jobs.First(x2 => int.Equals(x2.Id, x.JobId)).Id;

                        if (request.IsEdit == true)
                        {
                            var exp = request.ListSpecializationAndExperience.FirstOrDefault(x3 => int.Equals(x3.SpecializationId, x.SpecializationId));
                            int? expId = null;

                            if (exp != null)
                                expId = exp.ExperienceId;

                            int expValue = -1;
                            if (expId != null)
                                expValue = _context.Experiences.FirstOrDefault(x2 => int.Equals(x2.Id, expId)).ExperienceValue;

                            if (x.IsNeed == true && expValue < 70)
                            {
                                removeSpecialist = true;
                                employeeModify.RemoveSpecialist = true;
                            }
                        }
                        else
                        {
                            if (x.IsNeed == true)
                            {
                                removeSpecialist = true;
                                employeeModify.RemoveSpecialist = true;
                            }
                        }

                        employeeModifylist.Add(employeeModify);
                    }
                });
            }

            return Ok(new
            {
                modifyWorks = modifyWorks,
                removeSpecialist = removeSpecialist, //oznacza ze bedziemy wywalac go jako osobe odpowiedzialna, wiec jezeli bedzie edycja, ale dalej powyzej 70 doswiadczenie to bedzie to false
                employeeModifylist = employeeModifylist
            });
        }


        [HttpDelete]
        public ActionResult<Employee> DeleteEmployee([FromQuery] Guid employeeId)
        {
            var result = _context.Employees.First(x => Guid.Equals(x.Id, employeeId));
            _context.Employees.Remove(result);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("getEmployeeToEdit")]
        public IActionResult GetEmployeeToEdit([FromQuery] Guid employeeId)
        {
            var employee = _context.Employees.First(x => Guid.Equals(x.Id, employeeId));
            var employeeSpecializations = _context.EmployeeSpecializations.Where(x => Guid.Equals(x.EmployeeId, employeeId)).ToList();

            List<SpecializationAndExperience> dataListSpecializationAndExperience = new List<SpecializationAndExperience>();

            if (employeeSpecializations != null)
                employeeSpecializations.ForEach(x =>
                {
                    SpecializationAndExperience specializationAndExperience = new SpecializationAndExperience();

                    specializationAndExperience.SpecializationId = x.SpecializationId;
                    specializationAndExperience.ExperienceId = x.ExperienceId;
                    specializationAndExperience.ExperianceName = _context.Experiences.First(x2 => int.Equals(x2.Id, x.ExperienceId)).ExperienceName;
                    specializationAndExperience.SpecializationName = _context.Specializations.First(x2 => int.Equals(x2.Id, x.SpecializationId)).Name;

                    dataListSpecializationAndExperience.Add(specializationAndExperience);
                });

            return Ok(new
            {
                name = employee.Name,
                surname = employee.Surname,
                dataListSpecializationAndExperience = dataListSpecializationAndExperience
            });
        }

        [HttpPost("editEmployee")]
        public ActionResult<Employee> EditEmployee([FromBody] EmployeeAddDTO request)
        {
            //edycja pracownika
            var employee = _context.Employees.First(x => Guid.Equals(x.Id, request.EmployeeId));
            employee.Name = request.Name;
            employee.Surname = request.Surname;
            employee.EmployerId = request.EmployerId;

            //usunieciewczesniejszych specjalizacji
            var oldEmployeeSpecialization = _context.EmployeeSpecializations.Where(x => Guid.Equals(x.EmployeeId, employee.Id)).ToList();

            oldEmployeeSpecialization.ForEach(x =>
            {
                _context.EmployeeSpecializations.Remove(x);
            });

            _context.SaveChanges();

            //dodanie nowych specjalizacji
            var employeeSpecialization = request.ListSpecializationAndExperience.Select(
                e => new EmployeeSpecialization
                {
                    EmployeeId = employee.Id,
                    SpecializationId = e.SpecializationId,
                    ExperienceId = e.ExperienceId
                }
                ).ToList();

            employeeSpecialization.ForEach(e =>
            {
                _context.EmployeeSpecializations.Add(e);
            });
            _context.SaveChanges();
            return Ok();
        }

    }
}
