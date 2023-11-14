import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import JobDate from "../Job/JobDates";

const TittleContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
`

const UpdateJob = () => {

    const [title, setTitle] = useState('');
    const [listEmployeeAddToJob, setListEmployeeAddToJob] = useState([{ employeeInJobList: [{ name: '', surname: '' }] }])
    const [dataStart, setDataStart] = useState(new Date() + 1);
    const [dataEnd, setDataEnd] = useState(new Date());
    const [endDayWork, setEndDayWork] = useState('');

    const [dataListSpecialization, setDataListSpecialization] = useState([]); //akutualnie nie używane
    const [openAddEmployee, setOpenAddEmployee] = useState(true); //aktualnie nie używane

    const params = useParams()

    useEffect(() => {
        axios.get('http://localhost:5000/api/Job/GetJob', { params: { jobId: params.id } })
            .then(response => {
                setDataStart(response.data.start); //do sformatowania sprawdzać odbyła sie praca
                setDataEnd(response.data.end);
                setTitle(response.data.title)
                console.log(response.data)
            })
    })





    const renderJobDates = () => {
        return (
            <JobDate setDataStart={setDataStart} dataListSpecialization={dataListSpecialization} dataEnd={dataEnd}
                title={title} setOpenAddEmployee={setOpenAddEmployee} dataStart={dataStart} setDataEnd={setDataEnd}
                isUpdate={true}
            />
        )
    }

    return (
        <>
            <TittleContainer>
                <h1>Edytuj prace {title}</h1>
            </TittleContainer>

            {renderJobDates()}

        </>
    )
}

export default UpdateJob;