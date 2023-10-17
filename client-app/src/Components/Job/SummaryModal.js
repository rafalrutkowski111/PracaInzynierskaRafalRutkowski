import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import * as dayjs from 'dayjs'

const SummaryModal = (props) => {
    // console.log("ffffff")
    // console.log(props.listEmployeeAddToJob)
   // console.log(props.startDayWork.$d)
   // const aaa = props.startDayWork.;
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
                    <p>Czas rozpoczęcia pracy - {props.startDayWork}</p> 
                    <p>Czas zakończenia pracy - {dayjs(props.endDayWork).subtract(1, "day").format('DD/MM/YYYY')}</p>
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
                                                {/* <th></th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.dataEmployeeWithSpecialization.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>{item.specializationName}</td>
                                                        <td>{item.hours}</td>
                                                        <td>{item.nameSurname}</td>
                                                        {/* <td>
                                                            <Button
                                                                onClick={() => props.viewEmployeeDetails(item2.employeeId, false)}
                                                                startIcon={<VisibilityIcon />}>Szczegóły
                                                            </Button>
                                                        </td> */}
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

                                <td><b>{item.specializationName}</b> - Czas zakończenia pracy - {dayjs(item.end).subtract(1, "day").format('DD/MM/YYYY')} </td>


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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.employeeInJobList.map((item2) => {
                                                return (
                                                    <tr>
                                                     <td>{item2.name}</td> 
                                                        <td>{item2.surname}</td>
                                                        <td>{item2.experienceName}</td>
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
                        value="Anuluj"
                        onClick={() => { props.setModalOpenSummary(false) }}
                    />
                </props.ButtonContainer >

            </Sheet>
        </Modal >
    )
}

export { SummaryModal }