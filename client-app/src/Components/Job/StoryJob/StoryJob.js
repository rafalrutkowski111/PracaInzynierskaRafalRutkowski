import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as dayjs from 'dayjs'
import Form from 'react-bootstrap/Form';
import { StoryJobModal } from "./StoryJobModal";
import { ShowEstimate } from "../ShowJob/ShowEstimate";

const TittleContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
    margin-bottom:5%;
`
const StoryContainer = styled.div`
    display: flex;
    justify-content: center;
`
const StoryTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom:2%;
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

const StoryJob = () => {

    const [title, setTitle] = useState('');
    const [listStoryJob, setListStoryJob] = useState([{ timeAddHistory: '', listEmployeeAddToJob: [] }]);
    const [modalOpenStoryJob, setModalOpenStoryJob] = useState(false);
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
    const [message, setMessage] = useState();

    const params = useParams()
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        axios.get('http://localhost:5000/api/Job/GetAllUpdate', { params: { jobId: params.id } })
            .then(response => {
                setTitle(response.data[0].title)
                setListStoryJob(response.data)
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
    const next = (item) => {
        console.log(item)
        if (item.isEstimate === false) {
            setIsEstimate(false)
        }
        else {
            setIsEstimate(true)
            setEstimate(item.estimate)
        }
        setStartDayWork(dayjs(item.start).format('DD/MM/YYYY'));
        setDataEnd(dayjs(item.end));
        setDataStart(dayjs(item.start))
        setEndDayWork(dayjs(item.currentEnd));
        setCity(item.city)
        setStreet(item.street)
        setNumber(item.number)
        setZip(item.zip)
        setNameInvestor(item.name)
        setSurnameInvestor(item.surname)

        let updateDataEmployeeWithSpecialization = []
        item.listEmployeeAddToJob.map(x => {
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

        var updateListEmployeeAddToJob = item.listEmployeeAddToJob.map(x => {
            return x
        })
        setListEmployeeAddToJob(updateListEmployeeAddToJob)

        setModalOpenStoryJob(true)
    }

    const renderModalStoryJob = () => {
        return (
            <StoryJobModal modalOpenStoryJob={modalOpenStoryJob} setModalOpenStoryJob={setModalOpenStoryJob} title={title} nameInvestor={nameInvestor}
                surnameInvestor={surnameInvestor} city={city} street={street} number={number} zip={zip} startDayWork={startDayWork} dataEnd={dataEnd}
                endDayWork={endDayWork} dataEmployeeWithSpecialization={dataEmployeeWithSpecialization} listEmployeeAddToJob={listEmployeeAddToJob}
                isEstimate={isEstimate} setModalOpenShowEstimate={setModalOpenShowEstimate} />
        )
    }
    const renderModalShowEstimate = () => {
        return (
            <ShowEstimate modalOpenShowEstimate={modalOpenShowEstimate} setModalOpenShowEstimate={setModalOpenShowEstimate} isEstimate={isEstimate}
                setModalOpenMoneyPerHour={setModalOpenMoneyPerHour} title={title} city={city} street={street} number={number} zip={zip} nameInvestor={nameInvestor}
                surnameInvestor={surnameInvestor} moneyPerHour={moneyPerHour} employer={employer} listEmployeeAddToJob={listEmployeeAddToJob} fullCost={fullCost}
                estimate={estimate} notNew={true}/>
        )
    }
    return (
        <>
            {renderModalStoryJob()}
            {renderModalShowEstimate()}

            <TittleContainer>
                <h1>Historia pracy {title}</h1>
            </TittleContainer>

            {listStoryJob.map(x =>
            (
                < ButtonBootstrapContainer >
                    <ButtonBootstrap
                        style={{ width: '200px' }}
                        type="submit"
                        id="button"
                        value={dayjs(x.timeAddHistory).format('YYYY/MM/DD-HH:mm:ss')}
                        onClick={() => { next(x); }}
                    />
                </ButtonBootstrapContainer >
            ))}

            < ButtonBootstrapContainer >
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

export default StoryJob;