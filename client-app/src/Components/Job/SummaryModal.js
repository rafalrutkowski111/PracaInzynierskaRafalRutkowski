import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';

const SummaryModal = (props) => {
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
                    <p>test.</p>
                    <br />

                    {props.dataEmployeeWithSpecialization.map((item) => {
                        return(
                            <>
                            ww
                                {item.specializationId}


                            </>
                        )

                    })}
                    {/* {props.searchEmployeeJob.map((item) => {

                        return (
                            <>

                                <td><b>{item.specializationName}</b> - brakująca ilość pracy - <props.ColorRed>{item.hoursStart.toFixed(2)}</props.ColorRed> </td>


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
                                                <th>Ilość pracy</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.employeeInJobList.map((item2) => {
                                                return (
                                                    <tr>
                                                        <td>{item2.name}</td>
                                                        <td>{item2.surname}</td>
                                                        <td>{item2.experienceName}</td>
                                                        <td>{item2.hoursJob.toFixed(2)}</td>
                                                        <td>
                                                            <Button
                                                                onClick={() => props.viewEmployeeDetails(item2.employeeId, false)}
                                                                startIcon={<VisibilityIcon />}>Szczegóły
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>

                                    </Table>
                                </Sheet>
                                <br />

                            </>

                        )
                    })} */}

                </Typography>

                < props.ButtonContainer >
                    <props.ButtonBootstrap
                        type="submit"
                        id="button"
                        value="Dodaj prace"
                        onClick={() => { }} // fukcja do dodania pracy
                    />
                    <props.ButtonBootstrapBack
                        type="submit"
                        id="button"
                        value="Powrót"
                        onClick={() => { props.setModalOpenSummary(false) }}
                    />
                </props.ButtonContainer >

            </Sheet>
        </Modal >
    )
}

export { SummaryModal }