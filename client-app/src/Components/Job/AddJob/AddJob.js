import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useEffect } from "react";
import { SpecializationEmptyList, SpecializationList, ViewEmployee } from "../Job/SpecializationModal";
import { EmployeeList, NotEnoughEmployee } from "../Job/EmployeeModal";
import { AddEmployee, ChangeSpecialist, ConfirmAdd, Summary, SummaryViewEmployee } from "../Job/SummaryModal";
import { ViewSpecializationAndHours, AddSpecializationAndHours, AddSpecializationButton } from "../Job/SpecializationAndHours";
import JobDate from "../Job/JobDates";
import JobTitle from "../Job/JobTitle";
import { VerificationEmployeeToJob } from "../Job/JobFunctions";
import * as dayjs from 'dayjs'
import JobAddress from "../Job/JobAddress";
import { jsPDF } from "jspdf";

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
const AddJob = () => {

    const [dataSpecialization, setDataSpecialization] = useState([]);
    const [dataListSpecialization, setDataListSpecialization] = useState([]);
    const [dataStart, setDataStart] = useState(null);
    const [dataEnd, setDataEnd] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSpecializationListEmpltyOpen, setModalSpecializationListEmpltyOpen] = useState(false);
    const [openAddSpecialization, setOpenAddSpecialization] = useState(true);
    const [dataEmployeeWithSpecialization, setDataEmployeeWithSpecialization] = useState([]);
    const [specializationValue, setSpecializationValue] = useState('');
    const [hoursValue, setHoursValue] = useState('');
    const [changeValueHours, setChangeValueHours] = useState(false);
    const [searchEmployee, setSearchEmployee] = useState([]);
    const [listEmployeeSpecializationListEmpty, setListEmployeeSpecializationListEmpty] = useState([])
    const [dataEmployee, setDataEmployee] = useState([{ name: '', surname: '', specializationName: '', experienceName: '', employeeId: '' }]);
    const [modalOpenViewEmployee, setModalOpenViewEmployee] = useState(false);
    const [disableButtonSpecialization, setDisableButtonSpecialization] = useState(true);
    const [modalOpenNotEnoughEmployee, setModalOpenNotEnoughEmployee] = useState(false);
    const [searchEmployeeJob, setSearchEmployeeJob] = useState([]);
    const [modalOpenEmployeeList, setModalOpenEmployeeList] = useState(false);
    const [viewSpecialist, setViewSpecialist] = useState(false);
    const [listEmployeeAddToJob, setListEmployeeAddToJob] = useState([{ employeeInJobList: [{ name: '', surname: '' }] }])
    const [disableButtonEmployee, setDisableButtonEmployee] = useState(true);
    const [modalOpenSummary, setModalOpenSummary] = useState(false);
    const [endDayWork, setEndDayWork] = useState('');
    const [startDayWork, setStartDayWork] = useState('');
    const [title, setTitle] = useState('');
    const [modalOpenChangeSpeclialist, setModalOpenChangeSpeclialist] = useState(false);
    const [indexSpecialistToChange, setIndexSpecialistToChange] = useState(0);
    const [currentSpecialistUserIdToChange, setCurrentSpecialistUserIdToChange] = useState();
    const [modalOpenAddEmployee, setModalOpenAddEmployee] = useState(false);
    const [listEmployeeToAdd, setListEmployeeToAdd] = useState({ employeeToAdd: [], employeeWithoutEmployerToAdd: [] })
    const [modalOpenSummaryViewEmployee, setModalOpenSummaryViewEmployee] = useState(false);
    const [idSpecializationToChangeEmployee, setIdSpecializationToChangeEmployee] = useState(-1)
    const [modalOpenConfirmAdd, setModalOpenConfirmAdd] = useState(false);
    const [heightModal, setHeightModal] = useState(700)
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [zip, setZip] = useState('')

    const [errorTitle, setErrorTitle] = useState(false)
    const [errorTitleLabel, setErrorTitleLabel] = useState('')
    const [errorDataStart, setErrorDataStart] = useState(false)
    const [errorDataStartLabel, setErrorDataStartLabel] = useState('')
    const [errorDataEnd, setErrorDataEnd] = useState(false)
    const [errorDataEndLabel, setErrorDataEndLabel] = useState('')
    const [errorSpecializationLabel, setErrorSpecializationLabel] = useState('')
    const [errorAddressCity, setErrorAddressCity] = useState(false)
    const [errorAddressCityLabel, setErrorAddressCityLabel] = useState('')
    const [errorAddressStreet, setErrorAddressStreet] = useState(false)
    const [errorAddressStreetLabel, setErrorAddressStreetLabel] = useState('')
    const [errorAddressNumber, setErrorAddressNumber] = useState(false)
    const [errorAddressNumberLabel, setErrorAddressNumberLabel] = useState('')
    const [errorAddressZip, setErrorAddressZip] = useState(false)
    const [errorAddressZipLabel, setErrorAddressZipLabel] = useState('')


    const userId = sessionStorage.getItem("userId");
    const rgxZIP = /^[0-9]{2}[-][0-9]{3}(-[0-9]{2}[-][0-9]{2})?$/;

    useEffect(() => {
        axios.get('http://localhost:5000/api/Specialization', { params: { EmployerId: userId } })
            .then(response => {
                setDataSpecialization(response.data);
            })
    }, [])
    const back = () => { window.location.pathname = '/inzRafalRutkowski/'; }

    const next = () => {
        if (title === "") {
            setErrorTitleLabel("Pole nie może być puste");
            setErrorTitle(true);
        }
        if (dataStart === null) {
            setErrorDataStartLabel("Data nie może być pusta")
            setErrorDataStart(true)
        }
        if (dataEnd === null) {
            setErrorDataEndLabel("Data nie może być pusta")
            setErrorDataEnd(true)
        }
        if (dataListSpecialization.length === 0) {
            setErrorSpecializationLabel("Lista specjalizacji nie może być pusta")
        }
        if (city === "") {
            setErrorAddressCityLabel("Pole nie może być puste")
            setErrorAddressCity(true)
        }
        if (street === "") {
            setErrorAddressStreetLabel("Pole nie może być puste")
            setErrorAddressStreet(true)
        }
        if (number === "") {
            setErrorAddressNumberLabel("Pole nie może być puste")
            setErrorAddressNumber(true)
        }
        if (zip === "") {
            setErrorAddressZipLabel("Pole nie może być puste")
            setErrorAddressZip(true)
        }

        if (title === "" || dataEnd === null || dataEnd.$d === "Invalid Date" || dataStart === null ||
            dataStart.$d === "Invalid Date" || dataStart > dataEnd || dataListSpecialization.length === 0
            || city === "" || street === "" || number === "" || zip === "" || !rgxZIP.test(zip)) return

        axios.post('http://localhost:5000/api/Job/JobSpecialization',
            { JobSpecialization: dataListSpecialization, EmployerId: userId, start: dayjs(dataStart), end: dayjs(dataEnd), isUpdate: false })
            .then(response => {
                setDataEmployeeWithSpecialization(response.data.specializationList)
                setSearchEmployee(response.data.searchEmployee)
                setListEmployeeSpecializationListEmpty(response.data.listEmployeeSpecializationListEmplty)

                if (response.data.listEmployeeSpecializationListEmplty.length !== 0) setModalSpecializationListEmpltyOpen(true) // 1 warunek jeśli brak specjalistów i brak do dodania
                else if (response.data.searchEmployee.length !== 0) setModalOpen(true) // 2 wartunek jeśli brak specjalistów, ale jest możliwość dodania
                else // wysyłanie specjalistów i sprawdzanie czy jest odpowiednia ilość pracowników
                {
                    VerificationEmployeeToJob({
                        listJobSpecializationEmployeeDTO: response.data.specializationList, dataEmployeeWithSpecialization: response.data.specializationList,
                        dataListSpecialization: dataListSpecialization, userId: userId, dataStart: dataStart, setListEmployeeAddToJob: setListEmployeeAddToJob,
                        dataEnd: dataEnd, setEndDayWork: setEndDayWork, setStartDayWork: setStartDayWork, setModalOpenSummary: setModalOpenSummary,
                        setModalOpen: setModalOpen, setSearchEmployeeJob: setSearchEmployeeJob, setModalOpenEmployeeList: setModalOpenEmployeeList,
                        setModalOpenNotEnoughEmployee: setModalOpenNotEnoughEmployee, setDataEmployeeWithSpecialization: setDataEmployeeWithSpecialization,
                        isUpdate: false, listEmployeeAddToJob: null, justEdit: false
                    })
                }
            })
    }

    const renderAddSpecializationAndHours = () => {
        return (
            <AddSpecializationAndHours setSpecializationValue={setSpecializationValue} hoursValue={hoursValue} setHoursValue={setHoursValue}
                data={dataListSpecialization} changeValueHours={changeValueHours} setOpenAddSpecialization={setOpenAddSpecialization}
                dataSpecialization={dataSpecialization} specializationValue={specializationValue} setChangeValueHours={setChangeValueHours} />
        )
    }
    const renderViewSpecializationAndHours = () => {
        return (
            <ViewSpecializationAndHours dataListSpecialization={dataListSpecialization} errorSpecializationLabel={errorSpecializationLabel}
                setDataSpecialization={setDataSpecialization} setDataListSpecialization={setDataListSpecialization}
                setSpecializationValue={setSpecializationValue} setErrorSpecializationLabel={setErrorSpecializationLabel}
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
                setIdSpecializationToChangeEmployee={setIdSpecializationToChangeEmployee}
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
                setListEmployeeAddToJob={setListEmployeeAddToJob} idSpecializationToChangeEmployee={idSpecializationToChangeEmployee}
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
                setModalOpenSummary={setModalOpenSummary} setHeightModal={setHeightModal} heightModal={heightModal} setViewSpecialist={setViewSpecialist}
                setModalOpenViewEmployee={setModalOpenViewEmployee} setDataEmployee={setDataEmployee}
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
                setIdSpecializationToChangeEmployee={setIdSpecializationToChangeEmployee} action={"addJob"} isUpdate={false}
                city={city} street={street} number={number} zip={zip}
            />
        )
    }
    const renderModalChangeSpecialist = () => {
        return (
            <ChangeSpecialist setModalOpenChangeSpeclialist={setModalOpenChangeSpeclialist} modalOpenChangeSpeclialist={modalOpenChangeSpeclialist}
                ButtonContainer={ButtonContainer} ButtonBootstrapBack={ButtonBootstrapBack} indexSpecialistToChange={indexSpecialistToChange}
                listEmployeeAddToJob={listEmployeeAddToJob} currentSpecialistUserIdToChange={currentSpecialistUserIdToChange}
                dataEmployeeWithSpecialization={dataEmployeeWithSpecialization} setDataEmployeeWithSpecialization={setDataEmployeeWithSpecialization}
                dataStart={dataStart} setEndDayWork={setEndDayWork} setListEmployeeAddToJob={setListEmployeeAddToJob}
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
                listEmployeeToAdd={listEmployeeToAdd} setListEmployeeToAdd={setListEmployeeToAdd} dataEmployeeWithSpecialization={dataEmployeeWithSpecialization}
            />
        )
    }
    const renderModalConfirmAdd = () => {
        return (
            <ConfirmAdd ButtonContainer={ButtonContainer} ButtonBootstrap={ButtonBootstrap}
                setModalOpenConfirmAdd={setModalOpenConfirmAdd} modalOpenConfirmAdd={modalOpenConfirmAdd} />
        )
    }
    const renderJobDates = () => {
        return (
            <JobDate setDataStart={setDataStart} dataListSpecialization={dataListSpecialization} dataEnd={dataEnd}
                title={title} dataStart={dataStart} setDataEnd={setDataEnd} isUpdate={false}
                errorDataStart={errorDataStart} setErrorDataStart={setErrorDataStart} errorDataStartLabel={errorDataStartLabel}
                setErrorDataStartLabel={setErrorDataStartLabel} setErrorDataEndLabel={setErrorDataEndLabel}
                errorDataEnd={errorDataEnd} setErrorDataEnd={setErrorDataEnd} errorDataEndLabel={errorDataEndLabel}
            />
        )
    }
    const renderJobTitle = () => {
        return (
            <JobTitle setTitle={setTitle} dataListSpecialization={dataListSpecialization} dataEnd={dataEnd} dataStart={dataStart}
                errorTitle={errorTitle} setErrorTitle={setErrorTitle} errorTitleLabel={errorTitleLabel} setErrorTitleLabel={setErrorTitleLabel} />
        )
    }
    const renderButtonSpeciazization = () => {
        return (
            <AddSpecializationButton ButtonContainer={ButtonContainer} openAddSpecialization={openAddSpecialization} dataListSpecialization={dataListSpecialization}
                specializationValue={specializationValue} hoursValue={hoursValue} dataSpecialization={dataSpecialization} setDataListSpecialization={setDataListSpecialization}
                setDataSpecialization={setDataSpecialization} setChangeValueHours={setChangeValueHours} setHoursValue={setHoursValue} title={title}
                setSpecializationValue={setSpecializationValue} setOpenAddSpecialization={setOpenAddSpecialization} dataStart={dataStart} dataEnd={dataEnd}
                setErrorSpecializationLabel={setErrorSpecializationLabel}
            />
        )
    }
    const renderAddress = () => {
        return (
            <JobAddress city={city} setCity={setCity} street={street} setStreet={setStreet} number={number} setNumber={setNumber} zip={zip} setZip={setZip}
                errorAddressCity={errorAddressCity} setErrorAddressCity={setErrorAddressCity} errorAddressCityLabel={errorAddressCityLabel}
                setErrorAddressCityLabel={setErrorAddressCityLabel} errorAddressStreet={errorAddressStreet} setErrorAddressStreet={setErrorAddressStreet}
                errorAddressStreetLabel={errorAddressStreetLabel} setErrorAddressStreetLabel={setErrorAddressStreetLabel} errorAddressNumber={errorAddressNumber}
                setErrorAddressNumber={setErrorAddressNumber} errorAddressNumberLabel={errorAddressNumberLabel} setErrorAddressNumberLabel={setErrorAddressNumberLabel}
                errorAddressZip={errorAddressZip} setErrorAddressZip={setErrorAddressZip} errorAddressZipLabel={errorAddressZipLabel}
                setErrorAddressZipLabel={setErrorAddressZipLabel} />
        )
    }

    const generatePDF = () => {
        console.log("test")
        var pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a5',
            putOnlyUsedFonts: true
        });
        pdf.text("Hello World", 20, 20);
        pdf.save('Demopdf.pdf');
    }
    return (
        <>
                        <ButtonBootstrap
                    type="submit"
                    id="button"
                    value="Dalej"
                    onClick={() => { generatePDF(); }}
                />
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
                <h1>Dodaj nową prace</h1>
            </TittleContainer>

            {renderJobTitle()}
            {renderJobDates()}
            {renderAddress()}
            {renderAddSpecializationAndHours()}
            {renderButtonSpeciazization()}
            {renderViewSpecializationAndHours()}

            < ButtonBootstrapContainer >
                <ButtonBootstrap
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

export default AddJob;