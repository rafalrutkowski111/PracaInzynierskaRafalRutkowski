import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import JobDate from "../Job/JobDates";
import JobTitle from "../Job/JobTitle";
import { AddSpecializationAndHours, AddSpecializationButton, ViewSpecializationAndHours } from "../Job/SpecializationAndHours";
import Form from 'react-bootstrap/Form';
import * as dayjs from 'dayjs'
import { SpecializationEmptyList, SpecializationList, ViewEmployee } from "../Job/SpecializationModal";
import { VerificationEmployeeToJob } from "../Job/JobFunctions";
import { EmployeeList, NotEnoughEmployee } from "../AddJob/EmployeeModal";
import { AddEmployee, ChangeSpecialist, ConfirmAdd, Summary, SummaryViewEmployee } from "../AddJob/SummaryModal";

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
    const [dataEmployeeWithSpecialization, setDataEmployeeWithSpecialization] = useState([]);
    const [searchEmployee, setSearchEmployee] = useState([]);
    const [listEmployeeSpecializationListEmpty, setListEmployeeSpecializationListEmpty] = useState([])
    const [modalSpecializationListEmpltyOpen, setModalSpecializationListEmpltyOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [disableButtonSpecialization, setDisableButtonSpecialization] = useState(true);
    const [dataEmployee, setDataEmployee] = useState([{ name: '', surname: '', specializationName: '', experienceName: '', employeeId: '' }]);
    const [viewSpecialist, setViewSpecialist] = useState(false);
    const [modalOpenViewEmployee, setModalOpenViewEmployee] = useState(false);
    const [startDayWork, setStartDayWork] = useState('');
    const [modalOpenSummary, setModalOpenSummary] = useState(false);
    const [modalOpenEmployeeList, setModalOpenEmployeeList] = useState(false);
    const [modalOpenNotEnoughEmployee, setModalOpenNotEnoughEmployee] = useState(false);
    const [searchEmployeeJob, setSearchEmployeeJob] = useState([]);
    const [disableButtonEmployee, setDisableButtonEmployee] = useState(true);
    const [modalOpenConfirmAdd, setModalOpenConfirmAdd] = useState(false);
    const [indexSpecialistToChange, setIndexSpecialistToChange] = useState(0);
    const [currentSpecialistUserIdToChange, setCurrentSpecialistUserIdToChange] = useState();
    const [modalOpenChangeSpeclialist, setModalOpenChangeSpeclialist] = useState(false);
    const [listEmployeeToAdd, setListEmployeeToAdd] = useState({ employeeToAdd: [] })
    const [modalOpenAddEmployee, setModalOpenAddEmployee] = useState(false);
    const [idSpecializationToChangeEmployee, setIdSpecializationToChangeEmployee] = useState(-1)
    const [modalOpenSummaryViewEmployee, setModalOpenSummaryViewEmployee] = useState(false);
    const [heightModal, setHeightModal] = useState(700)

    const userId = sessionStorage.getItem("userId");
    const params = useParams()

    //console.log(dataStart)

    useEffect(() => {
        axios.get('http://localhost:5000/api/Specialization', { params: { EmployerId: userId } })
            .then(response2 => {

                axios.get('http://localhost:5000/api/Job/GetJob', { params: { jobId: params.id } })
                    .then(response => {
                        setDataStart(dayjs(response.data.start));
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
                if (dayjs(response.data.timeAddHistory).format('YYYY/MM/DD') < dayjs(new Date()).format('YYYY/MM/DD')
                    && dayjs(response.data.timeStartJob).format('YYYY/MM/DD') < dayjs(new Date()).format('YYYY/MM/DD'))
                    setNeedChangeHours(true)
            })
    }, [])

    const back = () => { window.location.pathname = '/inzRafalRutkowski/'; }

    const next = () => {

        if (dataEnd.$d === "Invalid Date" || dataStart.$d === "Invalid Date" || dataStart > dataEnd) return

        if (needChangeHours) // obliczyć przepracowane gdoziny
        {
            console.log(needChangeHours)

        }
        else  //to co normalnie
        {
            console.log(dataStart)
            axios.post('http://localhost:5000/api/Job/JobSpecialization',
                { JobSpecialization: dataListSpecialization, EmployerId: userId, start: dayjs(dataStart), end: dayjs(dataEnd) })
                .then(response => {
                    setDataEmployeeWithSpecialization(response.data.specializationList)
                    //console.log(response.data)
                    setSearchEmployee(response.data.searchEmployee)
                    setListEmployeeSpecializationListEmpty(response.data.listEmployeeSpecializationListEmplty)
                    console.log(response.data.searchEmployee.length)

                    if (response.data.listEmployeeSpecializationListEmplty.length !== 0) setModalSpecializationListEmpltyOpen(true) // 1 warunek jeśli brak specjalistów i brak do dodania
                    else if (response.data.searchEmployee.length !== 0) setModalOpen(true) // 2 wartunek jeśli brak specjalistów, ale jest możliwość dodania
                    else // wysyłanie specjalistów i sprawdzanie czy jest odpowiednia ilość pracowników
                    {
                        VerificationEmployeeToJob({
                            listJobSpecializationEmployeeDTO: response.data.specializationList, dataEmployeeWithSpecialization: response.data.specializationList,
                            dataListSpecialization: dataListSpecialization, userId: userId, dataStart: dataStart, setListEmployeeAddToJob: setListEmployeeAddToJob,
                            dataEnd: dataEnd, setEndDayWork: setEndDayWork, setStartDayWork: setStartDayWork, setModalOpenSummary: setModalOpenSummary,
                            setModalOpen: setModalOpen, setSearchEmployeeJob: setSearchEmployeeJob, setModalOpenEmployeeList: setModalOpenEmployeeList,
                            setModalOpenNotEnoughEmployee: setModalOpenNotEnoughEmployee, setDataEmployeeWithSpecialization: setDataEmployeeWithSpecialization
                        })
                    }
                })

        }








        // to potem uwzglednić do ifa
        // TRZEBA TU SPRAWDZIĆ CZY ODBYLIŚMY JAKIEŚ DNI PRACY. JEŻELI NIE TO PRZECHODZIMY DALEJ, JEŻELI TAK TO MUSIMY OBLICZYĆ ILE DLA KAŻDEJ SPECJALIZACJI
        // ODBYLIŚMY GODZIN I ODJĄĆ TO OD GODZIN POCZĄTKOWYCH - BEDZIE TRZEBA DODAĆ JAKIŚ OBIEKT PRZECHOWUJĄCY CAŁKOWITĄ ILOŚĆ GODZIN LUB ZROBINĄ (MAMY JEDNO MUSIMY DWA ZROBIĆ)

        // musimy pobrać liczbe godzin już przerobioną następnie obliczyć od ostatniej zmiany ile przerobiliśmy godzin i tą liczbe odjąć od naszych godzin
        // np mamy 300h do zrobienia- 1 zapis to początek 0 i np oblcizyliśmy że przerobiliśmy 100 godzin. Kolejny zapis będzie początek 100 i uobliczamy ile przerobiliśmy np 150
        // oznacza to że obliczamy w 1 przypadaku (300-100 = 200h do zrobienia) w drugim przypadku (300-150 = 150h do zrobienia)
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
    const renderModalSpecializationEmptyList = () => {
        return (
            <SpecializationEmptyList modalSpecializationListEmpltyOpen={modalSpecializationListEmpltyOpen}
                setModalSpecializationListEmpltyOpen={setModalSpecializationListEmpltyOpen} listEmployeeSpecializationListEmpty={listEmployeeSpecializationListEmpty}
                ButtonContainer={ButtonContainer} ButtonBootstrapBack={ButtonBootstrapBack} />
        )
    }
    const renderModalSpecializationList = () => {
        return (
            <SpecializationList modalOpen={modalOpen} setModalOpen={setModalOpen} dataEmployeeWithSpecialization={dataEmployeeWithSpecialization}
                searchEmployee={searchEmployee} ButtonContainer={ButtonContainer} ButtonBootstrap={ButtonBootstrap} dataEnd={dataEnd}
                disableButtonSpecialization={disableButtonSpecialization} setDisableButtonSpecialization={setDisableButtonSpecialization}
                setDataEmployee={setDataEmployee} setViewSpecialist={setViewSpecialist} setModalOpenViewEmployee={setModalOpenViewEmployee}
                dataListSpecialization={dataListSpecialization} userId={userId} dataStart={dataStart} setListEmployeeAddToJob={setListEmployeeAddToJob}
                setEndDayWork={setEndDayWork} setStartDayWork={setStartDayWork} setModalOpenSummary={setModalOpenSummary}
                setModalOpenEmployeeList={setModalOpenEmployeeList} setModalOpenNotEnoughEmployee={setModalOpenNotEnoughEmployee}
                setDataEmployeeWithSpecialization={setDataEmployeeWithSpecialization} setSearchEmployeeJob={setSearchEmployeeJob}
            />
        )
    }
    const renderModalViewEmployee = () => {
        return (
            <ViewEmployee modalOpenViewEmployee={modalOpenViewEmployee} setModalOpenViewEmployee={setModalOpenViewEmployee}
                dataEmployee={dataEmployee} ButtonContainer={ButtonContainer} ButtonBootstrap={ButtonBootstrap} ButtonBootstrapBack={ButtonBootstrapBack}
                viewSpecialist={viewSpecialist} dataEmployeeWithSpecialization={dataEmployeeWithSpecialization} searchEmployee={searchEmployee}
                setSearchEmployee={setSearchEmployee} setDataEmployeeWithSpecialization={setDataEmployeeWithSpecialization}
                searchEmployeeJob={searchEmployeeJob} setSearchEmployeeJob={setSearchEmployeeJob} listEmployeeAddToJob={listEmployeeAddToJob}
                setListEmployeeAddToJob={setListEmployeeAddToJob}
            />
        )
    }
    const renderModalNotEnoughEmployee = () => {
        return (
            <NotEnoughEmployee setModalOpenNotEnoughEmployee={setModalOpenNotEnoughEmployee} modalOpenNotEnoughEmployee={modalOpenNotEnoughEmployee}
                ButtonContainer={ButtonContainer} ButtonBootstrapBack={ButtonBootstrapBack} />
        )
    }
    const renderModalEmployeeList = () => {
        return (
            <EmployeeList searchEmployeeJob={searchEmployeeJob} modalOpenEmployeeList={modalOpenEmployeeList} setModalOpenEmployeeList={setModalOpenEmployeeList}
                ButtonContainer={ButtonContainer} ButtonBootstrap={ButtonBootstrap} listEmployeeAddToJob={listEmployeeAddToJob}
                setDisableButtonEmployee={setDisableButtonEmployee} disableButtonEmployee={disableButtonEmployee} dataStart={dataStart}
                ButtonBootstrapBack={ButtonBootstrapBack} setEndDayWork={setEndDayWork} setListEmployeeAddToJob={setListEmployeeAddToJob}
                setModalOpenSummary={setModalOpenSummary} setHeightModal={setHeightModal} heightModal={heightModal}
            />
        )
    }
    const renderModalSummary = () => {
        return (
            <Summary ButtonContainer={ButtonContainer} ButtonBootstrap={ButtonBootstrap} setModalOpenSummary={setModalOpenSummary}
                modalOpenSummary={modalOpenSummary} ButtonBootstrapBack={ButtonBootstrapBack} dataEmployeeWithSpecialization={dataEmployeeWithSpecialization}
                endDayWork={endDayWork} startDayWork={startDayWork} listEmployeeAddToJob={listEmployeeAddToJob} userId={userId}
                dataEnd={dataEnd} setListEmployeeAddToJob={setListEmployeeAddToJob} title={title} dataStart={dataStart}
                setModalOpenConfirmAdd={setModalOpenConfirmAdd} setIndexSpecialistToChange={setIndexSpecialistToChange}
                setCurrentSpecialistUserIdToChange={setCurrentSpecialistUserIdToChange} setModalOpenChangeSpeclialist={setModalOpenChangeSpeclialist}
                setEndDayWork={setEndDayWork} setListEmployeeToAdd={setListEmployeeToAdd} setModalOpenAddEmployee={setModalOpenAddEmployee}
                setIdSpecializationToChangeEmployee={setIdSpecializationToChangeEmployee}
            />
        )
    }
    const renderModalChangeSpecialist = () => {
        return (
            <ChangeSpecialist setModalOpenChangeSpeclialist={setModalOpenChangeSpeclialist} modalOpenChangeSpeclialist={modalOpenChangeSpeclialist}
                ButtonContainer={ButtonContainer} ButtonBootstrapBack={ButtonBootstrapBack} indexSpecialistToChange={indexSpecialistToChange}
                listEmployeeAddToJob={listEmployeeAddToJob} currentSpecialistUserIdToChange={currentSpecialistUserIdToChange}
                dataEmployeeWithSpecialization={dataEmployeeWithSpecialization} setDataEmployeeWithSpecialization={setDataEmployeeWithSpecialization}
            />
        )
    }
    const renderModalAddEmployee = () => {
        return (
            <AddEmployee setModalOpenAddEmployee={setModalOpenAddEmployee} modalOpenAddEmployee={modalOpenAddEmployee}
                ButtonContainer={ButtonContainer} ButtonBootstrapBack={ButtonBootstrapBack} listEmployeeToAdd={listEmployeeToAdd}
                setDataEmployee={setDataEmployee} setModalOpenSummaryViewEmployee={setModalOpenSummaryViewEmployee}
            />
        )
    }
    const renderModalSummaryViewEmployee = () => {
        return (
            <SummaryViewEmployee setModalOpenSummaryViewEmployee={setModalOpenSummaryViewEmployee} modalOpenSummaryViewEmployee={modalOpenSummaryViewEmployee}
                ButtonContainer={ButtonContainer} ButtonBootstrap={ButtonBootstrap} ButtonBootstrapBack={ButtonBootstrapBack} dataEmployee={dataEmployee}
                listEmployeeAddToJob={listEmployeeAddToJob} userId={userId} dataStart={dataStart} dataEnd={dataEnd} setEndDayWork={setEndDayWork}
                idSpecializationToChangeEmployee={idSpecializationToChangeEmployee} setListEmployeeAddToJob={setListEmployeeAddToJob}
                listEmployeeToAdd={listEmployeeToAdd} setListEmployeeToAdd={setListEmployeeToAdd}
            />
        )
    }
    const renderModalConfirmAdd = () => {
        return (
            <ConfirmAdd ButtonContainer={ButtonContainer} ButtonBootstrap={ButtonBootstrap}
                setModalOpenConfirmAdd={setModalOpenConfirmAdd} modalOpenConfirmAdd={modalOpenConfirmAdd} />
        )
    }

    return (
        <>
            {renderModalSpecializationEmptyList()}
            {renderModalSpecializationList()}
            {renderModalViewEmployee()}
            {renderModalNotEnoughEmployee()}
            {renderModalEmployeeList()}
            {renderModalSummary()}
            {renderModalChangeSpecialist()}
            {renderModalAddEmployee()}
            {renderModalSummaryViewEmployee()}
            {renderModalConfirmAdd()}


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