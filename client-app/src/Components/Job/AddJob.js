import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useState, useEffect } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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
const ButtonBack = styled(Form.Control)`
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
    display: flex;
    justify-content: center;
`

const AddJob = () => {

    // const today = dayjs(); aktualny dzień biblioteka do tego jeżeli bede tego chciał użyć
    // const yesterday = dayjs().subtract(1, 'day');

    const [specialization, setSpecialization] = useState([true, true]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/Specialization')
            .then(response => {
                setSpecialization(response.data)
            })
    }, [])
    const back = () => {
        window.location.pathname = '/inzRafalRutkowski/';
    }

    const next = () => {
    }
    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const array1 = [1, 4, 9, 16];

    return (
        <>
            <TittleContainer>
                <h1>Dodaj nową prace</h1>
            </TittleContainer>
            <DataContainer>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Data rozpoczęcia projektu"
                        disablePast
                    />
                    <DatePicker
                        disablePast
                        label="Data zakończenia projektu"
                    />
                </LocalizationProvider>
            </DataContainer>
            <p>wybierz specjalizacje (wybor przez select) podaj czas potrzebny na wykonanie </p>

            dodaj kolejną (button)

            <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel>Specjazlizacja</InputLabel>
                <Select
                    label="Specjazlizacja"
                >
                    {specialization.map((choice) => (
                        <MenuItem key={choice.id} value={choice.id}>
                            {choice.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            < ButtonContainer >
                <Button
                    type="submit"
                    id="button"
                    value="Dalej"
                    onClick={() => { next(); }}
                />
                <ButtonBack
                    type="submit"
                    id="button"
                    value="Powrót"
                    onClick={() => { back(); }}
                />
            </ButtonContainer >
        </>
    )
}

export default AddJob;