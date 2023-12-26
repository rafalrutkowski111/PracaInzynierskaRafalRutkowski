import { useState, useEffect } from "react"
import styled from 'styled-components';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { AddName, AddSurname } from "../Employee/NameAndSurname";
import { AddSpecializationAndExperiance, ButtonSpecializationAndExperiance, ViewSpecializationAndExperiance } from "../Employee/SpecializationAndExperiane";
import { ConfirmModal } from "../../Global/ConfirmModal";
import Typography from '@mui/joy/Typography';

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
    margin-bottom:2%;
`

const addText = () => {
    return (
        <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
            <p>Dodano poprawnie nowego pracownika.</p>
        </Typography>
    )
}


const AddEmployee = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dataSpecialization, setDataSpecialization] = useState([]);
    const [dataExperience, setDataExperience] = useState([]);
    const [dataListSpecializationAndExperience, setDataListSpecializationAndExperience] = useState([]);
    const [openAddSpecialization, setOpenAddSpecialization] = useState(true);
    const [specializationValue, setSpecializationValue] = useState('');
    const [experianceValue, setExperianceValue] = useState('');
    const [message, setMessage] = useState();
    const [confirmModal, setConfirmModal] = useState(false)
    const [errorName, setErrorName] = useState(false)
    const [errorNameLabel, setErrorNameLabel] = useState('')
    const [errorSurname, setErrorSurname] = useState(false)
    const [errorSurnameLabel, setErrorSurnameLabel] = useState('')

    const userId = sessionStorage.getItem("userId");

    console.log("dataExperience")
    console.log(dataListSpecializationAndExperience)

    useEffect(() => {
        axios.get('http://localhost:5000/api/Specialization', { params: { employerId: userId } })
            .then(response => {
                setDataSpecialization(response.data);
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/api/Experience', { params: { employerId: userId } })
            .then(response => {
                setDataExperience(response.data);
            })
    }, [])

    const back = () => {
        window.location.pathname = '/inzRafalRutkowski/Employee';
    }
    const add = () => {

        if (name === "") {
            setErrorNameLabel("Imie nie może być puste");
            setErrorName(true);
        }
        if (surname === "") {
            setErrorSurnameLabel("Nazwisko nie może być puste");
            setErrorSurname(true);
        }
        if (name === "" || surname === "") return

        // axios.post('http://localhost:5000/api/Employee', {
        //     EmployerId: userId, Name: name, Surname: surname,
        //     IsEmployed: true, SpecializationAndExperience: dataListSpecializationAndExperience
        // })
        //     .then(window.location.pathname = '/inzRafalRutkowski/Employee')
        
        setConfirmModal(true)
        setMessage(addText)
    }

    const renderAddName = () => {
        return (
            <AddName setName={setName} name={name} errorName={errorName} errorNameLabel={errorNameLabel} setErrorName={setErrorName}
                setErrorNameLabel={setErrorNameLabel} />
        )
    }
    const renderAddSurname = () => {
        return (
            <AddSurname setSurname={setSurname} surname={surname} errorSurname={errorSurname} errorSurnameLabel={errorSurnameLabel}
                setErrorSurname={setErrorSurname} setErrorSurnameLabel={setErrorSurnameLabel} />
        )
    }
    const renderAddSpecializationAndExperiance = () => {
        return (
            <AddSpecializationAndExperiance dataSpecialization={dataSpecialization} dataExperience={dataExperience}
                setSpecializationValue={setSpecializationValue} setExperianceValue={setExperianceValue}
                specializationValue={specializationValue} experianceValue={experianceValue} setOpenAddSpecialization={setOpenAddSpecialization} />
        )
    }
    const renderButtonSpecializationAndExperiance = () => {
        return (
            <ButtonSpecializationAndExperiance openAddSpecialization={openAddSpecialization} setSpecializationValue={setSpecializationValue}
                setExperianceValue={setExperianceValue} dataSpecialization={dataSpecialization} specializationValue={specializationValue}
                setDataSpecialization={setDataSpecialization} setDataListSpecializationAndExperience={setDataListSpecializationAndExperience}
                dataListSpecializationAndExperience={dataListSpecializationAndExperience} setOpenAddSpecialization={setOpenAddSpecialization}
                dataExperience={dataExperience} experianceValue={experianceValue} />
        )
    }
    const renderViewSpecializationAndExperiance = () => {
        return (
            <ViewSpecializationAndExperiance dataListSpecializationAndExperience={dataListSpecializationAndExperience}
                setDataListSpecializationAndExperience={setDataListSpecializationAndExperience}
                setDataSpecialization={setDataSpecialization} setSpecializationValue={setSpecializationValue} dataExperience={dataExperience}
                setOpenAddSpecialization={setOpenAddSpecialization}/>
                
        )
    }
    const renderConfirmModal = () => {
        return (
            <ConfirmModal setConfirmModal={setConfirmModal} confirmModal={confirmModal} message={message}
                nameTitle={"Poziom doświadczenia"} changePath={true} endPath={"/Employee"} />
        )
    }

    return (
        <>

            {renderConfirmModal()}

            <TittleContainer>
                <h1>Nowy pracownik</h1>
            </TittleContainer>

            {renderAddName()}
            {renderAddSurname()}
            {renderAddSpecializationAndExperiance()}
            {renderButtonSpecializationAndExperiance()}
            {renderViewSpecializationAndExperiance()}

            < ButtonBootstrapContainer >
                <ButtonBootstrap
                    type="submit"
                    id="button"
                    value="Dodaj"
                    onClick={() => { add(); }}
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

export default AddEmployee