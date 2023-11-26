import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useEffect } from "react";
import { SpecializationEmptyList, SpecializationList, ViewEmployee } from "../Job/SpecializationModal";
import { EmployeeList, NotEnoughEmployee } from "./EmployeeModal";
import { AddEmployee, ChangeSpecialist, ConfirmAdd, Summary, SummaryViewEmployee } from "./SummaryModal";
import * as dayjs from 'dayjs'
import { ViewSpecializationAndHours, AddSpecializationAndHours, AddSpecializationButton } from "../Job/SpecializationAndHours";
import JobDate from "../Job/JobDates";
import JobTitle from "../Job/JobTitle";

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
const ColorRed = styled.div`
    color: red;
    display: flex;
    float: right;
`
const AddJob = () => {

    const [dataSpecialization, setDataSpecialization] = useState([]);
    const [dataListSpecialization, setDataListSpecialization] = useState([]);
    const [dataStart, setDataStart] = useState('');
    const [dataEnd, setDataEnd] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSpecializationListEmpltyOpen, setModalSpecializationListEmpltyOpen] = useState(false);
    const [openAddSpecialization, setOpenAddSpecialization] = useState(true);
    const [openAddEmployee, setOpenAddEmployee] = useState(true);
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
    const [heightModal, setHeightModal] = useState(700)
    const [modalOpenSummary, setModalOpenSummary] = useState(false);
    const [endDayWork, setEndDayWork] = useState('');
    const [startDayWork, setStartDayWork] = useState('');
    const [title, setTitle] = useState('');
    const [modalOpenChangeSpeclialist, setModalOpenChangeSpeclialist] = useState(false);
    const [indexSpecialistToChange, setIndexSpecialistToChange] = useState(0);
    const [currentSpecialistUserIdToChange, setCurrentSpecialistUserIdToChange] = useState();
    const [modalOpenAddEmployee, setModalOpenAddEmployee] = useState(false);
    const [listEmployeeToAdd, setListEmployeeToAdd] = useState({ employeeToAdd: [] })
    const [modalOpenSummaryViewEmployee, setModalOpenSummaryViewEmployee] = useState(false);
    const [idSpecializationToChangeEmployee, setIdSpecializationToChangeEmployee] = useState(-1)
    const [modalOpenConfirmAdd, setModalOpenConfirmAdd] = useState(false);

    const userId = sessionStorage.getItem("userId");

    //console.log(endDayWork)
    //console.log("aa")
    //console.log(listEmployeeAddToJob)
    //console.log(searchEmployee)
    useEffect(() => {
        axios.get('http://localhost:5000/api/Specialization', { params: { EmployerId: userId } })
            .then(response => {
                setDataSpecialization(response.data);
            })
    }, [])
    const back = () => { window.location.pathname = '/inzRafalRutkowski/'; }

    const next = () => {

        if (dataEnd.$d === "Invalid Date" || dataStart.$d === "Invalid Date" || dataStart > dataEnd) return

        axios.post('http://localhost:5000/api/Job/JobSpecialization',
            { JobSpecialization: dataListSpecialization, EmployerId: userId, start: dataStart.add(1, "day"), end: dataEnd.add(1, "day") })
            .then(response => {
                setDataEmployeeWithSpecialization(response.data.specializationList)
                //console.log(response.data)
                setSearchEmployee(response.data.searchEmployee)
                setListEmployeeSpecializationListEmpty(response.data.listEmployeeSpecializationListEmplty)

                if (response.data.listEmployeeSpecializationListEmplty.length !== 0) setModalSpecializationListEmpltyOpen(true) // 1 warunek jeśli brak specjalistów i brak do dodania
                else if (response.data.searchEmployee.length !== 0) setModalOpen(true) // 2 wartunek jeśli brak specjalistów, ale jest możliwość dodania
                else // wysyłanie specjalistów i sprawdzanie czy jest odpowiednia ilość pracowników
                {
                    verificationEmployeeToJob({
                        listJobSpecializationEmployeeDTO: response.data.specializationList,
                        dataEmployeeWithSpecialization: response.data.specializationList
                    })
                }
            })
    }
    const viewEmployeeDetails = (idEmployee, isViewSpecialist) => {
        axios.get('http://localhost:5000/api/Employee/employeeSearch', { params: { id: idEmployee } })
            .then(response => {
                setDataEmployee(response.data)
            })
        if (isViewSpecialist)
            setViewSpecialist(true)
        else setViewSpecialist(false)
        setModalOpenViewEmployee(true)
    }
    const viewEmployeeSummaryDetails = (idEmployee) => {
        axios.get('http://localhost:5000/api/Employee/employeeSearch', { params: { id: idEmployee } })
            .then(response => {
                setDataEmployee(response.data)
            })
        setModalOpenSummaryViewEmployee(true)
    }

    const addSpecialistEmployees = (employee) => {

        const updateDataEmployeeWithSpecialization = dataEmployeeWithSpecialization.map((data) => {
            if (data.specializationId === employee[0].specializationId) {
                data.haveSpecialist = true;
                data.employeeId = employee[0].employeeId
                data.name = employee[0].name
                data.surname = employee[0].surname

                const list = [...searchEmployee];
                const i = list.findIndex(x => x.specializationId === data.specializationId)
                list.splice(i, 1)
                setSearchEmployee(list)
            }
            return data
        })
        setDataEmployeeWithSpecialization(updateDataEmployeeWithSpecialization);
        setModalOpenViewEmployee(false);
    }

    const addNewEmployee = (employee) => {
        var findIndextemp1 = 0;
        var findIndextemp2 = 0;
        var findIndex1 = -1;
        var findIndex2 = -1;
        var needRemove = false
        const updatesearchEmployeeJob = searchEmployeeJob.map(data => { //szukanie indexów i zmiana brakującej ilości pracy
            findIndextemp2 = 0;
            data.employeeInJobList.map(data2 => {

                if (data2.employeeId === employee[0].employeeId) {

                    findIndex1 = findIndextemp1;
                    findIndex2 = findIndextemp2;
                    data.hoursStart -= searchEmployeeJob[findIndex1].employeeInJobList[findIndex2].hoursJob

                    if (data.hoursStart <= 0) { needRemove = true }
                }
                findIndextemp2++
                return data2
            })
            findIndextemp1++
            return data
        })
        setSearchEmployeeJob(updatesearchEmployeeJob)



        findIndextemp1 = 0;
        findIndextemp2 = 0;
        const addElementListEmployeeAddToJob = listEmployeeAddToJob.map((data) => {
            findIndextemp2 = 0;
            data.employeeInJobList.map(data2 => {
                findIndextemp2++
                return data2
            })
            if (findIndextemp1 === findIndex1) {
                data.employeeInJobList[findIndextemp2] = searchEmployeeJob[findIndex1].employeeInJobList[findIndex2]
            }

            findIndextemp1++
            return data
        })
        setListEmployeeAddToJob(addElementListEmployeeAddToJob)

        const list = [...searchEmployeeJob];
        list[findIndex1].employeeInJobList.splice(findIndex2, 1)
        setSearchEmployeeJob(list)

        if (needRemove === true) {
            const listSearchEmployeeJob = [...searchEmployeeJob];
            listSearchEmployeeJob.splice(findIndex1, 1)
            setSearchEmployeeJob(listSearchEmployeeJob)
        }

        setModalOpenViewEmployee(false)
    }

    const nextButtonSpecializationList = () => {
        verificationEmployeeToJob({
            listJobSpecializationEmployeeDTO: dataEmployeeWithSpecialization,
            dataEmployeeWithSpecialization: dataEmployeeWithSpecialization
        })
    }

    const updatedataEmployeeWithSpecialization = (dataEmployeeWithSpecialization) => {
        const updatedataEmployeeWithSpecialization = dataEmployeeWithSpecialization.map(data => {

            data.hours = dataListSpecialization.find(x => x.SpecializationId === data.specializationId).Hours
            data.nameSurname = data.name + " " + data.surname
            return data
        })

        setDataEmployeeWithSpecialization(updatedataEmployeeWithSpecialization)
    }
    const openSummary = () => {

        axios.post('http://localhost:5000/api/Job/UpdateTimeJob',
            {
                listEmployeeInJobDTOList: listEmployeeAddToJob, start: dataStart.add(1, "day")
            },)
            .then(response => { setEndDayWork(response.data.endWorkDay); setListEmployeeAddToJob(response.data.listEmployeeInJob) })
        setModalOpenEmployeeList(false)
        setModalOpenSummary(true)
    }

    const verificationEmployeeToJob = (props) => {
        axios.post('http://localhost:5000/api/Job/JobEmployee',
            {
                listJobSpecializationEmployeeDTO: props.listJobSpecializationEmployeeDTO, JobSpecialization: dataListSpecialization, EmployerId: userId,
                start: dataStart.add(1, "day"), end: dataEnd.add(1, "day"), EmployeeWithoutEmployer: false
            })
            .then(response2 => {
                setListEmployeeAddToJob(response2.data.listEmployeeInJob) //lista pracowników których ostatecznie dodamy
                updatedataEmployeeWithSpecialization(props.dataEmployeeWithSpecialization); // aktualizacja specjalistów, też dane do rozpoczecia pracy

                //console.log("mmmmmmmmm")
                //console.log(response2.data)
                setEndDayWork(response2.data.endWorkDay)
                setStartDayWork(dataStart.format('DD/MM/YYYY'))

                if (response2.data.canStartWork === true) {
                    setModalOpenSummary(true) //podsumowanie
                }
                else {
                    axios.post('http://localhost:5000/api/Job/JobEmployee',
                        {
                            listJobSpecializationEmployeeDTO: props.listJobSpecializationEmployeeDTO, JobSpecialization: response2.data.specializationList, EmployerId: userId,
                            start: dataStart.add(1, "day"), end: dataEnd.add(1, "day"), EmployeeWithoutEmployer: true
                        },)
                        .then(response => {
                            //console.log(response)
                            if (response.data.canStartWork === true) {
                                setSearchEmployeeJob(response.data.listEmployeeInJob)
                                setModalOpen(false)
                                setModalOpenEmployeeList(true)
                            }
                            else { setModalOpenNotEnoughEmployee(true) }
                        })
                }
            })
    }
    const addNewJob = () => {
        const updatelistEmployeeAddToJob = listEmployeeAddToJob.map(x => {
            const temp = dataEmployeeWithSpecialization.find(x2 => x2.specializationId === x.specializationId);
            x.responsiblePersonName = temp.name;
            x.responsiblePersonSurname = temp.surname
            x.responsiblePersonEmployeeId = temp.employeeId
            x.finishWorkHours = 0;

            return x;
        })
        setListEmployeeAddToJob(updatelistEmployeeAddToJob)

        console.log(listEmployeeAddToJob)
        axios.post('http://localhost:5000/api/Job', {
            title: title, desc: "description", listEmployeeAddToJob: listEmployeeAddToJob, color: "",
            start: dataStart.add(1, "day"), end: dataEnd.add(1, "day"), EmployerId: userId, currentEnd: dayjs(endDayWork).add(1, "day")
        })
            .then(response => { setModalOpenConfirmAdd(true) })
    }
    
    const changeSpecialist = (idSpecialistToChange, currentSpecialistUserIdToChange) => {

        setIndexSpecialistToChange(listEmployeeAddToJob.findIndex(x => x.specializationId === idSpecialistToChange));
        setCurrentSpecialistUserIdToChange(currentSpecialistUserIdToChange);
        setModalOpenChangeSpeclialist(true)
    }

    const changeSpecialistPerson = (item, userIdToChange) => {
        const updateDataEmployeeWithSpecialization = dataEmployeeWithSpecialization.map(x => {
            if (x.employeeId === userIdToChange) {
                x.employeeId = item.employeeId
                x.name = item.name
                x.surname = item.surname
                x.nameSurname = item.name + " " + item.surname
            }
            return x
        })

        setDataEmployeeWithSpecialization(updateDataEmployeeWithSpecialization)
        setModalOpenChangeSpeclialist(false)

    }
    const showAddEmployee = (SpecializationId) => {

        axios.post('http://localhost:5000/api/Job/AddEmployee',
            {
                listEmployeeInJobDTOList: listEmployeeAddToJob, EmployerId: userId, start: dataStart.add(1, "day"), end: dataEnd.add(1, "day"),
                SpecializationId: SpecializationId
            },)
            .then(response => { setListEmployeeToAdd(response.data) })

        setModalOpenAddEmployee(true)
        setIdSpecializationToChangeEmployee(SpecializationId)
    }
    const addEmployee = (employee) => {

        axios.post('http://localhost:5000/api/Job/UpdateDataNewEmployee',
            {
                listEmployeeInJobDTOList: listEmployeeAddToJob, EmployerId: userId, start: dataStart.add(1, "day"), end: dataEnd.add(1, "day"),
                SpecializationId: idSpecializationToChangeEmployee, employee: employee[0]
            },)
            .then(response => { setEndDayWork(response.data.endWorkDay); setListEmployeeAddToJob(response.data.listEmployeeInJob) })


        const index = listEmployeeToAdd.employeeToAdd.findIndex(x => x.employeeId === employee[0].employeeId)
        const newListEmployeeToAddt = listEmployeeToAdd.employeeToAdd.slice(0, index).concat(listEmployeeToAdd.employeeToAdd.slice(index + 1))

        const updateListEmployeeToAdd = listEmployeeToAdd;
        updateListEmployeeToAdd.employeeToAdd = newListEmployeeToAddt
        setListEmployeeToAdd(updateListEmployeeToAdd)

        setModalOpenSummaryViewEmployee(false)

    }
    const removePerson = (person, specialist) => {


        //inne podejście zamiast splice użyte slice. brak mutacji tylko tworzenie nowej tablicy
        //tu chyba różnicy nie robi bo i tak potem tworzymy nową tablice którą zastępujemy starą
        const index = specialist.employeeInJobList.findIndex(x => x.employeeId === person.employeeId)
        const newSpecialistList = specialist.employeeInJobList.slice(0, index).concat(specialist.employeeInJobList.slice(index + 1))

        const removeListEmployeeAddToJob = listEmployeeAddToJob.map(x => {
            if (x.specializationId === specialist.specializationId) {
                x.employeeInJobList = newSpecialistList
                x.hours += person.hoursJob
            }
            return x;
        })
        setListEmployeeAddToJob(removeListEmployeeAddToJob)

        axios.post('http://localhost:5000/api/Job/UpdateTimeJob',
            {
                listEmployeeInJobDTOList: listEmployeeAddToJob, start: dataStart.add(1, "day")
            },)
            .then(response => { setEndDayWork(response.data.endWorkDay); setListEmployeeAddToJob(response.data.listEmployeeInJob) })
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
                searchEmployee={searchEmployee} ButtonContainer={ButtonContainer} ButtonBootstrap={ButtonBootstrap}
                disableButtonSpecialization={disableButtonSpecialization} setDisableButtonSpecialization={setDisableButtonSpecialization}
                setDataEmployee={setDataEmployee} setViewSpecialist={setViewSpecialist} setModalOpenViewEmployee={setModalOpenViewEmployee}
                nextButtonSpecializationList={nextButtonSpecializationList}
            />
        )
    }
    const renderModalViewEmployee = () => {
        return (
            <ViewEmployee modalOpenViewEmployee={modalOpenViewEmployee} setModalOpenViewEmployee={setModalOpenViewEmployee}
                dataEmployee={dataEmployee} ButtonContainer={ButtonContainer} ButtonBootstrap={ButtonBootstrap} ButtonBootstrapBack={ButtonBootstrapBack}
                addSpecialistEmployees={addSpecialistEmployees} viewSpecialist={viewSpecialist} addNewEmployee={addNewEmployee} />
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
                ButtonContainer={ButtonContainer} ButtonBootstrap={ButtonBootstrap} ColorRed={ColorRed} viewEmployeeDetails={viewEmployeeDetails}
                setDisableButtonEmployee={setDisableButtonEmployee} disableButtonEmployee={disableButtonEmployee} heightModal={heightModal}
                setHeightModal={setHeightModal} ButtonBootstrapBack={ButtonBootstrapBack} openSummary={openSummary}
            />
        )
    }
    const renderModalSummary = () => {
        return (
            <Summary ButtonContainer={ButtonContainer} ButtonBootstrap={ButtonBootstrap} setModalOpenSummary={setModalOpenSummary}
                modalOpenSummary={modalOpenSummary} ButtonBootstrapBack={ButtonBootstrapBack} dataEmployeeWithSpecialization={dataEmployeeWithSpecialization}
                endDayWork={endDayWork} startDayWork={startDayWork} listEmployeeAddToJob={listEmployeeAddToJob} addNewJob={addNewJob}
                dataEnd={dataEnd} changeSpecialist={changeSpecialist} removePerson={removePerson} showAddEmployee={showAddEmployee}
                viewEmployeeDetails={viewEmployeeDetails}
            />
        )
    }
    const renderModalChangeSpecialist = () => {
        return (
            <ChangeSpecialist setModalOpenChangeSpeclialist={setModalOpenChangeSpeclialist} modalOpenChangeSpeclialist={modalOpenChangeSpeclialist}
                ButtonContainer={ButtonContainer} ButtonBootstrapBack={ButtonBootstrapBack} indexSpecialistToChange={indexSpecialistToChange}
                listEmployeeAddToJob={listEmployeeAddToJob} currentSpecialistUserIdToChange={currentSpecialistUserIdToChange}
                changeSpecialistPerson={changeSpecialistPerson}
            />
        )
    }
    const renderModalAddEmployee = () => {
        return (
            <AddEmployee setModalOpenAddEmployee={setModalOpenAddEmployee} modalOpenAddEmployee={modalOpenAddEmployee}
                ButtonContainer={ButtonContainer} ButtonBootstrapBack={ButtonBootstrapBack} listEmployeeToAdd={listEmployeeToAdd}
                viewEmployeeSummaryDetails={viewEmployeeSummaryDetails}
            />
        )
    }
    const renderModalSummaryViewEmployee = () => {
        return (
            <SummaryViewEmployee setModalOpenSummaryViewEmployee={setModalOpenSummaryViewEmployee} modalOpenSummaryViewEmployee={modalOpenSummaryViewEmployee}
                ButtonContainer={ButtonContainer} ButtonBootstrap={ButtonBootstrap} ButtonBootstrapBack={ButtonBootstrapBack} dataEmployee={dataEmployee}
                addEmployee={addEmployee}
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
                title={title} setOpenAddEmployee={setOpenAddEmployee} dataStart={dataStart} setDataEnd={setDataEnd}
                isUpdate={false}
            />
        )
    }
    const renderJobTitle = () => {
        return (
            <JobTitle setTitle={setTitle} dataListSpecialization={dataListSpecialization} dataEnd={dataEnd} dataStart={dataStart}
                setOpenAddEmployee={setOpenAddEmployee} />
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
    return (
        <>
            {renderModalViewEmployee()}
            {renderModalSpecializationEmptyList()}
            {renderModalSpecializationList()}
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

export default AddJob;