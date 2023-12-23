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

    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [errorValue, setErrorValue] = useState(false);
    const [errorValueLabel, setErrorValueLabel] = useState("");
    const [errorName, setErrorName] = useState(false)
    const [errorNameLabel, setErrorNameLabel] = useState("")

    const userId = sessionStorage.getItem("userId");

    const add = () => {
        if (name === "") {
            setErrorNameLabel("Nazwa nie może być pusta");
            setErrorName(true);
        }
        if (value === "") {
            setErrorValueLabel("Podana wartość musi być liczbą większa od 30");
            setErrorValue(true);
        }
        if (errorValue === true || errorValueLabel === true) return

        axios.put('http://localhost:5000/api/Experience', { experienceName: name, experienceValue: value, employerId: userId })
            .then(window.location.pathname = '/inzRafalRutkowski/Experience')
    }
    const back = () => {
        window.location.pathname = '/inzRafalRutkowski/Experience'
    }

    const changeValue = (e) => {
        setValue(e);
        if (e <= 30) {
            setErrorValueLabel("Podana wartość musi być liczbą większa od 30");
            setErrorValue(true);
        }
        else {
            setErrorValueLabel("");
            setErrorValue(false);
        }
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

    return (
        <>            <p>Użytkownik może dodać spersonalizowany rodzaj doświadczenia.</p>
                        <p>System doświadczenia opiera się na wagach, które pomagają obliczyć czas potrzebny na wykonie zlecenia.</p>
                        <p> Przy nowym zleceniu podajmy czas, który jest wyliczany względem zaawansowango doświaczenia.</p>
                        <p>Waga nie moze być mniejsza niz waga osoby nie posiadajacej doświadczenia.</p>

                        <p> Domyślny system wag</p>
                        <p> Ososba Zaawansowana - 100</p>
                        <p>Oosba Średnio-zaawansowana - 70</p>
                        <p> Osoba Początkujaca - 40</p>
                        <p>Osoba nie posiadająca doświadczenia(brak specjalizacji) - 30</p>
                        

            <TextFieldContainer>
                <TextField
                    error={errorName}
                    helperText={errorNameLabel}
                    onChange={(e) => changeName(e.target.value)}
                    sx={{ minWidth: 300 }}
                    id="outlined-basic"
                    label="Podaj nazwę doświadczenia"
                    variant="outlined" />
                <TextField
                    error={errorValue}
                    helperText={errorValueLabel}
                    onChange={(e) => changeValue(e.target.value)}
                    sx={{ minWidth: 300 }}
                    id="outlined-number"
                    label="Podaj poziom doświadczenia"
                    variant="outlined"
                    type="number" />
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