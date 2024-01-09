import { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { AddName, AddSurname } from "../Employee/NameAndSurname";
import { AddSpecializationAndExperiance, ButtonSpecializationAndExperiance, ViewSpecializationAndExperiance } from "../Employee/SpecializationAndExperiane";
import Sheet from '@mui/joy/Sheet';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';

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

const EditEmployee = (props) => {
    const [dataExperience, setDataExperience] = useState([]);
    const [openAddSpecialization, setOpenAddSpecialization] = useState(true);
    const [specializationValue, setSpecializationValue] = useState('');
    const [experianceValue, setExperianceValue] = useState('');
    const [errorName, setErrorName] = useState(false)
    const [errorNameLabel, setErrorNameLabel] = useState('')
    const [errorSurname, setErrorSurname] = useState(false)
    const [errorSurnameLabel, setErrorSurnameLabel] = useState('')

    const userId = sessionStorage.getItem("userId");


    useEffect(() => {
        axios.get('http://localhost:5000/api/Experience', { params: { employerId: userId } })
            .then(response => {
                setDataExperience(response.data);
            })
    }, [])

    const edit = () => {

        if (props.name === "") {
            setErrorNameLabel("Imie nie może być puste");
            setErrorName(true);
        }
        if (props.surname === "") {
            setErrorSurnameLabel("Nazwisko nie może być puste");
            setErrorSurname(true);
        }
        if (props.name === "" || props.surname === "") return

        axios.post('http://localhost:5000/api/Employee/checkEmployeeWork',
            { employeeId: props.employeeId, listSpecializationAndExperience: props.dataListSpecializationAndExperience, isEdit: true })
            .then(response => {
                props.setEmployeInJobList(response.data) 
                props.setIsRemove(false)
                props.setMessage(props.editStartText)
                props.setModalOpenAlert(true)
            })
    }


    const renderAddName = () => {
        return (
            <AddName setName={props.setName} name={props.name} errorName={errorName} errorNameLabel={errorNameLabel} setErrorName={setErrorName}
                setErrorNameLabel={setErrorNameLabel} />
        )
    }
    const renderAddSurname = () => {
        return (
            <AddSurname setSurname={props.setSurname} surname={props.surname} errorSurname={errorSurname} errorSurnameLabel={errorSurnameLabel}
                setErrorSurname={setErrorSurname} setErrorSurnameLabel={setErrorSurnameLabel} />
        )
    }
    const renderAddSpecializationAndExperiance = () => {
        return (
            <AddSpecializationAndExperiance dataSpecialization={props.dataSpecialization} dataExperience={dataExperience}
                setSpecializationValue={setSpecializationValue} setExperianceValue={setExperianceValue}
                specializationValue={specializationValue} experianceValue={experianceValue} setOpenAddSpecialization={setOpenAddSpecialization} />
        )
    }
    const renderButtonSpecializationAndExperiance = () => {
        return (
            <ButtonSpecializationAndExperiance openAddSpecialization={openAddSpecialization} setSpecializationValue={setSpecializationValue}
                setExperianceValue={setExperianceValue} dataSpecialization={props.dataSpecialization} specializationValue={specializationValue}
                setDataSpecialization={props.setDataSpecialization} setDataListSpecializationAndExperience={props.setDataListSpecializationAndExperience}
                dataListSpecializationAndExperience={props.dataListSpecializationAndExperience} setOpenAddSpecialization={setOpenAddSpecialization}
                dataExperience={dataExperience} experianceValue={experianceValue} />
        )
    }
    const renderViewSpecializationAndExperiance = () => {
        return (
            <ViewSpecializationAndExperiance dataListSpecializationAndExperience={props.dataListSpecializationAndExperience}
                setDataListSpecializationAndExperience={props.setDataListSpecializationAndExperience}
                setDataSpecialization={props.setDataSpecialization} setSpecializationValue={setSpecializationValue} dataExperience={dataExperience}
                setOpenAddSpecialization={setOpenAddSpecialization} />

        )
    }

    return (
        <>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={props.editModal}
                onClose={() => { props.setEditModal(false) }}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        width: 1200,
                        maxWidth: 1000,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />

                    <TittleContainer>
                        <h1>Edytuj pracownika {props.nameEmployee}</h1>
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
                            value="Edytuj"
                            onClick={() => { edit(); }}
                        />
                        <ButtonBootstrapBack
                            type="submit"
                            id="button"
                            value="Powrót"
                            onClick={() => { props.setEditModal(false) }}
                        />
                    </ButtonBootstrapContainer >
                </Sheet>
            </Modal >
        </>

    )
}
export { EditEmployee }