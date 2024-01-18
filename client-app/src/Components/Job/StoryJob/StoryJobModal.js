import Sheet from '@mui/joy/Sheet';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Container from '@mui/material/Container';
import * as dayjs from 'dayjs'
import Table from '@mui/joy/Table';

const ButtonContainer = styled.div`
    widht:60%;
    margin-top: 2%;
    display: flex;
    justify-content: center;
`
const ButtonBootstrap = styled(Form.Control)`
    width:150px;
    background-color: green;
    color: white;
`
const ButtonBootstrapBack = styled(Form.Control)`
    width:150px;
    background-color: red;
    color: white;
`

const StoryJobModal = (props) => {
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpenStoryJob}
            onClose={() => props.setModalOpenStoryJob(false)}
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
                    Podgląd Pracy {props.title}
                </Typography>

                <Container>
                    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                        <p>Nazwa pracy - {props.title}</p>
                        <p>Zleceniodawca - {props.nameInvestor} {props.surnameInvestor}</p>
                        <p>Adres - {props.city} {props.street} {props.number} {props.zip}</p>
                        <p>Termin rozpoczęcia pracy - {props.startDayWork}</p>
                        <p>Termin zakończenia pracy - {dayjs(props.dataEnd).format('DD/MM/YYYY')}</p>
                        <p>Czas zakończenia pracy -  {dayjs(props.endDayWork).year() === 2100 ? "Praca się nie zakończy" : dayjs(props.endDayWork).format('DD/MM/YYYY-HH.mm')} </p>

                        <b><p>Specjalizacje</p></b>

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.dataEmployeeWithSpecialization.map((item) => {
                                        return (
                                            item.hide === true ? null :
                                                <tr>
                                                    <td>{item.specializationName}</td>
                                                    <td>{item.hours}</td>
                                                    <td>{item.nameSurname}</td>
                                                </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Sheet>

                        <b><p>Pracownicy</p></b>

                        {props.listEmployeeAddToJob.map((item) => {
                            return (
                                <>
                                    <td><b>{item.specializationName}</b> Czas zakończenia pracy - {dayjs(item.end).year() === 2100 ? "Praca się nie zakończy" : dayjs(item.end).format('DD/MM/YYYY-HH.mm')} </td>

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
                </Container>

                < ButtonContainer >
                    {
                        props.isEstimate === true ?
                            <ButtonBootstrap
                                type="submit"
                                id="button"
                                value="Pokaż Kosztorys"
                                onClick={() => props.setModalOpenShowEstimate(true)}
                            />
                            : null
                    }
                    <ButtonBootstrapBack
                        type="submit"
                        id="button"
                        value="Powrót"
                        onClick={() => props.setModalOpenStoryJob(false)}
                    />
                </ButtonContainer >
            </Sheet>
        </Modal >
    )
}

export { StoryJobModal };