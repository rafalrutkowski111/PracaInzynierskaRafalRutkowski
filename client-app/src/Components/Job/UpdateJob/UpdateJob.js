import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import JobDate from "../Job/JobDates";
import TextField from '@mui/material/TextField';
import JobTitle from "../Job/JobTitle";

const TittleContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
`

const UpdateJob = () => {

    const [title, setTitle] = useState('');
    const [listEmployeeAddToJob, setListEmployeeAddToJob] = useState([{ employeeInJobList: [{ name: '', surname: '' }] }])
    const [dataStart, setDataStart] = useState('');
    const [dataEnd, setDataEnd] = useState('');
    const [endDayWork, setEndDayWork] = useState('');

    const [dataListSpecialization, setDataListSpecialization] = useState([]); //akutualnie nie używane
    const [openAddEmployee, setOpenAddEmployee] = useState(true); //aktualnie nie używane

    const params = useParams()

    useEffect(() => {
        axios.get('http://localhost:5000/api/Job/GetJob', { params: { jobId: params.id } })
            .then(response => {
                setDataStart(response.data.start);
                setDataEnd(response.data.end);
                setTitle(response.data.title)
                console.log(response.data)
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

    return (
        <>
            <TittleContainer>
                <h1>Edytuj prace {title}</h1>
            </TittleContainer>

            {renderJobTitle()}
            {renderJobDates()}

        </>
    )
}

export default UpdateJob;