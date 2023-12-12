import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import * as dayjs from 'dayjs'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

const Summary = (props) => {

    const addNewJob = () => {
        const updatelistEmployeeAddToJob = props.listEmployeeAddToJob.map(x => {
            const temp = props.dataEmployeeWithSpecialization.find(x2 => x2.specializationId === x.specializationId);
            x.responsiblePersonName = temp.name;
            x.responsiblePersonSurname = temp.surname
            x.responsiblePersonEmployeeId = temp.employeeId
            if(props.isUpdate === true)
            {
                let listWithFinishWorkHours = props.listEmployeeAddToJobEdit.find(x2=> x2.specializationId === x.specializationId)

                if(listWithFinishWorkHours != undefined)
                    x.finishWorkHours = listWithFinishWorkHours.finishWorkHours
                else x.finishWorkHours = 0;
            } else x.finishWorkHours = 0;
            
            return x;
        })
        props.setListEmployeeAddToJob(updatelistEmployeeAddToJob)

        console.log(props.listEmployeeAddToJob)

        axios.post('http://localhost:5000/api/Job/' + props.action, {
            title: props.title, desc: "description", listEmployeeAddToJob: props.listEmployeeAddToJob, color: "",
            start: dayjs(props.dataStart), end: dayjs(props.dataEnd), EmployerId: props.userId, currentEnd: dayjs(props.endDayWork),
            jobId: props.action === 'editJob'? props.jobId : null
        })
            .then(props.setModalOpenConfirmAdd(true))
    }

    const changeSpecialist = (idSpecialistToChange, currentSpecialistUserIdToChange) => {

        props.setIndexSpecialistToChange(props.listEmployeeAddToJob.findIndex(x => x.specializationId === idSpecialistToChange));
        props.setCurrentSpecialistUserIdToChange(currentSpecialistUserIdToChange);
        props.setModalOpenChangeSpeclialist(true)
    }

    const removePerson = (person, specialist) => {


        //inne podejście zamiast splice użyte slice. brak mutacji tylko tworzenie nowej tablicy
        //tu chyba różnicy nie robi bo i tak potem tworzymy nową tablice którą zastępujemy starą
        const index = specialist.employeeInJobList.findIndex(x => x.employeeId === person.employeeId)
        const newSpecialistList = specialist.employeeInJobList.slice(0, index).concat(specialist.employeeInJobList.slice(index + 1))

        const removeListEmployeeAddToJob = props.listEmployeeAddToJob.map(x => {
            if (x.specializationId === specialist.specializationId) {
                x.employeeInJobList = newSpecialistList
                x.hours += person.hoursJob
            }
            return x;
        })
        props.setListEmployeeAddToJob(removeListEmployeeAddToJob)

        axios.post('http://localhost:5000/api/Job/UpdateTimeJob',
            {
                listEmployeeInJobDTOList: props.listEmployeeAddToJob, start: dayjs(props.dataStart)
            },)
            .then(response => { props.setEndDayWork(response.data.endWorkDay); props.setListEmployeeAddToJob(response.data.listEmployeeInJob) })
    }
    const showAddEmployee = (SpecializationId) => {

        axios.post('http://localhost:5000/api/Job/AddEmployee',
            {
                listEmployeeInJobDTOList: props.listEmployeeAddToJob, EmployerId: props.userId, start: dayjs(props.dataStart), end: dayjs(props.dataEnd),
                SpecializationId: SpecializationId
            },)
            .then(response => { props.setListEmployeeToAdd(response.data) })

        props.setModalOpenAddEmployee(true)
        props.setIdSpecializationToChangeEmployee(SpecializationId)
    }

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpenSummary}
            onClose={() => props.setModalOpenSummary(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    height: 700,
                    overflow: 'auto',
                    width: 900,
                    maxWidth: 800,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />

                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={3}
                >
                    Podsumowanie
                </Typography>



                <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                    <p>Termin rozpoczęcia pracy - {props.startDayWork}</p>
                    <p>Termin zakończenia pracy - {dayjs(props.dataEnd).format('DD/MM/YYYY')}</p>
                    <p>Czas zakończenia pracy - {dayjs(props.endDayWork).format('DD/MM/YYYY-HH.mm')}</p>

                    <p>Specjalizacje</p>

                    <Sheet sx={{ height: 200, maxHeight: 400, overflow: 'auto' }}>
                        < Table
                            stickyHeader
                            stripe="odd"
                            variant="outlined" >
                            <thead>
                                <tr>
                                    <th>Nazwa</th>
                                    <th>Ilość godzin</th>
                                    <th>Osoba odpowiedzialna</th>
                                    <th>Zmiana specjalisty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.dataEmployeeWithSpecialization.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item.specializationName}</td>
                                            <td>{item.hours}</td>
                                            <td>{item.nameSurname}</td>
                                            <td>
                                                <Button
                                                    onClick={() => changeSpecialist(item.specializationId, item.employeeId)}
                                                    startIcon={<ManageAccountsIcon />}>Podgląd
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>

                        </Table>
                    </Sheet>


                    <p>Pracownicy</p>


                    {props.listEmployeeAddToJob.map((item) => {

                        return (
                            <>

                                <td><b>{item.specializationName}</b> - Czas zakończenia pracy - {dayjs(item.end).format('DD/MM/YYYY-HH.mm')} </td>


                                <Sheet sx={{ height: 200, maxHeight: 400, overflow: 'auto' }}>
                                    < Table
                                        stickyHeader
                                        stripe="odd"
                                        variant="outlined" >
                                        <thead>
                                            <tr>
                                                <th>Imie</th>
                                                <th>Nazwisko</th>
                                                <th>Doświadczenie</th>
                                                <th>Usuń osobę</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.employeeInJobList.map((item2) => {
                                                var specialistId;
                                                if (item2.name != "")
                                                    specialistId = props.dataEmployeeWithSpecialization.find(x => x.specializationId === item.specializationId).employeeId
                                                return (
                                                    <tr>
                                                        <td>{item2.name}</td>
                                                        <td>{item2.surname}</td>
                                                        <td>{item2.experienceName}</td>
                                                        <td>
                                                            <Button
                                                                disabled={specialistId === item2.employeeId || item.hours + item2.hoursJob > 0 ? true : false}
                                                                onClick={() => removePerson(item2, item)}
                                                                startIcon={<PersonRemoveIcon />}>Usuń
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </Table>
                                    < props.ButtonContainer >
                                        <Button
                                            onClick={() => showAddEmployee(item.specializationId)}
                                            startIcon={<PersonAddIcon />}>Dodaj
                                        </Button>
                                    </props.ButtonContainer>
                                </Sheet>

                                <br />

                            </>

                        )
                    })}


                </Typography>

                < props.ButtonContainer >
                    <props.ButtonBootstrap
                        type="submit"
                        id="button"
                        value={props.action === 'addJob' ? "Dodaj prace" : "Edytuj prace"}
                        onClick={() => { addNewJob() }}
                    />
                    <props.ButtonBootstrapBack
                        type="submit"
                        id="button"
                        value="Anuluj"
                        onClick={() => { props.setModalOpenSummary(false) }}
                    />
                </props.ButtonContainer >

            </Sheet>
        </Modal >
    )
}

const ChangeSpecialist = (props) => {

    const changeSpecialistPerson = (item, userIdToChange) => {
        const updateDataEmployeeWithSpecialization = props.dataEmployeeWithSpecialization.map(x => {
            if (x.employeeId === userIdToChange) {
                x.employeeId = item.employeeId
                x.name = item.name
                x.surname = item.surname
                x.nameSurname = item.name + " " + item.surname
            }
            return x
        })

        props.setDataEmployeeWithSpecialization(updateDataEmployeeWithSpecialization)
        props.setModalOpenChangeSpeclialist(false)

    }

    var noData = false;
    var height = 250;
    var width = 600;
    var heightTabel = 100;
    {
        props.listEmployeeAddToJob[props.indexSpecialistToChange].employeeInJobList.map((item) => {
            if (item.experienceValue >= 70 && item.employeeId !== props.currentSpecialistUserIdToChange) {
                noData = true
                height = 370;
                width = 900;
                heightTabel = 200;
            }
        })

    }

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpenChangeSpeclialist}
            onClose={() => props.setModalOpenChangeSpeclialist(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    height: height,
                    overflow: 'auto',
                    width: width,
                    maxWidth: 800,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />

                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={3}
                >
                    Zmiana osoby odpowiedzialnej za specjalizacje
                </Typography>

                <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                    <p>{props.listEmployeeAddToJob[props.indexSpecialistToChange].specializationName}</p>

                    <Sheet sx={{ heightTabel: 200, maxHeight: 400, overflow: 'auto' }}>
                        {noData == false
                            ? <><p>Brak dostępnych osób</p></>
                            :
                            < Table
                                stickyHeader
                                stripe="odd"
                                variant="outlined" >
                                <thead>
                                    <tr>
                                        <th>Imie</th>
                                        <th>Nazwisko</th>
                                        <th>Doświadczenie</th>
                                        <th>Zmień</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.listEmployeeAddToJob[props.indexSpecialistToChange].employeeInJobList.map((item) => {
                                        if (item.experienceValue >= 70 && item.employeeId !== props.currentSpecialistUserIdToChange)
                                            return (
                                                <tr>
                                                    <td>{item.name}</td>
                                                    <td>{item.surname}</td>
                                                    <td>{item.experienceName}</td>
                                                    <Button
                                                        onClick={() => changeSpecialistPerson(item, props.currentSpecialistUserIdToChange)}
                                                        startIcon={<PersonAddIcon />}>Zmień
                                                    </Button>
                                                </tr>
                                            )
                                    })}
                                </tbody>
                            </Table>
                        }
                    </Sheet>
                </Typography>

                < props.ButtonContainer >
                    <props.ButtonBootstrapBack
                        type="submit"
                        id="button"
                        value="Powrót"
                        onClick={() => { props.setModalOpenChangeSpeclialist(false) }}
                    />
                </props.ButtonContainer >

            </Sheet>
        </Modal >
    )
}

const AddEmployee = (props) => {

    const viewEmployeeSummaryDetails = (idEmployee) => {
        axios.get('http://localhost:5000/api/Employee/employeeSearch', { params: { id: idEmployee } })
            .then(response => {
                props.setDataEmployee(response.data)
            })
        props.setModalOpenSummaryViewEmployee(true)
    }

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpenAddEmployee}
            onClose={() => props.setModalOpenAddEmployee(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    height: 700,
                    overflow: 'auto',
                    width: 900,
                    maxWidth: 800,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />

                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={3}
                >
                    Dodaj praconika do specjalizacji
                </Typography>

                <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                    <p>{props.listEmployeeToAdd.specialializationName}</p>

                    <Sheet sx={{ heightTabel: 200, maxHeight: 400, overflow: 'auto' }}>
                        {props.listEmployeeToAdd.employeeToAdd.length == 0
                            ? <><p>Brak dostępnych osób</p></>
                            :
                            < Table
                                stickyHeader
                                stripe="odd"
                                variant="outlined" >
                                <thead>
                                    <tr>
                                        <th>Imie</th>
                                        <th>Nazwisko</th>
                                        <th>Doświadczenie</th>
                                        <th>Podgląd</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.listEmployeeToAdd.employeeToAdd.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{item.surname}</td>
                                                <td>{item.experienceName}</td>
                                                <td>
                                                    <Button
                                                        onClick={() => viewEmployeeSummaryDetails(item.employeeId)}
                                                        startIcon={<VisibilityIcon />}>Podgląd
                                                    </Button>
                                                </td>

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        }
                    </Sheet>
                </Typography>

                < props.ButtonContainer >
                    <props.ButtonBootstrapBack
                        type="submit"
                        id="button"
                        value="Powrót"
                        onClick={() => { props.setModalOpenAddEmployee(false) }}
                    />
                </props.ButtonContainer >

            </Sheet>
        </Modal >
    )
}

const SummaryViewEmployee = (props) => {

    const addEmployee = (employee) => {

        axios.post('http://localhost:5000/api/Job/UpdateDataNewEmployee',
            {
                listEmployeeInJobDTOList: props.listEmployeeAddToJob, EmployerId: props.userId, start: dayjs(props.dataStart), end: dayjs(props.dataEnd),
                SpecializationId: props.idSpecializationToChangeEmployee, employee: employee[0]
            },)
            .then(response => { props.setEndDayWork(response.data.endWorkDay); props.setListEmployeeAddToJob(response.data.listEmployeeInJob) })


        const index = props.listEmployeeToAdd.employeeToAdd.findIndex(x => x.employeeId === employee[0].employeeId)
        const newListEmployeeToAddt = props.listEmployeeToAdd.employeeToAdd.slice(0, index).concat(props.listEmployeeToAdd.employeeToAdd.slice(index + 1))

        const updateListEmployeeToAdd = props.listEmployeeToAdd;
        updateListEmployeeToAdd.employeeToAdd = newListEmployeeToAddt
        props.setListEmployeeToAdd(updateListEmployeeToAdd)

        props.setModalOpenSummaryViewEmployee(false)

    }

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpenSummaryViewEmployee}
            onClose={() => props.setModalOpenSummaryViewEmployee(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: 300,
                    maxWidth: 500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={3}
                >
                    Szczegóły pracownika
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                    <p><b>Imie</b> - {props.dataEmployee[0].name}</p>
                    <p><b>Nazwisko</b> - {props.dataEmployee[0].surname}</p>
                    <p><b>Specjalizacja - Doświadczenie</b></p>
                    {props.dataEmployee.map((data) => {
                        return (<>
                            <p>{data.specializationName} - {data.experienceName}</p>
                        </>)
                    })}
                </Typography>
                < props.ButtonContainer >
                    <props.ButtonBootstrap
                        type="submit"
                        id="button"
                        value="Dodaj"
                        onClick={() => addEmployee(props.dataEmployee)}
                    />
                    <props.ButtonBootstrapBack
                        type="submit"
                        id="button"
                        value="Powrót"
                        onClick={() => { props.setModalOpenSummaryViewEmployee(false) }}
                    />
                </props.ButtonContainer >
            </Sheet>
        </Modal>
    )
}

const ConfirmAdd = (props) => {
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpenConfirmAdd}
            onClose={() => window.location.pathname = '/inzRafalRutkowski/'}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: 300,
                    maxWidth: 500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={3}
                >
                    Nowa praca
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                    Poprawnie dodano pracę.
                </Typography>
                < props.ButtonContainer >
                    <props.ButtonBootstrap
                        type="submit"
                        id="button"
                        value="Potwierdź"
                        onClick={() => window.location.pathname = '/inzRafalRutkowski/'}
                    />
                </props.ButtonContainer >
            </Sheet>
        </Modal>
    )
}

export { ChangeSpecialist }
export { Summary }
export { AddEmployee }
export { SummaryViewEmployee }
export { ConfirmAdd }