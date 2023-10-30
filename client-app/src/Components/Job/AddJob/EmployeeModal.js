import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';

const NotEnoughEmployee = (props) => {
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpenNotEnoughEmployee}
            onClose={() => props.setModalOpenNotEnoughEmployee(false)}
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
                    Brak pracowników
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                    <p>Za mało dostępnych pracowników. Aby móc rozpocząć pracę należy poczekać,
                        aż będą dostępni, lub zmienić parametry wejściowe.</p>
                </Typography>
                < props.ButtonContainer >
                    <props.ButtonBootstrapBack
                        type="submit"
                        id="button"
                        value="Wróć"
                        onClick={() => { props.setModalOpenNotEnoughEmployee(false) }}
                    />
                </props.ButtonContainer >
            </Sheet>
        </Modal >
    )
}

const EmployeeList = (props) => {
    if (props.searchEmployeeJob.length === 0) 
    {
        props.setHeightModal(200)
        props.setDisableButtonEmployee(false)
    }
    else
    {
        props.setHeightModal(700)
        props.setDisableButtonEmployee(true)
    } 

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpenEmployeeList}
            onClose={() => props.setModalOpenEmployeeList(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    height: props.heightModal,
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
                    Nowi pracownicy
                </Typography>

                {props.searchEmployeeJob.length === 0
                    ?
                    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                        <p>Dodawno nowych pracowników</p>
                    </Typography>
                    :

                    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                        <p>Nie ma wystarczającej ilosci obób, aby móc rozpocząć pracę.</p>
                        <p>W bazie znajduje się odpowiednia ilość, którą można dodać, aby rozpocząć projekt.</p>
                        <br />

                        {props.searchEmployeeJob.map((item) => {

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
                        })}

                    </Typography>
                }
                < props.ButtonContainer >
                    <props.ButtonBootstrap
                        disabled={props.disableButtonEmployee}
                        type="submit"
                        id="button"
                        value="Dalej"
                        onClick={() => { props.openSummary() }}
                    />
                </props.ButtonContainer >
            </Sheet>
        </Modal >
    )

}

export { NotEnoughEmployee };
export { EmployeeList }