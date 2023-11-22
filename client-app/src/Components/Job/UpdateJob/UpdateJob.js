import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import JobDate from "../Job/JobDates";
import JobTitle from "../Job/JobTitle";
import { AddSpecializationAndHours, AddSpecializationButton, ViewSpecializationAndHours } from "../Job/SpecializationAndHours";

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

    const userId = sessionStorage.getItem("userId");

    const params = useParams()

    //console.log(dataListSpecialization)

    useEffect(() => {
        axios.get('http://localhost:5000/api/Specialization', { params: { EmployerId: userId } })
            .then(response => {
                setDataSpecialization(response.data);
            })

        axios.get('http://localhost:5000/api/Job/GetJob', { params: { jobId: params.id } })
            .then(response => {
                setDataStart(response.data.start);
                setDataEnd(response.data.end);
                setTitle(response.data.title)

                let tempResponseData = response.data.listEmployeeAddToJob
                tempResponseData.map(data => { console.log(data) })
                //console.log(tempResponseData)

                // tu uzupełnić liste dodanych specjalizacji i wywalic te prace z drugiej listy
            })
    }, [])

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



        </>
    )
}

export default UpdateJob;