import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import AddSpecializationAndHours from "./AddSpecializationAndHours";
import ViewSpecializationAndHours from "./ViewSpecializationAndHours";
import { SpecializationEmptyList, SpecializationList, ViewEmployee } from "./SpecializationModal";
import { EmployeeList, NotEnoughEmployee } from "./EmployeeModal";
import { AddEmployee, ChangeSpecialist, ChangeSpecialistModal, Summary, SummaryModal, SummaryViewEmployee } from "./SummaryModal";
import * as dayjs from 'dayjs'
import TextField from '@mui/material/TextField';

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
const DataContainer = styled.div`
    margin-top:2%;
    margin-bottom:3%;
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

        if (dataEnd.$d == "Invalid Date" || dataStart.$d == "Invalid Date" || dataStart > dataEnd) return

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
    const addSpecialization = () => {
        const list = [...dataListSpecialization];
        list.push({ SpecializationId: specializationValue, Hours: hoursValue })

        const SpecializationName = dataSpecialization.find(x => x.id == specializationValue);
        SpecializationName.Disabled = true;

        setDataListSpecialization(dataListSpecialization => [...dataListSpecialization,
        { SpecializationId: specializationValue, Hours: hoursValue, SpecializationName: SpecializationName.name }])

        var tempDataSpecialization = [...dataSpecialization];
        const i = tempDataSpecialization.findIndex(x => x.id == specializationValue)
        tempDataSpecialization.splice(i, 1)
        setDataSpecialization(tempDataSpecialization)

        setChangeValueHours(true);
        setHoursValue('');
        setSpecializationValue('');

        setOpenAddSpecialization(true)

        if (dataStart !== "" && dataEnd !== "" && title !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)
    }

    const changeSpecialization = (e) => {
        setSpecializationValue(e);

        if (e !== '' && hoursValue !== '') setOpenAddSpecialization(false)

    }

    const changeHours = (e) => {
        if (e.target.value === '') {
            e.target.value = 1;
        }

        if (specializationValue !== '' && e !== '') setOpenAddSpecialization(false)

        setChangeValueHours(false);
        setHoursValue(e.target.value);
    }

    const changeStartDate = (e) => {
        setDataStart(e)

        if (dataListSpecialization.length - 1 >= 0 && e !== "" && dataEnd !== "" && title !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)
    }

    const changeEndDate = (e) => {
        setDataEnd(e)

        if (dataListSpecialization.length - 1 >= 0 && dataStart !== "" && e !== "" && title !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)
    }
    const changeTitle = (e) => {
        const currentDate = new Date();
        if (e.target.value === '') {
            e.target.value = "Praca-" + dayjs(currentDate).format('DD/MM/YYYY-HH.mm');
        }
        setTitle(e.target.value)

        if (dataListSpecialization.length - 1 >= 0 && dataEnd !== "" && dataStart)
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)
    }

    const startValidation = (date) => {
        const day = date.day();
        return day === 0 || day === 6;
    };

    const endValidation = (date) => {
        const day = date.day();

        if (dataStart !== '') {
            return dataStart.add(1, "day") > date || day === 0 || day === 6;
        }
        return day === 0 || day === 6;
    };

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
                const i = list.findIndex(x => x.specializationId == data.specializationId)
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

                if (data2.employeeId == employee[0].employeeId) {

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

        if (needRemove == true) {
            const listSearchEmployeeJob = [...searchEmployeeJob];
            listSearchEmployeeJob.splice(findIndex1, 1)
            setSearchEmployeeJob(listSearchEmployeeJob)
        }

        setModalOpenViewEmployee(false)
    }

    const removeSpecializationAndHours = (indexSpecialization) => {
        if (dataListSpecialization.length - 1 == 0)
            setOpenAddEmployee(true)

        const list = [...dataListSpecialization];
        const specializationRemove = list.find(x => x.SpecializationId == indexSpecialization)

        setDataSpecialization(dataSpecialization => [...dataSpecialization, { name: specializationRemove.SpecializationName, id: specializationRemove.SpecializationId }])
        const i = list.findIndex(x => x.SpecializationId == indexSpecialization)
        list.splice(i, 1)
        setDataListSpecialization(list)
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
        console.log(dataEmployeeWithSpecialization)

        const updatelistEmployeeAddToJob = listEmployeeAddToJob.map(x => {
            const temp = dataEmployeeWithSpecialization.find(x2 => x2.specializationId === x.specializationId);
            x.responsiblePersonName = temp.name;
            x.responsiblePersonSurname = temp.surname
            x.responsiblePersonEmployeeId = temp.employeeId

            return x;
        })
        setListEmployeeAddToJob(updatelistEmployeeAddToJob)

        axios.post('http://localhost:5000/api/Job', {
            title: title, desc: "description", listEmployeeAddToJob: listEmployeeAddToJob, color: "",
            start: dataStart.add(1, "day"), end: dataEnd.add(1, "day"), EmployerId: userId, currentEnd: dayjs(endDayWork).add(1, "day")
        })
            .then(response => {
                console.log(response) // może dodac jakiś modal - komunikat o dodanej pracy
            })
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


        const index = listEmployeeToAdd.employeeToAdd.findIndex(x => x.employeeId == employee[0].employeeId)
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
        console.log(listEmployeeAddToJob)
        //wypada teraz odjąć te liczby mech mech mech

        axios.post('http://localhost:5000/api/Job/UpdateTimeJob',
            {
                listEmployeeInJobDTOList: listEmployeeAddToJob, start: dataStart.add(1, "day")
            },)
            .then(response => { setEndDayWork(response.data.endWorkDay); setListEmployeeAddToJob(response.data.listEmployeeInJob) })
    }

    const renderAddSpecializationAndHours = () => {
        return (
            <AddSpecializationAndHours changeSpecialization={changeSpecialization}
                data={dataListSpecialization} changeValueHours={changeValueHours}
                dataSpecialization={dataSpecialization} changeHours={changeHours} />
        )
    }
    const renderViewSpecializationAndHours = () => {
        return (
            <ViewSpecializationAndHours dataListSpecialization={dataListSpecialization}
                removeSpecializationAndHours={removeSpecializationAndHours} />
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
                searchEmployee={searchEmployee} ButtonContainer={ButtonContainer} ButtonBootstrap={ButtonBootstrap} viewEmployeeDetails={viewEmployeeDetails}
                disableButtonSpecialization={disableButtonSpecialization} setDisableButtonSpecialization={setDisableButtonSpecialization}
                nextButtonSpecializationList={nextButtonSpecializationList} />
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




            <TittleContainer>
                <h1>Dodaj nową prace</h1>
            </TittleContainer>
            <TittleContainer>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    onChange={e => changeTitle(e)}
                    id="outlined-basic"
                    label="Nazwa pracy"
                    variant="outlined" />
            </TittleContainer>
            <DataContainer>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Data rozpoczęcia projektu"
                        disablePast
                        shouldDisableDate={startValidation}
                        onChange={(e) => changeStartDate(e)}
                    />
                    <DatePicker
                        shouldDisableDate={endValidation}
                        disablePast
                        label="Data zakończenia projektu"
                        onChange={(e) => changeEndDate(e)}
                    />
                </LocalizationProvider>
            </DataContainer>

            {renderAddSpecializationAndHours()}

            < ButtonContainer >
                <Button sx={{ mr: 1 }}
                    disabled={openAddSpecialization}
                    variant="contained"
                    onClick={() => {
                        addSpecialization();
                    }}
                >Dodaj kolejny</Button>
            </ButtonContainer>

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