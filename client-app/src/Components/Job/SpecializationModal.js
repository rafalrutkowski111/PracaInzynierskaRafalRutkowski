import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Button from '@mui/material/Button';

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
                        {props.listEmployeeSpecializationListEmplty.map((data, index) => {
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
                                            <th>Specjalizacja</th>
                                            <th>ilość godzin</th>
                                            <th>Usuń</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            {/* <td>{item.specializationId}</td>
                                    <td>{item.specializationName}</td> */}
                                            <td>
                                                <Button>
                                                    {/* //onClick={() => props.removeSpecializationAndHours(item.SpecializationId)}
                                        //</td>startIcon={<DeleteIcon />}>Usuń */}
                                                </Button>
                                            </td>
                                        </tr>


                                    </tbody>
                                </Table>
                            </>

                        )
                    })}

                </Typography>
                < props.ButtonContainer >
                    <props.ButtonBootstrap
                        type="submit"
                        id="button"
                        value="Dalej"
                        //onClick={() => { modalTest() }}
                    />
                </props.ButtonContainer >
            </Sheet>
        </Modal >
    )
}

export { SpecializationEmptyList };
export { SpecializationList };
