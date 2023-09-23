import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import axios from 'axios';
import TextField from '@mui/material/TextField';

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
  width:250px;
  background-color: green;
  color: white;
`
const ButtonBootstrapBack = styled(Form.Control)`
    width:150px;
    background-color: red;
    color: white;
`

const AddSpecialization = () => {

    const [name, setName] = useState(undefined);

    const userId = sessionStorage.getItem("userId");

    const add = () => {
        axios.post('http://localhost:5000/api/Specialization', { name: name, employerId: userId })
            .then(window.location.pathname = '/inzRafalRutkowski/Specialization')
    }
    const back = () => {
        window.location.pathname = '/inzRafalRutkowski/Specialization'
    }

    return (
        <>dodaj specjalizacje

            <TextFieldContainer>
                <TextField onChange={(e) => setName(e.target.value)} sx={{ minWidth: 250 }} id="outlined-basic" label="Podaj nazwę specjalizacji" variant="outlined" />
            </TextFieldContainer>

            < ButtonContainer >
                <Button
                    type="submit"
                    id="button"
                    value="Dodaj poziom specjalizacji"
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