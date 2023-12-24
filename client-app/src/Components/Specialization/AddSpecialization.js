import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Typography from '@mui/joy/Typography';
import { ConfirmModal } from '../Global/ConfirmModal';

const TextFieldContainer = styled.div`
    display: flex;
    justify-content: center;
`

const ButtonContainer = styled.div`
  widht:60%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
`
const Button = styled(Form.Control)`
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
    margin-bottom:5%;
`
const TextContainer = styled.div`
    margin-left: 5%;
`

const addText = () => {
    return (
        <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
            <p>Dodano poprawnie nową specjalizacje.</p>
        </Typography>
    )
}


const AddSpecialization = () => {

    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState(false)
    const [errorNameLabel, setErrorNameLabel] = useState("")
    const [confirmModal, setConfirmModal] = useState(false)
    const [message, setMessage] = useState();

    const userId = sessionStorage.getItem("userId");

    const add = () => {
        if (name === "") {
            setErrorNameLabel("Nazwa nie może być pusta");
            setErrorName(true);
            return
        }

        axios.put('http://localhost:5000/api/Specialization', { name: name, employerId: userId })
            .then(
                setConfirmModal(true),
                setMessage(addText)
            )
    }
    const back = () => {
        window.location.pathname = '/inzRafalRutkowski/Specialization'
    }
    const changeName = (e) => {
        setName(e);
        if (e === "") {
            setErrorNameLabel("Nazwa nie może być pusta");
            setErrorName(true);
        }
        else {
            setErrorNameLabel("");
            setErrorName(false);
        }
    }

    const renderConfirmModal = () => {
        return (
            <ConfirmModal setConfirmModal={setConfirmModal} confirmModal={confirmModal} message={message}
                nameTitle={"Specjalizacja"} changePath={true} endPath={"/Specialization"} />
        )
    }

    return (
        <>

            {renderConfirmModal()}

            <TittleContainer>
                <h1>Nowa specjalizacja</h1>
            </TittleContainer>

            <TextContainer>
                Możliwe jest dodanie własnych specjalizacji. <br />
                Specjalizacje są przypisane do konta i nikt poza użytkownikiem nie może nimi zarządzać.<br />
                <br />
                <br />
            </TextContainer>

            <TextFieldContainer>
                <TextField
                    error={errorName}
                    helperText={errorNameLabel}
                    onChange={(e) => changeName(e.target.value)}
                    sx={{ minWidth: 250 }}
                    id="outlined-basic"
                    label="Podaj nazwę specjalizacji"
                    variant="outlined" />
            </TextFieldContainer>

            < ButtonContainer >
                <Button
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
            </ButtonContainer >
        </>
    )
}

export default AddSpecialization;