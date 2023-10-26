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

const Summary = (props) => {
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
                    <p>Czas zakończenia pracy - {dayjs(props.endDayWork).subtract(1, "day").format('DD/MM/YYYY-HH.mm')}</p>

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
                                                    onClick={() => props.changeSpecialist(item.specializationId, item.employeeId)}
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

                                <td><b>{item.specializationName}</b> - Czas zakończenia pracy - {dayjs(item.end).subtract(1, "day").format('DD/MM/YYYY-HH.mm')} </td>


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
                                                if(item2.name != "")
                                                specialistId = props.dataEmployeeWithSpecialization.find(x=> x.specializationId ===item.specializationId).employeeId
                                                return (
                                                    <tr>
                                                        <td>{item2.name}</td>
                                                        <td>{item2.surname}</td>
                                                        <td>{item2.experienceName}</td>
                                                        <td>
                                                            <Button
                                                                disabled={specialistId === item2.employeeId || item.hours + item2.hoursJob > 0 ? true : false}
                                                                onClick={() => props.removePerson(item2, item)}
                                                                startIcon={<PersonRemoveIcon />}>Usuń
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </Table>
                                </Sheet>
                                {/* dodaj osobę */}
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
                        onClick={() => { props.addNewJob() }}
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
                                                        onClick={() => props.changeSpecialistPerson(item, props.currentSpecialistUserIdToChange)}
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

export { ChangeSpecialist }
export { Summary }