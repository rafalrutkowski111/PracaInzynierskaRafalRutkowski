import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as dayjs from 'dayjs'
import Form from 'react-bootstrap/Form';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Container from '@mui/material/Container';
import { ShowEstimate } from "./ShowEstimate";
import { Estimate, MoneyPerHour } from "../Job/Estimate";
import { ConfirmModal } from "../../Global/ConfirmModal";

const TittleContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
    margin-bottom:5%;
`
const ButtonBootstrapBack = styled(Form.Control)`
    width:150px;
    background-color: red;
    color: white;
`
const ButtonBootstrapContainer = styled.div`
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

const editText = () => {
    return (
        <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
            <p>Zmiany zostały poprawanie dodane do systemu.</p>
        </Typography>
    )
}


const ShowJob = () => {
    const [title, setTitle] = useState('');
    const [dataEnd, setDataEnd] = useState(null);
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [zip, setZip] = useState('')
    const [nameInvestor, setNameInvestor] = useState('')
    const [surnameInvestor, setSurnameInvestor] = useState('')
    const [endDayWork, setEndDayWork] = useState('');
    const [startDayWork, setStartDayWork] = useState('');
    const [dataEmployeeWithSpecialization, setDataEmployeeWithSpecialization] = useState([]);
    const [listEmployeeAddToJob, setListEmployeeAddToJob] = useState([{ employeeInJobList: [{ name: '', surname: '' }] }])
    const [modalOpenShowEstimate, setModalOpenShowEstimate] = useState(false)
    const [isEstimate, setIsEstimate] = useState(false)
    const [estimate, setEstimate] = useState({
        nameJob: '',
        addressJob: '',
        investor: '',
        typeJob: '',
        moneyPerHour: '',
        createDate: '',
        create: '',
        phone: '',
        fullCost: '',
        listCost: []
    })
    const [modalOpenMoneyPerHour, setModalOpenMoneyPerHour] = useState(false)
    const [moneyPerHour, setMoneyPerHour] = useState('')
    const [errorMoneyPerHour, setErrorMoneyPerHour] = useState(false)
    const [errorMoneyPerHourLabel, setErrorMoneyPerHourLabel] = useState('')
    const [modalOpenEstimate, setModalOpenEstimate] = useState(false)
    const [fullCost, setFullCost] = useState('')
    const [employer, setEmployer] = useState({ name: '', surname: '', phone: '' })
    const [dataStart, setDataStart] = useState(null);
    const [confirmModal, setConfirmModal] = useState(false)
    const [message, setMessage] = useState(editText);

    const params = useParams()
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        axios.get('http://localhost:5000/api/Job/GetJob', { params: { jobId: params.id } })
            .then(response => {
                setTitle(response.data.title)
                setStartDayWork(dayjs(response.data.start).format('DD/MM/YYYY'));
                setDataEnd(dayjs(response.data.end));
                setDataStart(dayjs(response.data.start))
                setEndDayWork(dayjs(response.data.currentEnd));
                setCity(response.data.city)
                setStreet(response.data.street)
                setNumber(response.data.number)
                setZip(response.data.zip)
                setNameInvestor(response.data.name)
                setSurnameInvestor(response.data.surname)

                let updateDataEmployeeWithSpecialization = []
                response.data.listEmployeeAddToJob.map(x => {
                    if (x.responsiblePersonEmployeeId != null &&
                        updateDataEmployeeWithSpecialization.find(x2 => x2.employeeId === x.responsiblePersonEmployeeId) === undefined) {
                        updateDataEmployeeWithSpecialization.push({
                            employeeId: x.responsiblePersonEmployeeId,
                            haveSpecialist: true,
                            name: x.responsiblePersonName,
                            surname: x.responsiblePersonSurname,
                            specializationName: x.specializationName,
                            specializationId: x.specializationId,
                            nameSurname: x.responsiblePersonName + ' ' + x.responsiblePersonSurname,
                            hours: x.hoursStart
                        })
                    }
                })
                setDataEmployeeWithSpecialization(updateDataEmployeeWithSpecialization)

                var updateListEmployeeAddToJob = response.data.listEmployeeAddToJob.map(x => {
                    return x
                })
                setListEmployeeAddToJob(updateListEmployeeAddToJob)
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/api/Job/GetLastEstimate', { params: { jobId: params.id } })
            .then(response => {
                if (response.data === '') {
                    setIsEstimate(false)
                }
                else {
                    setIsEstimate(true)
                    setEstimate(response.data.estimate)
                }
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/api/employer', { params: { EmployerId: userId } })
            .then(response => {
                var employer = {
                    name: response.data.name,
                    surname: response.data.surname,
                    phone: response.data.phone
                }
                setEmployer(employer)
            })
    }, [])


    const back = () => { window.location.pathname = '/inzRafalRutkowski/'; }

    const renderModalShowEstimate = () => {
        return (
            <ShowEstimate modalOpenShowEstimate={modalOpenShowEstimate} setModalOpenShowEstimate={setModalOpenShowEstimate} isEstimate={isEstimate}
                setModalOpenMoneyPerHour={setModalOpenMoneyPerHour} title={title} city={city} street={street} number={number} zip={zip} nameInvestor={nameInvestor}
                surnameInvestor={surnameInvestor} moneyPerHour={moneyPerHour} employer={employer} listEmployeeAddToJob={listEmployeeAddToJob} fullCost={fullCost}
                estimate={estimate} />
        )
    }
    const renderModalMoneyPerHour = () => {
        return (
            <MoneyPerHour modalOpenMoneyPerHour={modalOpenMoneyPerHour} setModalOpenMoneyPerHour={setModalOpenMoneyPerHour}
                moneyPerHour={moneyPerHour} setMoneyPerHour={setMoneyPerHour} errorMoneyPerHour={errorMoneyPerHour}
                setErrorMoneyPerHour={setErrorMoneyPerHour} errorMoneyPerHourLabel={errorMoneyPerHourLabel}
                setErrorMoneyPerHourLabel={setErrorMoneyPerHourLabel} setModalOpenEstimate={setModalOpenEstimate}
                listEmployeeAddToJob={listEmployeeAddToJob} setListEmployeeAddToJob={setListEmployeeAddToJob} setFullCost={setFullCost} />
        )
    }
    const renderModalEstimate = () => {
        return (
            <Estimate modalOpenEstimate={modalOpenEstimate} setModalOpenEstimate={setModalOpenEstimate} setModalOpenMoneyPerHour={setModalOpenMoneyPerHour}
                setIsEstimate={setIsEstimate} title={title} city={city} street={street} number={number} zip={zip} nameInvestor={nameInvestor}
                surnameInvestor={surnameInvestor} moneyPerHour={moneyPerHour} employer={employer} listEmployeeAddToJob={listEmployeeAddToJob}
                fullCost={fullCost} notShow={false} estimate={estimate} setEstimate={setEstimate} dataStart={dataStart} dataEnd={dataEnd}
                userId={userId} endDayWork={endDayWork} jobId={params.id} setConfirmModal={setConfirmModal}/>
        )
    }

    const renderConfirmModal = () => {
        return (
            <ConfirmModal setConfirmModal={setConfirmModal} confirmModal={confirmModal} message={message} nameTitle={"Kosztorys"} />
        )
    }
    return (
        <>
            {renderModalShowEstimate()}
            {renderModalMoneyPerHour()}
            {renderModalEstimate()}
            {renderConfirmModal()}
            <TittleContainer>
                <h1>Podgląd pracy {title}</h1>
            </TittleContainer>

            <Container>
                <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                    <p>Nazwa pracy - {title}</p>
                    <p>Zleceniodawca - {nameInvestor} {surnameInvestor}</p>
                    <p>Adres - {city} {street} {number} {zip}</p>
                    <p>Termin rozpoczęcia pracy - {startDayWork}</p>
                    <p>Termin zakończenia pracy - {dayjs(dataEnd).format('DD/MM/YYYY')}</p>
                    <p>Czas zakończenia pracy -  {dayjs(endDayWork).year() === 2100 ? "Praca się nie zakończy" : dayjs(endDayWork).format('DD/MM/YYYY-HH.mm')} </p>

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
                                {dataEmployeeWithSpecialization.map((item) => {
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

                    {listEmployeeAddToJob.map((item) => {
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

            < ButtonBootstrapContainer >
                <ButtonBootstrap
                    type="submit"
                    id="button"
                    value="Kosztorys"
                    onClick={() => setModalOpenShowEstimate(true)}
                />
                <ButtonBootstrapBack
                    type="submit"
                    id="button"
                    value="Powrót"
                    onClick={() => { back(); }}
                />
            </ButtonBootstrapContainer >
        </>
    )
}

export default ShowJob