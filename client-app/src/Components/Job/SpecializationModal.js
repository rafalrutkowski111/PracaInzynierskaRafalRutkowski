import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
                    width: 600,
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
                                                                onClick={() => props.viewEmployeeDetails(item2.employeeId, item.specializationId)}
                                                                startIcon={<VisibilityIcon />}>Szczegóły
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>

                                    </Table>
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
                        onClick={() => { props.nextButtonSpecializationList() }}
                    />
                </props.ButtonContainer >
            </Sheet>
        </Modal >
    )
}

const ViewEmployee = (props) => {
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
                        onClick={() => { props.addSpecialistEmployees(props.dataEmployee) }}
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