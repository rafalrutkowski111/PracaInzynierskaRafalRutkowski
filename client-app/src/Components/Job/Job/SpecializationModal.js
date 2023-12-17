import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { VerificationEmployeeToJob, ViewEmployeeDetails } from './JobFunctions';

const SpecializationEmptyList = (props) => {
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalSpecializationListEmpltyOpen}
            onClose={() => props.setModalSpecializationListEmpltyOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: 450,
                    maxWidth: 600,
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
                    Brak wyspecjalizowanych pracowników
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                    <p>Brak wyspecjalizowanych pracowników, których nie ma w naszej bazie:
                        {props.listEmployeeSpecializationListEmpty.map((data, index) => {
                            return (" " + data)
                        }
                        )}</p>
                    <p>Chcąc przejść dalej należy wykonać jedą z poniższych rzeczy.</p>
                    <p>1. Anulowac powyżesze specjalizacje. <br />
                        2. Dodać w zakładce pracownicy takich specjalistów. <br />
                        3. Poczekać aż będą dostępni specjaliliści poszukujacy pracy. </p>


                </Typography>
                < props.ButtonContainer >
                    <props.ButtonBootstrapBack
                        type="submit"
                        id="button"
                        value="Wróć"
                        onClick={() => { props.setModalSpecializationListEmpltyOpen(false) }}
                    />
                </props.ButtonContainer >
            </Sheet>
        </Modal >
    )
}

const SpecializationList = (props) => {

    const nextButtonSpecializationList = () => {

        VerificationEmployeeToJob({
            listJobSpecializationEmployeeDTO: props.dataEmployeeWithSpecialization, dataEmployeeWithSpecialization: props.dataEmployeeWithSpecialization,
            dataListSpecialization: props.dataListSpecialization, dataStart: props.dataStart, setListEmployeeAddToJob: props.setListEmployeeAddToJob,
            dataEnd: props.dataEnd, setEndDayWork: props.setEndDayWork, setStartDayWork: props.setStartDayWork, setModalOpenSummary: props.setModalOpenSummary, userId: props.userId,
            setModalOpen: props.setModalOpen, setSearchEmployeeJob: props.setSearchEmployeeJob, setModalOpenEmployeeList: props.setModalOpenEmployeeList,
            setModalOpenNotEnoughEmployee: props.setModalOpenNotEnoughEmployee, setDataEmployeeWithSpecialization: props.setDataEmployeeWithSpecialization,
            justEdit: props.justEdit, isUpdate: props.isUpdate, listEmployeeAddToJob: props.listEmployeeAddToJob, realStart: props.realStart
        })
    }

    if (props.searchEmployee.length === 0) props.setDisableButtonSpecialization(false)
    else props.setDisableButtonSpecialization(true)
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpen}
            onClose={() => props.setModalOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: 650,
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
                    Wyspecjalizowani pracownicy
                </Typography>

                {props.searchEmployee.length === 0
                    ?
                    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                        <p>Dodawno wyspecjalizowanych pracowników</p>
                    </Typography>
                    :
                    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                        <p>Każde specjalizacja musi mieć przynajmniej jedenego wyspecjalizowanego pracownika.</p>
                        <p>Specjalizacje bez doświadczonego pracownika: {props.dataEmployeeWithSpecialization.map((data, index) => {
                            return (data.haveSpecialist === false ? " " + data.specializationName + " " : null)
                        }
                        )}</p>
                        <p>Z wprowadzonymi danymi brakuje wyspecjalizowaneo pracownika. Możesz go dodać w zakłądce Pracownicy,
                            lub jeżeli jest dodać z listy poniżej.</p>

                        {props.searchEmployee.map((item) => {

                            return (
                                <>
                                    <td>{item.specializationName}</td>
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
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.employeeList.map((item2) => {
                                                    return (
                                                        <tr>
                                                            <td>{item2.name}</td>
                                                            <td>{item2.surname}</td>
                                                            <td>{item2.experienceName}</td>
                                                            <td>
                                                                <Button
                                                                    onClick={() => ViewEmployeeDetails({
                                                                        idEmployee: item2.employeeId, isViewSpecialist: true,
                                                                        setDataEmployee: props.setDataEmployee, setViewSpecialist: props.setViewSpecialist,
                                                                        setModalOpenViewEmployee: props.setModalOpenViewEmployee
                                                                    })}
                                                                    startIcon={<VisibilityIcon />}>Szczegóły
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>

                                        </Table>
                                    </Sheet >
                                    <br />

                                </>

                            )
                        })}

                    </Typography>
                }

                < props.ButtonContainer >
                    <props.ButtonBootstrap
                        disabled={props.disableButtonSpecialization}
                        type="submit"
                        id="button"
                        value="Dalej"
                        onClick={() => { nextButtonSpecializationList() }}
                    />
                </props.ButtonContainer >
            </Sheet>
        </Modal >
    )
}

const ViewEmployee = (props) => {

    const addSpecialistEmployees = (employee) => {

        const updateDataEmployeeWithSpecialization = props.dataEmployeeWithSpecialization.map((data) => {
            if (data.specializationId === employee[0].specializationId) {
                data.haveSpecialist = true;
                data.employeeId = employee[0].employeeId
                data.name = employee[0].name
                data.surname = employee[0].surname

                const list = [...props.searchEmployee];
                const i = list.findIndex(x => x.specializationId === data.specializationId)
                list.splice(i, 1)
                props.setSearchEmployee(list)
            }
            return data
        })
        props.setDataEmployeeWithSpecialization(updateDataEmployeeWithSpecialization);
        props.setModalOpenViewEmployee(false);
    }

    const addNewEmployee = (employee) => {
        var findIndextemp2 = 0;
        var findIndex1 = -1;
        var findIndex2 = -1;
        var idSpecialization = -1
        var needRemove = false
        const updatesearchEmployeeJob = props.searchEmployeeJob.map(data => { //szukanie indexów i zmiana brakującej ilości pracy
            findIndextemp2 = 0;
            data.employeeInJobList.map(data2 => {
                if (data2.employeeId === employee[0].employeeId) {
                    idSpecialization = data.specializationId;

                    findIndex1 = props.searchEmployeeJob.findIndex(x=> x.specializationId === data.specializationId)
                    findIndex2 = findIndextemp2;
                    data.hoursStart -= props.searchEmployeeJob[findIndex1].employeeInJobList[findIndex2].hoursJob

                    if (data.hoursStart <= 0) { needRemove = true }
                }
                findIndextemp2++
                return data2
            })
            return data
        })
        props.setSearchEmployeeJob(updatesearchEmployeeJob)

        findIndextemp2 = 0;
        const addElementListEmployeeAddToJob = props.listEmployeeAddToJob.map((data) => {
            findIndextemp2 = 0;
            data.employeeInJobList.map(data2 => {
                findIndextemp2++
                return data2
            })
            if (data.specializationId === idSpecialization) {
                data.employeeInJobList[findIndextemp2] = props.searchEmployeeJob[findIndex1].employeeInJobList[findIndex2]
            }

            return data
        })
        props.setListEmployeeAddToJob(addElementListEmployeeAddToJob)

        const list = [...props.searchEmployeeJob];
        list[findIndex1].employeeInJobList.splice(findIndex2, 1)
        props.setSearchEmployeeJob(list)

        if (needRemove === true) {
            const listSearchEmployeeJob = [...props.searchEmployeeJob];
            listSearchEmployeeJob.splice(findIndex1, 1)
            props.setSearchEmployeeJob(listSearchEmployeeJob)
        }

        props.setModalOpenViewEmployee(false)
    }

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpenViewEmployee}
            onClose={() => props.setModalOpenViewEmployee(false)}
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
                        onClick={() =>
                            props.viewSpecialist == true
                                ? addSpecialistEmployees(props.dataEmployee)
                                : addNewEmployee(props.dataEmployee)}
                    />
                    <props.ButtonBootstrapBack
                        type="submit"
                        id="button"
                        value="Powrót"
                        onClick={() => { props.setModalOpenViewEmployee(false) }}
                    />
                </props.ButtonContainer >
            </Sheet>
        </Modal>
    )
}

export { SpecializationEmptyList };
export { SpecializationList };
export { ViewEmployee };