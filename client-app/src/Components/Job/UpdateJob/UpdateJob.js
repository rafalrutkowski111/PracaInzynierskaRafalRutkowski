import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import JobDate from "../Job/JobDates";
import JobTitle from "../Job/JobTitle";
import { AddSpecializationAndHours, AddSpecializationButton, ViewSpecializationAndHours } from "../Job/SpecializationAndHours";
import Form from 'react-bootstrap/Form';
import * as dayjs from 'dayjs'

const TittleContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
`
const ButtonContainer = styled.div`
  widht:60%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
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
const ButtonBootstrapBack = styled(Form.Control)`
    width:150px;
    background-color: red;
    color: white;
`

const UpdateJob = () => {

    const [title, setTitle] = useState('');
    const [dataStart, setDataStart] = useState('');
    const [dataEnd, setDataEnd] = useState('');

    const [listEmployeeAddToJob, setListEmployeeAddToJob] = useState([{ employeeInJobList: [{ name: '', surname: '' }] }])
    const [endDayWork, setEndDayWork] = useState('');
    const [hoursValue, setHoursValue] = useState('');
    const [specializationValue, setSpecializationValue] = useState('');
    const [dataListSpecialization, setDataListSpecialization] = useState([]);
    const [openAddEmployee, setOpenAddEmployee] = useState(true);
    const [changeValueHours, setChangeValueHours] = useState(false);
    const [openAddSpecialization, setOpenAddSpecialization] = useState(true);
    const [dataSpecialization, setDataSpecialization] = useState([]);
    const [needChangeHours, setNeedChangeHours] = useState(false);

    const userId = sessionStorage.getItem("userId");
    const params = useParams()

    useEffect(() => {
        axios.get('http://localhost:5000/api/Specialization', { params: { EmployerId: userId } })
            .then(response2 => {

                axios.get('http://localhost:5000/api/Job/GetJob', { params: { jobId: params.id } })
                    .then(response => {
                        setDataStart(response.data.start);
                        setDataEnd(response.data.end);
                        setTitle(response.data.title)
                        //console.log(response.data)

                        let tempResponseData = response.data.listEmployeeAddToJob
                        let tempDataListSpecialization = []
                        tempResponseData.map(data => {
                            tempDataListSpecialization.push({ SpecializationId: data.specializationId, Hours: data.hoursStart, SpecializationName: data.specializationName })

                            const i = response2.data.findIndex(x => x.id === data.specializationId)
                            response2.data.splice(i, 1)
                            setDataSpecialization(response2.data)
                        })
                        setDataListSpecialization(tempDataListSpecialization)
                    })
            })

        setOpenAddEmployee(false)
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/api/Job/GetLastUpdate', { params: { jobId: params.id } })
            .then(response => {
                if (dayjs(response.data.timeAddHistory).format('DD/MM/YYYY') < dayjs(new Date()).format('DD/MM/YYYY')
                && dayjs(response.data.timeStartJob).format('DD/MM/YYYY') < dayjs(new Date()).format('DD/MM/YYYY'))
                setNeedChangeHours(true)
            })
    }, [])

    // usunąć możliwość edycji niezakończonej pracy

    const back = () => { window.location.pathname = '/inzRafalRutkowski/'; }

    const next = () => {

        if (dataEnd.$d === "Invalid Date" || dataStart.$d === "Invalid Date" || dataStart > dataEnd) return

        // TRZEBA TU SPRAWDZIĆ CZY ODBYLIŚMY JAKIEŚ DNI PRACY. JEŻELI NIE TO PRZECHODZIMY DALEJ, JEŻELI TAK TO MUSIMY OBLICZYĆ ILE DLA KAŻDEJ SPECJALIZACJI
        // ODBYLIŚMY GODZIN I ODJĄĆ TO OD GODZIN POCZĄTKOWYCH - BEDZIE TRZEBA DODAĆ JAKIŚ OBIEKT PRZECHOWUJĄCY CAŁKOWITĄ ILOŚĆ GODZIN LUB ZROBINĄ (MAMY JEDNO MUSIMY DWA ZROBIĆ)

        // musimy pobrać liczbe godzin już przerobioną następnie obliczyć od ostatniej zmiany ile przerobiliśmy godzin i tą liczbe odjąć od naszych godzin
        // np mamy 300h do zrobienia- 1 zapis to początek 0 i np oblcizyliśmy że przerobiliśmy 100 godzin. Kolejny zapis będzie początek 100 i uobliczamy ile przerobiliśmy np 150
        // oznacza to że obliczamy w 1 przypadaku (300-100 = 200h do zrobienia) w drugim przypadku (300-150 = 150h do zrobienia)

        // axios.post('http://localhost:5000/api/Job/JobSpecialization',
        //     { JobSpecialization: dataListSpecialization, EmployerId: userId, start: dataStart.add(1, "day"), end: dataEnd.add(1, "day") })
        //     .then(response => {
        //         setDataEmployeeWithSpecialization(response.data.specializationList)
        //         //console.log(response.data)
        //         setSearchEmployee(response.data.searchEmployee)
        //         setListEmployeeSpecializationListEmpty(response.data.listEmployeeSpecializationListEmplty)

        //         if (response.data.listEmployeeSpecializationListEmplty.length !== 0) setModalSpecializationListEmpltyOpen(true) // 1 warunek jeśli brak specjalistów i brak do dodania
        //         else if (response.data.searchEmployee.length !== 0) setModalOpen(true) // 2 wartunek jeśli brak specjalistów, ale jest możliwość dodania
        //         else // wysyłanie specjalistów i sprawdzanie czy jest odpowiednia ilość pracowników
        //         {
        //             verificationEmployeeToJob({
        //                 listJobSpecializationEmployeeDTO: response.data.specializationList,
        //                 dataEmployeeWithSpecialization: response.data.specializationList
        //             })
        //         }
        //     })
    }










    const renderJobDates = () => {
        return (
            <JobDate setDataStart={setDataStart} dataListSpecialization={dataListSpecialization} dataEnd={dataEnd}
                title={title} setOpenAddEmployee={setOpenAddEmployee} dataStart={dataStart} setDataEnd={setDataEnd}
                isUpdate={true}
            />
        )
    }
    const renderJobTitle = () => {
        return (
            <JobTitle setTitle={setTitle} dataListSpecialization={dataListSpecialization} dataEnd={dataEnd} dataStart={dataStart}
                setOpenAddEmployee={setOpenAddEmployee} isUpdate={true} title={title} />
        )
    }
    const renderAddSpecializationAndHours = () => {
        return (
            <AddSpecializationAndHours setSpecializationValue={setSpecializationValue} hoursValue={hoursValue} setHoursValue={setHoursValue}
                data={dataListSpecialization} changeValueHours={changeValueHours} setOpenAddSpecialization={setOpenAddSpecialization}
                dataSpecialization={dataSpecialization} specializationValue={specializationValue} setChangeValueHours={setChangeValueHours} />
        )
    }
    const renderButtonSpeciazization = () => {
        return (
            <AddSpecializationButton ButtonContainer={ButtonContainer} openAddSpecialization={openAddSpecialization} dataListSpecialization={dataListSpecialization}
                specializationValue={specializationValue} hoursValue={hoursValue} dataSpecialization={dataSpecialization} setDataListSpecialization={setDataListSpecialization}
                setDataSpecialization={setDataSpecialization} setChangeValueHours={setChangeValueHours} setHoursValue={setHoursValue} title={title}
                setSpecializationValue={setSpecializationValue} setOpenAddSpecialization={setOpenAddSpecialization} dataStart={dataStart} dataEnd={dataEnd}
                setOpenAddEmployee={setOpenAddEmployee}
            />
        )
    }
    const renderViewSpecializationAndHours = () => {
        return (
            <ViewSpecializationAndHours dataListSpecialization={dataListSpecialization} setOpenAddEmployee={setOpenAddEmployee}
                setDataSpecialization={setDataSpecialization} setDataListSpecialization={setDataListSpecialization}
            />
        )
    }

    return (
        <>
            <TittleContainer>
                <h1>Edytuj prace {title}</h1>
            </TittleContainer>

            {renderJobTitle()}
            {renderJobDates()}
            {renderAddSpecializationAndHours()}
            {renderButtonSpeciazization()}
            {renderViewSpecializationAndHours()}


            < ButtonBootstrapContainer >
                <ButtonBootstrap
                    disabled={openAddEmployee}
                    type="submit"
                    id="button"
                    value="Dalej"
                    onClick={() => { next(); }}
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

export default UpdateJob;