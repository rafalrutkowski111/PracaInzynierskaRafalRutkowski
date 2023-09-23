import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import axios from 'axios';

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

const AddExperience = () => {

    const [name, setName] = useState(undefined);
    const [value, setValue] = useState(undefined)

    const userId = sessionStorage.getItem("userId");

    const add = () => {
        axios.post('http://localhost:5000/api/Experience', { experienceName: name, experienceValue: value, employerId: userId })
            .then(window.location.pathname = '/inzRafalRutkowski/Experience')
    }
    const back = () => {
        window.location.pathname = '/inzRafalRutkowski/Experience'
    }

    return (
        <>            <p>Każdy z pracowników ma pewnien poziom doświadczenia.
            Dla dokładniejszego działania programu użytkownik
            może dodać sowje stopnie doświaczenia poza podstawowymi.
            Odnosimy się w programie do osoby zaawanowanej której współczynnik wynosi 100
            osoba bez doświadczenia pracuję z współczynnikiem 50, czyli jest dwa razy mniej
            wydajna. Można tutaj dodawać spersonalizowane dane.
        </p>
            <TextFieldContainer>
                <TextField onChange={(e) => setName(e.target.value)} sx={{ minWidth: 250 }} id="outlined-basic" label="Podaj nazwę doświadczenia" variant="outlined" />
                <TextField onChange={(e) => setValue(e.target.value)} sx={{ minWidth: 250 }} id="outlined-number" label="Podaj pozim doświadczenia" variant="outlined" type="number" />
            </TextFieldContainer>

            < ButtonContainer >
                <Button
                    type="submit"
                    id="button"
                    value="Dodaj poziom doświadczenia"
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

export default AddExperience